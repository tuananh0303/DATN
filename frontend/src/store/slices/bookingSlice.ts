import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bookingService } from '@/services/booking.service';
import { fieldService } from '@/services/field.service';
import { servicesService } from '@/services/services.service';
import { facilityService } from '@/services/facility.service';
import dayjs from 'dayjs';

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
  peakStartTime?: string;
  peakEndTime?: string;
  priceIncrease?: number;
  fields: Field[];
  sports: Sport[];
}

export interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  remain?: number;
  sport: Sport;
}

export interface BookingService {
  serviceId: number;
  quantity: number;
  name?: string;
  price?: number;
}

export interface Voucher {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  voucherType: string;
  discount: number;
  minPrice: number;
  maxDiscount: number;
  amount: number;
  remain: number;
  facility: any;
}

export interface Booking {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  fieldPrice: number;
  field?: {
    id: number;
    name: string;
    status: string;
    fieldGroup: {
      id: string;
      name: string;
      dimension: string;
      surface: string;
      basePrice: number;
      peakStartTime: string;
      peakEndTime: string;
      priceIncrease: number;
      facility: {
        id: string;
        name: string;
        description: string;
        openTime: string;
        closeTime: string;
        location: string;
        status: string;
        avgRating: number;
        quantityRating: number;
        imagesUrl: string[];
      }
    }
  };
  player?: any;
  sport?: Sport;
  paymentType?: string;
  status?: string;
  servicePrice?: number;
  discountAmount?: number;
  services?: BookingService[];
  bookingServices?: {
    bookingId: string;
    serviceId: number;
    quantity: number;
  }[];
  voucher?: Voucher;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  location: string;
  status: string;
  avgRating: number;
  quantityRating: number;
  imagesUrl: string[];
  sports: Sport[];
}

export interface BookingState {
  // Form data
  sportId: number | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  fieldId: number | null;
  fieldGroupId: string | null;
  services: BookingService[];
  paymentMethod: string;
  voucherId: number | null;
  
  // API data
  sports: Sport[];
  availableFieldGroups: FieldGroup[];
  availableServices: Service[];
  booking: Booking | null;
  facility: Facility | null;
  
  // Payment data
  paymentUrl: string | null;
  paymentStatus: 'pending' | 'success' | 'failed' | null;
  
  // UI states
  currentStep: number;
  loading: boolean;
  error: string | null;
  timeRemaining: number; // in seconds
  bookingExpired: boolean;
  
  // Facility info
  facilityId: string | null;
}

const initialState: BookingState = {
  // Form data
  sportId: null,
  date: null,
  startTime: null,
  endTime: null,
  fieldId: null,
  fieldGroupId: null,
  services: [],
  paymentMethod: 'banking',
  voucherId: null,
  
  // API data
  sports: [],
  availableFieldGroups: [],
  availableServices: [],
  booking: null,
  facility: null,
  
  // Payment data
  paymentUrl: null,
  paymentStatus: null,
  
  // UI states
  currentStep: 0,
  loading: false,
  error: null,
  timeRemaining: 300, // 5 minutes in seconds
  bookingExpired: false,
  
  // Facility info
  facilityId: null
};

// Thunks
export const fetchFacilityById = createAsyncThunk(
  'booking/fetchFacilityById',
  async (facilityId: string, { rejectWithValue }) => {
    try {
      const response = await facilityService.getFacilityById(facilityId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch facility');
    }
  }
);

export const fetchAvailableFieldGroups = createAsyncThunk(
  'booking/fetchAvailableFieldGroups',
  async (
    { facilityId, sportId, startTime, endTime, date }: 
    { facilityId: string; sportId: number; startTime: string; endTime: string; date: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fieldService.getGroupFieldListBooking(
        facilityId,
        sportId.toString(),
        startTime,
        endTime,
        date
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch available field groups');
    }
  }
);

export const fetchAvailableServices = createAsyncThunk(
  'booking/fetchAvailableServices',
  async (
    { facilityId, sportId, startTime, endTime, date }: 
    { facilityId: string; sportId: number; startTime: string; endTime: string; date: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await servicesService.getServiceListBooking(
        facilityId,
        sportId.toString(),
        startTime,
        endTime,
        date
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch available services');
    }
  }
);

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (
    { startTime, endTime, date, fieldId, sportId }: 
    { startTime: string; endTime: string; date: string; fieldId: number; sportId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await bookingService.createBooking({
        startTime,
        endTime,
        date,
        fieldId,
        sportId
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

export const updateBookingField = createAsyncThunk(
  'booking/updateBookingField',
  async (
    { bookingId, fieldId }: 
    { bookingId: string; fieldId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await bookingService.updateBookingField(bookingId, { fieldId });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update booking field');
    }
  }
);

export const updateBookingService = createAsyncThunk(
  'booking/updateBookingService',
  async (
    { bookingId, services }: 
    { bookingId: string; services: BookingService[] },
    { rejectWithValue }
  ) => {
    try {
      // Transform services to match the API format
      const bookingServicesData = services.map(service => ({
        serviceId: service.serviceId,
        amount: service.quantity
      }));
      
      const response = await bookingService.updateBookingService(bookingId, {
        bookingServicesData
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update booking services');
    }
  }
);

export const updateBookingPayment = createAsyncThunk(
  'booking/updateBookingPayment',
  async (
    { bookingId, paymentType, voucherId }: 
    { bookingId: string; paymentType: string; voucherId?: number },
    { rejectWithValue }
  ) => {
    try {
      // Đảm bảo bookingId không bị undefined
      if (!bookingId) {
        return rejectWithValue('Booking ID không được để trống');
      }

      const data: any = { paymentType: paymentType || 'online'};
      if (voucherId) {
        data.voucherId = voucherId;
      } 
      console.log('Sending payment data:', data);
      
      const response = await bookingService.updateBookingPayment(bookingId, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update booking payment');
    }
  }
);

export const getBookingVnPayStatus = createAsyncThunk(
  'booking/getBookingVnPayStatus',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await bookingService.getBookingVnPay(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get VNPay status');
    }
  }
);

// Slice
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setFacilityId: (state, action: PayloadAction<string>) => {
      state.facilityId = action.payload;
    },
    setSportId: (state, action: PayloadAction<number>) => {
      state.sportId = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<{ startTime: string; endTime: string }>) => {
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },
    setFieldGroupId: (state, action: PayloadAction<string>) => {
      state.fieldGroupId = action.payload;
    },
    setFieldId: (state, action: PayloadAction<number>) => {
      state.fieldId = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setVoucherId: (state, action: PayloadAction<number | null>) => {
      state.voucherId = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setPaymentStatus: (state, action: PayloadAction<'pending' | 'success' | 'failed' | null>) => {
      state.paymentStatus = action.payload;
    },
    updateService: (state, action: PayloadAction<{ serviceId: number; quantity: number }>) => {
      const { serviceId, quantity } = action.payload;
      const existingServiceIndex = state.services.findIndex(s => s.serviceId === serviceId);
      
      if (quantity === 0 && existingServiceIndex !== -1) {
        // Remove service if quantity is 0
        state.services.splice(existingServiceIndex, 1);
      } else if (existingServiceIndex !== -1) {
        // Update quantity if service already exists
        state.services[existingServiceIndex].quantity = quantity;
      } else if (quantity > 0) {
        // Add new service
        const service = state.availableServices.find(s => s.id === serviceId);
        if (service) {
          state.services.push({
            serviceId: service.id,
            quantity,
            name: service.name,
            price: service.price
          });
        }
      }
    },
    decrementTimeRemaining: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      } else {
        state.bookingExpired = true;
      }
    },
    resetTimer: (state) => {
      state.timeRemaining = 300; // Reset to 5 minutes
      state.bookingExpired = false;
    },
    resetBooking: (state) => {
      return {
        ...initialState,
        facilityId: state.facilityId, // Keep the facility ID
        facility: state.facility // Keep the facility data
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Facility
      .addCase(fetchFacilityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilityById.fulfilled, (state, action) => {
        state.loading = false;
        state.facility = action.payload;
        state.sports = action.payload.sports || [];
      })
      .addCase(fetchFacilityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Available Field Groups
      .addCase(fetchAvailableFieldGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableFieldGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.availableFieldGroups = action.payload;
      })
      .addCase(fetchAvailableFieldGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Available Services
      .addCase(fetchAvailableServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableServices.fulfilled, (state, action) => {
        state.loading = false;
        state.availableServices = action.payload;
      })
      .addCase(fetchAvailableServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Booking Field
      .addCase(updateBookingField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingField.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(updateBookingField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Booking Service
      .addCase(updateBookingService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingService.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(updateBookingService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Booking Payment
      .addCase(updateBookingPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload.booking;
        state.paymentUrl = action.payload.paymentUrl || null;
      })
      .addCase(updateBookingPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get VNPay Status
      .addCase(getBookingVnPayStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingVnPayStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload.success ? 'success' : 'failed';
        if (action.payload.booking) {
          state.booking = action.payload.booking;
        }
      })
      .addCase(getBookingVnPayStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.paymentStatus = 'failed';
      });
  }
});

export const {
  setFacilityId,
  setSportId,
  setDate,
  setTimeRange,
  setFieldGroupId,
  setFieldId,
  setPaymentMethod,
  setVoucherId,
  setCurrentStep,
  setPaymentStatus,
  updateService,
  decrementTimeRemaining,
  resetTimer,
  resetBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;