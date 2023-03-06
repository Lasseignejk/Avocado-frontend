import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CustomerNavBar = () => {
  //previously AdminNavBar (re-used for Customer here)

  // * expected behavior *
  //showcases all options for Customer

  /*
  To do:
  Update for Customer
  */

  const [show, setShow] = useState("false");

  const toggleNav = () => {
    setShow(!show);
  };

  return (
    <div className="w-full md:min-h-screen fixed bottom-0 md:flex md:flex-col md:bg-green md:static">
      <div className="bg-green w-full box-border p-3 flex justify-between z-10 relative md:w-[300px] md:z-0 md:p-5">
        <img src="../logos/avocado_gray.svg" alt="" className="h-[30px]" />
        <button
          className="w-[30px] h-[30px] bg-green md:hidden "
          onClick={() => toggleNav()}
        >
          <img src="../items/expand_more.svg" alt="" className="" />
        </button>
      </div>
      <nav
        className={
          "bg-green text-xl text-gray font-bold duration-500 nav fixed w-full z-[9] p-5 text-center md:relative md:z-0 md:w-[300px] md:text-left md:translate-y-0 md:duration-[0ms]" +
          (show ? " translate-y-[-260px]" : "")
          // "md:relative md:w-[300px] md:z-0 md:text-left"
        }
      >
        <ul className="flex flex-col gap-5">
          <li className="border-b-2 border-gray pb-5">
            <Link to={"/restaurantinfo"}> My Restaurants</Link>
          </li>
          <li className="border-b-2 border-gray pb-5">
            <Link to={"/admin"}> My Account</Link>
          </li>
          <li>
            <Link to={"#"}> Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomerNavBar;
