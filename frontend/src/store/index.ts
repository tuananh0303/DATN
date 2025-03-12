import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import facilityReducer from './slices/facilitySlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    facility: facilityReducer,    
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;