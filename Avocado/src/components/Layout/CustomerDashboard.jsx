import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MzEyNzAsImV4cCI6MTk5MzIwNzI3MH0.k8hjRQLV9bN_BcG11s_gWJx2NK_AHIXrJPTii7GO4LM";
const supabase = createClient(supabaseUrl, supabaseKey);

const CustomerDashboard = ({ children }) => {
  //hooks
  const dispatch = useDispatch();

  //selectors
  const userDetails = useSelector((state) => state.dashboard.userDetails);

  //parsing email
  const userEmail = userDetails[0]?.user?.email;
  console.log(userEmail);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      //searches resturants database
      const { data, error } = await supabase
        .from("Customer")
        .select()
        .eq("CustomerEmail", userEmail);

      if (data) {
        setUserData(data);
      }
    };
    fetchUserData();
  }, [userEmail]);

  console.log("userdata:", userData);

  return (
    <>
      <h1>Customer NavBar</h1>
    </>
  );
};

export default CustomerDashboard;
