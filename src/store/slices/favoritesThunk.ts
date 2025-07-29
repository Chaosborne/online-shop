import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';

export const loadFavorites = createAsyncThunk<number[], void, { state: RootState }>('s/load', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const userId = state.auth.user?.uid;

  if (!userId) {
    console.log('User is not authorized, favorites will not be loaded');
    return [];
  }

  try {
    const itemsRef = collection(db, 'favorites', userId, 'items');
    const snapshot = await getDocs(itemsRef);

    const favorites = snapshot.docs.map(doc => Number(doc.id)).filter(id => !isNaN(id));

    return favorites;
  } catch (error) {
    console.error('Favorites load error:', error);
    
    if (error instanceof FirebaseError) {
      if (error.code === 'permission-denied' || error.message.includes('Missing or insufficient permissions')) {
        return rejectWithValue('Missing or insufficient permissions');
      }
      return rejectWithValue(`Firebase error: ${error.message}`);
    }
    
    return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
  }
});

export const toggleFavoriteInFirebase = createAsyncThunk<number, { productId: number; isFavorite: boolean }, { state: RootState; rejectValue: string }>('favorites/toggle', async ({ productId, isFavorite }, { getState, rejectWithValue }) => {
  const state = getState();
  const userId = state.auth.user?.uid;

  if (!userId) {
    return rejectWithValue('User is not authorized');
  }

  try {
    const favRef = doc(db, 'favorites', userId, 'items', productId.toString());

    if (isFavorite) {
      await setDoc(favRef, { value: true });
      console.log(`Product ${productId} added to favorites`);
    } else {
      await deleteDoc(favRef);
      console.log(`Product ${productId} removed from favorites`);
    }

    return productId;
  } catch (error) {
    console.error('Error updating favorites:', error);
    
    // Обработка ошибок Firebase
    if (error instanceof FirebaseError) {
      if (error.code === 'permission-denied' || error.message.includes('Missing or insufficient permissions')) {
        return rejectWithValue('Missing or insufficient permissions');
      }
      return rejectWithValue(`Firebase error: ${error.message}`);
    }
    
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});
