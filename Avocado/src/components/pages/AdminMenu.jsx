import React, { useState, useEffect } from "react";
import NewMenuItem from "../partials/NewMenuItem";
import AdminNavBar from "../partials/AdminNavBar";
import { useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../supabase";

const AdminMenu = () => {
	const location = useLocation();
	const restaurant = location.state.id;
	const [menu, setMenu] = useState([]);

	useEffect(() => {
		const fetchMenubyRestaurant = async () => {
			const { data, error } = await supabase
				.from("MenuItems")
				.select()
				.eq("RestId", 1);

			if (error) {
				console.log(error);
			}
			if (data) {
				setMenu(data);
				console.log(data);
			}
		};
		fetchMenubyRestaurant();
	}, [1]);

	return (
		<div className="mb-[55px] md:flex md:mb-">
			<AdminNavBar />
			<NewMenuItem />
		</div>
	);
};

export default AdminMenu;
