import React from "react";
import RestaurantLayout from "./RestaurantLayout";
import RestaurantNavBar from "./RestaurantNavBar";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOwner, setCustomer } from "../reducers/DashboardSlice";

//supabase login info
import { supabase } from "../../supabase";

const Dashboard = ({ children }) => {
  //hooks
  const dispatch = useDispatch();

  //selectors
  const userDetails = useSelector((state) => state.dashboard.userDetails);
  const isCustomer = useSelector((state) => state.dashboard.isCustomer);
  const isOwner = useSelector((state) => state.dashboard.isOwner);

  //parsing email
  const userEmail = userDetails[0]?.user?.email;
  console.log(userEmail);

  useEffect(() => {
    const fetchUserData = async () => {
      //searches owner database
      // Subabase obj: obj = { error, data }
      // { ownerData: obj['ownerData'] }
      const { data: ownerData, error: ownerError } = await supabase
        .from("Owner")
        .select()
        .eq("OwnerEmail", 1);

      //searches resturants database
      const { data: customerData, error: customerError } = await supabase
        .from("Customer")
        .select()
        .eq("CustomerEmail", userEmail);

      console.log("owner:", ownerData);
      console.log("customer:", customerData);

      console.log("owner error:", ownerError);
      console.log("customer error:", customerError);

      //checks for customer data and owner error
      if (ownerError && customerData) {
        dispatch(setCustomer(!isCustomer));
      }

      //checks for owner data and customer error
      else if (customerError && ownerData) {
        dispatch(setOwner(!isOwner));
      }
    };
    fetchUserData();
  }, [userEmail]);

  return (
    <>
      <RestaurantNavBar />
    </>
  );
};

export default Dashboard;
