import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignOut } from "../Layout/Queries";
import AdminNavBarLinks from "./AdminNavBarLinks";
import {
	FaChartBar,
	FaStoreAlt,
	FaUserAlt,
	FaAngleUp,
	FaReceipt,
} from "react-icons/fa";
import { GoSignOut } from "react-icons/go";

const AdminNavBar = () => {
	const signOut = useSignOut();
	const [show, setShow] = useState(true);
	const [spin, setSpin] = useState(true);

	const toggleNav = () => {
		setShow(!show);
		setSpin(!spin);
	};

	const adminLinks = [
		{
			title: "Reports",
			path: "/reports",
			src: (
				<FaChartBar className="text-gray font-2xl w-[30px] hidden lg:block" />
			),
		},
		{
			title: "Manage Restaurants",
			path: "/managerestaurants",
			src: (
				<FaStoreAlt className="text-gray font-2xl w-[30px] hidden lg:block" />
			),
		},
		{
			title: "My Account",
			path: "/adminaccount",
			src: (
				<FaUserAlt className="text-gray font-2xl w-[30px] hidden lg:block" />
			),
		},
		{
			title: "BOH",
			path: "/BOH",
			src: (
				<FaReceipt className="text-gray font-2xl w-[30px] hidden lg:block" />
			),
		},
	];

	const linkLength = adminLinks.length + 1;

	return (
		<div
			className="w-full lg:min-h-screen fixed bottom-0 lg:flex lg:flex-col lg:bg-green lg:static lg:w-[300px]"
			onClick={() => toggleNav()}>
			<div className="bg-green w-full box-border p-3 flex justify-between z-10 relative lg:w-[300px] lg:z-0 lg:p-5">
				<img src="../logos/avocado_gray.svg" alt="" className="h-[30px]" />
				<button
					className="w-[30px] h-[30px] bg-green lg:hidden "
					onClick={() => toggleNav()}>
					<FaAngleUp
						className={
							"duration-200 ease-in text-2xl text-gray" +
							(spin ? " rotate-180" : "")
						}
					/>
					{/* <img
						src="../items/expand_more.svg"
						alt=""
						className={"duration-200 ease-in" + (spin ? " rotate-180" : "")}
					/> */}
				</button>
			</div>
			<nav
				className={
					"bg-green text-xl text-gray font-bold duration-500 nav fixed w-full z-[9] p-5 text-center lg:relative lg:z-0 lg:w-[300px] lg:text-left lg:translate-y-0 lg:duration-[0ms]" +
					(show ? "" : " translate-y-[-410px]")
					// (show ? "" : " translate-y-[-340px]")
				}>
				<ul className="flex flex-col gap-5">
					<AdminNavBarLinks links={adminLinks} />

					<li className="border-b-2 border-gray pb-5 lg:border-none flex justify-center">
						<button
							className="flex items-center lg:bg-dkgreen lg:px-3 lg:py-1 lg:rounded-full lg:text-gray lg:w-[140px] lg:flex lg:gap-3"
							type="button"
							onClick={(e) => {
								signOut();
							}}>
							<GoSignOut className="hidden lg:block md:w-[30px] text-gray text-2xl" />
							{/* <img
								src="../../items/logout.svg"
								className="hidden lg:block md:w-[30px]"
							/>{" "} */}
							Logout
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default AdminNavBar;
