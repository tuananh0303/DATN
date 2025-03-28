import api from './api';

// API Endpoints
export const bookingService = {
  createBooking: async (data: any) => {
    const response = await api.post(`/booking`, data);
    return response.data;
  },
      
  deleteBooking: async (bookingId: string) => {
    const response = await api.delete(`/booking/${bookingId}`);
    return response;
  },

  updateBookingField: async (bookingId: string, data: any) => {
    const response = await api.put(`/booking/${bookingId}/field`, data);
    return response.data;
  },

  updateBookingService: async (bookingId: string, data: any) => {
    const response = await api.put(`/booking/${bookingId}/service`, data);
    return response.data;
  },

  updateBookingPayment: async (bookingId: string, data: any) => {
    if (!bookingId) {
      throw new Error('Booking ID is required');
    }
    
    console.log('API call with bookingId:', bookingId, 'and data:', data);
    
    const response = await api.put(`/booking/${bookingId}/payment`, data);
    return response.data;
  },

  getBookingVnPay: async (params: any) => {
    const response = await api.get(`/booking/vnpay-ipn`, { params });
    return response.data;
  },

//   getBookingById: async (bookingId: string) => {
//     const response = await api.get(`/booking/${bookingId}`);
//     return response.data;
//   },
  
//   updateBookingPayment: async (bookingId: string, data: any) => {
//     const response = await api.patch(`/booking/${bookingId}/payment`, data);
//     return response.data;
//   },
  
//   confirmBooking: async (bookingId: string) => {
//     const response = await api.post(`/booking/${bookingId}/confirm`);
//     return response.data;
//   }
 
  
};

export default api;