import React from "react";

const RestaurantCard = ({ restaurant }) => {
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

export default RestaurantCard;
