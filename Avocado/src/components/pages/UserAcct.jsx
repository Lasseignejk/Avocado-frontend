import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCustomer } from "../reducers/CustomerSlice";

const UserAcct = () => {
	const customer = useSelector((state) => state.customer);
	const dispatch = useDispatch();

	const getCustomer = async () => {
		const response = await fetch("http://localhost:3060/displaycustomer");
		const json = await response.json();
		dispatch(setCustomer(json));
	};

	useEffect(() => {
		getCustomer();
	}, []);

	const [accountDetails, setAccountDetails] = useState({});

	const setFormState = (e) => {
		setAccountDetails({
			...accountDetails,
			[e.target.name]: e.target.value,
		});
	};

	// const updateUserAccount = async (accountDetails) => {
	// 	const data = await fetch("http://localhost:3060/update", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(accountDetails),
	// 	});
	// 	console.log(accountDetails);
	// };

	return (
		<div>
			<div className="flex flex-col gap-5">
				{customer.map((individual) => (
					<div>
						<p>{individual.CustomerFirstName}</p>
						<p>{individual.CustomerLastName}</p>
						<p>{individual.CustomerEmail}</p>
					</div>
				))}
			</div>
			<form>
				<h1>User Account</h1>
				<div>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
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
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						name="CustomerLastName"
						onChange={(e) => setFormState(e)}
						value={
							accountDetails.CustomerLastName
								? accountDetails.CustomerLastName
								: ""
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
						value={
							accountDetails.CustomerEmail ? accountDetails.CustomerEmail : ""
						}
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
							accountDetails.CustomerPhoneNumber
								? accountDetails.CustomerPhoneNumber
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
						value={accountDetails.Address ? accountDetails.Address : ""}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="Password"
						onChange={(e) => setFormState(e)}
						value={accountDetails.Password ? accountDetails.Password : ""}
					/>
				</div>
				<div>
					<button
						type="button"
						onClick={() => updateUserAccount(accountDetails)}>
						Update Account
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserAcct;
