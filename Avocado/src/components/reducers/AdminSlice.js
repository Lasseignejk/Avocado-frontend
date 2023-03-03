import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const AdminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setAdmin: (state, action) => {
			console.log(action.payload);
			state.push(...[action.payload]);
		},
	},
});

export const { setAdmin } = AdminSlice.actions;

export default AdminSlice.reducer;
