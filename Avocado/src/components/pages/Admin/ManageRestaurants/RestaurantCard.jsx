import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import placeholder from "/items/restaurant_placeholder.svg";
import { FaCog } from "react-icons/fa";
import { setRestaurant } from "../../../reducers/DashboardSlice";
import UpdateRestaurantModal from "./UpdateRestaurantModal";

const RestaurantAdminCard = ({ restaurant, toggle, setToggle }) => {
	const [openModal, setOpenModal] = useState(false);
	return (
		// <div className="bg-ltgray rounded-xl md:pr-3 md:flex duration-200 ease-in md:hover:-translate-y-1  md:hover:bg-blue md:shadow-md"></div>
		// 				<div className="duration-200 ease-in flex-col gap-2  md:flex-row"></div>
		<div className="bg-ltgray rounded-xl duration-200 ease-in hover:bg-blue font-niveau px-3 flex pt-3 gap-3 md:w-[400px] md:py-3 md:shadow-md justify-between">
			<Link
				className="flex gap-2"
				to="/menuinfo"
				state={restaurant}
				onClick={() => dispatch(setRestaurant(restaurant.id))}>
				<div className="flex items-center w-[50px] h-[50px] md:w-[100px] md:h-[100px] box-border">
					<img
						src={restaurant.RestLogo ? restaurant.RestLogo : placeholder}
						alt="logo"
						className=""
					/>
				</div>
				<div>
					<h1 className="font-bold text-2xl">{restaurant.RestName}</h1>
					<h1>{restaurant.RestLocation}</h1>
				</div>
			</Link>
			<div className="grid place-items-center">
				<button
					className="hover:bg-green duration-200 ease-in w-[50px] h-[50px] flex items-center justify-center rounded-full hover:text-gray"
					type="button"
					onClick={() => setOpenModal(true)}>
					<FaCog className="text-2xl text-black" />
				</button>
			</div>
			<>
				{openModal && (
					<UpdateRestaurantModal
						className="fixed"
						restaurant={restaurant}
						setOpenModal={setOpenModal}
						setRestaurant={setRestaurant}
						toggle={toggle}
						setToggle={setToggle}
					/>
				)}
			</>
		</div>
	);
};

export default RestaurantAdminCard;
