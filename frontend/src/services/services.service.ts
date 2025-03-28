import api from './api';

// API Endpoints
export const servicesService = {
  createService: async (facilityId: string, data: any) => {
    const response = await api.post(`/service/${facilityId}`, data);
    return response.data;
  },
    
  getService: async (facilityId: string) => {
    const response = await api.get(`/service/${facilityId}`);
    return response.data;
  },
  
  deleteService: async (serviceId: string) => {
    const response = await api.delete(`/service/${serviceId}`);
    return response;
  },

  updateService: async (serviceId: string, data: any) => {
    const response = await api.patch(`/service/${serviceId}`, data);
    return response.data;
  },

  // get service list booking
  getServiceListBooking: async (facilityId: string, sportId: string, startTime: string, endTime: string, date: string) => {
    const response = await api.get(`/service/${facilityId}/availability`, {
      params: {
        sportId,
        startTime,
        endTime,
        date
      }
    });
    return response.data;
  },
  
};

export default api;