import CustomerNavBar from "./CustomerNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useUserData } from "./Queries";
import CustomerMenu from "./CustomerMenu";
import { setCustomer, setUserDetails } from "../reducers/DashboardSlice";
import { supabase } from "../../supabase";
import React, { useState, useEffect } from "react";

const CustomerDashboard = ({ children }) => {
  const dispatch = useDispatch();

  const isCustomer = useSelector((state) => state.isCustomer);
  const userDetails = useSelector((state) => state.userDetails);
  const userEmail = useSelector((state) => state.userEmail);

  const [error, setError] = useState(null);

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
  const { CustomerFirstName } = userDetails[0];

  return (
    <>
      <div className="mb-[55px] md:flex md:mb-0">
        <CustomerNavBar />
        <div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-4xl font-bold text-green md:text-left">
              Welcome, {CustomerFirstName}
            </h1>
            <h1 className="text-center text-3xl font-bold md:text-left">
              Customer Dashboard
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
