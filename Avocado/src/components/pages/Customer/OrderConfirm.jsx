import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomerNavBar from "../../partials/CustomerNavBar";
import { Link } from "react-router-dom";

const OrderConfirm = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userDetails[0]);
  const restaurant = useSelector((state) => state.currentRestaurant[0]);
  const [orderId, setOrderId] = useState();

  let finalTotal = 0;
  let amountTotal = 0;
  for (let elem of cart) {
    finalTotal += elem.Amount * elem.ItemPrice;
    amountTotal += elem.Amount;
  }

  const [delivery, setDelivery] = useState(false);
  const toggleDelivery = () => {
    setDelivery(!delivery);
  };
  const [pickup, setPickup] = useState(false);
  const togglePickup = () => {
    setPickup(!pickup);
  };

  const [order, setOrder] = useState({
    id: orderId,
    CustomerId: user.id,
    RestaurantId: restaurant.id,
    OrderTotal: finalTotal,
    OrderComplete: false,
    TotalItems: cart.length,
  });
  console.log(order);

  const setOptions = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
      IsPickup: pickup,
      IsDelivery: delivery,
    });
  };

  let orderData = null;

  const getOrderId = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "/order/getorders",
      {
        method: "GET",
        headers: {
          userid: user.id,
        },
      }
    );
    if (!response.ok) {
      window.alert(response.statusText);
    } else {
      orderData = await response.json();
      console.log("data: ", orderData);
    }
  };

  const submitOrder = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "/order/sendorder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await getOrderId();
      setOrderId(orderData[orderData.length - 1].id + 1);
    };
    fetchData();
  }, []);

  console.log("order id: ", orderId);

  // const [orderItems, setOrderItems] = useState({
  //   MenuItemId: cart.id,
  //   OrderId: orderId,
  //   ItemQuantity: cart.Amount,
  //   MenuItemName: cart.ItemName,
  // });

  const submitOrderItems = async () => {
    const ordertest = await submitOrder();
    ordertest;
    cart.forEach((item) => {
      const sendItems = async (item) => {
        const response = await fetch(
          import.meta.env.VITE_BACKEND + "/order/sendorderitems",
          // "http://localhost:3060/order/sendorderitems",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              MenuItemId: item.id,
              OrderId: orderId,
              ItemQuantity: item.Amount,
              MenuItemName: item.ItemName,
            }),
          }
        );
      };
      sendItems(item);
    });
  };

  // const finalSubmit = () => {
  //   submitOrder();
  // };

  return (
    <div className="flex flex-col gap-4">
      <CustomerNavBar />
      <div className="flex flex-col m-auto w-[400px] gap-4">
        <h1 className="py-4 text-[2rem] text-center font-black">
          Confirm your order
        </h1>
        <div className="flex flex-col justify-center gap-3">
          <div className="flex flex-col m-2">
            {cart?.map((item) => (
              <div className="flex justify-between p-2 border-b-[2px] border-dkgray">
                <div className="flex gap-3">
                  <h1 className="text-xl">{item.Amount}</h1>
                  <h1 className="text-xl">{item.ItemName}</h1>
                </div>
                <h1 className="text-xl">${item.ItemPrice}.00</h1>
              </div>
            ))}
          </div>
          <textarea
            className="p-2"
            name="Notes"
            id="Notes"
            rows="4"
            placeholder="Order notes"
            onChange={(e) => setOptions(e)}
          ></textarea>
          <div className="flex justify-center gap-8">
            <div className="flex gap-2">
              <label className="text-xl font-bold" htmlFor="IsPickup">
                Pickup
              </label>
              <input
                className="w-[1rem] hover:cursor-pointer"
                type="checkbox"
                id="IsPickup"
                name="IsPickup"
                checked={pickup}
                onChange={togglePickup}
              />
            </div>
            <div className="flex gap-2">
              <label className="text-xl font-bold" htmlFor="IsDelivery">
                Delivery
              </label>
              <input
                className="w-[1rem] hover:cursor-pointer"
                type="checkbox"
                id="IsDelivery"
                name="IsDelivery"
                checked={delivery}
                onChange={toggleDelivery}
              />
            </div>
          </div>
          {/* <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              class=""
              type="radio"
              name="IsPickup"
              id="IsPickup"
              checked
            />
            <label
              class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
              for="IsPickup"
            >
              Pickup
            </label>
          </div>
          <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input class="" type="radio" name="IsDelivery" id="IsDelivery" />
            <label
              class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
              for="IsDelivery"
            >
              Delivery
            </label>
          </div> */}
        </div>
        <h1 className="py-4 text-[2rem] text-center font-black">
          Total: ${finalTotal}.00
        </h1>
        <Link
          to="/finished"
          className="bg-green text-gray text-[2rem] text-center px-3 py-1 duration-200 font-bold tracking-widest hover:bg-dkgreen rounded-full shadow-lg ease-in"
        >
          <button onClick={() => submitOrderItems()}>Finish & Pay</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirm;
