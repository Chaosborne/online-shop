import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadFavourites } from '../store/slices/favouritesThunk';

export const useFetchFavourites = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.user?.uid);
  const status = useAppSelector(state => state.favourites.status);

  useEffect(() => {
    if (userId && status === 'idle') {
      dispatch(loadFavourites())
        .unwrap()
        .catch(err => console.error('Ошибка загрузки:', err));
    }
  }, [userId, status, dispatch]);
};
