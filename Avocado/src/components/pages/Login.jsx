import React from "react";

const Login = () => {
	return (
		<div>
			<div>
				<h1 className="font-newspirit font-extrabold text-green">Avocado</h1>
			</div>
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
					</div>
					<div>
						<button type="button">SUBMIT</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
