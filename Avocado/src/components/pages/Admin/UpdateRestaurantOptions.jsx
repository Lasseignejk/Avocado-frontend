import React from "react";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../../reducers/DashboardSlice";

const UpdateRestaurantOptions = ({ restaurants }) => {
	const dispatch = useDispatch();
	return (
		<select
			className="px-2 mt-5"
			name="restNames"
			id=""
			onChange={(e) => dispatch(setRestaurant(e.target.value * 1))}>
			<option selected disabled>
				Please choose a restaurant to edit
			</option>
			{restaurants?.map((restaurant, index) => (
				<option name="restNames" key={index} value={restaurant.id}>
					{restaurant.RestName}
				</option>
			))}
		</select>
	);
};

export default UpdateRestaurantOptions;

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
