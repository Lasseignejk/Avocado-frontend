import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../reducers/DashboardSlice";
import "../Layout/RestaurantAdmin.css";
import RestaurantAdminUpdateRestOptions from "../Layout/RestaurantAdminUpdateRestOptions";

const RestaurantAdminUpdateRestaurant = ({ restaurants }) => {
	console.log(restaurants);
	const dispatch = useDispatch();
	const modal = document.querySelector(".modal");

	const openModal = () => {
		modal.style.display = "block";
	};

	const closeModal = () => {
		modal.style.display = "none";
	};

	window.onclick = function (e) {
		if (e.target == modal) {
			modal.style.display = "none";
		}
	};

	return (
		<>
			<button
				className="bg-green px-3 py-1 text-gray openModal"
				onClick={() => openModal()}>
				Update a restaurant's information
			</button>

			<div className="modal">
				<div className="modal-content">
					<span className="close" onClick={() => closeModal()}>
						&times;
					</span>
					<RestaurantAdminUpdateRestOptions />
				</div>
			</div>
		</>
	);
};

export default RestaurantAdminUpdateRestaurant;
