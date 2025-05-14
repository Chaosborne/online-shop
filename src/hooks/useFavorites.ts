import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavourite } from '../store/slices/favoritesSlice';
import { toggleFavouriteInFirebase } from '../store/slices/favouritesThunk'; // Импортируем thunk

export const useFavourites = () => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.favourites.items);
  const userId = useAppSelector(state => state.auth.user?.uid); // Добавляем userId

  const isFavourite = (id: number) => favourites.includes(id);

  const toggle = async (id: number) => {
    if (!userId) {
      console.error('Пользователь не авторизован!');
      return;
    }

    // 1. Обновляем локальное состояние
    dispatch(toggleFavourite(id));

    // 2. Синхронизируем с Firebase
    try {
      await dispatch(
        toggleFavouriteInFirebase({
          productId: id,
          isFavourite: !isFavourite(id),
        })
      ).unwrap();
    } catch (error) {
      console.error('Ошибка синхронизации с Firebase:', error);
      // Откатываем локальное состояние при ошибке
      dispatch(toggleFavourite(id));
    }
  };

  return { favourites, isFavourite, toggle };
};
