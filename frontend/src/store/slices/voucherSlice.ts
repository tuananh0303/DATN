import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { voucherService } from '@/services/voucher.service';

// Interfaces
export interface Voucher {
  id: number;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  voucherType: 'cash' | 'percent';
  value: number;
  minPrice: number;
  maxDiscount: number;
  amount: number;
  remain: number;
  createdAt: string;
  updatedAt: string;
}

export interface VoucherFormData {
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  voucherType: 'cash' | 'percent';
  value: number;
  minPrice: number;
  maxDiscount: number;
  amount: number;
}

export interface VoucherFilter {
  facilityId?: string;
  status?: 'active' | 'upcoming' | 'expired';
}

export interface VoucherState {
  vouchers: Voucher[];
  loading: boolean;
  error: string | null;
  selectedFacilityId: string | null;
}

// Initial state
const initialState: VoucherState = {
  vouchers: [],
  loading: false,
  error: null,
  selectedFacilityId: null
};

// Thunks
export const fetchVouchers = createAsyncThunk(
  'voucher/fetchVouchers',
  async (facilityId: string, { rejectWithValue }) => {
    try {
      const response = await voucherService.getVoucher(facilityId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch vouchers');
    }
  }
);

export const createVoucher = createAsyncThunk(
  'voucher/createVoucher',
  async ({ facilityId, data }: { facilityId: string, data: VoucherFormData }, { rejectWithValue }) => {
    try {
      const response = await voucherService.createVoucher(facilityId, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create voucher');
    }
  }
);

export const updateVoucher = createAsyncThunk(
  'voucher/updateVoucher',
  async ({ voucherId, data }: { voucherId: string, data: VoucherFormData }, { rejectWithValue }) => {
    try {
      const response = await voucherService.updateVoucher(voucherId, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update voucher');
    }
  }
);

export const deleteVoucher = createAsyncThunk(
  'voucher/deleteVoucher',
  async (voucherId: string, { rejectWithValue }) => {
    try {
      const response = await voucherService.deleteVoucher(voucherId);
      return voucherId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete voucher');
    }
  }
);

// Helper function to determine voucher status
export const getVoucherStatus = (startTime: string, endTime: string): 'active' | 'upcoming' | 'expired' => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  if (now < start) {
    return 'upcoming';
  } else if (now > end) {
    return 'expired';
  } else {
    return 'active';
  }
};

// Slice
const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    setSelectedFacilityId: (state, action: PayloadAction<string>) => {
      state.selectedFacilityId = action.payload;
    },
    resetVoucherState: (state) => {
      state.vouchers = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.loading = false;
        state.vouchers = action.payload;
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVoucher.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update state with the newly created voucher
        // state.vouchers = [...state.vouchers, action.payload];
      })
      .addCase(createVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVoucher.fulfilled, (state, action) => {
        state.loading = false;
        // Update the voucher in the state
        const updatedVoucher = action.payload;
        state.vouchers = state.vouchers.map(voucher => 
          voucher.id === updatedVoucher.id ? updatedVoucher : voucher
        );
      })
      .addCase(updateVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted voucher from the state
        const deletedVoucherId = action.payload;
        state.vouchers = state.vouchers.filter(voucher => voucher.id.toString() !== deletedVoucherId);
      })
      .addCase(deleteVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setSelectedFacilityId, resetVoucherState } = voucherSlice.actions;

export default voucherSlice.reducer;