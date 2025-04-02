import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Facility, FacilityState } from '@/types/facility.type';
import api from '@/services/api';
import { AxiosError } from 'axios';

// Interface for API error responses
interface ApiError {
  message: string;
  statusCode?: number;
}

// Initial state
const initialState: FacilityState = {
  facility: {} as Facility,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchOwnerFacilities = createAsyncThunk(
  'facility/fetchOwnerFacilities',
  async (ownerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/facility/owner/${ownerId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch facilities');
    }
  }
);

export const fetchFacilityById = createAsyncThunk(
  'facility/fetchFacilityById',
  async (facilityId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/facility/${facilityId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch facility details');
    }
  }
);

// Slice
const facilitySlice = createSlice({
  name: 'facility',
  initialState,
  reducers: {
    clearFacility: (state) => {
      state.facility = {} as Facility;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch facility details
      .addCase(fetchFacilityById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFacilityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.facility = action.payload;
      })
      .addCase(fetchFacilityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFacility, clearError } = facilitySlice.actions;
export default facilitySlice.reducer;
