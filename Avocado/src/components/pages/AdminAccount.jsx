import React from "react";

const AdminAccount = () => {
	return (
		<div>
			<form>
				<h1>Admin Account</h1>
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
					<button type="button" onClick={() => sendToSupabase(accountDetails)}>
						SUBMIT
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminAccount;
