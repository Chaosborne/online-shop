import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { IProduct } from '../../constants/interfaces/IProduct';

export interface dbProductsState {
  products: IProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: dbProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

// Новый запрос к Firestore
export const fetchProductsFromFirebase = createAsyncThunk<IProduct[], void, { rejectValue: string }>('dbProducts/fetchProductsFromFirebase', async (_, { rejectWithValue }) => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);

    if (snapshot.empty) {
      console.log('В Firestore нет товаров');
      return [];
    }

    const products = snapshot.docs.map(doc => ({
      id: doc.id, // Добавляем ID документа
      ...doc.data(),
    })) as IProduct[];

    return products;
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

const dbProductsSlice = createSlice({
  name: 'dbProducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsFromFirebase.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsFromFirebase.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsFromFirebase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export default dbProductsSlice.reducer;
