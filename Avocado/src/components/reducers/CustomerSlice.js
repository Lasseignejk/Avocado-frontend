import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

// export const getCustomer = createAsyncThunk(
// 	"displaycustomer",
// 	async (id = null, { rejectWithValue }) => {
// 		try {
// 			const response = await axios.get("http://localhost:3060/displaycustomer");
// 			return response?.data;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data);
// 		}
// 	}
// );

// const getCustomer = async () => {
// 	const response = await fetch("http://localhost:3060/displaycustomer", {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	const json = await response.json();
// 	console.log(json);
// 	return json;
// };
// console.log(customerData);

export const CustomerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		setCustomer: (state, action) => {
			return (state = action.payload);
		},
	},
});

export const { setCustomer } = CustomerSlice.actions;

export default CustomerSlice.reducer;
