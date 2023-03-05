import React, { useState, useEffect } from "react";
import NewMenuItem from "../partials/NewMenuItem";
import AdminNavBar from "../partials/AdminNavBar";
import { useLocation } from "react-router-dom";
import { supabase } from "../../supabase";

const AdminMenu = () => {
  const location = useLocation();
  const restaurant = location.state.id;
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenubyRestaurant = async () => {
      const { data, error } = await supabase
        .from("MenuItems")
        .select()
        .eq("RestId", 1);

      if (error) {
        console.log(error);
      }
      if (data) {
        setMenu(data);
        console.log(data);
      }
    };
    fetchMenubyRestaurant();
  }, [1]);

  return (
    <div className="flex">
      <AdminNavBar />
      <div>
        <h1>Menu</h1>
      </div>
      <NewMenuItem />
    </div>
  );
};

export default AdminMenu;
