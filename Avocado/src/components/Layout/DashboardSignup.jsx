import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../supabase";
import {
  setUserDetails,
  setOwner,
  setCustomer,
} from "../reducers/DashboardSlice";
import { redirect, useNavigate } from "react-router-dom";

const DashboardSignup = () => {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountDetails, setAccountDetails] = useState({});
  const [isError, setIsError] = useState(false);

  //selectors
  const isOwner = useSelector((state) => state.dashboard.isOwner);
  const isCustomer = useSelector((state) => state.dashboard.isCustomer);

  const setFormState = (e) => {
    setAccountDetails({
      ...accountDetails,
      [e.target.name]: e.target.value,
    });
  };

  const sendToSupabase = async (accountDetails) => {
    const {
      CustomerEmail,
      Password,
      CustomerFirstName,
      CustomerLastName,
      CustomerPhoneNumber,
      Address,
      RestOwner,
    } = accountDetails;

    //signs up
    let { data: sigUpnData, error: signUpError } = await supabase.auth.signUp({
      email: CustomerEmail,
      password: Password,
    });
    if (signUpError) {
      setIsError(signUpError);
      return;
    }

    //signs in
    let { data, error: SignInError } = await supabase.auth.signInWithPassword({
      email: CustomerEmail,
      password: Password,
      RestOwner: RestOwner,
    });
    if (SignInError) {
      setIsError(SignInError);
      return;
    }

    //grabs token from supabase
    const { data: user, error: getUserError } = await supabase.auth.getUser();
    if (getUserError) {
      setIsError(getUserError);
      return;
    }
    //sets token in state
    dispatch(setUserDetails(user));
    console.log(user);

    if (user) {
      //if restaurant inject into owner table
      if (RestOwner == "true") {
        let { data, error: insertOwnerError } = await supabase
          .from("Owner")
          .insert([
            {
              OwnerFirstName: CustomerFirstName,
              OwnerLastName: CustomerLastName,
              OwnerEmail: CustomerEmail.toLowerCase(),
              OwnerPhoneNumber: CustomerPhoneNumber,
            },
          ]);
        if (insertOwnerError) {
          setIsError(insertOwnerError);
          return;
        }
        console.log(data);
        console.log(insertOwnerError);

        //grabs token from supabase
        const { data: user } = await supabase.auth.getUser();

        //sets token in state
        dispatch(setUserDetails(user));
        console.log(user);

        //sets as owner in state
        dispatch(setOwner(!isOwner));

        //naivates to restaurant dash
        return navigate("/restaurantdashboard");
      }

      //if customer inject into customer table
      if (RestOwner == "false") {
        let { data, error: insertCustomerError } = await supabase
          .from("Customer")
          .insert([
            {
              CustomerFirstName: CustomerFirstName,
              CustomerLastName: CustomerLastName,
              CustomerEmail: CustomerEmail.toLowerCase(),
              CustomerPhoneNumber: CustomerPhoneNumber,
              Address: Address,
            },
          ]);
        if (insertCustomerError) {
          setIsError(insertCustomerError);
          return;
        }
        console.log(data);
        console.log(insertCustomerError);

        //grabs token from supabase
        const { data: user } = await supabase.auth.getUser();

        //sets token in state
        dispatch(setUserDetails(user));
        console.log(user);

        //sets as customer in state
        dispatch(setCustomer(!isCustomer));

        //naivates to customer dash
        return navigate("/customerdashboard");
      }
    }

    //navigates to signup/login again
    return navigate("/");
  };

  if (isError) {
    return (
      <>
        <h1>Something went wrong</h1>
        <pre>{isError?.msg}</pre>
      </>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-green">
      <div className="w-[300px] bg-gray flex flex-col items-center p-5 gap-10">
        <form className="flex flex-col gap-5 font-niveau font-bold">
          <img src="../logos/avocado_green.svg" alt="" />
          <h1 className="text-center text-lg">
            Sign up for an Avocado account
          </h1>

          <div className="flex gap-3">
            <p>I am...*</p>
            <select
              name="RestOwner"
              id=""
              value={accountDetails.RestOwner ? accountDetails.RestOwner : ""}
              onChange={(e) => setFormState(e)}
            >
              <option value="" name="RestOwner" disabled>
                Please choose one
              </option>
              <option value="false" name="RestOwner">
                a customer
              </option>
              <option value="true" name="RestOwner">
                a restaurant owner
              </option>
            </select>
          </div>
          <div className="flex gap-3">
            <div>
              <label htmlFor="firstName">First Name*</label>
              <input
                className="w-full pl-3"
                type="text"
                id="firstName"
                name="CustomerFirstName"
                onChange={(e) => setFormState(e)}
                value={
                  accountDetails.CustomerFirstName
                    ? accountDetails.CustomerFirstName
                    : ""
                }
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name*</label>
              <input
                className="w-full pl-3"
                type="text"
                id="lastName"
                name="CustomerLastName"
                onChange={(e) => setFormState(e)}
                value={
                  accountDetails.CustomerLastName
                    ? accountDetails.CustomerLastName
                    : ""
                }
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="CustomerEmail"
              onChange={(e) => setFormState(e)}
              value={
                accountDetails.CustomerEmail ? accountDetails.CustomerEmail : ""
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="text"
              id="phone"
              name="CustomerPhoneNumber"
              onChange={(e) => setFormState(e)}
              value={
                accountDetails.CustomerPhoneNumber
                  ? accountDetails.CustomerPhoneNumber
                  : ""
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="address"
              id="address"
              name="Address"
              onChange={(e) => setFormState(e)}
              value={accountDetails.Address ? accountDetails.Address : ""}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="Password"
              onChange={(e) => setFormState(e)}
              value={accountDetails.Password ? accountDetails.Password : ""}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-green text-gray px-3 text-lg py-1 hover:bg-blue hover:text-black signUpBtn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                sendToSupabase(accountDetails);
              }}
            >
              Sign me up, Haas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardSignup;
