import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

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

const DashboardLogin = () => {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //selectors
  const isOwner = useSelector((state) => state.dashboard.isOwner);
  const isCustomer = useSelector((state) => state.dashboard.isCustomer);

  const [loginDetails, setLoginDetails] = useState({});

  const setFormState = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const sendToSupabase = async (loginDetails) => {
    const { CustomerEmail, Password, RestOwner } = loginDetails;

    console.log(RestOwner);

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

    //Restaurants
    if (RestOwner == "true") {
      console.log("rest");
      //sets as owner in state
      dispatch(setOwner(!isOwner));
      //naivates to restaurant dash
      return navigate("/restaurantdashboard");
    }

    //Customers
    if (RestOwner == "false") {
      console.log("cust");
      //sets as customer in state
      dispatch(setCustomer(!isCustomer));
      //naivates to customer dash
      return navigate("/customerdashboard");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-green">
      <div className="w-[300px] h-[400px] bg-gray flex flex-col items-center p-5 gap-10">
        <form className="flex flex-col gap-5 font-niveau font-bold">
          <img src="../logos/avocado_green.svg" alt="" />

          <div className="flex flex-col">
            <label htmlFor="email">email</label>
            <input
              className="pl-3"
              type="email"
              id="email"
              name="CustomerEmail"
              onChange={(e) => setFormState(e)}
              value={
                loginDetails.CustomerEmail ? loginDetails.CustomerEmail : ""
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">password</label>
            <input
              className="pl-3"
              type="password"
              id="password"
              name="Password"
              onChange={(e) => setFormState(e)}
              value={loginDetails.Password ? loginDetails.Password : ""}
            />
          </div>
          <div className="flex gap-5">
            <label htmlFor="signIn">Sign in as:</label>
            <button
              className="bg-green text-gray w-[70px] cursor-pointer userBtn"
              type="button"
              name="RestOwner"
              id="signIn"
              value={false}
              onClick={(e) => setFormState(e)}
            >
              Customer
            </button>
            <button
              className="bg-green text-gray w-[60px] cursor-pointer adminBtn"
              type="button"
              name="RestOwner"
              value={true}
              onClick={(e) => setFormState(e)}
            >
              Owner
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className=" text-lg bg-green text-gray px-3 hover:bg-blue hover:text-black duration-200 ease-in loginBtn"
              onClick={(e) => {
                e.preventDefault();
                sendToSupabase(loginDetails);
              }}
            >
              Let's make some guac
            </button>
          </div>
        </form>
        <div className="text-center font-niveau">
          <h1 className="text-sm">New to Avocado online ordering?</h1>
          <p className="text-green text-center text-sm">
            <Link to={"/accountSignUp"}>Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;
