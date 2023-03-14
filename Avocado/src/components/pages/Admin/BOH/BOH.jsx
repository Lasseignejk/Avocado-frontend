import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavBar from "../../../partials/AdminNavBar";

const BOH = () => {
	const restaurantId = useSelector((state) => state.currentRestaurant[0]);

	const [Order, setOrder] = useState([]);
	const [OrderItems, setOrderItems] = useState([]);
	useEffect(() => {
		const getOrdersAndItems = async () => {
			const orderResponse = await fetch(
				import.meta.env.VITE_BACKEND + "/admin/restaurant/getOrders",
				{
					method: "GET",
					headers: {
						restaurantid: restaurantId,
					},
				}
			);
			if (!orderResponse.ok) {
				window.alert(orderResponse.statusText);
				return;
			}
			const orders = await orderResponse.json();
			const promises = orders.reverse().map(async (order) => {
				const itemResponse = await fetch(
					import.meta.env.VITE_BACKEND + "/admin/restaurant/getOrderItems",
					{
						method: "GET",
						headers: {
							orderid: order.id,
						},
					}
				);
				if (!itemResponse.ok) {
					window.alert(itemResponse.statusText);
					return [];
				}
				const items = await itemResponse.json();
				const uniqueItems = [];
				for (let newItem of items) {
					const itemExists = OrderItems.some(
						(existingItem) =>
							existingItem.id === newItem.id &&
							existingItem.created_at === newItem.created_at
					);
					if (!itemExists) {
						uniqueItems.push(newItem);
					}
				}
				return uniqueItems;
			});
			const results = await Promise.all(promises);
			const allItems = results.flat();
			if (allItems.length > 0) {
				setOrderItems(allItems);
			}
			setOrder(orders);
		};
		getOrdersAndItems();
	}, [restaurantId, OrderItems]);
	return (
		<div className="mb-[55px] lg:flex lg:mb-0 justify-start">
			<AdminNavBar />
			<div className="flex flex-col gap-10 pt-3 lg:w-full lg:px-16 lg:pt-20 lg:flex-row  justify-between">
				<div>
					{Order.map((order) => (
						<div key={order.id}>
							<div className="flex flex-col gap-3 mb-5">
								<h1 className="text-center text-4xl font-bold text-green lg:text-left"></h1>
								<h1 className="text-center text-3xl font-bold lg:text-left">
									Current Orders for {order.id}
								</h1>
							</div>
							<div className="flex flex-col items-center lg:flex-row lg:flex-wrap gap-3 lg:justify-center">
								{OrderItems.filter((item) => item.OrderId === order.id).map(
									(item, index) => (
										<div key={`${order.id}-${index}`}>
											<p>{item.MenuItemName}</p>
											<p>{item.ItemQuantity}</p>
											<p>{item.created_at}</p>
										</div>
									)
								)}
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-center"></div>
			</div>
		</div>
	);
};

export default BOH;
