import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPizzaOpen: false,
  pizzaToUpdate: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCreatePizzaOpen: (state, action) => {
      state.createPizzaOpen = action.payload;
    },
    setPizzaToUpdate: (state, action) => {
      state.pizzaToUpdate = action.payload;
    },
    clearPizzaToUpdate: (state) => {
      state.pizzaToUpdate = {};
    },
  },
});

export const { setCreatePizzaOpen, setPizzaToUpdate, clearPizzaToUpdate } =
  modalSlice.actions;
export default modalSlice.reducer;
