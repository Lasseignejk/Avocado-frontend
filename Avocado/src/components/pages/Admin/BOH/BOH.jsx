import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavBar from "../../../partials/AdminNavBar";

import { FaRegTrashAlt, FaCheck } from "react-icons/fa";

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
      <div className="flex flex-col items-center lg:flex-row lg:flex-wrap gap-3 lg:justify-center">
        <h1 className="text-center text-4xl font-bold text-green lg:text-left">
          {" "}
          Current Orders{" "}
        </h1>
        <div className="flex flex-col gap-10 pt-3 lg:w-full lg:px-16 lg:pt-20 lg:flex-row  justify-center">
          <div>
            {Order.map((order) => (
              <div key={order.id}>
                <div className="flex flex-col gap-3 mb-5">
                  <h1 className="text-center text-xl font-bold lg:text-left">
                    Customer number {order.id}
                  </h1>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-evenly">
                  {OrderItems.filter((item) => item.OrderId === order.id).map(
                    (item, index) => (
                      <div className="bg-ltgray rounded-2xl duration-200 ease-in hover:bg-blue font-niveau px-3 flex py-3 md:w-[400px] md:py-3 md:shadow-md justify-between">
                        <div key={`${order.id}-${index}`}>
                          <div className="flex flex-row gap-3 mb-5">
                            Menu Item:{" "}
                            <p className="font-bold">{item.MenuItemName}</p>
                          </div>
                          <div className="flex flex-row gap-3 mb-5">
                            Portion Count:{" "}
                            <p className="font-bold">{item.ItemQuantity}</p>
                          </div>
                          <div className="flex flex-row gap-3 mb-5">
                            Order Date/Time:{" "}
                            <p className="font-bold">{item.created_at}</p>
                          </div>
                        </div>
                        <div className="grid place-items-center">
                          <button
                            className="hover:bg-gray bg-green duration-200 ease-in w-[50px] h-[50px] flex items-center justify-center rounded-full hover:text-gray"
                            type="button"
                            // onClick={() => setOpenModal(true)}
                          >
                            <FaCheck className="text-2xl text-black" />
                          </button>

                          <button
                            className="hover:bg-gray bg-[#b8241a] duration-200 ease-in w-[50px] h-[50px] flex items-center justify-center rounded-full hover:text-gray"
                            type="button"
                            // onClick={() =>
                            //   dispatch(setRestaurant(restaurant.id))
                            // }
                          >
                            <FaRegTrashAlt className="text-2xl text-black" />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
};

export default BOH;
