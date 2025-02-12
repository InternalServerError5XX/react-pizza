import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: "",
  userId: "",
  role: "",
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.userId = jwtDecode(action.payload).nameid;
      state.role = jwtDecode(action.payload).role;
    },
    logout: (state) => {
      state.token = "";
      state.userId = "";
      state.role = "";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setToken, logout, setError } = authSlice.actions;
export default authSlice.reducer;
