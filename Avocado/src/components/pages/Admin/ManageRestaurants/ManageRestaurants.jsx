import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantAdminCard from "./RestaurantCard";
import AdminNavBar from "../../../partials/AdminNavBar";
import { Link } from "react-router-dom";
import { supabase } from "../../../../supabase";
import "../ManageRestaurants/ManageRestaurants.css";

import { setRestaurant } from "../../../reducers/DashboardSlice";
import AddRestaurantForm from "./AddRestaurantForm";

const ManageRestaurants = () => {
	const dispatch = useDispatch();
	const [restaurantDetails, setRestaurantDetails] = useState({});
	const [restName, setRestName] = useState("");
	const [restaurants, setRestaurants] = useState([]);
	const [restLogo, setRestLogo] = useState("");
	const [toggle, setToggle] = useState(true);

	const userDetails = useSelector((state) => state?.userDetails[0]);

	// Get restaurants by owner ID on reload
	useEffect(() => {
		console.log();
		const getRestaurants = async () => {
			const response = await fetch(
				import.meta.env.VITE_BACKEND + "/admin/restaurant/getrestaurants",
				{
					method: "GET",
					headers: {
						userid: userDetails.id,
					},
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
	}, [restName, toggle]);

	return (
		<div className="mb-[55px] md:flex md:mb-0">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20 md:flex-row md:justify-between">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-3">
						<h1 className="text-center text-4xl font-bold text-green md:text-left">
							Welcome, {userDetails?.OwnerFirstName}
						</h1>
						<h1 className="text-center text-3xl font-bold md:text-left">
							Manage Restaurants
						</h1>
					</div>

					<div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-evenly">
						{restaurants?.map((restaurant, index) => (
							<RestaurantAdminCard
								restaurant={restaurant}
								key={index}
								toggle={toggle}
								setToggle={setToggle}
							/>
						))}
					</div>
				</div>
				<div>
					<AddRestaurantForm toggle={toggle} setToggle={setToggle} />
				</div>
			</div>
		</div>
	);
};

export default ManageRestaurants;
