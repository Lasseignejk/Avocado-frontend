import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./CustomerSlice";
import adminReducer from "./AdminSlice";

export const store = configureStore({
	reducer: {
		customer: customerReducer,
		admin: adminReducer,
	},
});
