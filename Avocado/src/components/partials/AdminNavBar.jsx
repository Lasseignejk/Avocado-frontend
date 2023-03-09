import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignOut } from "../Layout/Queries";
import AdminNavBarLinks from "./AdminNavBarLinks";

const AdminNavBar = () => {
  const signOut = useSignOut();
  const [show, setShow] = useState(true);
  const [spin, setSpin] = useState(true);

  const toggleNav = () => {
    setShow(!show);
    setSpin(!spin);
  };

  const adminLinks = [
    { title: "Reports", path: "/reports", src: "../../items/reports.svg" },
    {
      title: "Manage Restaurants",
      path: "/myrestaurants",
      src: "../../items/manage.svg",
    },
    { title: "My Account", path: "/admin", src: "../../items/account.svg" },
  ];

  const linkLength = adminLinks.length + 1;

  return (
    <div
      className="w-full md:min-h-screen fixed bottom-0 md:flex md:flex-col md:bg-green md:static md:w-[300px]"
      onClick={() => toggleNav()}
    >
      <div className="bg-green w-full box-border p-3 flex justify-between z-10 relative md:w-[300px] md:z-0 md:p-5">
        <img src="../logos/avocado_gray.svg" alt="" className="h-[30px]" />
        <button
          className="w-[30px] h-[30px] bg-green md:hidden "
          onClick={() => toggleNav()}
        >
          <img
            src="../items/expand_more.svg"
            alt=""
            className={"duration-200 ease-in" + (spin ? " rotate-180" : "")}
          />
        </button>
      </div>
      <nav
        className={
          "bg-green text-xl text-gray font-bold duration-500 nav fixed w-full z-[9] p-5 text-center md:relative md:z-0 md:w-[300px] md:text-left md:translate-y-0 md:duration-[0ms]" +
          (show ? "" : " translate-y-[-340px]")
        }
      >
        <ul className="flex flex-col gap-5">
          <AdminNavBarLinks links={adminLinks} />

          <li className="border-b-2 border-gray pb-5 md:border-none">
            <button
              className="md:bg-dkgreen md:px-3 md:py-1 md:rounded-full md:text-gray md:w-[140px] md:flex md:gap-3"
              type="button"
              onClick={(e) => {
                signOut();
              }}
            >
              <img
                src="../../items/logout.svg"
                className="hidden md:block md:w-[30px]"
              />{" "}
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavBar;
