import React from "react";

const RestaurantCard = ({ restaurant }) => {
	return (
		<div className="font-niveau px-3 flex pt-3 gap-3 hover:bg-blue duration-200 ease-in md:w-[400px] md:py-3">
			<img
				src={restaurant.RestLogo}
				alt="logo"
				className="md:w-[100px] md:h-[100px] md:border-2 md:border-black"
			/>
			<div>
				<h1 className="font-bold text-2xl">{restaurant.RestName}</h1>
				<h1>{restaurant.RestLocation}</h1>
			</div>
		</div>
	);
};

export default RestaurantCard;
