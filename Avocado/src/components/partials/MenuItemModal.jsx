import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { addCart } from "../reducers/DashboardSlice";

const MenuItemModal = ({ item, setOpenModal, counter, setCounter }) => {
	const dispatch = useDispatch();

	const increaseCounter = () => (
		setCounter(counter + 1), dispatch(addCart(item))
	);

	return (
		<div className="font-niveau font-bold fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-20 bg-overlay ">
			<div className="modal-content bg-ltgray relative w-[85%] flex flex-col gap-3 rounded-3xl pb-5 sm:w-[500px] md:mt-[0]">
				<span
					className="absolute top-[10px] right-[10px] text-2xl h-[40px] w-[40px] flex items-center justify-center hover:bg-green hover:text-ltgray ease-in duration-200 hover:cursor-pointer rounded-full bg-ltgray"
					onClick={() => setOpenModal(false)}>
					<FaTimes />
				</span>
				<div>
					<img
						src={item.ItemImg}
						alt=""
						className="rounded-tl-3xl rounded-tr-3xl"
					/>
				</div>
				<div className="flex flex-col gap-3 px-8 py-1">
					<div className="">
						<h1 className="text-2xl">{item.ItemName}</h1>
						<p className="font-light">${item.ItemPrice}</p>
					</div>

					<div className="">
						<p className="text-[#747474] font-light text-lg leading-tight">
							{item.ItemDescription}
						</p>
					</div>
					<div className="flex justify-center">
						<button
							type="button"
							className="px-5 py-1 bg-green rounded-full text-xl text-ltgray hover:bg-dkgreen"
							onClick={() => increaseCounter()}>
							Add to Cart{" "}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuItemModal;
