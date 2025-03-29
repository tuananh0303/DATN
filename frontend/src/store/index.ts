import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import fieldGroupReducer from './slices/fieldSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,  
    fieldGroup: fieldGroupReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;