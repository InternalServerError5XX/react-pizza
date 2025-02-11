import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) =>
          i.item.id === item.id &&
          i.item.size === item.size &&
          i.item.type === item.type
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ quantity: 1, item });
      }
    },
    deleteFromCart: (state, action) => {
      const { id, size, type } = action.payload;
      const existingItem = state.items.find(
        (i) => i.item.id === id && i.item.size === size && i.item.type === type
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) =>
              i.item.id !== id || i.item.size !== size || i.item.type !== type
          );
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const getCartItemsCount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const getCartTotal = (state) => {
  return state.cart.items.reduce(
    (total, item) => total + item.item.price * item.quantity,
    0
  );
};

export const getItemQuantityById = (state, itemId, size, type) => {
  const item = state.cart.items.find(
    (i) => i.item.id === itemId && i.item.size === size && i.item.type === type
  );
  return item ? item.quantity : 0;
};

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
