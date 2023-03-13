import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOwner: false,
  isCustomer: false,
  isGuest: false,
  tokenID: "",
  userEmail: "",
  userDetails: [{ OwnerFirstName: "", CustomerFirstName: "" }],
  currentMenu: [{ ItemName: "" }],
  currentRestaurant: [{ RestName: "" }],
  cartOpen: false,
  cart: [],
  location: "/",
  currentRestId: "",
  barGraph: false,
  pieGraph: false,
  tableGraph: false,
  lineGraph: false,
  currentReportingRestaurant: "",
};

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
    setGuest: (state, action) => {
      state.isGuest = action.payload;
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
        found.Amount++;
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
        if (found.Amount > 1) {
          found.Amount--;
        } else {
          state.cart = state.cart.filter(
            (elem) => elem.id != action.payload.id
          );
        }
      }
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCurrentRestId: (state, action) => {
      state.currentRestId = action.payload;
    },
    setBarGraph: (state, action) => {
      state.barGraph = action.payload;
    },
    setLineGraph: (state, action) => {
      state.lineGraph = action.payload;
    },
    setTableGraph: (state, action) => {
      state.tableGraph = action.payload;
    },
    setPieGraph: (state, action) => {
      state.pieGraph = action.payload;
    },
    setCurrentReportingRestaurant: (state, action) => {
      state.currentReportingRestaurant = action.payload;
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
  setLocation,
  setGuest,
  setCartOpen,
  addCart,
  clearCart,
  removeItem,
  removeCart,
  setCurrentRestId,
  setBarGraph,
  setLineGraph,
  setTableGraph,
  setPieGraph,
  setCurrentReportingRestaurant,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
