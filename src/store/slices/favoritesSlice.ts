import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFavorites } from './favoritesThunk';
import { clearUser } from './authSlice';

export interface FavoritesState {
  items: number[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isLoaded: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  isLoaded: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        state.items = state.items.filter(id => id !== productId);
      } else {
        state.items.push(productId);
      }
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.items = action.payload;
    },
    clearFavorites: state => {
      state.items = [];
      state.error = null;
    },
    clearFavoritesError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadFavorites.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoaded = true;
        state.error = action.payload as string || 'Ошибка загрузки избранного';
        
        // Если ошибка связана с правами доступа, очищаем избранное
        if (action.payload && typeof action.payload === 'string' && 
            action.payload.includes('Missing or insufficient permissions')) {
          state.items = [];
        }
      })
      .addCase(clearUser, state => {
        state.items = [];
        state.status = 'idle';
        state.isLoaded = false;
        state.error = null;
      });
  },
});

export const { toggleFavorite, setFavorites, clearFavorites, clearFavoritesError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
