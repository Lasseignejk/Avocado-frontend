import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { useUserData } from "./Queries";
import {
	setCustomer,
	setUserDetails,
	setLocation,
	setGuest,
	setRestaurant,
} from "../reducers/DashboardSlice";
import CustomerRestaurantCard from "./CustomerRestaurantCard";
import CustomerNavBar from "../partials/CustomerNavBar";

const CustomerDashboard = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const [error, setError] = useState(null);
	const [restaurants, setRestaurants] = useState();

	const isCustomer = useSelector((state) => state.isCustomer);
	const userDetails = useSelector((state) => state.userDetails);
	const userEmail = useSelector((state) => state.userEmail);
	const isGuest = useSelector((state) => state.isGuest);
	const dashboardCart = useSelector((state) => state.cart);

	useEffect(() => {
		const getRestaurants = async () => {
			const response = await fetch(
				import.meta.env.VITE_BACKEND + "/admin/restaurant/displayrest",
				{
					method: "GET",
				}
			);

			if (!response.ok) {
				window.alert(response.statusText);
			} else {
				const json = await response.json();
				setRestaurants(json);
			}
		};
		getRestaurants();
	}, [isGuest]);

	useEffect(() => {
		dispatch(setLocation(location.pathname));
	}, [location.pathname, isGuest]);

	//logic to check for owner/customer if logged in
	let firstName;

	if (!isGuest) {
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
		}, [userEmail, isCustomer, isGuest]);

		//data is the user information
		const { CustomerFirstName } = userDetails[0];
		firstName = CustomerFirstName;
	} else {
		firstName = "Guest";
	}
	return (
		<>
			<CustomerNavBar />
			<div className="mb-[55px] md:flex md:mb-0">
				<div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
					<div className="flex flex-col gap-3">
						<h1 className="text-center text-4xl font-bold text-green md:text-left">
							Welcome, {firstName}
						</h1>
						<h1 className="text-center text-3xl font-bold md:text-left">
							Browse Restaurants
						</h1>
						<div className="flex flex-wrap gap-3 lg:mb-10 justify-center">
							{restaurants?.map((restaurant, index) => (
								<Link
									to="/menu"
									state={restaurant}
									className="w-full sm:w-[350px]"
									onClick={() => dispatch(setRestaurant(restaurant))}>
									<CustomerRestaurantCard restaurant={restaurant} key={index} />
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CustomerDashboard;
