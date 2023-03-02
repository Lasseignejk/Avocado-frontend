import { configureStore } from "@reduxjs/toolkit";
import ArtSlice from "./ArtSlice";

export const store = configureStore({
  reducer: {
    art: ArtSlice,
  },
});
