import React from "react";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "/items/menu_placeholder.svg";
import { addCart } from "../reducers/DashboardSlice";

const MenuItem = ({ item }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart);
  return (
    <div>
      <div className="flex flex-col bg-ltgray font-niveau px-3 pt-3 gap-3 hover:bg-dkgray md:hover:-translate-y-1 duration-200 ease-in md:w-[400px] md:py-3">
        <div className="flex gap-3">
          <div>
            <img
              className="h-20 w-20"
              src={item.ItemImg ? item.ItemImg : placeholder}
              alt=""
            />
          </div>
          <div>
            <div className="flex w-[250px] justify-between">
              <h1 className="text-xl font-bold">{item.ItemName}</h1>
              <h1>${item.ItemPrice}.00</h1>
            </div>
            <h1>{item.ItemDescription}</h1>
          </div>
          <div>
            <button
              className="w-full bg-green font-bold text-gray px-2 hover:bg-dkgreen hover:text-ltgray duration-200"
              onClick={() => dispatch(addCart(item))}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
