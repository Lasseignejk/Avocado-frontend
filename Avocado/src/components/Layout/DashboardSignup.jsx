import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../supabase";
import {
	setToken,
	setOwner,
	setCustomer,
	setLocation,
	setGuest,
} from "../reducers/DashboardSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardSignup = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [accountDetails, setAccountDetails] = useState({});
	const [isError, setIsError] = useState(false);

	const isCustomer = useSelector((state) => state.isCustomer);
	const isOwner = useSelector((state) => state.isOwner);

	useEffect(() => {
		dispatch(setLocation(location.pathname));
	}, [location.pathname]);

	const setFormState = (e) => {
		setAccountDetails({
			...accountDetails,
			[e.target.name]: e.target.value,
		});
	};

	const checkSignUpDetails = (accountDetails) => {
		if (!accountDetails.CustomerFirstName) {
			return toast.error("Please enter in a first name.", {
				position: toast.POSITION.TOP_CENTER,
			});
		}
		if (!accountDetails.CustomerLastName) {
			return toast.error("Please enter in a last name.", {
				position: toast.POSITION.TOP_CENTER,
			});
		}
		if (!accountDetails.CustomerEmail) {
			return toast.error("Please enter in a valid email.", {
				position: toast.POSITION.TOP_CENTER,
			});
		}
		if (!accountDetails.CustomerPhoneNumber) {
			return toast.error("Please enter in a phone number.", {
				position: toast.POSITION.TOP_CENTER,
			});
		}
		if (!accountDetails.Password) {
			return toast.error(
				"Please enter in a valid password. Passwords must be at least 8 characters long.",
				{
					position: toast.POSITION.TOP_CENTER,
				}
			);
		}
	};

	const sendToSupabase = async (accountDetails) => {
		checkSignUpDetails(accountDetails);
		const {
			CustomerEmail,
			Password,
			CustomerFirstName,
			CustomerLastName,
			CustomerPhoneNumber,
			Address,
			RestOwner,
		} = accountDetails;

		//signs up
		let { data: sigUpnData, error: signUpError } = await supabase.auth.signUp({
			email: CustomerEmail,
			password: Password,
		});

		//signs in
		let { data, error: SignInError } = await supabase.auth.signInWithPassword({
			email: CustomerEmail,
			password: Password,
			RestOwner: RestOwner,
		});

		if (SignInError) {
			setIsError(SignInError);
			return;
		}

		//grabs token from supabase
		const { data: user } = await supabase.auth.getUser();

		//sets token in state
		dispatch(setToken(user.user));
		dispatch(setGuest(false));

		if (user) {
			//if restaurant inject into owner table
			if (RestOwner == "true") {
				let { data, error: insertOwnerError } = await supabase
					.from("Owner")
					.insert([
						{
							OwnerFirstName: CustomerFirstName,
							OwnerLastName: CustomerLastName,
							OwnerEmail: CustomerEmail.toLowerCase(),
							OwnerPhoneNumber: CustomerPhoneNumber,
						},
					]);
				if (insertOwnerError) {
					setIsError(insertOwnerError);
					return;
				}

				//sets as owner in state
				dispatch(setOwner(!isOwner));

				//naivates to restaurant dash
				return navigate("/restaurantdashboard");
			}

			//if customer inject into customer table
			if (RestOwner == "false") {
				let { data, error: insertCustomerError } = await supabase
					.from("Customer")
					.insert([
						{
							CustomerFirstName: CustomerFirstName,
							CustomerLastName: CustomerLastName,
							CustomerEmail: CustomerEmail.toLowerCase(),
							CustomerPhoneNumber: CustomerPhoneNumber,
							Address: Address,
						},
					]);
				if (insertCustomerError) {
					setIsError(insertCustomerError);
					return;
				}

				//sets as customer in state
				dispatch(setCustomer(!isCustomer));

				//naivates to customer dash
				return navigate("/customerdashboard");
			}
		}

		//navigates to signup/login again
		return navigate("/");
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-green">
			<ToastContainer />
			<div className="w-[300px] bg-gray flex flex-col items-center p-5 gap-10 rounded-xl shadow-2xl shadow-dkgreen">
				<form className="flex flex-col gap-5 font-niveau font-bold">
					<img src="../logos/avocado_green.svg" alt="" className="h-[30px]" />
					<h1 className="text-center text-lg font-light">
						Sign up for an Avocado account
					</h1>

					<div className="flex gap-3">
						<p className="tracking-wide">I am...*</p>
						<select
							className="pl-1 font-thin border-black border-b-2 bg-gray hover:cursor-pointer"
							name="RestOwner"
							id=""
							value={accountDetails.RestOwner ? accountDetails.RestOwner : ""}
							onChange={(e) => setFormState(e)}>
							<option value="" name="RestOwner" disabled>
								Please choose one
							</option>
							<option value="false" name="RestOwner">
								a customer
							</option>
							<option value="true" name="RestOwner">
								a restaurant owner
							</option>
						</select>
					</div>
					<div className="flex gap-3">
						<div>
							<label htmlFor="firstName" className="tracking-wide">
								First Name*
							</label>
							<input
								className="pl-1 font-thin border-black border-b-2 bg-gray w-full"
								type="text"
								id="firstName"
								placeholder="Haas"
								name="CustomerFirstName"
								onChange={(e) => setFormState(e)}
								value={
									accountDetails.CustomerFirstName
										? accountDetails.CustomerFirstName
										: ""
								}
							/>
						</div>
						<div>
							<label htmlFor="lastName" className="tracking-wide">
								Last Name*
							</label>
							<input
								className="pl-1 font-thin border-black border-b-2 bg-gray w-full"
								type="text"
								id="lastName"
								placeholder="'ocado"
								name="CustomerLastName"
								onChange={(e) => setFormState(e)}
								value={
									accountDetails.CustomerLastName
										? accountDetails.CustomerLastName
										: ""
								}
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label htmlFor="email" className="tracking-wide">
							Email*
						</label>
						<input
							className="pl-1 font-thin border-black border-b-2 bg-gray"
							type="email"
							placeholder="avocadozrule@email.com"
							id="email"
							name="CustomerEmail"
							onChange={(e) => setFormState(e)}
							value={
								accountDetails.CustomerEmail ? accountDetails.CustomerEmail : ""
							}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="phone" className="tracking-wide">
							Phone Number*
						</label>
						<input
							className="pl-1 font-thin border-black border-b-2 bg-gray"
							placeholder="111-111-1111"
							type="text"
							id="phone"
							name="CustomerPhoneNumber"
							onChange={(e) => setFormState(e)}
							value={
								accountDetails.CustomerPhoneNumber
									? accountDetails.CustomerPhoneNumber
									: ""
							}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="address" className="tracking-wide">
							Address
						</label>
						<input
							className="pl-1 font-thin border-black border-b-2 bg-gray"
							placeholder="149 Pit Road, Avo, California, 12345 "
							type="address"
							id="address"
							name="Address"
							onChange={(e) => setFormState(e)}
							value={accountDetails.Address ? accountDetails.Address : ""}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="password" className="tracking-wide">
							Password*
						</label>
						<input
							className="pl-1 font-thin border-black border-b-2 bg-gray"
							type="password"
							id="password"
							name="Password"
							onChange={(e) => setFormState(e)}
							value={accountDetails.Password ? accountDetails.Password : ""}
						/>
					</div>
					<div className="flex justify-center">
						<button
							className="bg-green text-gray px-3 text-lg py-1 hover:bg-dkgreen signUpBtn rounded-full duration-200 ease-in"
							type="button"
							onClick={(e) => {
								e.preventDefault();
								sendToSupabase(accountDetails);
							}}>
							Sign me up, Haas
						</button>
					</div>
					<div className="text-center">
						<p>Already have an account?</p>
						<Link to={"/"} className="font-light duration-200 ease-in ">
							<p className="hover:scale-110 hover:text-green duration-200 ease-in">
								Click here to login!
							</p>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DashboardSignup;
