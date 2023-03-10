import React from "react";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "/items/menu_placeholder.svg";
import {
  clearCart,
  removeCart,
  addCart,
  removeItem,
} from "../reducers/DashboardSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div>
          <img
            className="h-20"
            src={item.ItemImg ? item.ItemImg : placeholder}
            alt="item image"
          />
        </div>
        <div>
          <h1>{item.ItemName}</h1>
          <h1>${item.ItemPrice}.00</h1>
        </div>
      </div>
      <div className="flex h-full">
        <button
          className="bg-green px-2 text-gray font-bold text-xl hover:bg-dkgreen"
          onClick={() => dispatch(removeItem(item))}
        >
          -
        </button>
        <div className="bg-gray">
          <h1 className="px-2">{item.Amount}</h1>
        </div>
        <button
          className="bg-green px-2 text-gray font-bold text-xl hover:bg-dkgreen"
          onClick={() => dispatch(addCart(item))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
