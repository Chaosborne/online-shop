import { useAppSelector } from '../store/hooks';

export const useAppReady = () => {
  const categories = useAppSelector(state => state.dbCategories);
  const products = useAppSelector(state => state.dbProducts);
  const favorites = useAppSelector(state => state.favorites);
  const auth = useAppSelector(state => state.auth);

  if (!auth.user) {
    return true;
  }

  const isCategoriesReady = categories.loaded && !categories.loading;
  const isProductsReady = products.loaded && !products.loading;
  const isFavoritesReady = favorites.status === 'succeeded';
  const isAuthReady = !auth.isLoading;

  return isCategoriesReady && isProductsReady && isFavoritesReady && isAuthReady;
};
