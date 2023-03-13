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

	const [restName, setRestName] = useState("");
	const [restaurants, setRestaurants] = useState([]);
	const [toggle, setToggle] = useState(true);

	const isCustomer = useSelector((state) => state.isCustomer);
	const userDetails = useSelector((state) => state.userDetails);
	const userEmail = useSelector((state) => state.userEmail);

	useEffect(() => {
		dispatch(setLocation(location.pathname));
	}, [location.pathname]);

	useEffect(() => {
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
				dispatch(setUserDetails(data[0]));
			}
		};
		if (userEmail) {
			fetchUserData();
		}
	}, [userEmail, isCustomer]);

	//data is the user information
	const { OwnerFirstName, id } = userDetails[0];
	console.log(id);

	const getRestaurants = async () => {
		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/getrestaurants",
			{
				method: "GET",
				headers: {
					userid: id,
				},
			}
		);
		console.log(response);

		if (!response.ok) {
			window.alert(response.statusText);
		} else {
			const json = await response.json();
			console.log(json);
			// setRestaurants(json);
		}
	};

	useEffect(() => {
		getRestaurants();
	}, [restName, toggle]);

	return (
		<div className="mb-[55px] lg:flex lg:mb-0">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 lg:w-full lg:pl-16 lg:pr-8 lg:pt-20 lg:flex-row lg:justify-between lg:pb-10">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-3">
						<h1 className="text-center text-4xl font-bold text-green lg:text-left">
							Welcome, {OwnerFirstName}
						</h1>
						<h1 className="text-center text-3xl font-bold lg:text-left">
							Manage Restaurants
						</h1>
					</div>

					<div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-evenly">
						{/* {restaurants?.map((restaurant, index) => (
							<RestaurantAdminCard
								restaurant={restaurant}
								key={index}
								toggle={toggle}
								setToggle={setToggle}
							/>
						))} */}
					</div>
				</div>
				<div>
					<AddRestaurantForm toggle={toggle} setToggle={setToggle} />
				</div>
			</div>
		</div>
	);
};

export default RestaurantDashboard;
