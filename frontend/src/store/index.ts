import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import facilityReducer from './slices/facilitySlice';
import fieldReducer from './slices/fieldSlice';
import serviceReducer from './slices/serviceSlice';
import voucherReducer from './slices/voucherSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    facility: facilityReducer,    
    field: fieldReducer,
    service: serviceReducer,
    voucher: voucherReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;