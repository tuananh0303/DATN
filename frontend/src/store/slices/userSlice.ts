import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/auth.service';

// Define user interface based on your requirements
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  bankAccount: string;
  role: 'player' | 'owner';
  avatarUrl?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginModalVisible: boolean;
  redirectPath: string | null; // Store the path user tried to access before authentication
  justLoggedOut: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  loginModalVisible: false,
  redirectPath: null,
  justLoggedOut: false,
};

// Function to format phone numbers to international format
const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove any non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    
    // Check if it's already in international format
    if (digits.startsWith('84')) {
      return `+${digits}`;
    }
    
    // If it starts with 0, replace it with +84
    if (digits.startsWith('0')) {
      return `+84${digits.substring(1)}`;
    }
    
    // Otherwise, assume it's a local number without the leading 0
    return `+84${digits}`;
  };

// Async thunks for authentication
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password, fromToken= false }: { email: string; password: string, fromToken: boolean }, { rejectWithValue }) => {
    try {
      if (fromToken) {
        // Kiểm tra token và lấy thông tin người dùng
        const token = localStorage.getItem('access_token');
        if (!token) {
          return rejectWithValue('No token found');
        }
        const userInfo = await authService.getMyInfo();
        return userInfo;
      } else {
        const authData = await authService.login(email, password);      
        // Store tokens
        localStorage.setItem('access_token', authData.accessToken);
        localStorage.setItem('refresh_token', authData.refreshToken);     
      
      // After login, fetch user info
      const userInfo = await authService.getMyInfo();
      console.log(userInfo);
      return userInfo;
    }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (userData: any, { rejectWithValue }) => {
    try {
        // Format the phone number if it exists
      const formattedUserData = {
        ...userData,
        phoneNumber: userData.phoneNumber ? formatPhoneNumber(userData.phoneNumber) : userData.phoneNumber
      };      
      await authService.register(userData);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// export const getUserInfo = createAsyncThunk(
//   'user/getUserInfo',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Check if user has token stored
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         return rejectWithValue('No token found');
//       }
//       console.log(token);
//       const userInfo = await authService.getMyInfo();
//       return userInfo;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to get user info');
//     }
//   }
// );

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return null;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    showLoginModal: (state, action: PayloadAction<string | null>) => {
      state.loginModalVisible = true;
      state.redirectPath = action.payload;
    },
    hideLoginModal: (state) => {
      state.loginModalVisible = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetLogoutFlag: (state) => {
      state.justLoggedOut = false;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loginModalVisible = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
    // Register cases
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      // We don't authenticate yet, as registration just creates the account
      // User still needs to login
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
    // Get user info cases
    // builder.addCase(getUserInfo.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getUserInfo.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    // });
    // builder.addCase(getUserInfo.rejected, (state) => {
    //   state.isLoading = false;
    //   state.isAuthenticated = false;
    //   state.user = null;
    // });
    
    // Logout case
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.redirectPath = null;
      state.justLoggedOut = true;
      state.loginModalVisible = false;
    });
  },
});

export const { showLoginModal, hideLoginModal, clearError, resetLogoutFlag } = userSlice.actions;

export default userSlice.reducer;