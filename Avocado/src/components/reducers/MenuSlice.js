import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setMenu } = CustomerSlice.actions;

export default MenuSlice.reducer;
