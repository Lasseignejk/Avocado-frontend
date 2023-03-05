import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MzEyNzAsImV4cCI6MTk5MzIwNzI3MH0.k8hjRQLV9bN_BcG11s_gWJx2NK_AHIXrJPTii7GO4LM";
const supabase = createClient(supabaseUrl, supabaseKey);

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

    //signs in
    let { data, error } = await supabase.auth.signInWithPassword({
      email: CustomerEmail,
      password: Password,
      RestOwner: RestOwner,
    });

    //grabs token from supabase
    const { data: user } = await supabase.auth.getUser();

    //sets token in state
    dispatch(setUserDetails(user));
    console.log(user);

    if (user) {
      //if restaurant inject into owner table
      if (RestOwner == "true") {
        let { data, error } = await supabase.from("Owner").insert([
          {
            OwnerFirstName: CustomerFirstName,
            OwnerLastName: CustomerLastName,
            OwnerEmail: CustomerEmail,
            OwnerPhoneNumber: CustomerPhoneNumber,
          },
        ]);
        console.log(data);
        console.log(error);

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
        let { data, error } = await supabase.from("Customer").insert([
          {
            CustomerFirstName: CustomerFirstName,
            CustomerLastName: CustomerLastName,
            CustomerEmail: CustomerEmail,
            CustomerPhoneNumber: CustomerPhoneNumber,
            Address: Address,
          },
        ]);
        console.log(data);
        console.log(error);

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
