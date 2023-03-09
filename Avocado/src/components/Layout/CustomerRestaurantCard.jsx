import React from "react";
import placeholder from "/items/menu_placeholder.png";

const CustomerRestaurantCard = ({ restaurant, index }) => {
  //previously RestaurantCard (re-used for customer here)

  // * expected behavior *
  //lists all restaurants this customer can order from

  /*
  To do:
  Pull restaurants from backend
  */

  return (
    <div className="bg-ltgray font-niveau px-3 flex pt-3 gap-3 hover:bg-dkgray md:hover:-translate-y-1 duration-200 ease-in md:w-[400px] md:py-3">
      <img
        className="h-20"
        src={restaurant.RestLogo ? restaurant.RestLogo : placeholder}
        alt="restaurant image"
      />{" "}
      <div>
        <h1 className="font-bold">{restaurant.RestName}</h1>
        <h1>{restaurant.RestLocation}</h1>
      </div>
    </div>
  );
};

export default CustomerRestaurantCard;
