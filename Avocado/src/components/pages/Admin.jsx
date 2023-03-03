import React from "react";
import { useSelector } from "react-redux";
import AdminNavBar from "../partials/AdminNavBar";

const Admin = () => {
	const admin = useSelector((state) => state.admin);
	console.log(admin);
	return (
		<div className="md:flex">
			<AdminNavBar />
			{/* <p>{admin.CustomerFirstName}</p> */}
		</div>
	);
};

export default Admin;
