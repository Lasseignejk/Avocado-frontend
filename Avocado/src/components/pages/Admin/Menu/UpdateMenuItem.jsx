import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import "../ManageRestaurants/ManageRestaurants.css";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateMenuItem = ({ item, setOpenModal, setMenu }) => {
	const [updateItem, setUpdateItem] = useState({});
	const restaurantId = useSelector((state) => state.currentRestaurant[0]);
	const userDetails = useSelector((state) => state?.userDetails[0]);

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase
				.from("MenuItems")
				.select()
				.eq("id", item.id)
				.single();

			if (error) {
				console.log(error);
			}
			if (data) {
				setUpdateItem(data);
			}
		};
		fetchData();
	}, [item.id]);

	const setFormState = (e) => {
		setUpdateItem({
			...updateItem,
			[e.target.name]: e.target.value,
		});
	};

	const [breakfast, setBreakfast] = useState(false);
	const toggleBreakfast = () => {
		setBreakfast(!breakfast);
	};
	const [lunch, setLunch] = useState(false);
	const toggleLunch = () => {
		setLunch(!lunch);
	};
	const [dinner, setDinner] = useState(false);
	const toggleDinner = () => {
		setDinner(!dinner);
	};
	const [available, setAvailable] = useState(false);
	const toggleAvailable = () => {
		setAvailable(!available);
	};
	const [popular, setPopular] = useState(false);
	const togglePopular = () => {
		setPopular(!popular);
	};

	const sendItemUpdate = async () => {
		const dataTosend = {
			...updateItem,
			ItemBreakfast: breakfast,
			ItemIsPopular: popular,
			ItemAvailable: available,
			ItemDinner: dinner,
			ItemLunch: lunch,
			id: item.id,
		};
		console.log("Data to send: ", dataTosend);
		const data = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/updatemenuitem",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataTosend),
			}
		);
		setOpenModal(false);
		console.log("UPDATE: ", data);
	};

	const deleteItem = async () => {
		const { data, error } = await supabase
			.from("MenuItems")
			.delete()
			.eq("id", item.id);

		if (error) {
			console.log("error here: ", error);
		}
		if (data) {
			console.log("data here: ", data);
		}
		setOpenModal(false);
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
			"/menuItem_" +
			filePath;

		try {
			if (!e.target.files || e.target.files.length === 0) {
				toast("You must select an image to upload");
			}

			const { data, error } = await supabase.storage
				.from("menuitems")
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

		const imgPath = {
			ItemImg:
				"https://dwjnomervswgqasgexck.supabase.co/storage/v1/object/public/menuitems/" +
				uploadPath,
			id: item.id,
		};
		console.log(item.id);
		console.log(imgPath);

		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/updatemenuitem",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(imgPath),
			}
		);

		setToggle(!toggle);
	};

	return (
		<div
			className="updateItemModal fixed inset-0 flex flex-col justify-center items-center z-auto bg-overlay"
			// onClick={() => setOpenModal(false)}
		>
			<div className="w-[80%] sm:w-[600px] overflow-auto">
				<div className="flex flex-col">
					<form className=" bg-ltgray flex flex-col gap-2 font-niveau font-bold p-4">
						<div className="w-full flex justify-end items-center relative">
							<span
								className="absolute top-[-15px] right-[-15px] text-2xl h-[30px] w-[30px] flex items-center justify-center hover:text-green ease-in duration-200 hover:cursor-pointer"
								onClick={() => setOpenModal(false)}>
								&times;
							</span>
							<ToastContainer draggablePercent={60} />
						</div>
						<div className="flex justify-center">
							<h1 className="text-2xl">Edit {updateItem.ItemName}</h1>

							{/* <button
								className="bg-green text-gray tracking-widest py-1 px-2 hover:bg-dkgreen"
								onClick={() => setOpenModal(false)}>
								X
							</button> */}
						</div>
						<div className="flex flex-col gap-5 sm:flex-row sm:px-5 sm:justify-between">
							<div className="w-[300] flex flex-col gap-3">
								<div className="flex flex-col">
									<label htmlFor="ItemName" className="text-lg tracking-wide">
										Item
									</label>
									<input
										className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
										type="text"
										id="ItemName"
										name="ItemName"
										onChange={(e) => setFormState(e)}
										value={updateItem.ItemName ? updateItem.ItemName : ""}
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="ItemType" className="text-lg tracking-wide">
										Item Type
									</label>
									<select
										className="bg-ltgray border-black border-b-2 pl-1 py-1 focus:border-none w-full font-thin"
										type="text"
										id="ItemType"
										name="ItemType"
										onChange={(e) => setFormState(e)}
										value={updateItem.ItemType ? updateItem.ItemType : ""}>
										<option>Appetizer</option>
										<option>Dessert</option>
										<option>Drink</option>
										<option>Main</option>
										<option>Salad</option>
										<option>Side</option>
										<option>Soup</option>
									</select>
								</div>
								<div className="flex flex-col">
									<label htmlFor="ItemPrice" className="text-lg tracking-wide">
										Price
									</label>
									<div className="flex gap-1">
										<span>$</span>
										<input
											className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
											type="text"
											id="ItemPrice"
											name="ItemPrice"
											onChange={(e) => setFormState(e)}
											value={updateItem.ItemPrice ? updateItem.ItemPrice : ""}
										/>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-3">
								<div className="flex flex-col">
									<label
										htmlFor="ItemDescription"
										className="text-lg tracking-wide">
										Item Description
									</label>
									<textarea
										className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
										rows="3"
										id="ItemDescription"
										name="ItemDescription"
										onChange={(e) => setFormState(e)}
										value={
											updateItem.ItemDescription
												? updateItem.ItemDescription
												: ""
										}
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="ItemCookTime"
										className="text-lg tracking-wide">
										Cook Time
									</label>
									<input
										className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-thin"
										type="text"
										id="ItemCookTime"
										name="ItemCookTime"
										onChange={(e) => setFormState(e)}
										value={
											updateItem.ItemCookTime ? updateItem.ItemCookTime : ""
										}
									/>
								</div>
								<div className="flex flex-row gap-6">
									<div className="flex gap-2">
										<label htmlFor="ItemBreakfast">Breakfast</label>
										<input
											className="hover:cursor-pointer"
											type="checkbox"
											id="ItemBreakfast"
											name="ItemBreakfast"
											checked={breakfast}
											onChange={toggleBreakfast}
										/>
									</div>
									<div className="flex gap-2">
										<label htmlFor="ItemLunch">Lunch</label>
										<input
											className="hover:cursor-pointer"
											type="checkbox"
											id="ItemLunch"
											name="ItemLunch"
											checked={lunch}
											onChange={toggleLunch}
										/>
									</div>
									<div className="flex gap-2">
										<label htmlFor="ItemDinner">Dinner</label>
										<input
											className="hover:cursor-pointer"
											type="checkbox"
											id="ItemDinner"
											name="ItemDinner"
											checked={dinner}
											onChange={toggleDinner}
										/>
									</div>
								</div>
								<div className="flex flex-row justify-evenly">
									<div className="flex gap-2">
										<label htmlFor="ItemAvailable">Available?</label>
										<input
											className="hover:cursor-pointer"
											type="checkbox"
											id="ItemAvailable"
											name="ItemAvailable"
											checked={available}
											onChange={toggleAvailable}
										/>
									</div>
									<div className="flex gap-2">
										<label htmlFor="ItemIsPopular">Popular?</label>
										<input
											className="hover:cursor-pointer"
											type="checkbox"
											id="ItemIsPopular"
											name="ItemIsPopular"
											checked={popular}
											onChange={togglePopular}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-center gap-4 mt-5">
							<button
								className="bg-green text-gray tracking-widest py-1 px-3 hover:bg-dkgreen flex justify-between items-center gap-3 duration-200 ease-in rounded-full"
								type="button"
								onClick={() => sendItemUpdate()}>
								<FaCheck />
								UPDATE
							</button>
							<div className="">
								<button
									className="bg-[#b8241a] text-gray tracking-widest py-1 px-3 hover:bg-[#992017] flex justify-between items-center gap-3 duration-200 ease-in rounded-full"
									type="button"
									onClick={() => deleteItem()}>
									<FaRegTrashAlt />
									DELETE
								</button>
							</div>
						</div>
						<div className="flex flex-col md:pl-5">
							<label htmlFor="ItemImg" className="text-lg tracking-wide">
								Add an image
							</label>
							<input
								className="font-thin"
								type="file"
								id="ItemImg"
								name="ItemImg"
								onChange={(e) => uploadImage(e)}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateMenuItem;
