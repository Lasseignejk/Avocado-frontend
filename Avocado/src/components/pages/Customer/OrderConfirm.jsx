import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomerNavBar from "../../partials/CustomerNavBar";

const OrderConfirm = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userDetails[0]);
  const restaurant = useSelector((state) => state.currentRestaurant[0]);
  const [sendOrder, setSendOrder] = useState();

  let finalTotal = 0;
  let amountTotal = 0;
  for (let elem of cart) {
    finalTotal += elem.Amount * elem.ItemPrice;
    amountTotal += elem.Amount;
  }

  const order = {
    CustomerId: user.id,
    RestaurantId: restaurant.id,
    OrderTotal: finalTotal,
    OrderComplete: false,
    IsPickup: true,
    IsDelivery: false,
    TotalItems: cart.length,
    Notes: "no notes",
  };
  console.log(order);

  const submitOrder = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "/order/sendorder",
      {
        method: "POST",
        headers: {
          body: order,
        },
      }
    );
    if (!response.ok) {
      window.alert(response.statusText);
    } else {
      const json = await response.json();
      setSendOrder(json);
      console.log(sendOrder);
    }
  };

  return (
    <div>
      <CustomerNavBar />
      <div className="flex flex-col gap-4">
        <h1 className="py-4 text-[2rem] text-center font-black">
          Confirm your order
        </h1>
        <div>
          {cart?.map((item) => (
            <div className="flex gap-3">
              <h1>{item.Amount}</h1>
              <h1>{item.ItemName}</h1>
              <h1>${item.ItemPrice}.00</h1>
            </div>
          ))}
        </div>
        <h1 className="py-4 text-[2rem] text-center font-black">
          Total: ${finalTotal}.00
        </h1>
        <button
          className="bg-green text-gray text-lg px-3 py-1 duration-200 font-bold tracking-widest hover:bg-dkgreen rounded-full shadow-lg ease-in"
          onClick={() => submitOrder()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
