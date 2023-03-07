import RestaurantNavBar from "./RestaurantNavBar";
import { useUserData } from "./Queries";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { setOwner, setUserDetails } from "../reducers/DashboardSlice";
import { supabase } from "../../supabase";

const RestaurantDashboard = ({ children }) => {
  const dispatch = useDispatch();

  // * expected behavior *
  //Holds NavBar and other partials/components wanted

  /*
  Todo:
  */

  //hook to query customer/Owner tables, query in Queries
  const { data, error } = useUserData();
  //data is the user information

  return (
    <>
      <RestaurantNavBar />
    </>
  );
};

export default RestaurantDashboard;
