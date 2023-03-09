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
      <div className="flex justify-center p-8">
        <h1 className="text-xl font-black">Your Order</h1>
      </div>
      <div className="flex flex-col gap-4">
        {cart?.map((item) => (
          <CartItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
