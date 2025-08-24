import { useAppSelector } from '../store/hooks';

export const useAppReady = () => {
  const categories = useAppSelector(state => state.dbCategories);
  const products = useAppSelector(state => state.dbProducts);
  const favorites = useAppSelector(state => state.favorites);
  const auth = useAppSelector(state => state.auth);
  const brands = useAppSelector(state => state.brands);

  const isAuthReady = !auth.isLoading;

  const isCategoriesReady = categories.status === 'succeeded';
  const isProductsReady = products.status === 'succeeded';
  const isBrandsReady = brands.status === 'succeeded';
  // Для favorites: если пользователь авторизован, ждем загрузки, если нет - считаем готовым
  const isFavoritesReady = auth.user ? favorites.status === 'succeeded' : true;

  return isAuthReady && isCategoriesReady && isProductsReady && isFavoritesReady && isBrandsReady;
};