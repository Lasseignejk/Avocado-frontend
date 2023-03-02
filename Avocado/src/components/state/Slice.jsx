import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { imageData } from "../components/DalleData";

const initialState = {
  open: false,
  cart: [],
  imageData: imageData,
  product: [],
};

export const artSlice = createSlice({
  name: "art",
  initialState,
  reducers: {
    checkProduct: (state, action) => {
      state.product = [];
      state.product.push(action.payload);
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    addCart: (state, action) => {
      //if already exists in cart, add to amount
      const found = state.cart.find((elem) => elem.id === action.payload.id);
      if (found != undefined) {
        found.amount++;
      } else {
        state.cart.push(action.payload);
      }
    },
    clearCart: (state) => {
      //revert to empty
      state.cart = [];
    },
    removeCart: (state, action) => {
      //filter out items from cart
      state.cart = state.cart.filter((elem) => elem.id != action.payload.id);
    },
    removeItem: (state, action) => {
      //if exists in cart, remove from amount
      const found = state.cart.find((elem) => elem.id === action.payload.id);
      if (found != undefined) {
        if (found.amount > 1) {
          found.amount--;
        } else {
          state.cart = state.cart.filter(
            (elem) => elem.id != action.payload.id
          );
        }
      }
    },
  },
});
export const {
  setOpen,
  addCart,
  removeCart,
  removeItem,
  clearCart,
  checkProduct,
} = artSlice.actions;

export default artSlice.reducer;
