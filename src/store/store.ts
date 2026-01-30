import { configureStore } from '@reduxjs/toolkit';
import purchaseReducer from './slices/purchaseSlice';
import achievementsReducer from './slices/achievementsSlice';

export const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
    achievements: achievementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
