import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';
import cartReducer, { CartState } from './slices/cartSlice';
import searchReducer, { SearchState } from './slices/searchSlice';

export interface RootState {
  cart: CartState;
  search: SearchState;
  [userApi.reducerPath]: ReturnType<typeof userApi.reducer>;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
