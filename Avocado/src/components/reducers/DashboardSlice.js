import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOwner: false,
  isCustomer: false,
  token: [],
  userDetails: [],
  currentMenu: [],
  currentRestaurant: [],
};

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
      state.token = [];
      state.token.push(...[action.payload]);
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
