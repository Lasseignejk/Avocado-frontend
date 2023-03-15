import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSignOut } from "../../Layout/Queries";

const DeleteCustomerForm = () => {
	const userDetails = useSelector((state) => state?.userDetails[0]);
	const signOut = useSignOut();

	const displayDelete = () => {
		toast.warning(deleteToast, {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	const deleteCustomer = async () => {
		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/customer/deletecustomer",
			{
				method: "DELETE",
				headers: {
					id: userDetails.id,
				},
			}
		);
		signOut();
	};

	const deleteToast = ({ closeToast, toastProps }) => (
		<div className="">
			You are about to delete your account! All data will be gone forever! Are
			you sure you want to proceed?
			<div className="flex justify-between mt-3">
				<button
					type="button"
					className="bg-[#b8241a] px-3 py-1 text-gray rounded-full"
					onClick={() => deleteCustomer()}>
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
		<div className="flex justify-center mb-3 lg:justify-start">
			<form className="px-3 py-5 flex flex-col gap-3 mb-3 items-center w-[80%] md:w-1/2 md:mb-5 bg-ltgray rounded-xl shadow-lg lg:w-1/3">
				<h1 className="text-2xl font-bold text-[#b8241a] tracking-wider flex gap-2 items-center">
					<FaExclamationTriangle /> DANGER ZONE <FaExclamationTriangle />
				</h1>
				<button
					type="button"
					className="bg-[#b8241a] text-gray px-3 py-1 rounded-full tracking-wider hover:bg-[#992017] shadow-lg duration-200 ease-in"
					onClick={() => displayDelete()}>
					DELETE MY ACCOUNT
				</button>
			</form>
		</div>
	);
};

export default DeleteCustomerForm;
