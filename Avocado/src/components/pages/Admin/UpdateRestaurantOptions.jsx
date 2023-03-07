import React from "react";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../../reducers/DashboardSlice";

const UpdateRestaurantOptions = ({ restaurants, openInfoDiv }) => {
	const dispatch = useDispatch();
	return (
		<select
			className=" mt-5 w-[250px] h-[30px]"
			name="restNames"
			defaultValue={"Please choose a restaurant to edit"}
			id=""
			onClick={() => openInfoDiv()}
			onChange={(e) => dispatch(setRestaurant(e.target.value * 1))}>
			<option disabled className="">
				Please choose a restaurant to edit
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
