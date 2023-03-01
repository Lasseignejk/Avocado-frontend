import React from "react";
import { useState } from "react";

const Login = () => {
	const [accountDetails, setAccountDetails] = useState({});

	const setFormState = (e) => {
		setAccountDetails({
			...accountDetails,
			[e.target.name]: e.target.value,
		});
	};

	// const sendToSupabase = async (accountDetails) => {
	// 	const data = await fetch("http://localhost:3060/signup", {
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
			<form>
				<h1>Login to Avocado</h1>

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
					<button type="button" onClick={() => sendToSupabase(accountDetails)}>
						SUBMIT
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
