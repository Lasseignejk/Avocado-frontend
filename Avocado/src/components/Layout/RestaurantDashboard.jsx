import React from "react";
import RestaurantLayout from "./RestaurantLayout";
import RestaurantNavBar from "./RestaurantNavBar";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOwner, setCustomer } from "../reducers/DashboardSlice";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MzEyNzAsImV4cCI6MTk5MzIwNzI3MH0.k8hjRQLV9bN_BcG11s_gWJx2NK_AHIXrJPTii7GO4LM";
const supabase = createClient(supabaseUrl, supabaseKey);

const RestaurantDashboard = ({ children }) => {
  //hooks
  const dispatch = useDispatch();

  //selectors
  const userDetails = useSelector((state) => state.dashboard.userDetails);
  const isCustomer = useSelector((state) => state.dashboard.isCustomer);
  const isOwner = useSelector((state) => state.dashboard.isOwner);

  //parsing email
  const userEmail = userDetails[0]?.user?.email;
  console.log(userEmail);

  return (
    <>
      <RestaurantNavBar />
    </>
  );
};

export default RestaurantDashboard;
