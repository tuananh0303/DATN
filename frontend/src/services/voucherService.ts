import axios from 'axios';

export interface Voucher {
  id: string;
  name: string;
  discountType: 'percentage' | 'fixed';
  discountValue: string;
  totalCodes: number;
  usedCodes: number;
  status: 'active' | 'upcoming' | 'expired';
  timeRange: string;
  minOrder: string;
  maxDiscount: string;
}

export interface Facility {
  id: string;
  name: string;
}

export interface VoucherFilter {
  facilityId?: string;
  status?: 'active' | 'upcoming' | 'expired' | 'all';
  search?: string;
  page?: number;
  limit?: number;
}

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const voucherService = {
  // Get all facilities for dropdown
  getFacilities: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/facilities/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get vouchers with filters
  getVouchers: async (filters: VoucherFilter) => {
    try {
      const response = await axios.get(`${BASE_URL}/vouchers`, { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new voucher
  createVoucher: async (voucherData: Partial<Voucher>) => {
    try {
      const response = await axios.post(`${BASE_URL}/vouchers`, voucherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update voucher
  updateVoucher: async (id: string, voucherData: Partial<Voucher>) => {
    try {
      const response = await axios.put(`${BASE_URL}/vouchers/${id}`, voucherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete voucher
  deleteVoucher: async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/vouchers/${id}`);
    } catch (error) {
      throw error;
    }
  }
}; 