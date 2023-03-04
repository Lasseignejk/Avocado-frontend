import React from "react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../reducers/AdminSlice";
import { setCustomer } from "../reducers/CustomerSlice";
import { setIsSignedUp, setIsLogginIn } from "../reducers/DashboardSlice";
import { redirect, useNavigate } from "react-router-dom";

const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3am5vbWVydnN3Z3Fhc2dleGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MzEyNzAsImV4cCI6MTk5MzIwNzI3MH0.k8hjRQLV9bN_BcG11s_gWJx2NK_AHIXrJPTii7GO4LM";
const supabase = createClient(supabaseUrl, supabaseKey);

const DashboardSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.admin);
  const customer = useSelector((state) => state.customer);

  const [accountDetails, setAccountDetails] = useState({});

  const isSignedUp = useSelector((state) => state.dashboard.isSignedUp);
  const isLogginIn = useSelector((state) => state.dashboard.isLogginIn);

  if (isSignedUp) {
    return null;
  }

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

    const signUpBtn = document.querySelector(".signUpBtn");
    signUpBtn.disabled = true;
    signUpBtn.classList.add("bg-[#b3b3b3]", "text-black");
    signUpBtn.classList.remove("bg-green", "hover:bg-blue", "text-gray");

    //signs up
    const { data, error } = await supabase.auth.signUp({
      email: CustomerEmail,
      password: Password,
    });

    //automatically signs them in as well
    let { data2, error2 } = await supabase.auth.signInWithPassword({
      email: CustomerEmail,
      password: Password,
    });

    const { data: user } = await supabase.auth.getUser();

    if (user) {
      dispatch(setIsLogginIn(!isLogginIn));
      dispatch(setIsSignedUp(!isSignedUp));
      console.log(user);
    }
    return navigate("/dashboard");

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
    // dispatch(setAdmin(user));

    // window.location.replace("http://localhost:5173/admin");
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
              onClick={() => sendToSupabase(accountDetails)}
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
