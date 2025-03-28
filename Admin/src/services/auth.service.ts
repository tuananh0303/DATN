import axios from 'axios';
import { AdminUser, AuthResponse, TokenResponse } from '@/types/auth.types';
import { apiClient } from '@/services/api.service';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/admin/login`, {
      email,
      password,
    });
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
      refreshToken,
    });
    return response.data;
  },

  async getAdminInfo(): Promise<AdminUser> {
    const response = await apiClient.get('/admin/profile');
    return response.data;
  },
};