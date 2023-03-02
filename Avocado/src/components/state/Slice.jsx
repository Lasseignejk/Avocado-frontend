import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { imageData } from "../components/DalleData";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  isOwner: false,
  cart: [],
  CustomerData: [],
  specificItem: [],
};

export const artSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    updateSpecificItem: (state, action) => {
      state.specificItem = [];
      state.specificItem.push(action.payload);
    },
  },
});
export const { updateSpecificItem } = artSlice.actions;

export default artSlice.reducer;
