import AdminNavBar from "../partials/AdminNavBar";
import { useUserData } from "./Queries";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { setOwner, setUserDetails } from "../reducers/DashboardSlice";
import { supabase } from "../../supabase";

const RestaurantDashboard = ({ children }) => {
	const dispatch = useDispatch();

	// * expected behavior *
	//Holds NavBar and other partials/components wanted

	/*
  Todo:
  */

	//hook to query customer/Owner tables, query in Queries
	const { data, error } = useUserData();
	//data is the user information
	const userDetails = useSelector((state) => state?.userDetails[0][0]);

	return (
		<div className="mb-[55px] md:flex md:mb-0">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
				<div className="flex flex-col gap-3">
					<h1 className="text-center text-4xl font-bold text-green md:text-left">
						Welcome, {userDetails?.OwnerFirstName}
					</h1>
					<h1 className="text-center text-3xl font-bold md:text-left">
						Admin Dashboard
					</h1>
				</div>
			</div>
		</div>
	);
};

export default RestaurantDashboard;
