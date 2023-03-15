import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../../reducers/DashboardSlice";

const ReportsRestaurantOptions = () => {
	const dispatch = useDispatch();
	const [restaurants, setRestaurants] = useState([]);
	const isOwner = useSelector((state) => state.isOwner);
	const userDetails = useSelector((state) => state.userDetails[0]);
	const currentRestaurant = useSelector((state) => state.currentRestaurant[0]);

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

	useEffect(() => {
		getRestaurants();
	}, []);
	return (
		<select
			name="restName"
			id=""
			onChange={(e) => dispatch(setRestaurant(e.target.value * 1))}
			className="text-3xl bg-gray border-b-2 border-black"
			defaultValue={"Please choose a restaurant"}>
			<option disabled>Please choose a restaurant</option>
			{restaurants?.map((restaurant) => (
				<option name="restName" key={restaurant.id} value={restaurant.id}>
					{restaurant.RestName}
				</option>
			))}
		</select>
	);
};

export default ReportsRestaurantOptions;
