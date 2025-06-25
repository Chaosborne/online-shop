import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  itemCategory: string;
  images: string[];
  itemBrand: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemQuantity: number;
  itemTotalPrice: number;
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
        existingItem.itemTotalPrice += newItem.itemPrice;
      } else {
        state.items.push({
          ...newItem,
          itemTotalPrice: newItem.itemPrice * newItem.itemQuantity, // Устанавливаем правильную общую цену с самого начала
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
          existingItem.itemTotalPrice -= existingItem.itemPrice;
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

export const getItemQuantity = (state: CartState, itemId: string) => {
  const item = state.items.find(item => item.id === itemId);
  return item ? item.itemQuantity : 0;
};

export default cartSlice.reducer;
