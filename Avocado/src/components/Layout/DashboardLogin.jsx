import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/Login.css";
import { createClient } from "@supabase/supabase-js";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

import {
  setIsSignedUp,
  setIsLogginIn,
  setUserDetails,
} from "../reducers/DashboardSlice";

//supabase log in
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MzEyNzAsImV4cCI6MTk5MzIwNzI3MH0.k8hjRQLV9bN_BcG11s_gWJx2NK_AHIXrJPTii7GO4LM";
const supabase = createClient(supabaseUrl, supabaseKey);

const DashboardLogin = () => {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //selectors
  const isSignedUp = useSelector((state) => state.dashboard.isSignedUp);
  const isLogginIn = useSelector((state) => state.dashboard.isLogginIn);
  const userDetails = useSelector((state) => state.dashboard.userDetails);

  const [loginDetails, setLoginDetails] = useState({});

  //component logic
  if (isLogginIn || !isSignedUp) {
    return null;
  }

  const setFormState = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const sendToSupabase = async (loginDetails) => {
    const { CustomerEmail, Password } = loginDetails;

    //signs in
    let { data, error } = await supabase.auth.signInWithPassword({
      email: CustomerEmail,
      password: Password,
    });

    //grabs token from supabase
    const { data: user } = await supabase.auth.getUser();
    //sets token in state
    dispatch(setUserDetails(user));
    console.log(user);

    //if token is supplied update component bools
    if (user) {
      dispatch(setIsLogginIn(!isLogginIn));
      dispatch(setIsSignedUp(!isSignedUp));
    }
    return navigate("/dashboard");
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
            <button
              className=" text-lg bg-green text-gray px-3 hover:bg-blue hover:text-black duration-200 ease-in loginBtn"
              onClick={() => dispatch(setIsSignedUp(!isSignedUp))}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;
