import React from "react";
import { useState } from "react";

const AdminRestaurant = () => {
	const [restaurantDetails, setRestaurantDetails] = useState({});

	const setFormState = (e) => {
		setRestaurantDetails({
			...restaurantDetails,
			[e.target.name]: e.target.value,
		});
	};

	const sendToSupabase = async (restaurantDetails) => {
		await fetch("http://localhost:3060/addrest", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(restaurantDetails),
		});
		console.log(restaurantDetails);
	};

	return (
		<div>
			<form action="">
				<h1>Add a restuarant</h1>
				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="RestName"
						value={restaurantDetails.RestName ? restaurantDetails.RestName : ""}
						onChange={(e) => setFormState(e)}
					/>
				</div>
				<div>
					<label htmlFor="location">Address</label>
					<input
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
				<div>
					<label htmlFor="phone">Phone Number</label>
					<input
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
				<div>
					<label htmlFor="hours">Hours</label>
					<input
						type="text"
						id="hours"
						name="RestHours"
						value={
							restaurantDetails.RestHours ? restaurantDetails.RestHours : ""
						}
						onChange={(e) => setFormState(e)}
					/>
				</div>
				<div>
					<label htmlFor="logo">Logo</label>
					<input
						type="file"
						id="logo"
						name="RestLogo"
						value={restaurantDetails.RestLogo ? restaurantDetails.RestLogo : ""}
						onChange={(e) => setFormState(e)}
					/>
				</div>
				<div>
					<button
						type="button"
						onClick={() => sendToSupabase(restaurantDetails)}>
						SUBMIT
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminRestaurant;
