import React from "react";
import placeholder from "../../../public/items/menu_placeholder.svg";

const MenuItem = ({ item }) => {
  return (
    <div className="bg-ltgray font-niveau px-3 flex pt-3 gap-3 hover:bg-dkgray md:hover:-translate-y-1 duration-200 ease-in md:w-[400px] md:py-3">
      <div>
        <img
          className="h-20"
          src={item.ItemImg ? item.ItemImg : placeholder}
          alt=""
        />
      </div>
      <div>
        <h1>{item.ItemName}</h1>
        <h1>{item.ItemType}</h1>
        <h1>{item.ItemDescription}</h1>
        <h1>{item.ItemPrice}</h1>
      </div>
      <div>
        <button className="">Add to cart</button>
      </div>
    </div>
  );
};

export default MenuItem;
