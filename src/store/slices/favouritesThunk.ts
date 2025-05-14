import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ref, get, set, remove } from 'firebase/database';
import { rtdb } from '../../firebase/firebaseConfig';

interface FirebaseFavourites {
  [key: string]: boolean; // Формат: "0": true, "1": false и т.д.
}

export const loadFavourites = createAsyncThunk<number[], void, { state: RootState }>('favourites/load', async (_, { getState, rejectWithValue }) => {
  console.log('Загрузка инициирована из:', new Error().stack?.split('\n')[2]);
  const state = getState();
  const userId = state.auth.user?.uid;

  if (!userId) {
    console.log('Пользователь не авторизован, избранное не будет загружено');
    return [];
  }

  try {
    const favRef = ref(rtdb, `favourites/${userId}`);
    const snapshot = await get(favRef);

    if (!snapshot.exists()) {
      console.log('У пользователя нет избранных товаров');
      return [];
    }

    const favouritesData = snapshot.val() as FirebaseFavourites;
    // Преобразуем ключи в числа и фильтруем только true значения
    const favourites = Object.entries(favouritesData)
      .filter(([, isFavourite]) => isFavourite === true)
      .map(([productId]) => Number(productId))
      .filter(id => !isNaN(id)); // Фильтруем только валидные числа

    return favourites;
  } catch (error) {
    console.error('Ошибка загрузки избранного:', error);
    return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
  }
});

export const toggleFavouriteInFirebase = createAsyncThunk<number, { productId: number; isFavourite: boolean }, { state: RootState; rejectValue: string }>('favourites/toggle', async ({ productId, isFavourite }, { getState, rejectWithValue }) => {
  const state = getState();
  const userId = state.auth.user?.uid;

  if (!userId) {
    return rejectWithValue('Пользователь не авторизован');
  }

  try {
    const favRef = ref(rtdb, `favourites/${userId}/${productId}`);
    console.log('[Favourites Thunk] Отправка запроса в Firebase...');

    if (isFavourite) {
      await set(favRef, true);
      console.log(`Товар ${productId} добавлен в избранное`);
    } else {
      await remove(favRef);
      console.log(`Товар ${productId} удален из избранного`);
    }

    return productId;
  } catch (error) {
    console.error('Ошибка обновления избранного:', error);
    return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
  }
});
