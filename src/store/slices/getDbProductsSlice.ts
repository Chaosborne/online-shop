import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface IProduct {
  id: string;
  itemCategory: string;
  itemImg: string;
  itemBrand: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemQuantity: number;
  itemTotalPrice: number;
}

export interface dbProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: dbProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Асинхронный thunk для получения данных из Firebase
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

const dbProductsSlice = createSlice({
  name: 'dbProducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsFromFirebase.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsFromFirebase.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export default dbProductsSlice.reducer;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProductsFromFirebase } from './path-to-your-slice';
// import { RootState } from './path-to-your-store';

// const ProductsComponent: React.FC = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state: RootState) => state.dbProducts);

//   useEffect(() => {
//     dispatch(fetchProductsFromFirebase());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {products.map((product) => (
//         <div key={product.id}>
//           <h3>{product.itemName}</h3>
//           <p>{product.itemDescription}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductsComponent;
