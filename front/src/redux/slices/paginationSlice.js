import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 1,
  pageSize: 4,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
  },
});

export const { setPagination } = paginationSlice.actions;
export default paginationSlice.reducer;
