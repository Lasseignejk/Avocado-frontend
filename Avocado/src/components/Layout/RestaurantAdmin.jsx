import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import RestaurantAdminCard from "./RestaurantAdminCard";
import AdminNavBar from "../partials/AdminNavBar";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";
import { decode } from "base64-arraybuffer";

const RestaurantAdmin = () => {
	//previously Admin Restraunt

	// * expected behavior *
	//links to admin's restaurants for editing

	/*
  To do:
  Pull data from backend and inject to backened to edit
  */

	const [restaurantDetails, setRestaurantDetails] = useState({});
	const [restName, setRestName] = useState("");
	const [restaurants, setRestaurants] = useState([]);
	const [restLogo, setRestLogo] = useState("");

	const userDetails = useSelector(
		(state) => state?.dashboard?.userDetails[0][0]
	);
	const token = useSelector((state) => state.dashboard.token[0]);
	console.log(token.user.id);

	// Get restaurants by owner ID on reload
	useEffect(() => {
		console.log();
		const getRestaurants = async () => {
			const response = await fetch(
				"http://localhost:3060/admin/restaurant/getrestaurants",
				{
					method: "GET",
					headers: {
						userid: userDetails.id,
					},
				}
			);
			console.log(response);
			if (!response.ok) {
				window.alert(response.statusText);
			} else {
				const json = await response.json();
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
			OwnerId: userDetails.id,
			RestLogo: restLogo,
		});
	};
	// sets logo path to state
	const formatLogoPath = (e) => {
		let file = e.target.files[0].name;
		setRestLogo(file);
	};

	const uploadImage = async (e) => {
		try {
			if (!e.target.files || e.target.files.length === 0) {
				throw new Error("You must select an image to upload");
			}
			let file = e.target.files[0];
			console.log(e.target.files[0]);
			const fileEXT = file.name.split(".").pop();
			const fileName = file.name.split(".").shift();
			const filePath = `${fileName}.${fileEXT}`;
			console.log(fileEXT);
			console.log(fileName);
			console.log(filePath);
			// let id = userDetails.id.toString();

			const { data, error } = await supabase.storage
				.from("restaurantlogos")
				.upload("34/" + filePath, file);

			if (error) {
				throw error;
			}
			console.log(data);
		} catch (error) {
			alert(error.message);
		}
	};

	// const sendToSupabase = async (restaurantDetails) => {
	// 	const response = await fetch(
	// 		"http://localhost:3060/admin/restaurant/addrest",
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(restaurantDetails),
	// 		}
	// 	);
	// 	if (response.status == 200) {
	// 		console.log("restaurant added");
	// 		setRestName(restaurantDetails.restName);
	// 	}

	// 	console.log("fetch completed");

	// 	const { data, error } = await supabase.storage
	// 		.from("restaurantlogos")
	// 		.upload("34/1" + restLogo, restLogo);
	// 	if (data) {
	// 		console.log(data);
	// 	}
	// 	if (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<div className="mb-[55px] md:flex md:mb-0">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
				<div className="flex flex-col">
					<h1 className="text-center text-4xl font-bold text-green md:text-left">
						{userDetails.OwnerFirstName}
					</h1>
					<h1 className="text-center text-3xl font-bold md:text-left">
						Manage Restaurants
					</h1>
				</div>

				<div className="flex flex-col md:flex-row md:flex-wrap md:justify-evenly">
					{restaurants.map((restaurant, index) => (
						<Link to="/menuinfo" state={restaurant}>
							<RestaurantAdminCard restaurant={restaurant} key={index} />
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
				<form>
					<div>
						<label htmlFor="logo">Logo</label>
						<input
							type="file"
							id="logo"
							name="RestLogo"
							accept="image/png, image/jpeg"
							onChange={(e) => uploadImage(e)}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RestaurantAdmin;
