import api from './api';

// API Endpoints
export const voucherService = {
  createVoucher: async (facilityId: string, data: any) => {
    const response = await api.post(`/voucher/${facilityId}`, data);
    return response.data;
  },
    
  getVoucherBooking: async (facilityId: string) => {
    const response = await api.get(`/voucher/${facilityId}/booking`);
    return response.data;
  },

  getVoucherMyFacility: async (facilityId: string) => {
    const response = await api.get(`/voucher/${facilityId}/all`);
    return response.data;
  },
  
  deleteVoucher: async (voucherId: string) => {
    const response = await api.delete(`/voucher/${voucherId}`);
    return response;
  },

  updateVoucher: async (voucherId: string, data: any) => {
    const response = await api.patch(`/voucher/${voucherId}`, data);
    return response.data;
  },

  
};

export default api;