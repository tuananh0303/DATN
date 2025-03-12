import api from './api';

// API Endpoints
export const facilityService = {
  createFacility: async (formData: FormData) => {
    const response = await api.post('/facility/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('response', response);
    return response.data;
  },
  getMyFacilities: async () => {
    const response = await api.get('/facility/my-facilities');
    return response.data;
  },
  
  getFacilityById: async (facilityId: string) => {
    const response = await api.get(`/facility/${facilityId}`);
    return response.data;
  },
  
};

export default api;