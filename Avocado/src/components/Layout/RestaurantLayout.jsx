import React from "react";

import { useDispatch, useSelector } from "react-redux";

import RestaurantNavBar from "./RestaurantNavBar";

export function RestaurantLayout({ children }) {
  const dispatch = useDispatch();
  const isLogginIn = useSelector((state) => state.dashboard.isLogginIn);

  if (!isLogginIn) {
    return null;
  }

  return (
    <>
      <RestaurantNavBar />
      {children}
    </>
  );
}

export default RestaurantLayout;
