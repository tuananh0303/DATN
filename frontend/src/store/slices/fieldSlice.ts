import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fieldService } from '@/services/field.service';

// Interfaces
export interface Sport {
  id: number;
  name: string;
}

export interface Field {
  id: number;
  name: string;
  status: 'active' | 'pending' | 'maintenance';
}

export interface FieldGroup {
  id: string;
  name: string;
  dimension: string;
  surface: string;
  basePrice: number;
  peakStartTime: string;
  peakEndTime: string;
  priceIncrease: number;
  sports: Sport[];
  fields: Field[];
}

export interface FieldState {
  fieldGroups: FieldGroup[];
  loading: boolean;
  error: string | null;
  selectedFacilityId: string | null;
}

// Initial state
const initialState: FieldState = {
  fieldGroups: [],
  loading: false,
  error: null,
  selectedFacilityId: null
};

// Thunks
export const fetchFieldGroups = createAsyncThunk(
  'field/fetchFieldGroups',
  async (facilityId: string, { rejectWithValue }) => {
    try {
      const response = await fieldService.getGroupField(facilityId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch field groups');
    }
  }
);

export const createFieldGroup = createAsyncThunk(
  'field/createFieldGroup',
  async ({ facilityId, data }: { facilityId: string, data: any }, { rejectWithValue }) => {
    try {
      const response = await fieldService.createGroupField(facilityId, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create field group');
    }
  }
);

// Slice
const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    setSelectedFacilityId: (state, action: PayloadAction<string>) => {
      state.selectedFacilityId = action.payload;
    },
    resetFieldState: (state) => {
      state.fieldGroups = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFieldGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFieldGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.fieldGroups = action.payload;
      })
      .addCase(fetchFieldGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createFieldGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFieldGroup.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update state with the newly created field group
        // state.fieldGroups.push(action.payload);
      })
      .addCase(createFieldGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setSelectedFacilityId, resetFieldState } = fieldSlice.actions;

export default fieldSlice.reducer;