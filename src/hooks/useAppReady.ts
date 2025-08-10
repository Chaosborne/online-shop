import { useAppSelector } from '../store/hooks';

export const useAppReady = () => {
  const categories = useAppSelector(state => state.dbCategories);
  const products = useAppSelector(state => state.dbProducts);
  const favorites = useAppSelector(state => state.favorites);
  const auth = useAppSelector(state => state.auth);

  const isAuthReady = !auth.isLoading;

  const isCategoriesReady = categories.loaded && !categories.loading;
  const isProductsReady = products.loaded && !products.loading;
  
  // Для favorites: если пользователь авторизован, ждем загрузки, если нет - считаем готовым
  const isFavoritesReady = auth.user ? favorites.status === 'succeeded' : true;

  return isAuthReady && isCategoriesReady && isProductsReady && isFavoritesReady;
};
