import axios from 'axios';

export interface Service {
  id: string;
  name: string;
  type: 'time' | 'product';
  price: string;
  time: string;
  sport: string;
  status: 'Còn' | 'Hết';
}

export interface Facility {
  id: string;
  name: string;
}

export interface ServiceFilter {
  facilityId?: string;
  type?: 'time' | 'product' | 'all';
  search?: string;
  page?: number;
  limit?: number;
}

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const serviceService = {
  // Get all facilities for dropdown
  getFacilities: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/facilities/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get services with filters
  getServices: async (filters: ServiceFilter) => {
    try {
      const response = await axios.get(`${BASE_URL}/services`, { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new service
  createService: async (serviceData: Partial<Service>) => {
    try {
      const response = await axios.post(`${BASE_URL}/services`, serviceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update service
  updateService: async (id: string, serviceData: Partial<Service>) => {
    try {
      const response = await axios.put(`${BASE_URL}/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete service
  deleteService: async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/services/${id}`);
    } catch (error) {
      throw error;
    }
  }
}; 