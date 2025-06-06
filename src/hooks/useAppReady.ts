import { useAppSelector } from '../store/hooks';

export const useAppReady = () => {
  const categories = useAppSelector(state => state.dbCategories);
  const products = useAppSelector(state => state.dbProducts);
  const favourites = useAppSelector(state => state.favourites);
  const auth = useAppSelector(state => state.auth);

  if (!auth.user) {
    return true;
  }

  const isCategoriesReady = categories.loaded && !categories.loading;
  const isProductsReady = products.loaded && !products.loading;
  const isFavouritesReady = favourites.status === 'succeeded';
  const isAuthReady = !auth.isLoading;

  return isCategoriesReady && isProductsReady && isFavouritesReady && isAuthReady;
};
