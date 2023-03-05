import React, { useEffect } from "react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import RestaurantCard from "../partials/RestaurantCard";
import AdminNavBar from "../partials/AdminNavBar";
import { Link } from "react-router-dom";

const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MzEyNzAsImV4cCI6MTk5MzIwNzI3MH0.k8hjRQLV9bN_BcG11s_gWJx2NK_AHIXrJPTii7GO4LM";
const supabase = createClient(supabaseUrl, supabaseKey);

const AdminRestaurant = () => {
	const [restaurantDetails, setRestaurantDetails] = useState({});
	const [restName, setRestName] = useState("");
	const [restaurants, setRestaurants] = useState([]);
	const [restLogo, setRestLogo] = useState("");
	const [restToEdit, setRestToEdit] = useState();

	// Get restaurants by owner ID on reload
	useEffect(() => {
		const getRestaurants = async () => {
			const response = await fetch(
				"http://localhost:3060/admin/restaurant/getrestaurants",
				{
					method: "GET",
				}
			);
			console.log(response);
			if (!response.ok) {
				window.alert(response.statusText);
			} else {
				const json = await response.json();
				console.log(json);
				setRestaurants(json);
			}
		};
		getRestaurants();
	}, [restName]);

	// Add a Restaurant
	const setFormState = (e) => {
		setRestaurantDetails({
			...restaurantDetails,
			[e.target.name]: e.target.value,
			OwnerId: 1,
			RestLogo: restLogo,
		});
	};

	const formatLogoPath = (e) => {
		let file = e.target.files[0].name;
		setRestLogo(file);
	};

	// const uploadImage = async (e) => {
	// 	let file = e.target.files[0].name;
	// 	console.log(file);
	// 	const { data, error } = await supabase.storage
	// 		.from("restaurant-restlogo")
	// 		.upload(8 + "/" + file, file);
	// 	if (data) {
	// 		console.log(data);
	// 	} else {
	// 		console.log(error);
	// 	}
	// };

	const sendToSupabase = async (restaurantDetails) => {
		const response = await fetch(
			"http://localhost:3060/admin/restaurant/addrest",
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

		console.log("fetch completed");

		// const { data, error } = await supabase.storage
		// 	.from("restaurant-restlogo")
		// 	.upload(8 + "/" + file, file);
	};

	return (
		<div className="mb-[55px] md:flex md:mb-0">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
				<div className="flex flex-col">
					<h1 className="text-center text-4xl font-bold text-green md:text-left">
						admin name
					</h1>
					<h1 className="text-center text-3xl font-bold md:text-left">
						Manage Restaurants
					</h1>
				</div>

				<div className="flex flex-col md:flex-row md:flex-wrap md:justify-evenly">
					{restaurants.map((restaurant, index) => (
						<Link to="/menuinfo" state={restaurant}>
							<RestaurantCard restaurant={restaurant} key={index} />
						</Link>
					))}
				</div>
				<div className="flex justify-center">
					<form className="px-3 flex flex-col gap-2 mb-3 items-center md:mb-5">
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
						<div className="flex flex-col">
							<label htmlFor="logo" className="font-bold">
								logo
							</label>
							<input
								type="file"
								id="logo"
								name="RestLogo"
								accept=".png, .jpeg"
								onChange={(e) => formatLogoPath(e)}
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
				{/* <form action="">
					<div>
						<label htmlFor="logo">Logo</label>
						<input
							type="file"
							id="logo"
							name="RestLogo"
							accept=".png, .jpeg"
							onChange={(e) => uploadImage(e)}
						/>
					</div>
				</form> */}
			</div>
		</div>
	);
};

export default AdminRestaurant;
