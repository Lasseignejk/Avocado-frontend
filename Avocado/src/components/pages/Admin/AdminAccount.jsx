import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminNavBar from "../../partials/AdminNavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteAdminForm from "./DeleteAdminForm";
import { setUserDetails } from "../../reducers/DashboardSlice";
import { supabase } from "../../../supabase";

const AdminAccount = () => {
	const userDetails = useSelector((state) => state?.userDetails[0]);
	const dispatch = useDispatch();

	const [updateDetails, setupdateDetails] = useState({});
	const [rest, setRest] = useState([{}]);
	const [toggle, setToggle] = useState(true);

	const getRestaurants = async () => {
		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/getrestaurants",

			{
				method: "GET",
				headers: {
					userid: userDetails.id,
				},
			}
		);
		if (!response.ok) {
			window.alert(response.statusText);
		} else {
			const data = await response.json();
			setRest(data);
		}
	};

	const fetchUserData = async () => {
		const { data, error } = await supabase
			.from("Owner")
			.select()
			.eq("OwnerEmail", userDetails.OwnerEmail);

		if (error) {
			setError(error);
			return;
		}
		if (data) {
			dispatch(setUserDetails(data[0]));
		}
	};

	useEffect(() => {
		getRestaurants();
		fetchUserData();
	}, [toggle]);

	const setFormState = (e) => {
		setupdateDetails({
			...updateDetails,
			[e.target.name]: e.target.value,
			id: userDetails.id,
		});
	};

	const updateUserAccount = async (updateDetails) => {
		const data = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/updateAdmin",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateDetails),
			}
		);
		if (data) {
			setToggle(!toggle);
			setupdateDetails({ id: userDetails.id });

			toast.success("Account Updated!", {
				position: toast.POSITION.TOP_CENTER,
				icon: <img src="../../logos/icon_green.svg" alt="" />,
			});
		}
	};

	return (
		<div className="mb-[55px] lg:flex lg:mb-0">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 lg:w-full lg:px-16 lg:pt-10">
				<ToastContainer />
				<div className="flex flex-col gap-3">
					<h1 className="text-center text-4xl px-3 lg:px-0 font-bold text-green lg:text-left">
						{userDetails?.OwnerFirstName} {userDetails?.OwnerLastName}
					</h1>
					<h1 className="text-center text-3xl font-bold lg:text-left">
						Account Details
					</h1>
				</div>

				<div className="flex justify-center lg:justify-start">
					<form className="px-3 py-5 flex flex-col gap-3 mb-3 items-center w-[80%] md:w-1/2 md:mb-5 bg-ltgray rounded-xl shadow-lg lg:w-1/3">
						<h1 className="text-2xl font-bold text-center tracking-wider">
							Update Account
						</h1>

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
								name="OwnerFirstName"
								placeholder={userDetails?.OwnerFirstName}
								onChange={(e) => setFormState(e)}
								value={
									updateDetails.OwnerFirstName
										? updateDetails.OwnerFirstName
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
								name="OwnerLastName"
								placeholder={userDetails?.OwnerLastName}
								onChange={(e) => setFormState(e)}
								value={
									updateDetails.OwnerLastName ? updateDetails.OwnerLastName : ""
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
								name="OwnerPhoneNumber"
								placeholder={userDetails?.OwnerPhoneNumber}
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
								className="bg-green text-gray text-lg px-3 py-1 duration-200 font-bold tracking-widest hover:bg-dkgreen rounded-full shadow-lg ease-in"
								type="button"
								onClick={() => updateUserAccount(updateDetails)}>
								UPDATE
							</button>
						</div>
					</form>
				</div>
				<DeleteAdminForm rest={rest} setRest={setRest} />
			</div>
		</div>
	);
};

export default AdminAccount;
