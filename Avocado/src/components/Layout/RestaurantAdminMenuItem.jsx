import React from "react";

const RestaurantAdminMenuItem = ({ item }) => {
  return (
    <div>
      <h1>{item?.ItemName}</h1>
      <h1>{item?.ItemPrice}</h1>
      <h1>{item?.ItemType}</h1>
    </div>
  );
};

export default RestaurantAdminMenuItem;
