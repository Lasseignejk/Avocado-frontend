import React from "react";
import CustomerNavBar from "../partials/CustomerNavBar";
import { useUserData } from "./Queries";

const CustomerDashboard = ({ children }) => {
  //// * expected behavior *
  //showcases the navbar and the menu pulled from backend

  /*
  Todo:
  */

  const { data, error } = useUserData();
  //data is the user information
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
