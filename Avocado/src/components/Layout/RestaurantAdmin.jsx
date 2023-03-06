import React, { useEffect } from "react";
import { useState } from "react";
import RestaurantAdminCard from "./RestaurantAdminCard";
import AdminNavBar from "../partials/AdminNavBar";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

const RestaurantAdmin = () => {
  //previously Admin Restraunt

  // * expected behavior *
  //links to admin's restaurants for editing

  /*
  To do:
  Pull data from backend and inject to backened to edit
  */

  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [restToEdit, setRestToEdit] = useState();

  // const getCustomer = async () => {
  // 	const response = await fetch("http://localhost:3060/displaycustomer");
  // 	const json = await response.json();
  // 	dispatch(setCustomer(json));
  // };

  // Get restaurants by owner ID
  useEffect(() => {
    const getRestaurants = async () => {
      const response = await fetch(
        "http://localhost:3060/admin/managerestaurants"
      );
      console.log(response);
      if (!response.ok) {
        window.alert(response.statusText);
      } else {
        const json = await response.json();
        console.log(json);
        setRestaurants(json);
      }
    };
    //getRestaurants();
  }, []);

  // Add a Restaurant
  const setFormState = (e) => {
    setRestaurantDetails({
      ...restaurantDetails,
      [e.target.name]: e.target.value,
      OwnerId: 1,
    });
  };

  const sendToSupabase = async (restaurantDetails) => {
    await fetch("http://localhost:3060/admin/restaurant/addrest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantDetails),
    });
    console.log(restaurantDetails);
  };

  //   Set restaurant to edit menu in state
  // On click route to menu page with restaurant in state

  return (
    <div className="mb-[55px] md:flex md:mb-0">
      <AdminNavBar />
      <div className="flex flex-col gap-10">
        <div>
          {restaurants.map((restaurant, index) => (
            <Link to="/menuinfo" state={restaurant}>
              <RestaurantAdminCard restaurant={restaurant} key={index} />
            </Link>
          ))}
        </div>
        <form action="">
          <h1>Add a restuarant</h1>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="RestName"
              value={
                restaurantDetails.RestName ? restaurantDetails.RestName : ""
              }
              onChange={(e) => setFormState(e)}
            />
          </div>
          <div>
            <label htmlFor="location">Address</label>
            <input
              type="text"
              id="location"
              name="RestLocation"
              value={
                restaurantDetails.RestLocation
                  ? restaurantDetails.RestLocation
                  : ""
              }
              onChange={(e) => setFormState(e)}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="RestPhoneNumber"
              value={
                restaurantDetails.RestPhoneNumber
                  ? restaurantDetails.RestPhoneNumber
                  : ""
              }
              onChange={(e) => setFormState(e)}
            />
          </div>
          <div>
            <label htmlFor="hours">Hours</label>
            <input
              type="text"
              id="hours"
              name="RestHours"
              value={
                restaurantDetails.RestHours ? restaurantDetails.RestHours : ""
              }
              onChange={(e) => setFormState(e)}
            />
          </div>
          <div>
            <label htmlFor="logo">Logo</label>
            <input
              type="file"
              id="logo"
              name="RestLogo"
              value={
                restaurantDetails.RestLogo ? restaurantDetails.RestLogo : ""
              }
              onChange={(e) => setFormState(e)}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => sendToSupabase(restaurantDetails)}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantAdmin;
