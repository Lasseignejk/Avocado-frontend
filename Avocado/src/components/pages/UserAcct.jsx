import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../../supabase";
import CustomerNavBar from "../Layout/CustomerNavBar";

const UserAcct = () => {
	const userDetails = useSelector((state) => state?.userDetails[0][0]);
	const dispatch = useDispatch();
	console.log(userDetails);

	// const [userDetails, setuserDetails] = useState({});

	// const setFormState = (e) => {
	//   setuserDetails({
	//     ...userDetails,
	//     [e.target.name]: e.target.value,
	//   });
	// };

	// const updateUserAccount = async (userDetails) => {
	// 	const data = await fetch("http://localhost:3060/update", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(userDetails),
	// 	});
	// 	console.log(userDetails);
	// };

	return (
		<div className="mb-[55px] md:flex md:mb-0">
			<CustomerNavBar />
			<div>
				<div>{userDetails.CustomerFirstName}</div>
				<form>
					<h1>User Account</h1>
					<div>
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							name="CustomerFirstName"
							placeholder={userDetails.CustomerFirstName}
							onSubmit={(e) => setFormState(e)}
							value={
								userDetails.CustomerFirstName
									? userDetails.CustomerFirstName
									: ""
							}
						/>
					</div>
					<div>
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							name="CustomerLastName"
							onChange={(e) => setFormState(e)}
							value={
								userDetails.CustomerLastName ? userDetails.CustomerLastName : ""
							}
						/>
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="CustomerEmail"
							onChange={(e) => setFormState(e)}
							value={userDetails.CustomerEmail ? userDetails.CustomerEmail : ""}
						/>
					</div>
					<div>
						<label htmlFor="phone">Phone Number</label>
						<input
							type="text"
							id="phone"
							name="CustomerPhoneNumber"
							onChange={(e) => setFormState(e)}
							value={
								userDetails.CustomerPhoneNumber
									? userDetails.CustomerPhoneNumber
									: ""
							}
						/>
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input
							type="address"
							id="address"
							name="Address"
							onChange={(e) => setFormState(e)}
							value={userDetails.Address ? userDetails.Address : ""}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="Password"
							onChange={(e) => setFormState(e)}
							value={userDetails.Password ? userDetails.Password : ""}
						/>
					</div>
					<div>
						<button
							type="button"
							onClick={() => updateUserAccount(userDetails)}>
							Update Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserAcct;
