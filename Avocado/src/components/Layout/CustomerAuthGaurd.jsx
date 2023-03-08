import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerAuthGaurd = ({ children }) => {
  const isCustomer = useSelector((state) => state.isCustomer);

  const navigate = useNavigate();
  const location = useLocation();

  console.log("customerauth", location);

  useEffect(() => {
    if (isCustomer) {
      if (location.pathname != "/customerdashboard") {
        navigate("/customerdashboard");
      }
    }
    console.log(location);
  }, [location.pathname]);
  return children;
};

export default CustomerAuthGaurd;
