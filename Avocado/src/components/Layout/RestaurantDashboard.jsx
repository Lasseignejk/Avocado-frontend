import RestaurantNavBar from "./RestaurantNavBar";
import { useUserData } from "./Queries";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../reducers/DashboardSlice";
import React, { useState } from "react";

const RestaurantDashboard = ({ children }) => {
  // * expected behavior *
  //Holds NavBar and other partials/components wanted

  /*
  Todo:
  set userdetails to state:
  const dispatch = useDispatch();
  dispatch(setUserDetails(data));
  */

  //hook to query customer/Owner tables, query in Queries
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
