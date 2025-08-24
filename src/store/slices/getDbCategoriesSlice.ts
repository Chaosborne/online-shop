import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ICategory } from '../../constants/interfaces/ICategory';

export interface dbCategoriesState {
  categories: ICategory[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: dbCategoriesState = {
  categories: [],
  status: 'idle',
  error: null,
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoriesFromFirebase.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategoriesFromFirebase.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesFromFirebase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch categories';
      });
  },
});

export default dbCategoriesSlice.reducer;
