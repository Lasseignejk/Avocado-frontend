import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../../reducers/DashboardSlice";
import "../Admin/ManageRestaurants.css";
import UpdateRestaurantOptions from "../Admin/UpdateRestaurantOptions";
import { supabase } from "../../../supabase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRestaurant = ({ restaurants, toggle, setToggle }) => {
	const modal = document.querySelector(".modal");
	const infoDiv = document.querySelector(".infoDiv");

	const openModal = () => {
		modal.style.display = "block";
	};

	const openInfoDiv = () => {
		infoDiv.style.display = "block";
	};

	const closeModal = () => {
		modal.style.display = "none";
	};

	window.onclick = function (e) {
		if (e.target == modal) {
			modal.style.display = "none";
		}
	};
	const restaurantId = useSelector((state) => state?.currentRestaurant[0]);
	const userDetails = useSelector((state) => state?.userDetails[0]);
	const dispatch = useDispatch();
	const [restToEdit, setRestToEdit] = useState({});

	useEffect(() => {
		console.log();
		const getRestaurant = async () => {
			const response = await fetch(
				import.meta.env.VITE_BACKEND + "/admin/restaurant/getonerestaurant",
				{
					method: "GET",
					headers: {
						restid: restaurantId,
					},
				}
			);

			if (!response.ok) {
				window.alert(response?.statusText);
			} else {
				const json = await response?.json();

				setRestToEdit(json);
			}
		};
		getRestaurant();
	}, [restaurantId, toggle]);

	const [updateDetails, setUpdateDetails] = useState({});
	const setUpdateFormState = (e) => {
		setUpdateDetails({
			...updateDetails,
			[e.target.name]: e.target.value,
			id: restaurantId,
		});
	};

	const updateRestaurant = async (updateDetails) => {
		const checkDetails = (updateDetails) => {
			const filteredObject = Object.fromEntries(
				Object.entries(updateDetails).filter(([key, value]) => value !== "")
			);
			setUpdateDetails(filteredObject);
		};
		checkDetails(updateDetails);

		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/updaterestaurant",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateDetails),
			}
		);

		setToggle(!toggle);
		setUpdateDetails({ id: restaurantId });
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
			restaurantId.toString() +
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
			id: restaurantId,
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
		<div>
			You are about to delete your restaurant! All data will be gone forever!
			Are you sure you want to proceed?
			<div className="flex justify-between mt-3">
				<button
					type="button"
					className="bg-[#b8241a] px-3 py-1 text-gray"
					onClick={() => deleteRestaurant()}>
					DELETE
				</button>
				<button
					type="button"
					className="bg-green px-3 py-1 text-gray"
					onClick={closeToast}>
					CANCEL
				</button>
			</div>
		</div>
	);

	const displayDelete = () => {
		toast.warning(deleteToast);
	};

	const deleteRestaurant = async () => {
		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/deleterestaurant",
			{
				method: "DELETE",
				headers: {
					restid: restaurantId,
				},
			}
		);
	};

	return (
		<>
			<button
				className="bg-green px-3 py-1 text-gray openModal w-3/4 text-xl font-bold hover:bg-dkgreen duration-200 ease-in md:w-1/2 tracking-widest rounded-full"
				onClick={() => openModal()}>
				Update a restaurant's information
			</button>

			<div className="modal">
				<div className="modal-content bg-gray relative w-[80%] flex flex-col gap-3 sm:w-[500px] md:mt-[5%]">
					<span
						className="close absolute top-0 right-[10px] h-[10px]"
						onClick={() => closeModal()}>
						&times;
					</span>
					<ToastContainer draggablePercent={60} />
					<div className="flex justify-center">
						<UpdateRestaurantOptions
							restaurants={restaurants}
							openInfoDiv={openInfoDiv}
						/>
					</div>
					<div className="infoDiv">
						<h1 className="text-lg">{restToEdit[0]?.RestName}</h1>
						<p>{restToEdit[0]?.RestPhoneNumber}</p>
						<p>{restToEdit[0]?.RestLocation}</p>
						<p>{restToEdit[0]?.RestHours}</p>
					</div>
					<form className="flex flex-col gap-3 items-center">
						<div className="flex flex-col w-full">
							<label htmlFor="name" className="font-bold">
								restaurant name
							</label>
							<input
								className="pl-1"
								type="text"
								id="name"
								name="RestName"
								value={updateDetails.RestName ? updateDetails.RestName : ""}
								onChange={(e) => setUpdateFormState(e)}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="phone" className="font-bold">
								phone number
							</label>
							<input
								className="pl-1"
								type="text"
								id="phone"
								name="RestPhoneNumber"
								value={
									updateDetails.RestPhoneNumber
										? updateDetails.RestPhoneNumber
										: ""
								}
								onChange={(e) => setUpdateFormState(e)}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="location" className="font-bold">
								address
							</label>
							<input
								className="pl-1"
								type="text"
								id="location"
								name="RestLocation"
								value={
									updateDetails.RestLocation ? updateDetails.RestLocation : ""
								}
								onChange={(e) => setUpdateFormState(e)}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="hours" className="font-bold">
								hours
							</label>
							<input
								className="pl-1"
								type="text"
								id="hours"
								name="RestHours"
								value={updateDetails.RestHours ? updateDetails.RestHours : ""}
								onChange={(e) => setUpdateFormState(e)}
							/>
						</div>
						<div>
							<button
								type="button"
								className="bg-green text-gray tracking-widest px-3 py-1 font-bold rounded-full"
								onClick={() => updateRestaurant(updateDetails)}>
								UPDATE
							</button>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="logo" className="font-bold">
								Add a logo
							</label>
							<input
								className="w-1/2"
								type="file"
								id="logo"
								name="RestLogo"
								accept="image/png, image/jpeg"
								onChange={(e) => uploadImage(e)}
							/>
						</div>
						<div className="mt-5">
							<button
								className="bg-[#b8241a] text-gray tracking-widest py-1 px-3 rounded-full hover:bg-dkgreen flex justify-between items-center gap-1 font-bold"
								type="button"
								onClick={() => displayDelete()}>
								<img src="../../items/delete.svg" className="w-[30px]" />
								DELETE
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default UpdateRestaurant;
