import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOwner: false,
  isCustomer: false,
  tokenID: "",
  userEmail: "",
  userDetails: [{ OwnerFirstName: "", CustomerFirstName: "" }],
  currentMenu: [{ ItemName: "" }],
  currentRestaurant: [{ RestName: "" }],
  cartOpen: false,
  cart: [""],
};
console.log("initalstate 12:", initialState);

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setOwner: (state, action) => {
      state.isOwner = action.payload;
    },
    setCustomer: (state, action) => {
      state.isCustomer = action.payload;
    },
    setToken: (state, action) => {
      state.tokenID = action.payload.id;
      state.userEmail = action.payload.email;
    },
    setMenu: (state, action) => {
      state.currentMenu = [];
      state.currentMenu.push(...[action.payload]);
    },
    setRestaurant: (state, action) => {
      state.currentRestaurant = [];
      state.currentRestaurant.push(...[action.payload]);
    },
    setUserDetails: (state, action) => {
      state.userDetails = [];
      state.userDetails.push(...[action.payload]);
    },
    setLogOut: (state, action) => {
      state.isOwner = false;
      state.isCustomer = false;
      state.tokenID = "";
      state.userEmail = "";
      state.userDetails = [{ OwnerFirstName: "", CustomerFirstName: "" }];
      state.currentMenu = [{ ItemName: "" }];
      state.currentRestaurant = [{ RestName: "" }];
    },
    setCartOpen: (state, action) => {
      state.cartOpen = action.payload;
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
  setOwner,
  setCustomer,
  setToken,
  setMenu,
  setRestaurant,
  setUserDetails,
  setLogOut,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
