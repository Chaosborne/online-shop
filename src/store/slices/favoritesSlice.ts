import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFavourites } from './favouritesThunk';
import { clearUser } from './authSlice';

export interface FavouritesState {
  items: number[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: FavouritesState = {
  items: [],
  status: 'idle',
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<number>) => {
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
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadFavourites.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadFavourites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadFavourites.rejected, state => {
        state.status = 'failed';
      })
      .addCase(clearUser, state => {
        state.items = [];
        state.status = 'idle';
      });
  },
});

export const { toggleFavourite, setFavorites, clearFavorites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
