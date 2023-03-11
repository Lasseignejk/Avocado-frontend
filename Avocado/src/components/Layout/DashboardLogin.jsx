import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabase";
import {
	setToken,
	setOwner,
	setCustomer,
	setLocation,
	setGuest,
} from "../reducers/DashboardSlice";
import { queryIsOwner } from "./Queries";

const DashboardLogin = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [loginDetails, setLoginDetails] = useState({});

	const token = useSelector((state) => state.tokenID);
	const isCustomer = useSelector((state) => state.isCustomer);
	const isOwner = useSelector((state) => state.isOwner);
	const userEmail = useSelector((state) => state.userEmail);

	useEffect(() => {
		dispatch(setLocation(location.pathname));
	}, [location.pathname]);

	useEffect(() => {
		if (token && isCustomer) {
			return navigate("/customerdashboard");
		} else if (token && isOwner) {
			return navigate("/restaurantdashboard");
		}
	}, []);

	const setFormState = (e) => {
		setLoginDetails({
			...loginDetails,
			[e.target.name]: e.target.value,
		});
	};

	const sendToSupabase = async (loginDetails) => {
		console.log("hello");
		const { CustomerEmail, Password } = loginDetails;
		//signs in
		let { data, error } = await supabase.auth.signInWithPassword({
			email: CustomerEmail,
			password: Password,
		});

		//grabs token from supabase
		const { data: user } = await supabase.auth.getUser();

		//sets token in state
		dispatch(setToken(user.user));
		dispatch(setGuest(false));

		//checks if owner/customer
		const owner = await queryIsOwner(user.user.email);

		console.log("owner:", owner);
		//Restaurants
		if (owner) {
			//sets as owner in state
			dispatch(setOwner(true));
			//naivates to restaurant dash
			return navigate("/restaurantdashboard");
		}

		//Customers
		if (!owner) {
			//sets as customer in state
			dispatch(setCustomer(true));
			//naivates to customer dash
			return navigate("/customerdashboard");
		}
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-green">
			<div className="w-[300px] h-[460px] bg-gray flex flex-col items-center p-5 gap-10 rounded-xl shadow-2xl shadow-dkgreen">
				<form className="flex flex-col gap-5 font-niveau font-bold">
					<img src="../logos/avocado_green.svg" className="h-[30px]" alt="" />
					<h1 className="text-center text-lg font-light">
						Login to your Avocado account
					</h1>
					<div className="flex flex-col">
						<label htmlFor="email" className="text-lg tracking-wide">
							Email
						</label>
						<input
							className="pl-1 font-thin border-black border-b-2 bg-gray"
							type="email"
							id="email"
							name="CustomerEmail"
							onChange={(e) => setFormState(e)}
							value={
								loginDetails.CustomerEmail ? loginDetails.CustomerEmail : ""
							}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="password" className="text-lg tracking-wide">
							Password
						</label>
						<input
							className="pl-1 font-thin border-black border-b-2 bg-gray"
							type="password"
							id="password"
							name="Password"
							onChange={(e) => setFormState(e)}
							value={loginDetails.Password ? loginDetails.Password : ""}
						/>
					</div>

					<div className="flex justify-center">
						<button
							className="text-lg bg-green text-gray px-3 py-1 hover:bg-dkgreen duration-200 ease-in loginBtn rounded-full tracking-wide"
							onClick={(e) => {
								e.preventDefault();
								sendToSupabase(loginDetails);
							}}>
							Let's make some guac
						</button>
					</div>
				</form>
				<div className="text-center font-niveau flex flex-col">
					<h1 className="font-bold">New to Avocado online ordering?</h1>
					<div className="flex flex-col">
						<Link to={"/signup"} className="font-light duration-200 ease-in">
							<p className="hover:scale-110 hover:text-green duration-200 ease-in">
								Create an Account
							</p>
						</Link>

						<p>or</p>

						<Link
							to={"/customerdashboard"}
							className="font-light duration-200 ease-in "
							onClick={(e) => {
								dispatch(setGuest(true));
							}}>
							<p className="hover:scale-110 hover:text-green duration-200 ease-in">
								Continue as Guest
							</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLogin;
