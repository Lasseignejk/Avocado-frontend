import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";

import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRestaurantModal = ({
	setOpenModal,
	toggle,
	setToggle,
	restaurant,
}) => {
	const userDetails = useSelector((state) => state?.userDetails[0]);
	const dispatch = useDispatch();
	const [restToEdit, setRestToEdit] = useState({});
	const [updateDetails, setUpdateDetails] = useState([{}]);

	useEffect(() => {
		const getRestaurant = async () => {
			const response = await fetch(
				import.meta.env.VITE_BACKEND + "/admin/restaurant/getonerestaurant",
				{
					method: "GET",
					headers: {
						restid: restaurant.id,
					},
				}
			);

			if (!response.ok) {
				window.alert(response?.statusText);
			} else {
				const json = await response?.json();
				setRestToEdit(json[0]);
			}
		};
		getRestaurant();
	}, [restaurant.id, toggle]);

	const setUpdateFormState = (e) => {
		setRestToEdit({
			...restToEdit,
			[e.target.name]: e.target.value,
			id: restaurant.id,
		});
	};

	const updateRestaurant = async (restToEdit) => {
		console.log(restToEdit);

		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/updaterestaurant",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(restToEdit),
			}
		);

		setToggle(!toggle);
		// setRestToEdit({ id: restaurant.id });
		toast.success("Restaurant Updated!", {
			position: toast.POSITION.TOP_CENTER,
			icon: <img src="../../logos/icon_green.svg" alt="" />,
		});
	};
	const uploadImage = async (e) => {
		let file = e.target.files[0];
		console.log(file);
		const fileEXT = file.name.split(".").pop();
		const fileName = file.name.split(".").shift();
		const filePath = `${fileName}.${fileEXT}`;
		const id = userDetails.id.toString();
		const uploadPath =
			"user" +
			id +
			"/" +
			"rest" +
			restaurant.id.toString() +
			"/logo_" +
			filePath;

		try {
			if (!e.target.files || e.target.files.length === 0) {
				toast("You must select an image to upload");
			}

			const { data, error } = await supabase.storage
				.from("restaurantlogos")
				.upload(uploadPath, file);

			if (error) {
				throw error;
			}
			if (data) {
				toast.success("Photo uploaded!", {
					position: toast.POSITION.TOP_CENTER,
					icon: <img src="../../logos/icon_green.svg" alt="" />,
				});
			}
			console.log(data);
		} catch (error) {
			alert(error.message);
		}

		const logoPath = {
			RestLogo:
				"https://dwjnomervswgqasgexck.supabase.co/storage/v1/object/public/restaurantlogos/" +
				uploadPath,
			id: restaurant.id,
		};
		console.log(logoPath);

		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/updaterestaurant",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(logoPath),
			}
		);

		setToggle(!toggle);
	};

	const deleteToast = ({ closeToast, toastProps }) => (
		<div className="">
			You are about to delete your restaurant! All data will be gone forever!
			Are you sure you want to proceed?
			<div className="flex justify-between mt-3">
				<button
					type="button"
					className="bg-[#b8241a] px-3 py-1 text-gray rounded-full"
					onClick={() => deleteRestaurant()}>
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

	const displayDelete = () => {
		toast.warning(deleteToast, {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	const deleteRestaurant = async () => {
		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/deleterestaurant",
			{
				method: "DELETE",
				headers: {
					restid: restaurant.id,
				},
			}
		);
	};

	return (
		<div className="font-niveau font-bold fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-auto bg-overlay">
			<div className="modal-content bg-ltgray relative w-[80%] flex flex-col gap-3 rounded-xl sm:w-[500px] md:mt-[10%]">
				<span
					className="close absolute top-0 right-[10px] h-[10px]"
					onClick={() => setOpenModal(false)}>
					&times;
				</span>
				<ToastContainer draggablePercent={60} />

				<form className="flex flex-col gap-3 items-center">
					<div className="flex flex-col w-full">
						<label htmlFor="name" className="text-lg tracking-wide">
							Restaurant Name
						</label>
						<input
							className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
							type="text"
							id="name"
							name="RestName"
							value={restToEdit.RestName ? restToEdit.RestName : ""}
							onChange={(e) => setUpdateFormState(e)}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="phone" className="text-lg tracking-wide">
							Phone Number
						</label>
						<input
							className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
							type="text"
							id="phone"
							name="RestPhoneNumber"
							value={
								restToEdit.RestPhoneNumber ? restToEdit.RestPhoneNumber : ""
							}
							onChange={(e) => setUpdateFormState(e)}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="location" className="text-lg tracking-wide">
							Address
						</label>
						<input
							className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
							type="text"
							id="location"
							name="RestLocation"
							value={restToEdit.RestLocation ? restToEdit.RestLocation : ""}
							onChange={(e) => setUpdateFormState(e)}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="hours" className="text-lg tracking-wide">
							Hours
						</label>
						<input
							className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
							type="text"
							id="hours"
							name="RestHours"
							value={restToEdit.RestHours ? restToEdit.RestHours : ""}
							onChange={(e) => setUpdateFormState(e)}
						/>
					</div>
					<div className="flex justify-evenly w-full mt-3">
						<div>
							<button
								type="button"
								className="bg-green text-gray tracking-widest py-1 px-3 hover:bg-dkgreen flex justify-between items-center gap-3 duration-200 ease-in rounded-full font-bold"
								onClick={() => updateRestaurant(restToEdit)}>
								<FaCheck />
								UPDATE
							</button>
						</div>
						<div>
							<button
								className="bg-[#b8241a] text-gray tracking-widest py-1 px-3 hover:bg-[#992017] flex justify-between items-center gap-3 duration-200 ease-in rounded-full font-bold"
								type="button"
								onClick={() => displayDelete()}>
								<FaRegTrashAlt />
								DELETE
							</button>
						</div>
					</div>
					<div className="flex flex-col w-full mt-5">
						<label htmlFor="logo" className="text-lg tracking-wide">
							Add a logo
						</label>
						<input
							className="w-full font-thin"
							type="file"
							id="logo"
							name="RestLogo"
							accept="image/png, image/jpeg"
							onChange={(e) => uploadImage(e)}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateRestaurantModal;
