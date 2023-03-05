import React from "react";

import { useUserData } from "./Queries";

const CustomerDashboard = ({ children }) => {
  const { data: userData, error } = useUserData();

  console.log("userdata:", userData);

  if (error) {
    return <h1>Something went wrong...</h1>;
  }
  return (
    <>
      <h1>Customer NavBar</h1>
    </>
  );
};

export default CustomerDashboard;
