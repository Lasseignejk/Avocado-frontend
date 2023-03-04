import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  isOwner: false,
  cart: [],
  customerData: [],
  specificItem: [],
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    updateSpecificItem: (state, action) => {
      state.specificItem = [];
      state.specificItem.push(action.payload);
    },
  },
});
export const { updateSpecificItem } = detailsSlice.actions;

export default detailsSlice.reducer;
