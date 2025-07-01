import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadFavorites } from '../store/slices/favoritesThunk';

export const useFetchFavorites = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.user?.uid);
  const isLoaded = useAppSelector(state => state.favorites.isLoaded);

  useEffect(() => {
    if (userId && !isLoaded) {
      dispatch(loadFavorites())
        .unwrap()
        .catch(err => console.error('Ошибка загрузки:', err));
    }
  }, [userId, isLoaded, dispatch]);
};
