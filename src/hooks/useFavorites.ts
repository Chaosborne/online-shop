import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { toggleFavoriteInFirebase } from '../store/slices/favoritesThunk';
export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const userId = useAppSelector(state => state.auth.user?.uid);

  const isFavorite = (id: number) => favorites.includes(id);

  const toggle = async (id: number) => {
    if (!userId) {
      alert('Пользователь не авторизован!');
      return;
    }

    // 1. Обновляем локальное состояние
    dispatch(toggleFavorite(id));

    // 2. Синхронизируем с Firebase
    try {
      await dispatch(
        toggleFavoriteInFirebase({
          productId: id,
          isFavorite: !isFavorite(id),
        })
      ).unwrap();
    } catch (error) {
      console.error('Error synchronisation with Firebase:', error);
      // Откатываем локальное состояние при ошибке
      dispatch(toggleFavorite(id));
    }
  };

  return { favorites, isFavorite, toggle };
};
