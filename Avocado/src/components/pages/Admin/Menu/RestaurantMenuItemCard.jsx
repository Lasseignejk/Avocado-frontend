import React, { useState } from "react";
import placeholder from "/items/menu_placeholder.png";
import UpdateMenuItem from "./UpdateMenuItem";
import { FaCog } from "react-icons/fa";

const RestaurantMenuItemCard = ({ item, setMenu, toggle, setToggle }) => {
	const [openModal, setOpenModal] = useState(false);

	const shortenTitle = (title, num) => {
		let cut = title.indexOf(" ", num);
		if (cut == -1) {
			return title;
		} else {
			return title.substring(0, cut) + "...";
		}
	};

	return (
		<div className="flex-col w-[350px]">
			<div className="bg-ltgray font-niveau pr-3 flex gap-1 duration-200 ease-in w-full shadow-md justify-between rounded-xl h-[100px]">
				<div className="flex gap-2">
					<img
						className="w-24 rounded-tl-xl rounded-bl-xl"
						src={item.ItemImg ? item.ItemImg : placeholder}
						alt="item image"
					/>
					<div className="py-3">
						<h1 className="font-bold">{shortenTitle(item?.ItemName, 15)}</h1>
						<h1>${item?.ItemPrice}</h1>
						<h1>{item?.ItemType}</h1>
					</div>
				</div>
				<div className="grid place-items-center">
					<button
						className="px-1 text-gray text-xl font-bold duration-200 ease-in w-[50px] h-[50px] grid place-items-center rounded-full hover:bg-green"
						onClick={() => setOpenModal(true)}>
						<FaCog className="text-dkgray text-2xl" />
					</button>
				</div>
			</div>
			<div>
				{openModal && (
					<UpdateMenuItem
						className="fixed"
						item={item}
						setOpenModal={setOpenModal}
						setMenu={setMenu}
						toggle={toggle}
						setToggle={setToggle}
					/>
				)}
			</div>
		</div>
	);
};

export default RestaurantMenuItemCard;
