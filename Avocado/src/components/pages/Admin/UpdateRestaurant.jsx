import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../../reducers/DashboardSlice";
import "../Admin/ManageRestaurants.css";
import UpdateRestaurantOptions from "../Admin/UpdateRestaurantOptions";
import { supabase } from "../../../supabase";

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
	const userDetails = useSelector((state) => state?.userDetails[0][0]);
	const dispatch = useDispatch();
	const [restToEdit, setRestToEdit] = useState({});

	useEffect(() => {
		console.log();
		const getRestaurant = async () => {
			const response = await fetch(
				"http://localhost:3060/admin/restaurant/getonerestaurant",
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
			"http://localhost:3060/admin/restaurant/updaterestaurant",
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
	};

	const uploadImage = async (e) => {
		let file = e.target.files[0];
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
				throw new Error("You must select an image to upload");
			}

			const { data, error } = await supabase.storage
				.from("restaurantlogos")
				.upload(uploadPath, file);

			if (error) {
				throw error;
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
			"http://localhost:3060/admin/restaurant/updaterestaurant",
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

	return (
		<>
			<button
				className="bg-green px-3 py-1 text-gray openModal w-3/4 text-xl font-bold hover:bg-dkgreen duration-200 ease-in md:w-1/2"
				onClick={() => openModal()}>
				Update a restaurant's information
			</button>

			<div className="modal">
				<div className="modal-content relative w-[80%] flex flex-col gap-3 sm:w-[500px] md:mt-[5%]">
					<span
						className="close absolute top-0 right-[10px]"
						onClick={() => closeModal()}>
						&times;
					</span>
					<div className="flex justify-center">
						<UpdateRestaurantOptions
							restaurants={restaurants}
							openInfoDiv={openInfoDiv}
						/>
					</div>
					<div className="infoDiv">
						<h1 className="text-lg">{restToEdit[0]?.RestName}</h1>
						<p>{restToEdit[0]?.RestHours}</p>
						<p>{restToEdit[0]?.RestLocation}</p>
						<p>{restToEdit[0]?.RestPhoneNumber}</p>
					</div>
					<form className="flex flex-col gap-3 items-center">
						<div className="flex flex-col w-full">
							<label htmlFor="name" className="font-bold">
								restaurant name
							</label>
							<input
								className="pl-3 border-2 border-black"
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
								className="pl-3 border-2 border-black"
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
								className="pl-3 border-2 border-black"
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
								className="pl-3 border-2 border-black"
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
								className="bg-green text-gray px-3 py-1"
								onClick={() => updateRestaurant(updateDetails)}>
								Update
							</button>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="logo" className="font-bold">
								Add a logo
							</label>
							<input
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
		</>
	);
};

export default UpdateRestaurant;
