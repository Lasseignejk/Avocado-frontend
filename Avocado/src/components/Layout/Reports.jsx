import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { useUserData } from "./Queries";
import {
  setCustomer,
  setUserDetails,
  setLocation,
  setGuest,
  setRestaurant,
} from "../reducers/DashboardSlice";
import CustomerRestaurantCard from "./CustomerRestaurantCard";
import CustomerNavBar from "./CustomerNavBar";

const Reports = ({ children }) => {
  const isOwner = useSelector((state) => state.isOwner);
  const userDetails = useSelector((state) => state.userDetails);

  const [layout, setLayout] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const [allRestrauntsByOwner, setRestaurants] = useState(null);
  const [allRestrauntsByOwnerName, setAllRestrauntsByOwnerName] =
    useState(null);

  if (isOwner) {
    useEffect(() => {
      const fetchUserData = async () => {
        const { id } = userDetails[0];

        const { data: restrauntsByOwnerData, error: errorByOwnerData } =
          await supabase.from("Restaurant").select().eq("OwnerId", id);

        if (errorByOwnerData) {
          setError(errorByOwnerData);
          return;
        }

        if (restrauntsByOwnerData) {
          //all restraunts data by owner
          setRestaurants(restrauntsByOwnerData);

          let restaurantNames = restrauntsByOwnerData.map((a) => a.RestName);
          let restaurantIds = restrauntsByOwnerData.map((a) => a.id);

          //all restaurants names by owner
          setAllRestrauntsByOwnerName(restaurantNames);

          //number of restaurants
          const numberOfRestraunts = restrauntsByOwnerData.length;

          //order for that specifc restaurant (currently hard coded in)
          const { data: orderData, error: orderError } = await supabase
            .from("Order")
            .select()
            .eq("RestaurantId", 48);

          if (orderError) {
            setError(orderError);
            return;
          }

          if (orderData) {
            console.log(orderData);
          }

          //all unique days items were purchased
          let DatePurchased = orderData.map((a) => a.DatePurchased);
          DatePurchased = [...new Set(DatePurchased)];

          //arrays for totals by day
          let days = [];
          let totals = [];

          //daily totals
          for (let i = 0; i < DatePurchased.length; i++) {
            days.push(DatePurchased[i]);
            let total = 0;
            for (let elem of orderData) {
              if (elem.DatePurchased == DatePurchased[i]) {
                total += elem.OrderTotal;
              }
            }
            totals.push(total);
          }
          let monthlyAmountMade = totals.reduce((a, b) => a + b);

          /*
          let total = orderData.map((a) => a.OrderTotal);

          let totalAmountMade = "$" + total.reduce((a, b) => a + b);
          console.log("totalAmountMade", totalAmountMade);

          let one = new Date(DatePurchased[0]).toDateString();
          let two = new Date(DatePurchased[2]).toDateString();
          console.log(one);
          console.log(two);
          */

          var data = [
            {
              x: days,
              y: totals,
              type: "bar",
            },
          ];

          let layout = {
            xaxis: { title: "Dates" },
            yaxis: { title: "Total Puchased" },
            title: "March Totals: " + monthlyAmountMade,
          };

          Plotly.newPlot("myDivOne", data, layout);
          /*
          let xArray = years;
          let yArray = TotalItems;

          let dataArray = [
            {
              x: xArray,
              y: yArray,
              mode: "lines+markers",
              connectgaps: true,
              type: "line",
              marker: {
                color: "rgb(164, 194, 244)",
                size: 12,
                line: {
                  color: "white",
                  width: 0.5,
                },
              },
            },
          ];
          setDataArray(dataArray);

          let layout = {
            xaxis: { title: "Dates" },
            yaxis: { range: [0, 50], title: "Total items bought" },
            title: "Items bought per amount spent",
          };
          setLayout(layout);
          setIsLoaded(true);
          Plotly.newPlot("myPlot", dataArray, layout);
                */
        }
      };

      fetchUserData();
    }, [isOwner]);
  }

  return (
    <>
      <div className="mb-[55px] md:flex md:mb-0">
        <CustomerNavBar />
        <div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-3xl font-bold md:text-left">
              Reports
            </h1>
            <div id="myPlot" className="w-1/4"></div>
            <div id="myDivOne" className="w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reports;
