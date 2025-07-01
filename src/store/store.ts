import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './slices/cartSlice';
import searchReducer, { SearchState } from './slices/searchSlice';
import dbProductsReducer, { dbProductsState } from './slices/getDbProductsSlice';
import dbCategoriesReducer, { dbCategoriesState } from './slices/getDbCategoriesSlice';
import favoritesReducer, { FavoritesState } from './slices/favoritesSlice';
import authReducer, { AuthState } from './slices/authSlice';

export interface RootState {
  cart: CartState;
  search: SearchState;
  dbProducts: dbProductsState;
  dbCategories: dbCategoriesState;
  favorites: FavoritesState;
  auth: AuthState;
  // Сюда мы собираем в единый кусок все state от наших слайсов
  // Когда мы будем вызывать хук useAppSelector в const favorites = useAppSelector(state => state.favorites.items);, хук уже будет знать про RootState и подтянет его автоматически чтобы типизировать useAppSelector (себя). Поэтому, там мы не будем явно типизировать и прописывать

  // useSelector((state: RootState) => ...) — если используем чистый useSelector из react-redux
  // useAppSelector(...) — если используем обёртку с типами
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    dbProducts: dbProductsReducer,
    dbCategories: dbCategoriesReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    // Здесь favorites — это имя ключа в state, которое мы выбрали сами
    // favoritesReducer — это редьюсер, экспортированный из favoritesSlice. Имя мы ему тоже придумали сами. А принимает он экспортированный favoritesSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
