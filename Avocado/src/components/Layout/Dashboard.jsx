import React from "react";

import RestaurantLayout from "./RestaurantLayout";

const Dashboard = ({ children }) => {
  console.log("Dashboard - Restaurant Layout");

  return (
    <>
      <RestaurantLayout />
    </>
  );
};

export default Dashboard;
