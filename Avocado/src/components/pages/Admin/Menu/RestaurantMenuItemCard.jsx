import React, { useState } from "react";
import placeholder from "/items/menu_placeholder.png";
import "../ManageRestaurants.css";
import UpdateMenuItem from "./UpdateMenuItem";

const RestaurantMenuItemCard = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex-col">
      <div className="font-niveau px-3 flex pt-3 gap-3 hover:bg-blue md:hover:-translate-y-1 duration-200 ease-in md:w-[300] md:py-3 shadow-sm">
        <img
          className="w-20 h-20"
          src={item.ItemImg ? item.ItemImg : placeholder}
          alt="item image"
        />
        <div>
          <h1 className="font-bold">{item?.ItemName}</h1>
          <h1>{item?.ItemPrice}</h1>
          <h1>{item?.ItemType}</h1>
        </div>
        <button
          className="bg-green px-1 text-gray text-xl font-bold hover:bg-dkgreen duration-200 ease-in"
          onClick={() => setOpenModal(true)}
        >
          Edit
        </button>
      </div>
      <div>
        {openModal && (
          <UpdateMenuItem
            className="fixed"
            item={item}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuItemCard;
