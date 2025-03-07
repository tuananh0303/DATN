import axios from 'axios';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  bookingId: string;
  service: string;
  rating: number;
  comment: string;
  timestamp: string;
  status: 'pending' | 'replied';
}

export interface Facility {
  id: string;
  name: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  positiveRatePercentage: number;
  negativeReviewsCount: number;
  newReviewsCount: number;
}

export interface ReviewFilter {
  facilityId?: string;
  status?: 'pending' | 'replied' | 'all';
  ratings?: number[];
  playerName?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  page?: number;
  limit?: number;
}

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const reviewService = {
  // Get all facilities for dropdown
  getFacilities: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/facilities/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get review statistics
  getReviewStats: async (facilityId?: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/stats`, {
        params: { facilityId }
      });
      return response.data as ReviewStats;
    } catch (error) {
      throw error;
    }
  },

  // Get reviews with filters
  getReviews: async (filters: ReviewFilter) => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews`, { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reply to a review
  replyToReview: async (reviewId: string, reply: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/reviews/${reviewId}/reply`, { reply });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 