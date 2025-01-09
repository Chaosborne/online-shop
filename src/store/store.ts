import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './slices/cartSlice';
import searchReducer, { SearchState } from './slices/searchSlice';
import dbProductsReducer, { dbProductsState } from './slices/getDbProductsSlice';

export interface RootState {
  cart: CartState;
  search: SearchState;
  dbProducts: dbProductsState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    dbProducts: dbProductsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
