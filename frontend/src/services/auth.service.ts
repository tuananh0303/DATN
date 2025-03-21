import api from './api';
import { ApiError } from '@/types/errors';
import { RegisterData } from '@/types/user.types';

// API Endpoints
export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message;
      if (errorMessage) {
        throw new Error(
          Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage
        );
      }
      throw error;
    }
  },
  
  register: async (data: RegisterData) => {
    try {
      const formatPhoneNumber = (phone: string) => {
        if (phone.startsWith('+')) return phone;
        return `+84${phone.startsWith('0') ? phone.substring(1) : phone}`;
      };

      const formattedData = {
      ...data,
      phoneNumber: formatPhoneNumber(data.phoneNumber)
    };
            
      const response = await api.post('/auth/register', formattedData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message;
      if (errorMessage) {
        throw new Error(
        Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage
      );
    }
    throw error;
    }
  },
  
  getMyInfo: async () => {
    const response = await api.get('/people/my-info');
    return response.data;
  },

  updateAvatar: async (avatar: File) => {
    const response = await api.patch('/people/update-avatar', { avatar }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  }
};

export default api;