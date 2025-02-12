import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../redux/slices/searchSlice";
import filterReducer from "../redux/slices/filterSlice";
import paginationReducer from "../redux/slices/paginationSlice";
import modalReducer from "./slices/modalSlice";
import cartReducer from "./slices/cartSlise";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    pagination: paginationReducer,
    modal: modalReducer,
    cart: cartReducer,
    auth: authSlice,
  },
});
