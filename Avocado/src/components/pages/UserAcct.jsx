import React from "react";
import { useState } from "react";

const UserAcct = () => {
	const [accountDetails, setAccountDetails] = useState({});

	const setFormState = (e) => {
		setAccountDetails({
			...accountDetails,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<form>
				<h1>User Account</h1>
				<div>
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
					<label htmlFor="name">First Name</label>
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
				</div>
				<div>
					<button type="button">SUBMIT</button>
				</div>
			</form>
		</div>
	);
};

export default UserAcct;
