import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddRestaurantForm = ({ toggle, setToggle }) => {
	const [restaurantDetails, setRestaurantDetails] = useState({});
	const userDetails = useSelector((state) => state?.userDetails[0]);
	const [restLogo, setRestLogo] = useState("");
	const [restName, setRestName] = useState("");

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
			setRestName(restaurantDetails.restName);
			setToggle(!toggle);
		}
		setRestaurantDetails({ OwnerId: userDetails.id });
	};

	return (
		<div className="flex justify-center">
			<form className="bg-ltgray rounded-xl font-bold font-niveau flex flex-col gap-3 mb-3 p-5 shadow-lg items-center w-full sm:w-[300px] md:mb-5">
				<h1 className="text-2xl font-bold text-center">Add a Restuarant</h1>
				<div className="flex flex-col w-full">
					<label htmlFor="name" className="text-lg tracking-wide">
						Restaurant Name
					</label>
					<input
						className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
						type="text"
						id="name"
						name="RestName"
						placeholder="'McDonalds #123'"
						value={restaurantDetails.RestName ? restaurantDetails.RestName : ""}
						onChange={(e) => setFormState(e)}
					/>
				</div>
				<div className="flex flex-col w-full">
					<label htmlFor="phone" className="text-lg tracking-wide">
						Phone Number
					</label>
					<input
						className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
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
					<label htmlFor="location" className="text-lg tracking-wide">
						Address
					</label>
					<input
						className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
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
					<label htmlFor="hours" className="text-lg tracking-wide">
						Hours
					</label>
					<input
						className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
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

				<div className="flex justify-center mt-3">
					<button
						className="bg-green text-gray text-lg px-5 py-1 duration-200 font-bold hover:bg-dkgreen rounded-full tracking-widest"
						type="button"
						onClick={() => sendToSupabase(restaurantDetails)}>
						SUBMIT
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddRestaurantForm;
