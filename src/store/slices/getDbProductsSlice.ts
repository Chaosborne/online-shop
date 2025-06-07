import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { IProduct } from '../../constants/interfaces/IProduct';

export interface dbProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: dbProductsState = {
  products: [],
  loading: false,
  error: null,
  loaded: false,
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

    console.log('Загружены товары из Firestore:', products);
    return products;
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

const dbProductsSlice = createSlice({
  name: 'dbProducts',
  initialState,
  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductsFromFirebase.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsFromFirebase.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.loaded = true;
      })
      .addCase(fetchProductsFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
        state.loaded = false;
      });
  },
});

export const { setLoaded } = dbProductsSlice.actions;
export default dbProductsSlice.reducer;
