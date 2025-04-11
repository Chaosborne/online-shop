import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './slices/cartSlice';
import searchReducer, { SearchState } from './slices/searchSlice';
import dbProductsReducer, { dbProductsState } from './slices/getDbProductsSlice';
import favouritesReducer, { favouritesState } from './slices/favoritesSlice';

export interface RootState {
  cart: CartState;
  search: SearchState;
  dbProducts: dbProductsState;
  favourites: favouritesState;
  // Сюда мы собираем в единый кусок все state от наших слайсов
  // Когда мы будем вызывать хук useAppSelector в const favorites = useAppSelector(state => state.favorites.items);, хук уже будет знать про RootState и подтянет его автоматически чтобы типизировать useAppSelector (себя). Поэтому, там мы не будем явно типизировать и прописывать

  // useSelector((state: RootState) => ...) — если ты используешь чистый useSelector из react-redux
  // useAppSelector(...) — если ты создал обёртку с типами (что ты и сделал), и это даже лучше и удобнее
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    dbProducts: dbProductsReducer,
    favourites: favouritesReducer,
    // Здесь favorites — это имя ключа в state, которое мы выбрали сами
    // favoritesReducer — это редьюсер, экспортированный из favoritesSlice. Имя мы ему тоже придумали сами. А принимает он экспортированный favouritesSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
