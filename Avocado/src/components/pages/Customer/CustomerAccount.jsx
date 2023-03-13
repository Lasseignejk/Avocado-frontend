import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerNavBar from "../../partials/CustomerNavBar";
import { toast, ToastContainer } from "react-toastify";
import DeleteCustomerForm from "./DeleteCustomerForm";
import { setUserDetails } from "../../reducers/DashboardSlice";
import { supabase } from "../../../supabase";

const CustomerAccount = () => {
	const userDetails = useSelector((state) => state?.userDetails[0]);
	const [toggle, setToggle] = useState(true);
	const [updateDetails, setupdateDetails] = useState({});
	const dispatch = useDispatch();

  const setFormState = (e) => {
    setupdateDetails({
      ...updateDetails,
      [e.target.name]: e.target.value,
      id: userDetails.id,
    });
  };

	const fetchUserData = async () => {
		const { data, error } = await supabase
			.from("Customer")
			.select()
			.eq("CustomerEmail", userDetails.CustomerEmail);

		if (error) {
			setError(error);
			return;
		}
		if (data) {
			dispatch(setUserDetails(data[0]));
		}
	};

	useEffect(() => {
		fetchUserData();
	}, [toggle]);

	const updateUserAccount = async (updateDetails) => {
		const data = await fetch(
			import.meta.env.VITE_BACKEND + "/customer/updateCust",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateDetails),
			}
		);
		if (data) {
			setupdateDetails({ id: userDetails.id });
			setToggle(!toggle);

			toast.success("Account Updated!", {
				position: toast.POSITION.TOP_CENTER,
				icon: <img src="../../logos/icon_green.svg" alt="" />,
			});
		}
	};

	return (
		<>
			<CustomerNavBar />
			<div className="mb-[55px] flex md:mb-0 flex-col gap-10">
				<div className="flex flex-col gap-10 pt-3 lg:w-full lg:px-16 lg:pt-10">
					<ToastContainer />
					<div className="flex flex-col gap-3">
						<h1 className="text-center text-4xl px-3 lg:px-0 font-bold text-green lg:text-left">
							{userDetails?.CustomerFirstName} {userDetails?.CustomerLastName}
						</h1>
						<h1 className="text-center text-3xl font-bold lg:text-left">
							Account Details
						</h1>
					</div>
					<div className="flex justify-center lg:justify-start">
						<form className="px-3 py-5 flex flex-col gap-3 mb-3 items-center w-[80%] md:w-1/2 md:mb-5 bg-ltgray rounded-xl shadow-lg lg:w-1/3">
							<h1 className="text-2xl font-bold text-center">Update Account</h1>

							<div className="flex flex-col w-full">
								<label
									className="font-bold text-xl tracking-wide"
									htmlFor="firstName">
									First Name
								</label>
								<input
									className="pl-1 py-1 border-b-2 border-black bg-ltgray font-thin"
									type="text"
									id="firstName"
									name="CustomerFirstName"
									placeholder={userDetails?.CustomerFirstName}
									onChange={(e) => setFormState(e)}
									value={
										updateDetails.CustomerFirstName
											? updateDetails.CustomerFirstName
											: ""
									}
								/>
							</div>
							<div className="flex flex-col w-full">
								<label
									className="font-bold text-xl tracking-wide"
									htmlFor="lastName">
									Last Name
								</label>
								<input
									className="pl-1 py-1 border-b-2 border-black bg-ltgray font-thin"
									type="text"
									id="lastName"
									name="CustomerLastName"
									placeholder={userDetails?.CustomerLastName}
									onChange={(e) => setFormState(e)}
									value={
										updateDetails.CustomerLastName
											? updateDetails.CustomerLastName
											: ""
									}
								/>
							</div>

							<div className="flex flex-col w-full">
								<label
									className="font-bold text-xl tracking-wide"
									htmlFor="phone">
									Phone Number
								</label>
								<input
									className="pl-1 py-1 border-b-2 border-black bg-ltgray font-thin"
									type="text"
									id="phone"
									name="CustomerPhoneNumber"
									placeholder={userDetails?.CustomerPhoneNumber}
									onChange={(e) => setFormState(e)}
									value={
										updateDetails.CustomerPhoneNumber
											? updateDetails.CustomerPhoneNumber
											: ""
									}
								/>
							</div>
							<div className="flex flex-col w-full">
								<label
									className="font-bold text-xl tracking-wide"
									htmlFor="address">
									Address
								</label>
								<input
									className="pl-1 py-1 border-b-2 border-black bg-ltgray font-thin"
									type="address"
									id="address"
									name="Address"
									placeholder={userDetails?.Address}
									onChange={(e) => setFormState(e)}
									value={updateDetails.Address ? updateDetails.Address : ""}
								/>
							</div>

							<div className="flex justify-center">
								<button
									className="bg-green text-gray text-lg px-3 py-1 duration-200 font-bold tracking-widest hover:bg-dkgreen rounded-full shadow-lg ease-in"
									type="button"
									onClick={() => updateUserAccount(updateDetails)}>
									UPDATE
								</button>
							</div>
						</form>
					</div>
					<DeleteCustomerForm />
				</div>
			</div>
		</>
	);
};

export default CustomerAccount;
