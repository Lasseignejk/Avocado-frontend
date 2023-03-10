import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart, removeItem } from "../reducers/DashboardSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const emptyCart = () => {
    if (cart.length() < 1) {
      return <h1>"Your cart is empty"</h1>;
    }
  };

  return (
    <div className="w-[400px] h-full p-4 bg-ltgray">
      <div className="flex flex-col justify-center p-4">
        <div>
          <h1 className="text-[2rem] text-center  mb-8 font-black">
            Your Order
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {cart?.map((item) => (
            <CartItem item={item} />
          ))}
        </div>
      </div>
      <button
        className=" flex justify-between bg-green text-gray text-l font-bold w-full p-8 hover:bg-dkgreen"
        onClick={() => dispatch()}
      >
        <h1>Continue to checkout</h1>
        <h1>Total: $</h1>
      </button>
    </div>
  );
};

export default Cart;
