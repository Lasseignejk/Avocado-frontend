import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import placeholder from "/items/menu_placeholder.svg";
import { supabase } from "../../supabase";
import { useUserData } from "./Queries";
import {
  setBarGraph,
  setLineGraph,
  setTableGraph,
  setPieGraph,
} from "../reducers/DashboardSlice";

import AdminNavBar from "../partials/AdminNavBar";
import ReportsRestaurantOptions from "../pages/Admin/ReportsRestaurantOptions";

const Reports = () => {
  const dispatch = useDispatch();

  const isOwner = useSelector((state) => state.isOwner);
  const userDetails = useSelector((state) => state.userDetails);
  const currentRestaurant = useSelector((state) => state.currentRestaurant[0]);
  const barGraph = useSelector((state) => state.barGraph);
  const lineGraph = useSelector((state) => state.lineGraph);
  const tableGraph = useSelector((state) => state.tableGraph);
  const pieGraph = useSelector((state) => state.pieGraph);

  const [restName, setRestName] = useState(null);

  const [error, setError] = useState(false);

  //const [barOpen, setBarOpen] = useState(false);

  const [allRestrauntsByOwner, setRestaurants] = useState(null);

  const openBarGraph = () => {
    dispatch(setBarGraph(!barGraph));
    dispatch(setPieGraph(false));
    dispatch(setLineGraph(false));
    dispatch(setTableGraph(false));
  };

  const openPieGraph = () => {
    dispatch(setBarGraph(false));
    dispatch(setPieGraph(pieGraph));
    dispatch(setLineGraph(false));
    dispatch(setTableGraph(false));
  };

  const openLineGraph = () => {
    dispatch(setBarGraph(false));
    dispatch(setPieGraph(false));
    dispatch(setLineGraph(!lineGraph));
    dispatch(setTableGraph(false));
  };

  const openTableGraph = () => {
    dispatch(setBarGraph(false));
    dispatch(setPieGraph(false));
    dispatch(setLineGraph(false));
    dispatch(setTableGraph(!tableGraph));
  };

  useEffect(() => {
    if (isOwner) {
      const fetchOwnerData = async () => {
        try {
          const { id } = userDetails[0];

          //all restaurants by owner
          const { data: restrauntsByOwnerData, error: errorByOwnerData } =
            await supabase.from("Restaurant").select().eq("OwnerId", id);

          if (errorByOwnerData) {
            setError(errorByOwnerData);
            return;
          }

          //all restraunts data by owner

          setRestaurants(restrauntsByOwnerData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchOwnerData();
    }
  }, [isOwner]);

  useEffect(() => {
    const fetchUserData = async () => {
      //order for that specifc restaurant (currently hard coded in)

      try {
        let restId = currentRestaurant; //currentRestaurantId

        ///BAR GRAPH

        //all orders by rest
        const { data: orderData, error: orderError } = await supabase
          .from("Order")
          .select()
          .eq("RestaurantId", restId);

        //all unique days items were purchased
        let DatePurchased = orderData.map((a) => a.DatePurchased.toString());
        DatePurchased = [...new Set(DatePurchased)];

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
          height: 300,
          width: 500,
          xaxis: {
            tickformat: "%d %B (%a)\n %Y",
          },
        };

        Plotly.newPlot("BAR", data, layout);

        //orderData
        //orderItemData
        // const ids = [];
        // const getOrderIds = (orderData) => {
        // 	console.log(orderData);

        // 	orderData.forEach((order) => {
        // 		ids.push(order.id);
        // 	});
        // 	return ids;
        // };
        // const orderIds = getOrderIds(orderData);
        // console.log(orderIds);

        // const getOrderItemIds = () => {
        // 	let orderItems = [];
        // 	orderIds.map(async (id) => {
        // 		const { data, error } = await supabase
        // 			.from("OrderItem")
        // 			.select()
        // 			.eq("OrderId", id);
        // 		orderItems = [...orderItems, ...data];
        // 		console.log(orderItems);
        // 		const itemsIds = [];
        // 		orderItems.map((item) => {
        // 			itemsIds.push(item.MenuItemId);
        // 		});
        // 		console.log(itemsIds);
        // 	});
        // };

        // const test = getOrderItemIds();
        // console.log(test);

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
          height: 300,
          width: 500,
          paper_bgcolor: "#efebe4",
          plot_bgcolor: "#efebe4",
          legend: {
            x: 1,
            xanchor: "right",
          },
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
              fill: { color: "#387f5f" },
              font: { family: "niveau-grotesk", size: 20, color: "#fffbf7" },
            },
            cells: {
              values: popularItems,
              align: "center",
              height: 30,
              width: 50,
              fill: { color: "#efebe4" },

              font: {
                family: "niveau-grotesk",
                size: 8,
                color: "#387f5f",
              },
            },
          },
        ];

        let tablelayout = {
          height: 300,
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
          height: 280,
          xaxis: {
            tickformat: "%d %B (%a)\n %Y",
          },
        };

        Plotly.newPlot("LINE", [linedata], linelayout);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [currentRestaurant]);

  return (
    <>
      <div className="mb-[55px] lg:flex lg:mb-0 overflow-y-hidden">
        <AdminNavBar />
        <div className="flex flex-col gap-10 pt-3 lg:w-full lg:pl-16 lg:pr-8 lg:pt-20 lg:flex-row lg:justify-between lg:pb-10">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items center">
              <h1 className="text-center mb-3 text-4xl font-bold text-green lg:pl-0 lg:text-left">
                Reports
              </h1>

              <div className="flex justify-center lg:justify-start">
                <ReportsRestaurantOptions />
              </div>
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                {/* Lifetime totals BAR Graph */}
                <button
                  type="button"
                  onClick={() => dispatch(openBarGraph())}
                  className="w-[170px] text-ltgray bg-green rounded-full px-5 py-2"
                >
                  Lifetime Totals
                </button>

                {/* Popular items Table Graph */}
                <button
                  type="button"
                  onClick={() => dispatch(openTableGraph())}
                  className="w-[170px] text-ltgray bg-green rounded-full px-5 py-2"
                >
                  Popular Items
                </button>
                {/* Order item totals Line Graph */}
                <button
                  type="button"
                  onClick={() => dispatch(openLineGraph())}
                  className="w-[170px] text-ltgray bg-green rounded-full px-5 py-2"
                >
                  Ordered Total
                </button>
                {/* Percentage of items on menu Pie Graph */}
                <button
                  type="button"
                  onClick={() => dispatch(openPieGraph())}
                  className="w-[170px] text-ltgray bg-green rounded-full px-5 py-2"
                >
                  Menu Percentages
                </button>
              </div>
            </div>

            <div className="mt-5 space-x-3 items-center mx-12 h-[500px]">
              <div className="flex justify-center">
                <div
                  id="BAR"
                  className={barGraph ? "w-[510px] h-[310px]" : "hidden"}
                ></div>
              </div>
              <div className="flex justify-center">
                <div
                  id="LINE"
                  className={lineGraph ? "w-[510px] h-[310px]" : "hidden"}
                ></div>
              </div>
              <div className="flex justify-center">
                <div
                  id="PIE"
                  className={pieGraph ? "w-[510px] h-[310px]" : "hidden"}
                ></div>
              </div>
              <div className="flex justify-center">
                <div
                  id="TABLE"
                  className={tableGraph ? "w-[510px] h-[310px]" : "hidden"}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reports;
