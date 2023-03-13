import React from "react";
import placeholder from "/items/restaurant_placeholder.svg";

const CustomerRestaurantCard = ({ restaurant, index }) => {
	return (
		<div className="bg-ltgray  rounded-2xl duration-200 ease-in hover:bg-dkgray font-niveau px-3 flex py-3 sm:w-[350px] md:py-3 md:shadow-md gap-3 hover:-translate-y-1">
			<div className="grid place-items-center">
				<img
					className="w-[70px]"
					src={restaurant.RestLogo ? restaurant.RestLogo : placeholder}
					alt="restaurant image"
				/>{" "}
			</div>
			<div className="w-2/3">
				<h1 className="font-bold">{restaurant.RestName}</h1>
				<h1>{restaurant.RestLocation}</h1>
			</div>
		</div>
	);
};

export default CustomerRestaurantCard;
