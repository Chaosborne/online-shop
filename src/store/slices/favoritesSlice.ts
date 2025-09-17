import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      state.isLoaded = true;
      state.status = 'succeeded';
      state.error = null;
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
