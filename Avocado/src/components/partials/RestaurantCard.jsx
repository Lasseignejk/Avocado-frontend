import React from "react";

const RestaurantCard = ({ restaurant }) => {
	return (
		<div className="font-niveau px-3 flex pt-3 gap-3 hover:bg-blue">
			<img src={restaurant.RestLogo} alt="logo" />
			<div>
				<h1 className="font-bold text-2xl">{restaurant.RestName}</h1>
				<h1>{restaurant.RestLocation}</h1>
			</div>
		</div>
	);
};

export default RestaurantCard;
