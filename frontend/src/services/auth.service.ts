import api from './api';

// API Endpoints
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (data: any) => {
    try {
      // Ensure phone number is in the correct format
      const formattedData = {
        ...data,
        phoneNumber: data.phoneNumber.startsWith('+') 
          ? data.phoneNumber 
          : `+84${data.phoneNumber.startsWith('0') ? data.phoneNumber.substring(1) : data.phoneNumber}`
      };
      
      console.log('Sending registration data to API:', formattedData);
      
      const response = await api.post('/auth/register', formattedData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Registration error details:', error.response?.data || error);
      // Throw with more detailed error information
      if (error.response?.data?.message) {
        throw new Error(
          Array.isArray(error.response.data.message) 
            ? error.response.data.message.join(', ')
            : error.response.data.message
        );
      }
      throw error;
    }
  },
  
  getMyInfo: async () => {
    const response = await api.get('/people/my-info');
    return response.data;
  },
  
  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  }
};

export default api;