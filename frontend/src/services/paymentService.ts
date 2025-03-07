import axios from 'axios';

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface Facility {
  id: string;
  name: string;
}

export interface PaymentStats {
  totalRevenue: number;
  totalTransactions: number;
  pendingAmount: number;
  pendingTransactions: number;
  weeklyRevenue: {
    amount: number;
    transactions: number;
  };
  monthlyRevenue: {
    amount: number;
    transactions: number;
  };
}

export interface PaymentFilter {
  facilityId?: string;
  status?: 'pending' | 'completed' | 'failed' | 'refunded' | 'all';
  playerName?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  page?: number;
  limit?: number;
}

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const paymentService = {
  // Get all facilities for dropdown
  getFacilities: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/facilities/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get payment statistics
  getPaymentStats: async (facilityId?: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/payments/stats`, {
        params: { facilityId }
      });
      return response.data as PaymentStats;
    } catch (error) {
      throw error;
    }
  },

  // Get payments with filters
  getPayments: async (filters: PaymentFilter) => {
    try {
      const response = await axios.get(`${BASE_URL}/payments`, { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update payment status
  updatePaymentStatus: async (paymentId: string, status: Payment['status']) => {
    try {
      const response = await axios.put(`${BASE_URL}/payments/${paymentId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Export payment report
  exportPaymentReport: async (filters: PaymentFilter) => {
    try {
      const response = await axios.get(`${BASE_URL}/payments/export`, {
        params: filters,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 