import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantAdminCard from "./RestaurantCard";
import AdminNavBar from "../../../partials/AdminNavBar";

import AddRestaurantForm from "./AddRestaurantForm";

const ManageRestaurants = () => {
	const [restName, setRestName] = useState("");
	const [restaurants, setRestaurants] = useState([]);
	const [toggle, setToggle] = useState(true);

	const userDetails = useSelector((state) => state?.userDetails[0]);

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

	// Get restaurants by owner ID on reload
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
							Welcome, {userDetails?.OwnerFirstName}
						</h1>
						<h1 className="text-center text-3xl font-bold lg:text-left">
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
