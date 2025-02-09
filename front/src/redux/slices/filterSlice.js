import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  sortBy: "popularity",
  isAsc: true,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.isAsc = action.payload.isAsc;
    },
  },
});

export const { setCategory, setSort, setPagination } = filterSlice.actions;
export default filterSlice.reducer;
