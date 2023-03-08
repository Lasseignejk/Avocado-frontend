import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const LoggedInAuthGaurd = ({ children }) => {
  const tokenID = useSelector((state) => state.tokenID);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname != "/" && tokenID.length == 0) {
      console.log("navigate");

      navigate("/");
    }
    console.log(tokenID.length);
  }, [tokenID]);
  return children;
};

export default LoggedInAuthGaurd;
