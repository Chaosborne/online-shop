import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  itemCategory: string;
  itemImg: string;
  itemBrand: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemQuantity: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // reducers goes to cartSlice.reducer
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.itemQuantity++;
        existingItem.totalPrice += newItem.itemPrice;
      } else {
        state.items.push({
          id: newItem.id,
          itemCategory: newItem.itemCategory,
          itemImg: newItem.itemImg,
          itemBrand: newItem.itemBrand,
          itemName: newItem.itemName,
          itemDescription: newItem.itemDescription,
          itemPrice: newItem.itemPrice,
          itemQuantity: newItem.itemQuantity,
          totalPrice: newItem.totalPrice,
        });
      }
      state.totalQuantity++;
      state.totalPrice += newItem.itemPrice;
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (existingItem.itemQuantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.itemQuantity--;
          existingItem.totalPrice -= existingItem.itemPrice;
        }
        state.totalQuantity--;
        state.totalPrice -= existingItem.itemPrice;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
