import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export interface Brand {
  id: string;
  brandName: string;
  available: boolean;
}

export interface BrandsState {
  brands: Brand[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BrandsState = {
  brands: [],
  status: 'idle',
  error: null,
};

// Async thunk для получения брендов из Firestore
export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { getState }) => {
    const state = getState() as { brands: BrandsState };
    
    // Если бренды уже загружены, не делаем повторный запрос
    if (state.brands.status === 'succeeded') {
      return state.brands.brands;
    }
    const brandsRef = collection(db, 'brands');
    const snapshot = await getDocs(brandsRef);
    const brands = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Brand[];
    
    return brands;
  }
);

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<Brand[]>) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка загрузки брендов';
      });
  },
});

export default brandsSlice.reducer; 