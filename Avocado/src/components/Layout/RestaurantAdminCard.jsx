import React from "react";

const RestaurantAdminCard = ({ restaurant }) => {
  ///previously RestaurantCard

  // * expected behavior *
  //links to Specifc restaurants for editing

  /*
  To do:
  Pull data from backend
  */

  return (
    <div className="font-niveau">
      <img src={restaurant.RestLogo} alt="logo" />
      <div>
        <h1 className="font-bold">{restaurant.RestName}</h1>
        <h1>{restaurant.RestLocation}</h1>
      </div>
    </div>
  );
};

export default RestaurantAdminCard;
