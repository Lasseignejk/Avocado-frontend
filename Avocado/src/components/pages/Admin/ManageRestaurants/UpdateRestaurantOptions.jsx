import React from "react";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../../../reducers/DashboardSlice";

const UpdateRestaurantOptions = ({ restaurants, openInfoDiv }) => {
	const dispatch = useDispatch();
	return (
		<select
			className=" mt-5 w-[255px] h-[30px] border-2 text-xl"
			name="restNames"
			defaultValue={"Please choose a restaurant"}
			id=""
			onClick={() => openInfoDiv()}
			onChange={(e) => dispatch(setRestaurant(e.target.value * 1))}>
			<option disabled className="">
				Please choose a restaurant
			</option>
			{restaurants?.map((restaurant, index) => (
				<option name="restNames" className="" key={index} value={restaurant.id}>
					{restaurant.RestName}
				</option>
			))}
		</select>
	);
};

export default UpdateRestaurantOptions;
