import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import fieldGroupReducer from './slices/fieldSlice';
import serviceReducer from './slices/serviceSlice';
import voucherReducer from './slices/voucherSlice';
import eventReducer from './slices/eventSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,  
    fieldGroup: fieldGroupReducer,
    service: serviceReducer,
    voucher: voucherReducer,
    event: eventReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;