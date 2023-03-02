import React from "react";
import { useState } from "react";

const Signup = () => {
	const [accountDetails, setAccountDetails] = useState({});

	const setFormState = (e) => {
		setAccountDetails({
			...accountDetails,
			[e.target.name]: e.target.value,
		});
	};

	const sendToSupabase = async (accountDetails) => {
		const signUpBtn = document.querySelector(".signUpBtn");
		signUpBtn.disabled = true;
		signUpBtn.classList.add("bg-[#b3b3b3]", "text-black");
		signUpBtn.classList.remove("bg-green", "hover:bg-blue", "text-gray");
		const data = await fetch("http://localhost:3060/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(accountDetails),
		});
		console.log(accountDetails);
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-green">
			<div className="w-[300px] bg-gray flex flex-col items-center p-5 gap-10">
				<form className="flex flex-col gap-5 font-niveau font-bold">
					<img src="../logos/avocado_green.svg" alt="" />
					<h1 className="text-center text-lg">
						Sign up for an Avocado account
					</h1>

					<div className="flex gap-3">
						<p>I am...*</p>
						<select
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
							<label htmlFor="firstName">First Name*</label>
							<input
								className="w-full pl-3"
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
							<label htmlFor="lastName">Last Name*</label>
							<input
								className="w-full pl-3"
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
					</div>

					<div className="flex flex-col">
						<label htmlFor="email">Email*</label>
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
					<div className="flex flex-col">
						<label htmlFor="phone">Phone Number*</label>
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

					<div className="flex flex-col">
						<label htmlFor="address">Address</label>
						<input
							type="address"
							id="address"
							name="Address"
							onChange={(e) => setFormState(e)}
							value={accountDetails.Address ? accountDetails.Address : ""}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="password">Password*</label>
						<input
							type="password"
							id="password"
							name="Password"
							onChange={(e) => setFormState(e)}
							value={accountDetails.Password ? accountDetails.Password : ""}
						/>
					</div>
					<div className="flex justify-center">
						<button
							className="bg-green text-gray px-3 text-lg py-1 hover:bg-blue hover:text-black signUpBtn"
							type="button"
							onClick={() => sendToSupabase(accountDetails)}>
							Sign me up, Haas
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
