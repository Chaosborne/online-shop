import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadFavorites } from '../store/slices/favoritesThunk';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { clearUser } from '../store/slices/authSlice';
import { clearFavorites } from '../store/slices/favoritesSlice';

export const useFetchFavorites = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.user?.uid);
  const isLoaded = useAppSelector(state => state.favorites.isLoaded);

  useEffect(() => {
    if (userId && !isLoaded) {
      dispatch(loadFavorites())
        .unwrap()
        .catch(err => {
          console.error('Ошибка загрузки:', err);
          
          // Если ошибка связана с правами доступа, значит пользователь был удален
          if (err && typeof err === 'string' && err.includes('Missing or insufficient permissions')) {
            console.log('Пользователь не имеет прав доступа. Выполняем logout...');
            // Автоматически выходим из системы
            signOut(auth).then(() => {
              dispatch(clearUser());
              dispatch(clearFavorites());
            }).catch(signOutError => {
              console.error('Ошибка при выходе из системы:', signOutError);
            });
          }
        });
    }
  }, [userId, isLoaded, dispatch]);
};
