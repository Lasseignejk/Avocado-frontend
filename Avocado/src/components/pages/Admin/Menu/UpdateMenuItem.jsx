import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import "../ManageRestaurants.css";

const UpdateMenuItem = ({ item, setOpenModal, setMenu }) => {
	const [updateItem, setUpdateItem] = useState({});

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

	return (
		<div
			className="fixed inset-0 flex flex-col justify-center items-center z-auto bg-overlay"
			// onClick={() => setOpenModal(false)}
		>
			<div className="w-[80%]">
				<form className=" bg-gray flex flex-col gap-5 font-niveau font-bold p-4">
					<div className="flex justify-between">
						<h1>Edit Item</h1>
						<button
							className="bg-green text-gray tracking-widest py-1 px-2 hover:bg-dkgreen"
							onClick={() => setOpenModal(false)}>
							X
						</button>
					</div>
					<div className="flex gap-4">
						<div className="w-[300]">
							<div className="flex flex-col">
								<label htmlFor="ItemName">Item</label>
								<input
									type="text"
									id="ItemName"
									name="ItemName"
									onChange={(e) => setFormState(e)}
									value={updateItem.ItemName ? updateItem.ItemName : ""}
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="ItemType">Item Type</label>
								<select
									type="text"
									id="ItemType"
									name="ItemType"
									onChange={(e) => setFormState(e)}
									value={updateItem.ItemType ? updateItem.ItemType : ""}>
									<option>Appetizer</option>
									<option>Salad</option>
									<option>Soup</option>
									<option>Main</option>
									<option>Dessert</option>
									<option>Drink</option>
								</select>
							</div>
							<div className="flex flex-col">
								<label htmlFor="ItemPrice">Price</label>
								<input
									type="text"
									id="ItemPrice"
									name="ItemPrice"
									onChange={(e) => setFormState(e)}
									value={updateItem.ItemPrice ? updateItem.ItemPrice : ""}
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="ItemDescription">Item Description</label>
								<textarea
									rows="3"
									id="ItemDescription"
									name="ItemDescription"
									onChange={(e) => setFormState(e)}
									value={
										updateItem.ItemDescription ? updateItem.ItemDescription : ""
									}
								/>
							</div>
						</div>
						<div>
							<div className="flex flex-row gap-6">
								<div className="flex gap-2">
									<label htmlFor="ItemBreakfast">Breakfast</label>
									<input
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
										type="checkbox"
										id="ItemDinner"
										name="ItemDinner"
										checked={dinner}
										onChange={toggleDinner}
									/>
								</div>
							</div>
							<div className="flex flex-row gap-6">
								<div className="flex gap-2">
									<label htmlFor="ItemAvailable">Available?</label>
									<input
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
										type="checkbox"
										id="ItemIsPopular"
										name="ItemIsPopular"
										checked={popular}
										onChange={togglePopular}
									/>
								</div>
							</div>
							<div className="flex flex-col">
								<label htmlFor="ItemCookTime">Cooking Time</label>
								<input
									type="text"
									id="ItemCookTime"
									name="ItemCookTime"
									onChange={(e) => setFormState(e)}
									value={updateItem.ItemCookTime ? updateItem.ItemCookTime : ""}
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="ItemImg">Item image URL</label>
								<input
									type="text"
									id="ItemImg"
									name="ItemImg"
									onChange={(e) => setFormState(e)}
									value={updateItem.ItemImg ? updateItem.ItemImg : ""}
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-end gap-4">
						<button
							className="bg-green text-gray tracking-widest py-1 px-2 hover:bg-dkgreen"
							type="button"
							onClick={() => sendItemUpdate()}>
							UPDATE
						</button>
						<button
							className="bg-green text-gray tracking-widest py-1 px-2 hover:bg-dkgreen"
							type="button"
							onClick={() => deleteItem()}>
							DELETE
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateMenuItem;
