import React from "react";
import { useSelector } from "react-redux";
import CustomerNavBar from "../../partials/CustomerNavBar";

const OrderConfirm = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  return (
    <div>
      <CustomerNavBar />
      <h1>Confirm your order</h1>

      {cart?.map((item) => (
        <div className="flex gap-3">
          <h1>{item.ItemName}</h1>
          <h1>${item.ItemPrice}.00</h1>
        </div>
      ))}

      <button className="bg-green text-gray text-lg px-3 py-1 duration-200 font-bold tracking-widest hover:bg-dkgreen rounded-full shadow-lg ease-in">
        Submit
      </button>
    </div>
  );
};

export default OrderConfirm;
