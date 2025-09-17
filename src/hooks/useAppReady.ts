import { useAppSelector } from '../store/hooks';

export const useAppReady = () => {
  const favorites = useAppSelector(state => state.favorites);
  const auth = useAppSelector(state => state.auth);

  const isAuthReady = !auth.isLoading;
  // Для favorites: если пользователь авторизован, ждем загрузки, если нет - считаем готовым
  const isFavoritesReady = auth.user ? favorites.status === 'succeeded' : true;

  return isAuthReady && isFavoritesReady;
};