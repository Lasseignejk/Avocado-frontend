import React, { useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "/items/restaurant_placeholder.svg";
import { FaCog, FaReceipt } from "react-icons/fa";
import { setRestaurant } from "../../../reducers/DashboardSlice";
import UpdateRestaurantModal from "./UpdateRestaurantModal";
import { useDispatch } from "react-redux";

const RestaurantAdminCard = ({ restaurant, toggle, setToggle }) => {
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();
	return (
		<div className="bg-ltgray rounded-2xl duration-200 ease-in hover:bg-blue font-niveau px-3 flex py-3 md:w-[400px] md:py-3 md:shadow-md justify-between">
			<Link
				className="flex gap-3 items-center"
				to="/menuinfo"
				state={restaurant}
				onClick={() => dispatch(setRestaurant(restaurant.id))}>
				<div className="flex items-center w-[70px] h-[70px] md:w-[100px] md:h-[100px] box-border">
					<img
						src={restaurant.RestLogo ? restaurant.RestLogo : placeholder}
						alt="logo"
						className=""
					/>
				</div>
				<div className="w-[220px]">
					<h1 className="font-bold text-2xl">{restaurant.RestName}</h1>
					<h1>{restaurant.RestLocation}</h1>
				</div>
			</Link>
			<div className="grid place-items-center">
				<button
					className="hover:bg-gray duration-200 ease-in w-[50px] h-[50px] flex items-center justify-center rounded-full hover:text-gray"
					type="button"
					onClick={() => setOpenModal(true)}>
					<FaCog className="text-2xl text-black" />
				</button>
				<Link to={"/BOH"}>
					<button
						className="hover:bg-gray duration-200 ease-in w-[50px] h-[50px] flex items-center justify-center rounded-full hover:text-gray"
						type="button"
						onClick={() => dispatch(setRestaurant(restaurant.id))}>
						<FaReceipt className="text-2xl text-black" />
					</button>
				</Link>
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
