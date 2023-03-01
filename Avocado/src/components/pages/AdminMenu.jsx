import React from "react";
import NewMenuItem from "../partials/NewMenuItem";
import AdminNavBar from "../partials/AdminNavBar";

const AdminMenu = () => {
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
