import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { useUserData } from "./Queries";
import Button from "./Button";

import AdminNavBar from "../partials/AdminNavBar";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as GoIcons from "react-icons/go";

const Reports = ({ children }) => {
  const dispatch = useDispatch();

  const isOwner = useSelector((state) => state.isOwner);
  const userDetails = useSelector((state) => state.userDetails);

  const [layout, setLayout] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const [pieOpen, setPieOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [lineOpen, setLineOpen] = useState(false);
  const [barOpen, setBarOpen] = useState(false);

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
              marker: {
                color: "#387f5f",
              },
            },
          ];

          let layout = {
            title: "Lifetime Totals: $" + monthlyAmountMade,
            paper_bgcolor: "#efebe4",
            plot_bgcolor: "#efebe4",
            height: 400,
            width: 500,
          };

          Plotly.newPlot("BAR", data, layout);

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
              marker: {
                colors: [
                  "#387f5f",
                  "#96d9f7",
                  "#d2d2c8",
                  "#efebe4",
                  "#145a3c",
                  "#d2d2c8",
                ],
              },
            },
          ];

          let pielayout = {
            height: 400,
            width: 500,
            paper_bgcolor: "#efebe4",
            plot_bgcolor: "#efebe4",
          };

          Plotly.newPlot("PIE", piedata, pielayout);

          /////TABLE GRAPH

          //most popular items

          let popularItems = menuData
            .map((a) => (a.ItemIsPopular === true ? a.ItemName : ""))
            .filter((n) => n);

          let tabledata = [
            {
              type: "table",
              header: {
                align: "center",
                height: 30,
                fill: { color: "#387f5f" },
                font: { family: "Niveau", size: 20, color: "white" },
              },
              cells: {
                values: popularItems,
                align: "center",
                height: 30,
                fill: { color: "#efebe4" },

                font: {
                  family: "Niveau",
                  size: 18,
                  color: "#387f5f",
                },
              },
            },
          ];

          let tablelayout = {
            height: 400,
            width: 500,
            paper_bgcolor: "#efebe4",
            plot_bgcolor: "#efebe4",
          };

          Plotly.newPlot("TABLE", tabledata, tablelayout);

          ///LINE GRAPH

          var linedata = {
            x: days,
            y: totalItemsPerDay,
            mode: "lines",
            marker: {
              color: "#387f5f",
            },
          };

          var linelayout = {
            title: "Amount of items ordered per day",
            paper_bgcolor: "#efebe4",
            plot_bgcolor: "#efebe4",
          };

          Plotly.newPlot("LINE", [linedata], linelayout);

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
        <AdminNavBar />
        <div className="flex flex-col gap-10 pt-3 md:w-full md:px-13 md:pt-20 ">
          <div className="flex flex-row gap-3">
            <div className="">
              <div className="flex justify-between items-center"></div>
              <div className=" items center sm:ml-10 space-y-3">
                {/* Lifetime totals BAR Graph */}
                <div
                  onClick={() =>
                    dispatch(
                      setPieOpen(false),
                      setBarOpen(!barOpen),
                      setLineOpen(false),
                      setTableOpen(false)
                    )
                  }
                >
                  <Button
                    color="white"
                    bgColor="#387f5f"
                    text="Lifetime Totals"
                    borderRadius="10px"
                    size="md"
                  />
                </div>
                {/* Popular items Table Graph */}
                <div
                  onClick={() =>
                    dispatch(
                      setPieOpen(false),
                      setBarOpen(false),
                      setLineOpen(false),
                      setTableOpen(!tableOpen)
                    )
                  }
                >
                  <Button
                    color="white"
                    bgColor="#387f5f"
                    text="Popular Items"
                    borderRadius="10px"
                    size="md"
                  />
                </div>
                {/* Order item totals Line Graph */}

                <div
                  onClick={() =>
                    dispatch(
                      setPieOpen(false),
                      setBarOpen(false),
                      setLineOpen(!lineOpen),
                      setTableOpen(false)
                    )
                  }
                >
                  <Button
                    color="white"
                    bgColor="#387f5f"
                    text="Total Items Ordered"
                    borderRadius="10px"
                    size="md"
                  />
                </div>
                {/* Percentage of items on menu Pie Graph */}

                <div
                  onClick={() =>
                    dispatch(
                      setPieOpen(!pieOpen),
                      setBarOpen(false),
                      setLineOpen(false),
                      setTableOpen(false)
                    )
                  }
                >
                  <Button
                    color="white"
                    bgColor="#387f5f"
                    text="Item Percentages"
                    borderRadius="10px"
                    size="md"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 space-x-3 items center ml-12"></div>
            <div
              id="BAR"
              className={barOpen ? "w-[40vw] h-[40vh]" : "hidden"}
            ></div>
            <div
              id="LINE"
              className={lineOpen ? "w-[30vw] h-[40vh]" : "hidden"}
            ></div>
            <div
              id="PIE"
              className={pieOpen ? "w-[30vw] h-[30vh]" : "hidden"}
            ></div>
            <div
              id="TABLE"
              className={tableOpen ? "w-[30vw] h-[40vh]" : "hidden"}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reports;
