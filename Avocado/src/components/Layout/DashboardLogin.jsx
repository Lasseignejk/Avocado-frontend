import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/Login.css";
import { createClient } from "@supabase/supabase-js";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../reducers/AdminSlice";
import { setCustomer } from "../reducers/CustomerSlice";

import { setIsSignedUp, setIsLogginIn } from "../reducers/DashboardSlice";

const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MzEyNzAsImV4cCI6MTk5MzIwNzI3MH0.k8hjRQLV9bN_BcG11s_gWJx2NK_AHIXrJPTii7GO4LM";
const supabase = createClient(supabaseUrl, supabaseKey);

const DashboardLogin = () => {
  const dispatch = useDispatch();
  const isSignedUp = useSelector((state) => state.dashboard.isSignedUp);
  const isLogginIn = useSelector((state) => state.dashboard.isLogginIn);

  const [loginDetails, setLoginDetails] = useState({});

  if (isLogginIn || !isSignedUp) {
    return null;
  }

  // const [accountDetails, setAccountDetails] = useState({});

  const setFormState = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const sendToSupabase = async (loginDetails) => {
    const { CustomerEmail, Password } = loginDetails;

    console.log(loginDetails);

    const loginBtn = document.querySelector(".loginBtn");
    loginBtn.disabled = true;
    loginBtn.classList.add("bg-[#b3b3b3]", "text-black");
    loginBtn.classList.remove("bg-green", "hover:bg-blue", "text-grey");

    let { data, error } = await supabase.auth.signInWithPassword({
      email: CustomerEmail,
      password: Password,
    });

    console.log(data);
    console.log(error);

    const { data: user } = await supabase.auth.getUser();

    if (user) {
      dispatch(setIsLogginIn(isLogginIn));
    }
    return redirect("/");
  };

  ///

  /*
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

      //setting user to customer state
      /*
      const { data: user } = await supabase.auth.getUser();
      console.log(user);
      dispatch(setCustomer(user));
    } else {
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

      const { data: user } = await supabase.auth.getUser();
      console.log(user);
      dispatch(setAdmin(user));
    }
    */

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
              className="bg-green text-gray w-[60px] cursor-pointer userBtn"
              type="button"
              name="RestOwner"
              id="signIn"
              value={false}
              onClick={(e) => setFormState(e)}
            >
              user
            </button>
            <button
              className="bg-green text-gray w-[60px] cursor-pointer adminBtn"
              type="button"
              name="RestOwner"
              value={true}
              onClick={(e) => setFormState(e)}
            >
              admin
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className=" text-lg bg-green text-gray px-3 hover:bg-blue hover:text-black duration-200 ease-in loginBtn"
              onClick={() => sendToSupabase(loginDetails)}
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
