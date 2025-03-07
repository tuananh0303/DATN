import axios from 'axios';

export interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  timeRange: string;
  status: 'Đang diễn ra' | 'Sắp diễn ra' | 'Đã kết thúc';
}

export interface Facility {
  id: string;
  name: string;
}

export interface EventFilter {
  facilityId?: string;
  status?: 'Đang diễn ra' | 'Sắp diễn ra' | 'Đã kết thúc' | 'all';
  search?: string;
  page?: number;
  limit?: number;
}

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const eventService = {
  // Get all facilities for dropdown
  getFacilities: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/facilities/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get events with filters
  getEvents: async (filters: EventFilter) => {
    try {
      const response = await axios.get(`${BASE_URL}/events`, { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new event
  createEvent: async (eventData: Partial<Event>) => {
    try {
      const response = await axios.post(`${BASE_URL}/events`, eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update event
  updateEvent: async (id: string, eventData: Partial<Event>) => {
    try {
      const response = await axios.put(`${BASE_URL}/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete event
  deleteEvent: async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/events/${id}`);
    } catch (error) {
      throw error;
    }
  }
}; 