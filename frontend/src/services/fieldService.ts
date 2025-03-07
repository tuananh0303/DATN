import axios from 'axios';

export interface Field {
  id: string;
  name: string;
  price: string;
  sportType: string;
  status: 'active' | 'pending' | 'maintenance';
}

export interface Facility {
  id: string;
  name: string;
}

export interface FieldFilter {
  facilityId?: string;
  status?: 'active' | 'pending' | 'maintenance';
  search?: string;
  page?: number;
  limit?: number;
}

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const fieldService = {
  // Get all facilities for dropdown
  getFacilities: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/facilities/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get fields with filters
  getFields: async (filters: FieldFilter) => {
    try {
      const response = await axios.get(`${BASE_URL}/fields`, { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new field
  createField: async (fieldData: Partial<Field>) => {
    try {
      const response = await axios.post(`${BASE_URL}/fields`, fieldData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update field
  updateField: async (id: string, fieldData: Partial<Field>) => {
    try {
      const response = await axios.put(`${BASE_URL}/fields/${id}`, fieldData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete field
  deleteField: async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/fields/${id}`);
    } catch (error) {
      throw error;
    }
  }
}; 