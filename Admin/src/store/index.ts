import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/usersSlice';
import facilitiesReducer from '@/store/slices/facilitiesSlice';
import dashboardReducer from '@/store/slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: usersReducer,
    facility: facilitiesReducer,
    dashboard: dashboardReducer,
  },  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;