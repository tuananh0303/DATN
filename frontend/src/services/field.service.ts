import api from './api';

// API Endpoints
export const fieldService = {

  // Field Group Api

  createGroupField: async (facilityId: string, data: any) => {
    const response = await api.put(`/field-group/${facilityId}`, data);
    return response.data;
  },

  getGroupField: async (facilityId: string) => {
    const response = await api.get(`/field-group/${facilityId}`);
    return response.data;
  },

  updateGroupField: async (fieldGroupId: string, data: any) => {
    const response = await api.patch(`/field-group/${fieldGroupId}`, data);
    return response.data;
  },

  deleteGroupField: async (fieldGroupId: string) => {
    const response = await api.delete(`/field-group/${fieldGroupId}`);
    return response.data;
  },

  // get field group list booking
  getGroupFieldListBooking: async (facilityId: string, sportId: string, startTime: string, endTime: string, date: string) => {
    const response = await api.get(`/field-group/${facilityId}/availability-field`, {
      params: {
        sportId,
        startTime,
        endTime,
        date
      }
    });
    return response.data;
  },


  // Field Api
  createField: async (fieldGroupId: string, data: any) => {
    const response = await api.post(`/field/${fieldGroupId}`, data);
    return response.data;
  },

  getField: async (fieldGroupId: string) => {
    const response = await api.get(`/field/${fieldGroupId}`);
    return response.data;
  },

  // Sport api
  getSport: async () => {
    const response = await api.get('/sport/all');
    return response.data;
  },
  
};

export default api;