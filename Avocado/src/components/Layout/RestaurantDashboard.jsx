import React from "react";
import RestaurantNavBar from "./RestaurantNavBar";
import { useUserData } from "./Queries";

const RestaurantDashboard = ({ children }) => {
  const { data, error } = useUserData();

  console.log("userdata:", data);

  if (error) {
    return <h1>There is a problem...</h1>;
  }
  return (
    <>
      <RestaurantNavBar />
    </>
  );
};

export default RestaurantDashboard;
