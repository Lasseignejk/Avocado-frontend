import React, { useState } from "react";
import { useSelector } from "react-redux";

const RestaurantAddMenuItemForm = () => {
	const [newItem, setNewItem] = useState({});

	const restaurantId = useSelector((state) => state.currentRestaurant[0]);

	const setFormState = (e) => {
		setNewItem({
			...newItem,
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

	const sendToSupabase = async () => {
		const dataTosend = {
			...newItem,
			ItemBreakfast: breakfast,
			ItemIsPopular: popular,
			ItemAvailable: available,
			ItemDinner: dinner,
			ItemLunch: lunch,
			RestId: restaurantId,
		};
		console.log(dataTosend);
		const data = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/addtomenu",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataTosend),
			}
		);
	};

	return (
		<div className="w-[300px] h-[700px] bg-ltgray flex flex-col items-center p-5 gap-10 shadow-lg rounded-xl">
			<form className="flex flex-col gap-5 font-niveau font-bold">
				<h1 className="text-2xl font-bold text-center">Add a New Item</h1>
				<div className="flex flex-col">
					<label htmlFor="ItemName" className="text-xl tracking-wide">
						Item
					</label>
					<input
						className="bg-ltgray border-black border-b-2 pl-1 focus:border-none font-light"
						type="text"
						id="ItemName"
						name="ItemName"
						onChange={(e) => setFormState(e)}
						value={newItem.ItemName ? newItem.ItemName : ""}
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="ItemType" className="text-xl tracking-wide">
						Item Type
					</label>
					<select
						className="bg-ltgray border-black border-b-2 pl-1 focus:border-none font-light"
						type="text"
						id="ItemType"
						name="ItemType"
						onChange={(e) => setFormState(e)}
						defaultValue={"Please choose an option"}>
						<option disabled>Please choose an option</option>
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
					<label htmlFor="ItemPrice" className="text-xl tracking-wide">
						Price
					</label>
					<div className="flex">
						<span>$</span>
						<input
							className="bg-ltgray border-black border-b-2 pl-1 focus:border-none w-full font-light"
							type="text"
							id="ItemPrice"
							name="ItemPrice"
							onChange={(e) => setFormState(e)}
							value={newItem.ItemPrice ? newItem.ItemPrice : ""}
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<label htmlFor="ItemDescription" className="text-xl tracking-wide">
						Item Description
					</label>
					<textarea
						className="bg-ltgray border-black border-b-2 pl-1 focus:border-none font-light"
						rows="3"
						id="ItemDescription"
						name="ItemDescription"
						onChange={(e) => setFormState(e)}
						value={newItem.ItemDescription ? newItem.ItemDescription : ""}
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="ItemCookTime" className="text-xl tracking-wide">
						Cook Time
					</label>
					<input
						className="bg-ltgray border-black border-b-2 pl-1 focus:border-none font-light"
						type="text"
						id="ItemCookTime"
						name="ItemCookTime"
						onChange={(e) => setFormState(e)}
						value={newItem.ItemCookTime ? newItem.ItemCookTime : ""}
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
				<div className="flex flex-row gap-6 justify-evenly">
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

				<div className="flex flex-col">
					<label htmlFor="ItemImg">Item image URL</label>
					<input
						className="bg-ltgray border-black border-b-2 pl-1 focus:border-none font-light"
						type="text"
						id="ItemImg"
						name="ItemImg"
						onChange={(e) => setFormState(e)}
						value={newItem.ItemImg ? newItem.ItemImg : ""}
					/>
				</div>
				<div className="flex justify-center">
					<button
						className="bg-green text-gray tracking-widest py-1 px-3 rounded-full hover:bg-dkgreen duration-200 ease-in"
						type="button"
						onClick={() => sendToSupabase()}>
						SUBMIT
					</button>
				</div>
			</form>
		</div>
	);
};

export default RestaurantAddMenuItemForm;
