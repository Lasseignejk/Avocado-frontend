import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DeleteAdminForm = ({ rest, setRest }) => {
	const userDetails = useSelector((state) => state?.userDetails[0]);
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

	const checkRestaurants = async () => {
		getRestaurants();

		if (rest.length > 0) {
			displayError();
		} else {
			displayDelete();
		}
	};

	const displayDelete = () => {
		toast.warning(deleteToast, {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	const displayError = () => {
		toast.error(errorToast, {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	const deleteAdmin = async () => {
		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/deleteAdmin",
			{
				method: "DELETE",
				headers: {
					id: userDetails.id,
				},
			}
		);
		// navigate to login screen
	};

	const errorToast = ({ closeToast, toastProps }) => (
		<div className="">
			You still have restaurants attached to your account. Please delete your
			restaurants.
			<div className="flex justify-between mt-3">
				<Link to={"/managerestaurants"}>
					<button
						type="button"
						className="bg-[#b8241a] px-3 py-1 text-gray rounded-full font-bold">
						My Restaurants
					</button>
				</Link>
				<button
					type="button"
					className="bg-green px-3 py-1 text-gray rounded-full font-bold"
					onClick={closeToast}>
					Close
				</button>
			</div>
		</div>
	);

	const deleteToast = ({ closeToast, toastProps }) => (
		<div className="">
			You are about to delete your account! All data will be gone forever! Are
			you sure you want to proceed?
			<div className="flex justify-between mt-3">
				<button
					type="button"
					className="bg-[#b8241a] px-3 py-1 text-gray rounded-full"
					onClick={() => deleteAdmin()}>
					DELETE
				</button>
				<button
					type="button"
					className="bg-green px-3 py-1 text-gray rounded-full"
					onClick={closeToast}>
					CANCEL
				</button>
			</div>
		</div>
	);

	return (
		<div className="flex justify-center mb-3 lg:justify-start w-full lg:items-center">
			<ToastContainer />
			<form className="px-3 py-5 flex flex-col gap-3 mb-3 items-center w-[80%] md:w-1/2 md:mb-5 bg-ltgray rounded-xl shadow-lg lg:w-full">
				<h1 className="text-2xl font-bold text-[#b8241a] tracking-wider flex gap-2 items-center">
					<FaExclamationTriangle /> DANGER ZONE <FaExclamationTriangle />
				</h1>
				<p className="text-center">
					If you delete your account, all your restaurants, reports, and data
					will be lost forever. Only click the button below if you understand
					the consequences.
				</p>
				<button
					type="button"
					className="bg-[#b8241a] text-gray px-3 py-1 rounded-full tracking-wider hover:bg-[#992017] shadow-lg duration-200 ease-in"
					onClick={() => checkRestaurants()}>
					DELETE MY ACCOUNT
				</button>
			</form>
		</div>
	);
};

export default DeleteAdminForm;
