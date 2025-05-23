import { useAppSelector } from '../store/hooks';

export const useAppReady = () => {
  const products = useAppSelector(state => state.dbProducts);
  const favourites = useAppSelector(state => state.favourites);
  const auth = useAppSelector(state => state.auth);

  if (!auth.user) {
    return true;
  }

  const isProductsReady = products.loaded && !products.loading;
  const isFavouritesReady = favourites.status === 'succeeded';
  const isAuthReady = !auth.isLoading;

  return isProductsReady && isFavouritesReady && isAuthReady;
};
