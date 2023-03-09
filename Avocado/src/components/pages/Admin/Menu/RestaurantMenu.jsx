import React, { useState, useEffect } from "react";
import RestaurantAddMenuItemForm from "./RestaurantAddMenuItemForm";
import AdminNavBar from "../../../partials/AdminNavBar";
import { supabase } from "../../../../supabase";
import RestaurantMenuItemCard from "./RestaurantMenuItemCard";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
	const restaurantId = useSelector((state) => state.currentRestaurant[0]);
	// console.log(restaurantId);

	const [restToEdit, setRestToEdit] = useState({});

	useEffect(() => {
		console.log();
		const getRestaurant = async () => {
			const response = await fetch(
				import.meta.env.VITE_BACKEND + "/admin/restaurant/getonerestaurant",
				{
					method: "GET",
					headers: {
						restid: restaurantId,
					},
				}
			);

			if (!response.ok) {
				window.alert(response?.statusText);
			} else {
				const json = await response?.json();

				setRestToEdit(json);
			}
		};
		getRestaurant();
	}, [restaurantId]);

	const [menu, setMenu] = useState();

	useEffect(() => {
		console.log();
		const getMenu = async () => {
			const response = await fetch(
				import.meta.env.VITE_BACKEND + "/admin/restaurant/getmenu",
				{
					method: "GET",
					headers: {
						restid: restaurantId,
					},
				}
			);
			if (!response.ok) {
				window.alert(response.statusText);
			} else {
				const json = await response.json();
				setMenu(json);
				// console.log("menu: ", json);
			}
		};
		getMenu();
	}, [restaurantId]);

	return (
		<div className="mb-[55px] md:flex md:mb-0 justify-start">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20 md:flex-row">
				<div>
					<div className="flex flex-col gap-3">
						<h1 className="text-center text-4xl font-bold text-green md:text-left">
							{restToEdit[0]?.RestName}
						</h1>
						<h1 className="text-center text-3xl font-bold md:text-left">
							Edit Menu
						</h1>
					</div>
					<div className="flex flex-col justify-evenly md:flex-row md:flex-wrap md:justify-evenly gap-3">
						{menu?.map((item) => (
							<RestaurantMenuItemCard setMenu={setMenu} item={item} />
						))}
					</div>
				</div>
				<div className="flex justify-center">
					<RestaurantAddMenuItemForm />
				</div>
			</div>
		</div>
	);
};

export default RestaurantMenu;
