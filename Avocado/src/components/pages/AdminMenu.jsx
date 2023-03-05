import React, { useState, useEffect } from "react";
import NewMenuItem from "../partials/NewMenuItem";
import AdminNavBar from "../partials/AdminNavBar";
import { useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MzEyNzAsImV4cCI6MTk5MzIwNzI3MH0.k8hjRQLV9bN_BcG11s_gWJx2NK_AHIXrJPTii7GO4LM";
const supabase = createClient(supabaseUrl, supabaseKey);

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
