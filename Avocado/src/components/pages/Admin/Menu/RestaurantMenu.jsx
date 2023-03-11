import React, { useState, useEffect } from "react";
import RestaurantAddMenuItemForm from "./RestaurantAddMenuItemForm";
import AdminNavBar from "../../../partials/AdminNavBar";
import { supabase } from "../../../../supabase";
import RestaurantMenuItemCard from "./RestaurantMenuItemCard";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
	const restaurantId = useSelector((state) => state.currentRestaurant[0]);

	const [restToEdit, setRestToEdit] = useState({});
	const [toggle, setToggle] = useState(true);
	const [menu, setMenu] = useState();

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

	// Get menuItems by restaurant Id on reload
	useEffect(() => {
		getMenu();
	}, [restaurantId, toggle]);

	return (
		<div className="mb-[55px] lg:flex lg:mb-0 justify-start">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 lg:w-full lg:pl-16 lg:pr-8 lg:pt-20 lg:flex-row  justify-between">
				<div>
					<div className="flex flex-col gap-3 mb-5">
						<h1 className="text-center text-4xl font-bold text-green lg:text-left">
							{restToEdit[0]?.RestName}
						</h1>
						<h1 className="text-center text-3xl font-bold lg:text-left">
							Edit Menu
						</h1>
					</div>
					<div className="flex flex-col items-center lg:flex-row lg:flex-wrap gap-3 lg:justify-center">
						{menu?.map((item, index) => (
							<RestaurantMenuItemCard
								setMenu={setMenu}
								item={item}
								key={index}
								toggle={toggle}
								setToggle={setToggle}
							/>
						))}
					</div>
				</div>
				<div className="flex justify-center">
					<RestaurantAddMenuItemForm toggle={toggle} setToggle={setToggle} />
				</div>
			</div>
		</div>
	);
};

export default RestaurantMenu;
