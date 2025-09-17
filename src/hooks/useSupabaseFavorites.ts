import { useAppSelector } from '../store/hooks';
import { 
  useGetFavoritesQuery, 
  useAddToFavoritesMutation, 
  useRemoveFromFavoritesMutation 
} from '../store/api/supabaseApi';

export const useSupabaseFavorites = () => {
  const user = useAppSelector(state => state.auth.user);
  const userId = user?.uid;

  // Получаем избранное из Supabase
  const { 
    data: favorites = [], 
    isLoading, 
    error 
  } = useGetFavoritesQuery(userId || '', {
    skip: !userId, // Пропускаем запрос, если пользователь не авторизован
  });

  // Мутации для добавления/удаления
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();

  const isFavorite = (id: number) => favorites.includes(id);

  const toggle = async (id: number) => {
    if (!userId) {
      alert('Пользователь не авторизован!');
      return;
    }

    const productId = id.toString();
    
    try {
      if (isFavorite(id)) {
        await removeFromFavorites({ userId, productId }).unwrap();
      } else {
        await addToFavorites({ userId, productId }).unwrap();
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      alert('Ошибка при обновлении избранного');
    }
  };

  return { 
    favorites, 
    isFavorite, 
    toggle, 
    isLoading, 
    error: error ? 'Ошибка загрузки избранного' : null 
  };
};
