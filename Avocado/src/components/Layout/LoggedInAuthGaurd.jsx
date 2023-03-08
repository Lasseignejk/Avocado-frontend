import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const LoggedInAuthGaurd = ({ children }) => {
  const tokenID = useSelector((state) => state.tokenID);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname != "/" && tokenID.length == 0) {
      console.log("navigate");

      navigate("/");
    }
  }, [tokenID]);
  return children;
};

export default LoggedInAuthGaurd;
