import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../../reducers/DashboardSlice";
import "../Admin/ManageRestaurants.css";
import UpdateRestaurantOptions from "../Admin/UpdateRestaurantOptions";

const UpdateRestaurant = ({ restaurants }) => {
	const modal = document.querySelector(".modal");

	const openModal = () => {
		modal.style.display = "block";
	};

	const closeModal = () => {
		modal.style.display = "none";
	};

	window.onclick = function (e) {
		if (e.target == modal) {
			modal.style.display = "none";
		}
	};
	const restaurantId = useSelector(
		(state) => state?.dashboard?.currentRestaurant[0]
	);
	const userDetails = useSelector(
		(state) => state?.dashboard?.userDetails[0][0]
	);
	const dispatch = useDispatch();
	const [restToEdit, setRestToEdit] = useState({});

	let name = restToEdit[0]?.RestName;
	console.log(name);

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
				console.log(json);
			}
		};
		getRestaurant();
	}, [restaurantId]);

	const [updateDetails, setUpdateDetails] = useState({});
	const setUpdateFormState = (e) => {
		setUpdateDetails({
			...updateDetails,
			[e.target.name]: e.target.value,
			OwnerId: userDetails?.id,
			// RestLogo: restLogo,
		});
	};

	return (
		<>
			<button
				className="bg-green px-3 py-1 text-gray openModal w-1/2"
				onClick={() => openModal()}>
				Update a restaurant's information
			</button>

			<div className="modal">
				<div className="modal-content relative">
					<span
						className="close absolute top-0 right-[10px]"
						onClick={() => closeModal()}>
						&times;
					</span>
					<UpdateRestaurantOptions restaurants={restaurants} />
					<form>
						<div className="flex flex-col w-full">
							<label htmlFor="name" className="font-bold">
								restaurant name
							</label>
							<input
								className="pl-3 border-2 border-black"
								type="text"
								id="name"
								name="RestName"
								value={name}
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
					</form>
				</div>
			</div>
		</>
	);
};

export default UpdateRestaurant;
