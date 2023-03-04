import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedUp: true,
  isLogginIn: false,
  customerLayout: false,
  restaurantLayout: false,
};

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setIsSignedUp: (state, action) => {
      state.isSignedUp = action.payload;
    },
    setIsLogginIn: (state, action) => {
      state.isLogginIn = action.payload;
    },
    setCustomerLayout: (state, action) => {
      state.isLogginIn = action.payload;
    },
    setRestaurantLayout: (state, action) => {
      state.isLogginIn = action.payload;
    },
  },
});

export const {
  setIsSignedUp,
  setIsLogginIn,
  setCustomerLayout,
  setRestaurantLayout,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
