import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSignOut } from "../Layout/Queries";
import { useDispatch, useSelector } from "react-redux";
import CustomerNavBarLinks from "./CustomerNavBarLinks";
import { setGuest } from "../reducers/DashboardSlice";

const CustomerNavBar = () => {
  const signOut = useSignOut();
  const [show, setShow] = useState(true);
  const [spin, setSpin] = useState(true);

  const toggleNav = () => {
    setShow(!show);
    setSpin(!spin);
  };

  const isGuest = useSelector((state) => state.isGuest);
  console.log(isGuest);

  const Customerlinks = [
    { title: "Restaurants", path: "#", src: "../../items/restaurant.svg" },
    { title: "My Account", path: "#", src: "../../items/account.svg" },
  ];

  const Guestlinks = [
    {
      title: "Restaurants",
      path: "/customerdashboard",
      src: "../../items/restaurant.svg",
    },
    { title: "Login", path: "/", src: "../../items/login.svg" },
    {
      title: "Make an account",
      path: "/accountSignUp",
      src: "../../items/signUp.svg",
    },
  ];

  useEffect(() => {
    if (isGuest) {
    }
  }, [isGuest]);

  return (
    <div
      className="w-full h-[53px] fixed bottom-0 md:h-[80px] md:flex md:bg-blue md:static"
      onClick={() => toggleNav()}
    >
      <div className="bg-blue w-full box-border p-3 flex justify-between z-10 relative md:z-0 md:p-5">
        <img src="../logos/avocado_green.svg" alt="" className="h-[30px]" />
        <button
          className="w-[30px] h-[30px] bg-blue md:hidden"
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
          "bg-blue text-xl text-black font-bold duration-500 nav fixed w-full z-[9] p-5 text-center md:relative md:z-0 md:translate-y-0 md:duration-[0ms]" +
          (show ? "" : " translate-y-[calc((90px*3)*-1)]")
          // (show ? "" : " translate-y-[-275px]")
        }
      >
        <ul className="flex flex-col gap-5 md:flex-row md:justify-end">
          {!isGuest && (
            <>
              <CustomerNavBarLinks links={Customerlinks} />
              <li className="border-b-2 border-black pb-5 h-[50px] md:h-[37px] hover:bg-[#4e98ba] duration-200 ease-in md:rounded-full md:border-none md:pb-0">
                <button
                  className="md:bg-[#4e98ba] md:px-3 md:py-1 md:rounded-full md:text-gray"
                  type="button"
                  onClick={(e) => {
                    signOut();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {isGuest && (
            <>
              <CustomerNavBarLinks links={Guestlinks} />
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default CustomerNavBar;
