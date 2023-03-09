import React from "react";
import placeholder from "/items/restaurant_placeholder.svg";

const RestaurantAdminCard = ({ restaurant }) => {
  ///previously RestaurantCard

  // * expected behavior *
  //links to Specifc restaurants for editing

  /*
  To do:
  Pull data from backend
  */

  return (
    <div className="font-niveau px-3 flex pt-3 gap-3 md:w-[400px] md:py-3">
      <div className="flex items-center w-[50px] h-[50px] md:w-[100px] md:h-[100px] box-border">
        <img
          src={restaurant.RestLogo ? restaurant.RestLogo : placeholder}
          alt="logo"
          className=""
        />
      </div>
      <div>
        <h1 className="font-bold text-2xl">{restaurant.RestName}</h1>
        <h1>{restaurant.RestLocation}</h1>
      </div>
    </div>
  );
};

export default RestaurantAdminCard;
