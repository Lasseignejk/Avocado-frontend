import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "/items/menu_placeholder.svg";
import { addCart } from "../reducers/DashboardSlice";
import MenuItemModal from "./MenuItemModal";

const MenuItem = ({ item, counter, setCounter }) => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);

	const shortenDescription = (description, num) => {
		let cut = description.indexOf(" ", num);
		if (cut == -1) {
			return description;
		} else {
			return description.substring(0, cut) + "...";
		}
	};

	// const shortTitle

	const shortDescription = shortenDescription(item.ItemDescription, 35);

	return (
		<div className="px-3 sm:px-0">
			<div
				className="flex flex-col bg-ltgray font-niveau gap-3 hover:bg-dkgray shadow-md md:hover:-translate-y-1 duration-200 ease-in w-full sm:w-[400px] md:shadow-md rounded-3xl hover:cursor-pointer"
				onClick={() => setOpenModal(true)}>
				<div className="flex gap-3">
					<div className="grid place-items-center w-1/2 ">
						<div className="w-full overflow:hidden">
							<img
								className="w-full h-full rounded-tl-3xl rounded-bl-3xl"
								src={item.ItemImg ? item.ItemImg : placeholder}
								alt=""
							/>
						</div>
					</div>
					<div className="flex flex-col w-1/2 py-3 px-3">
						<div className="flex flex-col">
							<div className="flex flex-wrap items-center">
								<h1 className="text-xl font-bold">{item.ItemName}</h1>
							</div>
							<div>
								<h1 className="font-light ">${item.ItemPrice}.00</h1>
							</div>
							<h1 className="pt-2 font-light text-sm text-[#747474]">
								{shortDescription}
							</h1>
						</div>
					</div>
					{/* <div className="">
						<button
							className="w-full bg-green font-bold text-gray px-2 rounded-full hover:bg-dkgreen hover:text-ltgray duration-200"
							onClick={() => increaseCounter()}>
							+
						</button>
					</div> */}
				</div>
			</div>
			<>
				{openModal && (
					<MenuItemModal
						className="fixed"
						item={item}
						setOpenModal={setOpenModal}
						counter={counter}
						setCounter={setCounter}
					/>
				)}
			</>
		</div>
	);
};

export default MenuItem;
