import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    clearSearch: (state) => {
      state.searchValue = "";
    },
  },
});

export const { setSearchValue, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
