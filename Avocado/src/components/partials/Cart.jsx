import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart, removeItem } from "../reducers/DashboardSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="w-[400px]">
      <div>
        <h1>Your Order</h1>
      </div>
      <div>
        {cart?.map((item) => (
          <CartItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
