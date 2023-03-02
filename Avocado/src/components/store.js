import { configureStore } from "@reduxjs/toolkit";
import menu from "./reducers/MenuSlice";

export const store = configureStore({
  reducer: {
    menu: menu,
  },
});
