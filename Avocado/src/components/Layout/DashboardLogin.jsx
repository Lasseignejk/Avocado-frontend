import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { queryIsOwner } from "./Queries";

import { supabase } from "../../supabase";
import { setToken, setOwner, setCustomer } from "../reducers/DashboardSlice";

const DashboardLogin = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userEmail);

  const [loginDetails, setLoginDetails] = useState({});
  const token = useSelector((state) => state.tokenID);
  const isCustomer = useSelector((state) => state.isCustomer);
  const isOwner = useSelector((state) => state.isOwner);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isCustomer) {
      return navigate("/customerdashboard");
    } else if (token && isOwner) {
      return navigate("/restaurantdashboard");
    }
  }, []);

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
    dispatch(setToken(user.user));

    //checks if owner/customer
    const owner = await queryIsOwner(user.user.email);

    console.log("owner:", owner);
    //Restaurants
    if (owner) {
      //sets as owner in state
      dispatch(setOwner(true));
      //naivates to restaurant dash
      return navigate("/restaurantdashboard");
    }

    //Customers
    if (!owner) {
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
