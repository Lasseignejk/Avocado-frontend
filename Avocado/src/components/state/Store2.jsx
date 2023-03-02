import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./CustomerSlice";

export const Store2 = configureStore({
	reducer: {
		customer: customerReducer,
	},
});
