import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export const loadFavourites = createAsyncThunk<number[], void, { state: RootState }>('favourites/load', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const userId = state.auth.user?.uid;

  if (!userId) {
    console.log('Пользователь не авторизован, избранное не будет загружено');
    return [];
  }

  try {
    const itemsRef = collection(db, 'favourites', userId, 'items');
    const snapshot = await getDocs(itemsRef);

    if (snapshot.empty) {
      console.log('У пользователя нет избранных товаров');
      return [];
    }

    const favourites = snapshot.docs.map(doc => Number(doc.id)).filter(id => !isNaN(id));

    console.log('Загружены избранные товары:', favourites);
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
    const favRef = doc(db, 'favourites', userId, 'items', productId.toString());
    console.log('Обновление избранного. Путь:', favRef.path);

    if (isFavourite) {
      await setDoc(favRef, { value: true });
      console.log(`Товар ${productId} добавлен в избранное`);
    } else {
      await deleteDoc(favRef);
      console.log(`Товар ${productId} удален из избранного`);
    }

    return productId;
  } catch (error) {
    console.error('Ошибка обновления избранного:', error);
    return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
  }
});
