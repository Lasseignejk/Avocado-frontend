import React from "react";
import { useDispatch } from "react-redux";
import placeholder from "../../../public/items/menu_placeholder.svg";
import { clearCart, removeCart, addCart } from "../reducers/DashboardSlice";

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
          <h1>${item.ItemPrice}</h1>
        </div>
      </div>
      <div className="flex h-full">
        <button
          className="bg-green px-2 text-gray font-bold text-xl hover:bg-dkgreen"
          onClick={() => dispatch(removeCart(item))}
        >
          -
        </button>
        <div className="bg-gray">
          <h1 className="px-2">1{item.length}</h1>
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
