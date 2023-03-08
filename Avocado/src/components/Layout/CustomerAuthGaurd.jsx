import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const CustomerAuthGaurd = ({ children }) => {
  const isCustomer = useSelector((state) => state.isCustomer);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/restaurantdashboard" && !isCustomer) {
      history.push("/customerdashboard");
    }
    console.log(location);
  }, [location.pathname]);
  return children;
};

export default CustomerAuthGaurd;
