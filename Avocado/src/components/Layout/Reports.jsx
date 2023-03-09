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
  const [layout, setLayout] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  if (isOwner) {
    useEffect(() => {
      const fetchUserData = async () => {
        const { data, error } = await supabase.from("Order").select("*");

        if (error) {
          setError(error);
          return;
        }
        if (data) {
          console.log(data);
          let createdAt = data.map((a) => a.created_at);
          let CustomerId = data.map((a) => a.CustomerId);
          let IsDelivery = data.map((a) => a.IsDelivery);
          let IsPickup = data.map((a) => a.IsPickup);
          let OrderTotal = data.map((a) => a.OrderTotal);
          let TotalItems = data.map((a) => a.TotalItems);
          let xArray = OrderTotal;
          let yArray = TotalItems;

          let dataArray = [
            {
              x: xArray,
              y: yArray,
              mode: "markers",
              type: "scatter",
            },
          ];
          setDataArray(dataArray);

          let layout = {
            xaxis: { range: [0, 100], title: "Total amount spent" },
            yaxis: { range: [0, 100], title: "Total items bought" },
            title: "Items bought per amount spent",
          };
          setLayout(layout);

          setIsLoaded(true);
          Plotly.newPlot("myPlot", dataArray, layout);
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
            <div id="myPlot" className="w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reports;
