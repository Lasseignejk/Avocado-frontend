import React from "react";
import CustomerNavBar from "./CustomerNavBar";
import { useDispatch } from "react-redux";
import { useUserData } from "./Queries";
import { setUserDetails } from "../reducers/DashboardSlice";
import CustomerMenu from "./CustomerMenu";

const CustomerDashboard = ({ children }) => {
  //// * expected behavior *
  //showcases the navbar and the menu pulled from backend

  /*
  Todo:

  set userdetails to state:
  const dispatch = useDispatch();
  dispatch(setUserDetails(data));
  */

  const { data, error } = useUserData();

  console.log("userdata:", data);

  if (error) {
    return <h1>Something went wrong...</h1>;
  }
  return (
    <>
      <CustomerNavBar />
      {/*<CustomerMenu />*/}
    </>
  );
};

export default CustomerDashboard;