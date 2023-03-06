import React from "react";

const CustomerRestaurantCard = ({ restaurant }) => {
  //previously RestaurantCard (re-used for customer here)

  // * expected behavior *
  //lists all restaurants this customer can order from

  /*
  To do:
  Pull restaurants from backend
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

export default CustomerRestaurantCard;
