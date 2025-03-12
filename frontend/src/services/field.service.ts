import api from './api';

// API Endpoints
export const fieldService = {
  createGroupField: async (data: any) => {
    const response = await api.post(`/group-field/${data.facilityId}`, data);
    return response.data;
  },
  getSport: async () => {
    const response = await api.get('/sport/all');
    return response.data;
  },
  
};

export default api;