import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MzEyNzAsImV4cCI6MTk5MzIwNzI3MH0.k8hjRQLV9bN_BcG11s_gWJx2NK_AHIXrJPTii7GO4LM";
const supabase = createClient(supabaseUrl, supabaseKey);

export function CustomerLayout({ children }) {
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
        console.log(data);
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

export default CustomerLayout;
