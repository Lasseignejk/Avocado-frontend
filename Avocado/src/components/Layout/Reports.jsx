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
          let restId = 48;

          const { data: orderData, error: orderError } = await supabase
            .from("Order")
            .select()
            .eq("RestaurantId", restId);

          if (orderError) {
            setError(orderError);
            return;
          }

          if (orderData) {
            //console.log(orderData);
          }

          //all unique days items were purchased
          let DatePurchased = orderData.map((a) => a.DatePurchased.toString());
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
            title: "March Totals: $" + monthlyAmountMade,
          };

          Plotly.newPlot("myDivOne", data, layout);

          //gets all Order Items by OrderId
          let OrderIds = orderData.map((a) => a.id);

          for (let i = 0; i < OrderIds.length; i++) {
            const { data: itemsPerOrderData, error: itemsPerOrderError } =
              await supabase
                .from("OrderItem")
                .select()
                .eq("OrderId", OrderIds[i]);

            if (itemsPerOrderError) {
              setError(itemsPerOrderError);
              return;
            }

            if (itemsPerOrderData) {
              console.log(itemsPerOrderData);
            }
          }

          //all menu items by restaurant
          const { data: menuData, error: menuError } = await supabase
            .from("MenuItems")
            .select()
            .eq("RestId", restId);

          console.log(menuData);

          let itemIds = menuData.map((a) => a.id);
          let itemNames = menuData.map((a) => a.ItemName);

          console.log(itemNames, itemIds);
          let breakfast = menuData.map((a) => a.ItemBreakfast);
          let lunch = menuData.map((a) => a.ItemLunch);
          let dinner = menuData.map((a) => a.ItemDinner);

          if (menuError) {
            setError(menuError);
            return;
          }

          if (menuData) {
            //console.log("menu data", menuData);
          }

          //Table

          var values = [
            ["Salaries", "Office", "Merchandise", "Legal", "<b>TOTAL</b>"],
            [1200000, 20000, 80000, 2000, 12120000],
            [1300000, 20000, 70000, 2000, 130902000],
            [1300000, 20000, 120000, 2000, 131222000],
            [1400000, 20000, 90000, 2000, 14102000],
          ];

          var data = [
            {
              type: "table",
              header: {
                values: [
                  ["<b>EXPENSES</b>"],
                  ["<b>Q1</b>"],
                  ["<b>Q2</b>"],
                  ["<b>Q3</b>"],
                  ["<b>Q4</b>"],
                ],
                align: "center",
                line: { width: 1, color: "black" },
                fill: { color: "grey" },
                font: { family: "Arial", size: 12, color: "white" },
              },
              cells: {
                values: values,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] },
              },
            },
          ];

          Plotly.newPlot("myDiv", data);

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
            <div id="myDivOne" className="w-[70vw]"></div>
            <div id="myDiv" className="w-[70vw]"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reports;
