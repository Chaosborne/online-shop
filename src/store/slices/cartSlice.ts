import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductWithRelations } from '../../constants/interfaces/ISupabaseProduct';

export interface CartItem {
  id: string;
  categories: { name: string };
  item_images: string[];
  brands: { brand_name: string };
  item_name: string;
  item_description: string | null;
  item_price: number;
  item_quantity: number;
  item_total_price: number;
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
    addItemToCart(state, action: PayloadAction<IProductWithRelations>) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.item_quantity++;
        existingItem.item_total_price += newItem.item_price;
      } else {
        state.items.push({
          ...newItem,
          item_total_price: newItem.item_price * newItem.item_quantity, // Устанавливаем правильную общую цену с самого начала
        });
      }
      state.totalQuantity++;
      state.totalPrice += newItem.item_price;
    },
    decrementItemInCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (existingItem.item_quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.item_quantity--;
          existingItem.item_total_price -= existingItem.item_price;
        }
        state.totalQuantity--;
        state.totalPrice -= existingItem.item_price;
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity -= existingItem.item_quantity;
        state.totalPrice -= existingItem.item_total_price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, decrementItemInCart, removeItemFromCart, clearCart } = cartSlice.actions;

export const getItemQuantity = (state: CartState, itemId: string) => {
  const item = state.items.find(item => item.id === itemId);
  return item ? item.item_quantity : 0;
};

export default cartSlice.reducer;
