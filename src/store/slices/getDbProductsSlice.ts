import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '../../constants/interfaces/IProduct';

// Firestore imports
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase/firebaseConfig';

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

// Firebase request (Also change in firebaseConfig)
export const fetchProductsFromFirebase = createAsyncThunk<IProduct[], void, { rejectValue: string }>('dbProducts/fetchProductsFromFirebase', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://eco-village-d5d6d-default-rtdb.firebaseio.com/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = (await response.json()) as IProduct[];
    return responseData;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

// Firestore request (Also change in firebaseConfig)
// export const fetchProductsFromFirebase = createAsyncThunk<IProduct[], void, { rejectValue: string }>('dbProducts/fetchProductsFromFirebase', async (_, { rejectWithValue }) => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'products'));
//     const products: IProduct[] = [];

//     querySnapshot.forEach(doc => {
//       const data = doc.data();
//       products.push({
//         ...data,
//         id: doc.id,
//       } as IProduct);
//     });

//     return products;
//   } catch (error) {
//     return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
//   }
// });

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

export const { setLoaded } = dbProductsSlice.actions; // Экспорт действия setLoaded
export default dbProductsSlice.reducer;
