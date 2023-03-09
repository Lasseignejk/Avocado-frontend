import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantAdminCard from "./RestaurantCard";
import AdminNavBar from "../../partials/AdminNavBar";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabase";
import "../Admin/ManageRestaurants.css";

import { setRestaurant } from "../../reducers/DashboardSlice";
import UpdateRestaurant from "./UpdateRestaurant";

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

	// Add a Restaurant
	const setFormState = (e) => {
		setRestaurantDetails({
			...restaurantDetails,
			[e.target.name]: e.target.value,
			OwnerId: userDetails.id,
			RestLogo: restLogo,
		});
	};

	const sendToSupabase = async (restaurantDetails) => {
		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/addrest",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(restaurantDetails),
			}
		);
		if (response.status == 200) {
			console.log("restaurant added");
			setRestName(restaurantDetails.restName);
		}
		setRestaurantDetails({ OwnerId: userDetails.id });
	};

	return (
		<div className="mb-[55px] md:flex md:mb-0">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
				<div className="flex flex-col gap-3">
					<h1 className="text-center text-4xl font-bold text-green md:text-left">
						Welcome, {userDetails?.OwnerFirstName}
					</h1>
					<h1 className="text-center text-3xl font-bold md:text-left">
						Manage Restaurants
					</h1>
				</div>
				{restaurants.length > 0 && (
					<div className="flex justify-center">
						<UpdateRestaurant
							restaurants={restaurants}
							toggle={toggle}
							setToggle={setToggle}
						/>
					</div>
				)}

				<div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-evenly">
					{restaurants.map((restaurant, index) => (
						<div className="md:pr-3 md:flex duration-200 ease-in md:hover:-translate-y-1  md:hover:bg-blue md:shadow-md">
							<div className="duration-200 ease-in flex-col gap-2  md:flex-row">
								<Link
									to="/menuinfo"
									state={restaurant}
									onClick={() => dispatch(setRestaurant(restaurant.id))}>
									<RestaurantAdminCard restaurant={restaurant} key={index} />
								</Link>
							</div>
							{/* <div className="flex justify-evenly md:items-center md:flex-col md:w-[60px]">
								<button
									className="hover:bg-green duration-200 ease-in px-3 py-2 rounded-full md:w-[60px] md:flex md:justify-center"
									onClick={() => openModal()}>
									<img src="../../items/settings.svg" className="w-[30px]" />
								</button>
								<button className="hover:bg-[#b8241a] duration-200 ease-in px-3 py-2 rounded-full md:w-[60px] md:flex md:justify-center">
									<img src="../../items/delete.svg" className="w-[30px]" />
								</button>
							</div> */}
						</div>
					))}
				</div>

				<div className="flex justify-center">
					<form className="px-3 flex flex-col gap-3 mb-3 items-center w-full md:w-1/2 md:mb-5">
						<h1 className="text-2xl font-bold text-center">Add a Restuarant</h1>
						<div className="flex flex-col w-full">
							<label htmlFor="name" className="font-bold">
								restaurant name
							</label>
							<input
								className="pl-3"
								type="text"
								id="name"
								name="RestName"
								placeholder="'McDonalds #123'"
								value={
									restaurantDetails.RestName ? restaurantDetails.RestName : ""
								}
								onChange={(e) => setFormState(e)}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="phone" className="font-bold">
								phone number
							</label>
							<input
								className="pl-3"
								placeholder="(123) 123-1234"
								type="text"
								id="phone"
								name="RestPhoneNumber"
								value={
									restaurantDetails.RestPhoneNumber
										? restaurantDetails.RestPhoneNumber
										: ""
								}
								onChange={(e) => setFormState(e)}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="location" className="font-bold">
								address
							</label>
							<input
								className="pl-3"
								placeholder="123 street, city, state, zip code"
								type="text"
								id="location"
								name="RestLocation"
								value={
									restaurantDetails.RestLocation
										? restaurantDetails.RestLocation
										: ""
								}
								onChange={(e) => setFormState(e)}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="hours" className="font-bold">
								hours
							</label>
							<input
								className="pl-3"
								placeholder="M-F, 11-8, closed weekends"
								type="text"
								id="hours"
								name="RestHours"
								value={
									restaurantDetails.RestHours ? restaurantDetails.RestHours : ""
								}
								onChange={(e) => setFormState(e)}
							/>
						</div>

						<div className="flex justify-center">
							<button
								className="bg-green text-gray text-lg px-5 py-1 duration-200 font-bold hover:bg-dkgreen"
								type="button"
								onClick={() => sendToSupabase(restaurantDetails)}>
								Add my restaurant
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ManageRestaurants;
