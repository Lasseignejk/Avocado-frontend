import React from "react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MDE3MzYsImV4cCI6MTk5MzE3NzczNn0.aNzbzagYgmQ8F9R0OT0MtrQv1yNfQiozBGZyzSBrQTA";
const supabase = createClient(supabaseUrl, supabaseKey);

const UserAcct = () => {
	const [accountDetails, setAccountDetails] = useState({});

	const setFormState = (e) => {
		setAccountDetails({
			...accountDetails,
			[e.target.name]: e.target.value,
		});
	};

	const sendToSupabase = async (accountDetails) => {
		// let { data, error } = await supabase.auth.signUp({
		// 	email: "123@123.com",
		// 	password: "testing1234567",
		// });
		// console.log(data);

		const data = await fetch("http://localhost:3060/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(accountDetails),
		});
		console.log(accountDetails);
	};

	return (
		<div>
			<form>
				<h1>User Account</h1>
				{/* <div>
					<label htmlFor="name">First Name</label>
					<input
						type="text"
						id="name"
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
					<label htmlFor="name">Last Name</label>
					<input
						type="text"
						id="name"
						name="CustomerLastName"
						onChange={(e) => setFormState(e)}
						value={
							accountDetails.CustomerLastName
								? accountDetails.CustomerLastName
								: ""
						}
					/>
				</div> */}
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
				{/* <div>
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
				</div> */}
				{/* <div>
					<label htmlFor="address">Address</label>
					<input
						type="address"
						id="address"
						name="Address"
						onChange={(e) => setFormState(e)}
						value={accountDetails.Address ? accountDetails.Address : ""}
					/>
				</div> */}
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

export default UserAcct;
