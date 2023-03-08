import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerAuthGaurd = ({ children }) => {
  const isCustomer = useSelector((state) => state.isCustomer);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isCustomer) {
      if (location != "/customerdashboard") {
        navigate("/customerdashboard");
      }
    }
  }, [location]);
  return children;
};

export default CustomerAuthGaurd;
