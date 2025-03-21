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

  getFacilityList: async () => {
    const response = await api.get('/facility/all');
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

  updateFacility: async (facilityId: string, data: any) => {
    const response = await api.patch(`/facility/${facilityId}`, data);
    return response.data;
  },

  updateFacilityImage: async (facilityId: string, image: File) => { 
    const response = await api.put(`/facility/${facilityId}/update-images`, image, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // deleteFacilityImage: async (facilityId: string, imageId: string) => {
  //   const response = await api.delete(`/facility/${facilityId}/delete-image/${imageId}`);
  //   return response.data;
  // },
  
};

export default api;