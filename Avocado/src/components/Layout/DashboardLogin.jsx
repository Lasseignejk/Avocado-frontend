import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { queryIsOwner } from "./Queries";

import { supabase } from "../../supabase";
import { setToken, setOwner, setCustomer } from "../reducers/DashboardSlice";

const DashboardLogin = () => {
  //previously login

  // * expected behavior *
  //logs user (customer or owner) in, grabs token from supabase, sets token in state, checks supabase to confirm if owner or customer based on email, sets in state if owner or customer

  /*
  To do:
  */

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({});

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

    console.log("dispatching setToken", user.user);

    //sets token in state
    dispatch(setToken(user.user));

    //const userEmail = user?.user?.email;
    //console.log(userEmail);

    //const owner = await queryIsOwner(userEmail);
    const owner = true;
    //Restaurants
    if (owner) {
      console.log("rest");
      //sets as owner in state
      dispatch(setOwner(true));
      //naivates to restaurant dash
      return navigate("/restaurantdashboard");
    }

    //Customers
    if (!owner) {
      console.log("cust");
      //sets as customer in state
      dispatch(setCustomer(true));
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
