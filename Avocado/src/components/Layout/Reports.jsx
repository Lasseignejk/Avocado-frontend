import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { useUserData } from "./Queries";
import Button from "./Button";
import {
  setCurrentRestId,
  setBarGraph,
  setLineGraph,
  setTableGraph,
  setPieGraph,
} from "../reducers/DashboardSlice";

import AdminNavBar from "../partials/AdminNavBar";

const Reports = () => {
  const dispatch = useDispatch();

  const isOwner = useSelector((state) => state.isOwner);
  const userDetails = useSelector((state) => state.userDetails);
  const currentRestId = useSelector((state) => state.currentRestId);

  const barGraph = useSelector((state) => state.barGraph);
  const lineGraph = useSelector((state) => state.lineGraph);
  const tableGraph = useSelector((state) => state.tableGraph);
  const pieGraph = useSelector((state) => state.pieGraph);

  const [restName, setRestName] = useState(null);

  const [error, setError] = useState(false);

  const [pieOpen, setPieOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [lineOpen, setLineOpen] = useState(false);

  //const [barOpen, setBarOpen] = useState(false);

  const [allRestrauntsByOwner, setRestaurants] = useState(null);

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
        let restId = currentRestId; //currentRestaurantId

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [currentRestId]);

  return (
    <>
      <div className="mb-[55px] md:flex md:mb-0">
        <AdminNavBar />
        <div className="flex flex-col gap-10 pt-3 md:w-full md:px-13 md:pt-20 ">
          <div className="flex flex-row gap-3">
            <div className="">
              <div className="flex justify-between items-center"></div>
              <div className="flex flex-col items center sm:ml-10 space-y-3">
                <h1 className="text-2xl text-black">Reporting for:</h1>
                <div
                  className={
                    allRestrauntsByOwner
                      ? "items center sm:ml-10 space-y-3"
                      : "hidden"
                  }
                >
                  {allRestrauntsByOwner?.map((a) => (
                    <div
                      key={a.id}
                      className="flex flex-row items-center w-[100px] h-[70px] md:w-[100px] md:h-[100px] box-border bg-ltgray rounded-2xl duration-200 ease-in hover:bg-blue font-niveau px-2 py-3 md:py-3 md:shadow-md justify-between"
                      onClick={() => dispatch(setCurrentRestId(a.id))}
                    >
                      <img
                        className="relative w-full"
                        src={a.RestLogo ? a.RestLogo : placeholder}
                        alt="logo"
                      />
                    </div>
                  ))}
                </div>
                {/* Lifetime totals BAR Graph */}
                <div
                  onClick={() =>
                    dispatch(
                      setBarGraph(!barGraph),
                      setPieOpen(false),
                      setLineOpen(false),
                      setTableOpen(false)
                    )
                  }
                >
                  <Button
                    color="white"
                    bgColor="#387f5f"
                    text="Lifetime Totals"
                    borderRadius="8px"
                    size="sm"
                  />
                </div>
                {/* Popular items Table Graph */}
                <div
                  onClick={() =>
                    dispatch(
                      setBarGraph(false),
                      setPieOpen(false),
                      setLineOpen(false),
                      setTableOpen(!tableGraph)
                    )
                  }
                >
                  <Button
                    color="white"
                    bgColor="#387f5f"
                    text="Popular Items"
                    borderRadius="8px"
                    size="sm"
                  />
                </div>
                {/* Order item totals Line Graph */}

                <div
                  onClick={() =>
                    dispatch(
                      setBarGraph(false),
                      setPieOpen(false),
                      setLineOpen(!lineGraph),
                      setTableOpen(false)
                    )
                  }
                >
                  <Button
                    color="white"
                    bgColor="#387f5f"
                    text="Ordered Total"
                    borderRadius="8px"
                    size="sm"
                  />
                </div>
                {/* Percentage of items on menu Pie Graph */}

                <div
                  onClick={() =>
                    dispatch(
                      setBarGraph(false),
                      setPieOpen(!pieGraph),
                      setLineOpen(false),
                      setTableOpen(false)
                    )
                  }
                >
                  <Button
                    color="white"
                    bgColor="#387f5f"
                    text="Menu Percentages"
                    borderRadius="8px"
                    size="sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 space-x-3 items center ml-12"></div>
            <div
              id="BAR"
              className={barGraph ? "w-[40vw] h-[40vh]" : "hidden"}
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
