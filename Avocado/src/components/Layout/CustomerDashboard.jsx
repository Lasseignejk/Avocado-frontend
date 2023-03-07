import React from "react";
import CustomerNavBar from "./CustomerNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useUserData } from "./Queries";
import CustomerMenu from "./CustomerMenu";
import { setCustomer, setUserDetails } from "../reducers/DashboardSlice";
import { supabase } from "../../supabase";

const CustomerDashboard = ({ children }) => {
  const dispatch = useDispatch();

  //// * expected behavior *
  //showcases the navbar and the menu pulled from backend

  /*
  Todo:
  */
  //hook to query customer/Owner tables, query in Queries
  const { data, error } = useUserData();
  //data is the user information

  return (
    <>
      <CustomerNavBar />
      {/*<CustomerMenu />*/}
    </>
  );
};

export default CustomerDashboard;
