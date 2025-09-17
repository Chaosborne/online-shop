import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { useAddToFavoritesMutation, useRemoveFromFavoritesMutation } from '../store/api/supabaseApi';
export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const userId = useAppSelector(state => state.auth.user?.uid);

  // RTK Query хуки для Supabase
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();

  const isFavorite = (id: number) => favorites.includes(id);

  const toggle = async (id: number) => {
    if (!userId) {
      alert('Пользователь не авторизован!');
      return;
    }

    // Проверяем текущее состояние ПЕРЕД изменением
    const wasFavorite = isFavorite(id);

    // 1. Обновляем локальное состояние
    dispatch(toggleFavorite(id));

    // 2. Синхронизируем с Supabase
                try {
                  if (wasFavorite) {
                    // Удаляем из избранного
                    await removeFromFavorites({ userId, productId: id.toString() }).unwrap();
                  } else {
                    // Добавляем в избранное
                    await addToFavorites({ userId, productId: id.toString() }).unwrap();
                  }
                } catch (error: any) {
                  console.error('Error synchronisation with Supabase:', error);

                  // Проверяем тип ошибки
                  if (error?.status === 409) {
                    // Не откатываем состояние, так как товар уже в избранном в базе данных
                    // Локальное состояние остается правильным
                    return;
                  }

                  // Откатываем локальное состояние при других ошибках
                  dispatch(toggleFavorite(id));
                }
  };

  return { favorites, isFavorite, toggle };
};
