import React, { useState, useEffect } from "react";
import RestaurantAdminNewMenuItem from "./RestaurantAdminNewMenuItem";
import AdminNavBar from "../partials/AdminNavBar";
import { supabase } from "../../supabase";

const RestaurantAdminMenu = () => {
  ///previously AdminMenu

  // * expected behavior *
  //Lists options to choose for admin

  /*
  To do:
  */

  //searches for menu items by restaurant id (in state) in menuitems database
  //query in Queries
  const { data, error } = useMenuData(id);
  console.log("menudata:", data);

  return (
    <div className="flex">
      <AdminNavBar />
      <div>
        <h1>Edit Menu</h1>
      </div>
      <RestaurantAdminNewMenuItem />
    </div>
  );
};

export default RestaurantAdminMenu;
