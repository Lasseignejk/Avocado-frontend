import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/Login.css";

const Login = () => {
	const [accountDetails, setAccountDetails] = useState({});
	const [loginDetails, setLoginDetails] = useState({});

	const setFormState = (e) => {
		setAccountDetails({
			...accountDetails,
			[e.target.name]: e.target.value,
		});
	};

	const sendToSupabase = async (accountDetails) => {
		const loginBtn = document.querySelector(".loginBtn");
		loginBtn.disabled = true;
		loginBtn.classList.add("bg-[#b3b3b3]", "text-black");
		loginBtn.classList.remove("bg-green", "hover:bg-blue");
		// const data = await fetch("http://localhost:3060/signup", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(accountDetails),
		// });
		console.log(accountDetails);
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-green">
			<div className="w-[300px] h-[400px] bg-gray flex flex-col items-center p-5 gap-10">
				<form className="flex flex-col gap-5 font-niveau font-bold">
					<img src="../logos/avocado_green.svg" alt="" />

					<div className="flex flex-col">
						<label htmlFor="email">email</label>
						<input
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
						<label htmlFor="password">password</label>
						<input
							type="password"
							id="password"
							name="Password"
							onChange={(e) => setFormState(e)}
							value={loginDetails.Password ? loginDetails.Password : ""}
						/>
					</div>
					<div className="flex gap-5">
						<label htmlFor="signIn">Sign in as:</label>
						<button
							className="bg-green text-gray w-[60px] cursor-pointer userBtn"
							type="button"
							name="RestOwner"
							id="signIn"
							value={false}
							onClick={(e) => setFormState(e)}>
							user
						</button>
						<button
							className="bg-green text-gray w-[60px] cursor-pointer adminBtn"
							type="button"
							name="RestOwner"
							value={true}
							onClick={(e) => setFormState(e)}>
							admin
						</button>
					</div>
					<div className="flex justify-center">
						<button
							className=" text-lg bg-green text-gray px-3 hover:bg-blue hover:text-black duration-200 ease-in loginBtn"
							onClick={() => sendToSupabase()}>
							Let's make some guac
						</button>
					</div>
				</form>
				<div className="text-center font-niveau">
					<h1 className="text-sm">New to Avocado online ordering?</h1>
					<p className="text-green text-center text-sm">
						<Link to={"/signup"}>Create Account</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
