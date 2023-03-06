import React from "react";
import { setRestaurant } from "../reducers/DashboardSlice";

const RestaurantAdminUpdateRestOptions = ({ restaurants }) => {
	return (
		<select name="" id="" onChange={() => dispatch(setRestaurant())}>
			{restaurants?.map((restaurant, index) => (
				<option key={index} value={restaurant.id}>
					{restaurant.RestName}
				</option>
			))}
		</select>
	);
};

export default RestaurantAdminUpdateRestOptions;

{
	/* <select name="" id="" onClick={() => dispatch(setRestaurant(restaurant.id))}>
	<RestaurantAdminUpdateRestOptions restaurants={restaurants} />
</select>; */
}

// {
// 	restaurants.map((restaurant, index) => (
// 		<Link
// 			to="/menuinfo"
// 			state={restaurant}
// 			onClick={() => dispatch(setRestaurant(restaurant.id))}>
// 			<RestaurantAdminCard restaurant={restaurant} key={index} />
// 		</Link>
// 	));
// }
