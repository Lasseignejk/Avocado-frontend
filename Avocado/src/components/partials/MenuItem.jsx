import React from "react";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "/items/menu_placeholder.svg";
import { addCart } from "../reducers/DashboardSlice";

const MenuItem = ({ item, counter, setCounter }) => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const increaseCounter = () => (
		setCounter(counter + 1), dispatch(addCart(item))
	);
	return (
		<div>
			<div className="flex flex-col bg-ltgray  font-niveau px-3 py-3 gap-3 hover:bg-dkgray md:hover:-translate-y-1 duration-200 ease-in sm:w-[400px] md:py-3 md:shadow-xl rounded-2xl">
				<div className="flex gap-3">
					<div className="grid place-items-center">
						<div className="w-[75px] h-[75px]">
							<img
								className=""
								src={item.ItemImg ? item.ItemImg : placeholder}
								alt=""
							/>
						</div>
					</div>
					<div className="flex flex-col w-2/3">
						<div className="flex justify-between">
							<div className="flex flex-wrap px-1 items-center">
								<h1 className="text-xl font-bold">{item.ItemName}</h1>
							</div>
							<div>
								<h1>${item.ItemPrice}.00</h1>
							</div>
						</div>

						<h1 className="pl-1">{item.ItemDescription}</h1>
					</div>
					<div className="">
						<button
							className="w-full bg-green font-bold text-gray px-2 hover:bg-dkgreen hover:text-ltgray duration-200"
							onClick={() => increaseCounter()}>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuItem;
