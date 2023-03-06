import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOwner: false,
  isCustomer: false,
  tokenID: "",
  userEmail: "",
  userDetails: [],
  currentMenu: [],
  currentRestaurant: [],
};
console.log("initalstate 12:", initialState);

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCustomerLayout: (state, action) => {
      state.customerLayout = action.payload;
    },
    setRestaurantLayout: (state, action) => {
      state.restaurantLayout = action.payload;
    },
    setOwner: (state, action) => {
      state.isOwner = action.payload;
    },
    setCustomer: (state, action) => {
      state.isCustomer = action.payload;
    },
    setToken: (state, action) => {
      console.log("initalstate 31:", initialState);
      console.log("payload 32", action.payload);
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
    setSignOut: (state, action) => {
      state.isOwner = false;
      state.isCustomer = false;
      state.token = [];
      state.userDetails = [];
      state.currentMenu = [];
      state.currentRestaurant = [];
      localStorage.removeItem("token");
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
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
