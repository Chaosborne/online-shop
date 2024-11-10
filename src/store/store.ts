import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './slices/cartSlice';
// cartSlice.reducer is imported under cartReducer name
import searchReducer, { SearchState } from './slices/searchSlice';

export interface RootState {
  cart: CartState;
  search: SearchState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
