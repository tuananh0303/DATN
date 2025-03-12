import api from './api';

// API Endpoints
export const fieldService = {
  createGroupField: async (facilityId: string, data: any) => {
    const response = await api.put(`/field-group/${facilityId}`, data);
    return response.data;
  },

  getGroupField: async (facilityId: string) => {
    const response = await api.get(`/field-group/${facilityId}`);
    return response.data;
  },

  getSport: async () => {
    const response = await api.get('/sport/all');
    return response.data;
  },

  createField: async (fieldGroupId: string, data: any) => {
    const response = await api.post(`/field/${fieldGroupId}`, data);
    return response.data;
  },

  getField: async (fieldGroupId: string) => {
    const response = await api.get(`/field/${fieldGroupId}`);
    return response.data;
  },
  
};

export default api;