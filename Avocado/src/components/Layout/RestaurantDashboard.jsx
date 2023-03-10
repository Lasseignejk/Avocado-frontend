import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

import { useUserData } from "./Queries";
import {
  setOwner,
  setUserDetails,
  setLocation,
} from "../reducers/DashboardSlice";

import AdminNavBar from "../partials/AdminNavBar";

const RestaurantDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [error, setError] = useState(null);

  const isCustomer = useSelector((state) => state.isCustomer);
  const userDetails = useSelector((state) => state.userDetails);
  const userEmail = useSelector((state) => state.userEmail);

  useEffect(() => {
    dispatch(setLocation(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from(isCustomer ? "Customer" : "Owner")
        .select()
        .eq(isCustomer ? "CustomerEmail" : "OwnerEmail", userEmail);

      if (error) {
        setError(error);
        return;
      }
      if (data) {
        dispatch(setUserDetails(data[0]));
      }
    };
    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail, isCustomer]);

  //data is the user information
  const { OwnerFirstName } = userDetails[0];

  return (
    <div className="mb-[55px] md:flex md:mb-0">
      <AdminNavBar />
      <div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
        <div className="flex flex-col gap-3">
          <h1 className="text-center text-4xl font-bold text-green md:text-left">
            Welcome, {OwnerFirstName}
          </h1>
          <h1 className="text-center text-3xl font-bold md:text-left">
            Admin Dashboard
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
