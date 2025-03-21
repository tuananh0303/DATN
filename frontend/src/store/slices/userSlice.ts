import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/auth.service';
import { ApiError } from '@/types/errors';
import { LoginParams, RegisterData, UserState } from '@/types/user.types';

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  loginModalVisible: false,
  redirectPath: null,
};

// Async thunks for authentication
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password, fromToken= false }: LoginParams, { rejectWithValue }) => {
    try {
      
      if (fromToken) {
        const token = localStorage.getItem('access_token');
        if (!token) {
          return rejectWithValue('Không tìm thấy token');
        }
        return await authService.getMyInfo();
      } else {
        const authData = await authService.login(email, password);
        localStorage.setItem('access_token', authData.accessToken);
        localStorage.setItem('refresh_token', authData.refreshToken);
        return await authService.getMyInfo();
      }      
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {            
      await authService.register(userData);
      return true;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Đăng ký tài khoản thất bại. Vui lòng thử lại.');
    }
  }
);

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
    showLoginModal: (state, action: PayloadAction<string>) => {
      state.loginModalVisible = true;
      state.redirectPath = action.payload;
    },
    hideLoginModal: (state) => {
      state.loginModalVisible = false;
    }  
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
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // Logout cases
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.redirectPath = null;
      state.loginModalVisible = false;
    });
  },
});

export const { showLoginModal, hideLoginModal } = userSlice.actions;

export default userSlice.reducer;