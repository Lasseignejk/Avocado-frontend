import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSignOut } from "../Layout/Queries";
import { useDispatch, useSelector } from "react-redux";
import CustomerNavBarLinks from "./CustomerNavBarLinks";
import { setGuest } from "../reducers/DashboardSlice";
import { FaAngleUp, FaUtensils, FaUserAlt, FaUserPlus } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";

const CustomerNavBar = () => {
	const signOut = useSignOut();
	const [show, setShow] = useState(true);
	const [spin, setSpin] = useState(true);

	const toggleNav = () => {
		setShow(!show);
		setSpin(!spin);
	};

	const isGuest = useSelector((state) => state.isGuest);

	const Customerlinks = [
		{
			title: "Restaurants",
			path: "/customerdashboard",
			src: (
				<FaUtensils className="text-black font-2xl w-[30px] hidden lg:block" />
			),
		},
		{
			title: "My Account",
			path: "/customeraccount",
			src: (
				<FaUserAlt className="text-black font-2xl w-[30px] hidden lg:block" />
			),
		},
	];

	const Guestlinks = [
		{
			title: "Restaurants",
			path: "/customerdashboard",
			src: (
				<FaUtensils className="text-black font-2xl w-[30px] hidden lg:block" />
			),
		},
		{
			title: "Login",
			path: "/",
			src: (
				<GoSignIn className="text-black font-2xl w-[30px] hidden lg:block" />
			),
		},
		{
			title: "Make an account",
			path: "/signup",
			src: (
				<FaUserPlus className="text-black font-2xl w-[30px] hidden lg:block" />
			),
		},
	];

	useEffect(() => {}, [isGuest]);

	return (
		<div
			className="w-full h-[53px] fixed bottom-0 md:h-[80px] md:flex md:bg-blue md:static"
			onClick={() => toggleNav()}>
			<div className="bg-blue w-full box-border p-3 flex justify-between z-10 relative lg:z-0 md:p-5">
				<img src="../logos/avocado_green.svg" alt="" className="h-[30px]" />
				<button
					className="w-[30px] h-[30px] bg-blue md:hidden"
					onClick={() => toggleNav()}>
					<FaAngleUp
						className={
							"duration-200 ease-in text-2xl text-black" +
							(spin ? " rotate-180" : "")
						}
					/>
				</button>
			</div>
			<nav
				className={
					"bg-blue md:flex items-center md:justify-end text-xl text-black font-bold duration-500 fixed w-full z-[9] p-5 py-3 text-center md:relative md:z-0 md:translate-y-0 md:duration-[0ms]" +
					(show ? "" : " translate-y-[calc((81px*3)*-1)]")
				}>
				<ul className="flex flex-col gap-3 items-center md:flex-row md:justify-end md:w-[430px] lg:w-[500px]">
					{!isGuest && (
						<>
							<CustomerNavBarLinks links={Customerlinks} />
							<li className="flex justify-center items-center border-b-2 border-black w-full h-[50px] md:h-[37px] duration-200 ease-in md:rounded-full md:border-none md:pb-0">
								<button
									className="duration-200 ease-in md:bg-[#4e98ba] md:hover:bg-[#286480] md:px-3 md:py-1 md:rounded-full md:text-gray w-[100px]"
									type="button"
									onClick={(e) => {
										signOut();
									}}>
									Log out
								</button>
							</li>
						</>
					)}
					{isGuest && (
						<>
							<CustomerNavBarLinks links={Guestlinks} />
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};

export default CustomerNavBar;
