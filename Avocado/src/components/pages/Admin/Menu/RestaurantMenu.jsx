import React, { useState, useEffect } from "react";
import RestaurantAdminNewMenuItem from "./RestaurantAddMenuItemForm";
import AdminNavBar from "../../../partials/AdminNavBar";
import { supabase } from "../../../../supabase";
import RestaurantAdminMenuItem from "./RestaurantMenuItemCard";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
	///previously AdminMenu

	// * expected behavior *
	//Lists options to choose for admin

	/* To do: */

	//searches for menu items by restaurant id (in state) in menuitems database

	const restaurantId = useSelector(
		(state) => state.dashboard.currentRestaurant[0]
	);

	const [menu, setMenu] = useState();

	useEffect(() => {
		console.log();
		const getMenu = async () => {
			const response = await fetch(
				"http://localhost:3060/admin/restaurant/getmenu",
				{
					method: "GET",
					headers: {
						restid: restaurantId,
					},
				}
			);
			console.log(response);
			if (!response.ok) {
				window.alert(response.statusText);
			} else {
				const json = await response.json();
				setMenu(json);
				console.log(json);
			}
		};
		getMenu();
	}, [restaurantId]);

	return (
		<div className="mb-[55px] md:flex md:mb-0">
			<AdminNavBar />
			<div>
				<h1>Edit Menu</h1>
				{menu?.map((item) => (
					<RestaurantAdminMenuItem item={item} />
				))}
			</div>
			<RestaurantAdminNewMenuItem />
		</div>
	);
};

export default RestaurantMenu;