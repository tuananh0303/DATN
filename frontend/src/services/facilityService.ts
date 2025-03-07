import axios from 'axios';

export interface Facility {
  id: string;
  name: string;
  location: string;
  openingHours: string;
  status: 'active' | 'maintenance' | 'pending';
  image: string;
}

export interface FacilityFilter {
  status?: 'active' | 'maintenance' | 'pending';
  search?: string;
  page?: number;
  limit?: number;
}

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const facilityService = {
  getFacilities: async (filters: FacilityFilter) => {
    try {
      const response = await axios.get(`${BASE_URL}/facilities`, { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchFacilities: async (query: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/facilities/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteFacility: async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/facilities/${id}`);
    } catch (error) {
      throw error;
    }
  }
}; 