import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import RestaurantNavBar from "./RestaurantNavBar";

import { supabase } from "../../supabase";

export function RestaurantLayout({ children }) {
  const dispatch = useDispatch();
  const isLogginIn = useSelector((state) => state.dashboard.isLogginIn);

  if (!isLogginIn) {
    return null;
  }

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase
        .from("Restaurant")
        .select()
        .eq("OwnerId", 1);

      if (error) {
        console.log(error);
      }
      if (data) {
        //setMenu(data);
        // console.log(data);
      }
    };
    fetchRestaurants();
  }, [1]);

  return (
    <>
      <RestaurantNavBar />
      {children}
    </>
  );
}

export default RestaurantLayout;
