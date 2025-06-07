import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ICategory } from '../../constants/interfaces/ICategory';

export interface dbCategoriesState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: dbCategoriesState = {
  categories: [],
  loading: false,
  error: null,
  loaded: false,
};

// Новый запрос к Firestore
export const fetchCategoriesFromFirebase = createAsyncThunk<ICategory[], void, { rejectValue: string }>('dbCategories/fetchCategoriesFromFirebase', async (_, { rejectWithValue }) => {
  try {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);

    if (snapshot.empty) {
      return [];
    }

    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ICategory[];

    return categories;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

const dbCategoriesSlice = createSlice({
  name: 'dbCategories',
  initialState,
  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategoriesFromFirebase.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesFromFirebase.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.loading = false;
        state.categories = action.payload;
        state.loaded = true;
      })
      .addCase(fetchCategoriesFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch categories';
        state.loaded = false;
      });
  },
});

export const { setLoaded } = dbCategoriesSlice.actions;
export default dbCategoriesSlice.reducer;
