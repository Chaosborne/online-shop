import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './slices/cartSlice';
// cartSlice.reducer is imported under cartReducer name

export interface RootState {
  cart: CartState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
