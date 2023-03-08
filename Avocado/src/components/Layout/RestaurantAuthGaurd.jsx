import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantAuthGaurd = ({ children }) => {
  const isCustomer = useSelector((state) => state.isCustomer);
  const location = useSelector((state) => state.location);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isCustomer) {
      if (location != "/restaurantdashboard" || location != "/myrestaurants") {
        navigate("/restaurantdashboard");
      }
    }
    console.log("location:", location);
  }, [location]);
  return children;
};

export default RestaurantAuthGaurd;
