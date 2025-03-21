  interface User {
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
  
  export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    loginModalVisible: boolean;
    redirectPath: string | null;
  }
  
  export interface LoginParams {
    email: string;
    password: string;
    fromToken: boolean;
  }
  
  export interface RegisterData {
    email: string;
    name: string;
    phoneNumber: string;  
    role: string;
    password: string; 
    retypePassword: string;
  }