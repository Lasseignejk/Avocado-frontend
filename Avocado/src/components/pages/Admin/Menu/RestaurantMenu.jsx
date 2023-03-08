import React, { useState, useEffect } from "react";
import RestaurantAddMenuItemForm from "./RestaurantAddMenuItemForm";
import AdminNavBar from "../../../partials/AdminNavBar";
import { supabase } from "../../../../supabase";
import RestaurantMenuItemCard from "./RestaurantMenuItemCard";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
  ///previously AdminMenu

  const restaurantId = useSelector((state) => state.currentRestaurant[0]);

  const [menu, setMenu] = useState();

  useEffect(() => {
    console.log();
    const getMenu = async () => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND + "/admin/restaurant/getmenu",
        {
          method: "GET",
          headers: {
            restid: restaurantId,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        window.alert(response.statusText);
      } else {
        const json = await response.json();
        setMenu(json);
        console.log("menu: ", json);
      }
    };
    getMenu();
  }, [restaurantId]);

  return (
    <div className="mb-[55px] md:flex md:mb-0 justify-start">
      <AdminNavBar />
      <div className="">
        <h1 className="font-bold text-center">Edit Menu</h1>
        <div className="flex flex-col justify-evenly md:flex-row md:flex-wrap md:justify-evenly gap-3">
          {menu?.map((item) => (
            <RestaurantMenuItemCard setMenu={setMenu} item={item} />
          ))}
        </div>
      </div>
      <RestaurantAddMenuItemForm />
    </div>
  );
};

export default RestaurantMenu;
