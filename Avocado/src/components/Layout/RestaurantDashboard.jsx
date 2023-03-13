import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import AdminNavBar from "../partials/AdminNavBar";
import { useUserData } from "./Queries";
import {
	setOwner,
	setUserDetails,
	setLocation,
} from "../reducers/DashboardSlice";
import AddRestaurantForm from "../pages/Admin/ManageRestaurants/AddRestaurantForm";
import RestaurantAdminCard from "../pages/Admin/ManageRestaurants/RestaurantCard";

const RestaurantDashboard = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const [error, setError] = useState(null);

	const isCustomer = useSelector((state) => state.isCustomer);
	const userEmail = useSelector((state) => state.userEmail);
	const userDetails = useSelector((state) => state?.userDetails[0]);

	useEffect(() => {
		dispatch(setLocation(location.pathname));
	}, [location.pathname]);

	const fetchUserData = async () => {
		const { data, error } = await supabase
			.from(isCustomer ? "Customer" : "Owner")
			.select()
			.eq(isCustomer ? "CustomerEmail" : "OwnerEmail", userEmail);

		if (error) {
			setError(error);
			return;
		}
		if (data) {
			console.log(data[0]);
			dispatch(setUserDetails(data[0]));
		}
	};

	useEffect(() => {
		fetchUserData();
		// getRestaurants();
	}, [userEmail, isCustomer]);

	return (
		<div className="mb-[55px] lg:flex lg:mb-0">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 lg:w-full lg:pl-16 lg:pr-8 lg:pt-20 lg:flex-row lg:justify-between lg:pb-10">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-3">
						<h1 className="text-center text-4xl font-bold text-green lg:text-left">
							Welcome, {userDetails?.OwnerFirstName}
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RestaurantDashboard;
