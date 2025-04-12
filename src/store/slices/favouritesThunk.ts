import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ref, set, remove } from 'firebase/database';
import { rtdb } from '../../firebase/firebaseConfig';

export const toggleFavouriteInFirebase = createAsyncThunk<
  number, // возвращаем ID продукта
  { productId: number; isFavourite: boolean },
  { state: RootState; rejectValue: string }
>('favourites/toggleFavouriteInFirebase', async ({ productId, isFavourite }, { getState, rejectWithValue }) => {
  try {
    const userId = getState().auth.user?.uid;
    if (!userId) {
      throw new Error('Пользователь не авторизован');
    }

    const favRef = ref(rtdb, `favourites/${userId}/${productId}`);

    if (isFavourite) {
      await set(favRef, true);
    } else {
      await remove(favRef);
    }

    return productId;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
  }
});
