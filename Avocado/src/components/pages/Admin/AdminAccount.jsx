import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminNavBar from "../../partials/AdminNavBar";

const AdminAccount = () => {
	const userDetails = useSelector((state) => state?.userDetails[0]);
	const dispatch = useDispatch();

	const [updateDetails, setupdateDetails] = useState({});

	const setFormState = (e) => {
		setupdateDetails({
			...updateDetails,
			[e.target.name]: e.target.value,
			id: userDetails.id,
		});
	};

	const updateUserAccount = async (updateDetails) => {
		console.log(updateDetails);
		const data = await fetch("http://localhost:3060/admin/updateAdmin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateDetails),
		});
	};

	return (
		<div className="mb-[55px] md:flex md:mb-0">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
				<div className="flex flex-col gap-3">
					<h1 className="text-center text-4xl font-bold text-green md:text-left">
						{userDetails?.OwnerFirstName}'s Account Details
					</h1>
				</div>
				<div className="flex justify-center">
					<form className="px-3 flex flex-col gap-3 mb-3 items-center w-full md:w-1/2 md:mb-5">
						<h1 className="text-2xl font-bold text-center">Update Account</h1>

						<div className="flex flex-col w-full">
							<label className="font-bold" htmlFor="firstName">
								First Name
							</label>
							<input
								className="pl-3"
								type="text"
								id="firstName"
								name="OwnerFirstName"
								placeholder={userDetails.OwnerFirstName}
								onChange={(e) => setFormState(e)}
								value={
									updateDetails.OwnerFirstName
										? updateDetails.OwnerFirstName
										: ""
								}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label className="font-bold" htmlFor="lastName">
								Last Name
							</label>
							<input
								className="pl-3"
								type="text"
								id="lastName"
								name="OwnerLastName"
								placeholder={userDetails.OwnerLastName}
								onChange={(e) => setFormState(e)}
								value={
									updateDetails.OwnerLastName ? updateDetails.OwnerLastName : ""
								}
							/>
						</div>

						<div className="flex flex-col w-full">
							<label className="font-bold" htmlFor="phone">
								Phone Number
							</label>
							<input
								className="pl-3"
								type="text"
								id="phone"
								name="OwnerPhoneNumber"
								placeholder={userDetails.OwnerPhoneNumber}
								onChange={(e) => setFormState(e)}
								value={
									updateDetails.OwnerPhoneNumber
										? updateDetails.OwnerPhoneNumber
										: ""
								}
							/>
						</div>

						<div className="flex justify-center">
							<button
								className="bg-green text-gray text-lg px-5 py-1 duration-200 font-bold hover:bg-dkgreen"
								type="button"
								onClick={() => updateUserAccount(updateDetails)}>
								Submit Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminAccount;
