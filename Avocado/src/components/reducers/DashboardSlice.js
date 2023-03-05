import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSignedUp: true,
	isLogginIn: false,
	customerLayout: false,
	restaurantLayout: false,
	isOwner: false,
	isCustomer: false,
	userDetails: [],
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
		setUserDetails: (state, action) => {
			state.userDetails = [];
			state.userDetails.push(...[action.payload]);
		},
	},
});

export const {
	setIsSignedUp,
	setIsLogginIn,
	setCustomerLayout,
	setRestaurantLayout,
	setOwner,
	setCustomer,
	setUserDetails,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
