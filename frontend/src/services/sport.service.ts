import api from './api';

// API Endpoints
export const sportService = {
  // Sport api
  getSport: async () => {
    const response = await api.get('/sport/all');
    return response.data;
  },

  // upload image
  uploadImage: async (image: File) => {
    const response = await api.post('/cloud-uploader', { image });
    return response.data;
  }
    
};

export default api;