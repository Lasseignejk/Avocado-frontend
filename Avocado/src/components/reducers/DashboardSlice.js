import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOwner: false,
  isCustomer: false,
  tokenID: "",
  userEmail: "",
  userDetails: [{ OwnerFirstName: "", CustomerFirstName: "" }],
  currentMenu: [{ ItemName: "" }],
  currentRestaurant: [{ RestName: "" }],
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
      (state.userDetails = [{ OwnerFirstName: "", CustomerFirstName: "" }]),
        (state.currentMenu = [{ ItemName: "" }]);
      state.currentRestaurant = [{ RestName: "" }];
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
