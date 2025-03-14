import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { servicesService } from '@/services/services.service';

// Interfaces
export interface Sport {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  sport: Sport;
}

export interface ServiceFormData {
  name: string;
  price: number;
  description: string;
  amount: number;
  sportId: number;
}

export interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
  selectedFacilityId: string | null;
}

// Initial state
const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
  selectedFacilityId: null
};

// Thunks
export const fetchServices = createAsyncThunk(
  'service/fetchServices',
  async (facilityId: string, { rejectWithValue }) => {
    try {
      const response = await servicesService.getService(facilityId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch services');
    }
  }
);

export const createService = createAsyncThunk(
  'service/createService',
  async ({ facilityId, data }: { facilityId: string, data: { servicesData: ServiceFormData[] } }, { rejectWithValue }) => {
    try {
      const response = await servicesService.createService(facilityId, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create service');
    }
  }
);

export const updateService = createAsyncThunk(
  'service/updateService',
  async ({ serviceId, data }: { serviceId: string, data: ServiceFormData }, { rejectWithValue }) => {
    try {
      const response = await servicesService.updateService(serviceId, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update service');
    }
  }
);

export const deleteService = createAsyncThunk(
  'service/deleteService',
  async (serviceId: string, { rejectWithValue }) => {
    try {
      const response = await servicesService.deleteService(serviceId);
      return serviceId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete service');
    }
  }
);

// Slice
const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setSelectedFacilityId: (state, action: PayloadAction<string>) => {
      state.selectedFacilityId = action.payload;
    },
    resetServiceState: (state) => {
      state.services = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update state with the newly created services
        // state.services = [...state.services, ...action.payload];
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        // Update the service in the state
        const updatedService = action.payload;
        state.services = state.services.map(service => 
          service.id === updatedService.id ? updatedService : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted service from the state
        const deletedServiceId = action.payload;
        state.services = state.services.filter(service => service.id.toString() !== deletedServiceId);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setSelectedFacilityId, resetServiceState } = serviceSlice.actions;

export default serviceSlice.reducer;