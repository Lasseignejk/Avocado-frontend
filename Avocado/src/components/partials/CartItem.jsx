import React from "react";
import placeholder from "../../../public/items/menu_placeholder.svg";

const CartItem = ({ item }) => {
  return (
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
        <h1>{item.ItemPrice}</h1>
      </div>
    </div>
  );
};

export default CartItem;
