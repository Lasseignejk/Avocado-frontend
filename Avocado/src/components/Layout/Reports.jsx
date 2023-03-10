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

        //reports

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

          ///BAR GRAPH

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

          console.log();
          //all unique days items were purchased
          let DatePurchased = orderData.map((a) => a.DatePurchased.toString());
          DatePurchased = [...new Set(DatePurchased)];

          console.log(
            "sort",
            DatePurchased.sort((a, b) => a - b)
          );

          //arrays for totals by day
          let days = [];
          let totals = [];
          let totalItemsPerDay = [];

          //daily totals
          for (let i = 0; i < DatePurchased.length; i++) {
            days.push(DatePurchased[i]);
            let total = 0;
            let totalItemsCount = 0;
            for (let elem of orderData) {
              if (elem.DatePurchased == DatePurchased[i]) {
                total += elem.OrderTotal;
                totalItemsCount += elem.TotalItems;
              }
            }
            totals.push(total);
            totalItemsPerDay.push(totalItemsCount);
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
            title: "Lifetime Totals: $" + monthlyAmountMade,
          };

          Plotly.newPlot("myDivOne", data, layout);

          //////PIE CHART

          //all menu items by restaurant
          const { data: menuData, error: menuError } = await supabase
            .from("MenuItems")
            .select()
            .eq("RestId", restId);

          //All breakfast items by restaurant
          let itemBreak = menuData.map((a) => [a.ItemBreakfast]).length;
          let itemLun = menuData.map((a) => [a.itemLunch]).length;
          let itemDin = menuData.map((a) => [a.itemDinner]).length;

          let piedata = [
            {
              values: [itemBreak, itemLun, itemDin],
              labels: ["Breakfast", "Lunch", "Dinner"],
              type: "pie",
            },
          ];

          var pielayout = {
            height: 400,
            width: 500,
          };

          Plotly.newPlot("myDivTwo", piedata, pielayout);

          /////TABLE GRAPH

          //most popular items

          let popularItems = menuData
            .map((a) => (a.ItemIsPopular === true ? a.ItemName : ""))
            .filter((n) => n);

          let tabledata = [
            {
              type: "table",
              header: {
                values: [["<b>Popular Items:</b>"]],
                align: "center",
                height: 30,
                fill: { color: "green" },
                font: { family: "Niveau", size: 20, color: "white" },
              },
              cells: {
                values: popularItems,
                align: "center",
                height: 30,

                font: {
                  family: "Niveau",
                  size: 18,
                  color: "green",
                },
              },
            },
          ];

          Plotly.newPlot("myDivThree", tabledata);

          ///LINE GRAPH

          var linedata = {
            x: days,
            y: totalItemsPerDay,
            mode: "lines",
          };

          var linelayout = {
            title: "Amount of items ordered per day",
          };

          Plotly.newPlot("myDivFour", [linedata], linelayout);

          const { data: stuffData, error: stuffError } = await supabase
            .from("MenuItems")
            .select()
            .match({ RestId: 58, ItemLunch: false });

          console.log("stuff", stuffData);

          console.log(stuffError);

          ///end of await function

          if (menuError) {
            setError(menuError);
            return;
          }

          if (menuData) {
            //console.log("menu data", menuData);
          }

          //Table
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
            <div id="myDivTwo" className="w-[70vw]"></div>
            <div id="myDivThree" className="w-[70vh]"></div>
            <div id="myDivFour" className="w-[90vh]"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reports;
