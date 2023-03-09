import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MenuItem from "../../partials/MenuItem";
import placeholder from "/items/menu_placeholder.svg";
import Cart from "../../partials/Cart";

const Menu = () => {
  const location = useLocation();
  const restuarant = location.state;
  console.log(restuarant);
  const cart = useSelector((state) => state.cart);

  const [menu, setMenu] = useState();

  useEffect(() => {
    const getMenu = async () => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND + "/admin/restaurant/getmenu",
        {
          method: "GET",
          headers: {
            restid: restuarant.id,
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
  }, [restuarant.id]);

  return (
    <div className="flex">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 justify-center">
          <div>
            <img
              className="h-20"
              src={restuarant.RestLogo ? restuarant.RestLogo : placeholder}
              alt=""
            />
          </div>
          <div>
            <h1 className="font-bold">{restuarant.RestName}</h1>
            <h1>{restuarant.RestLocation}</h1>
            <h1>{restuarant.RestPhoneNumber}</h1>
            <h1>{restuarant.RestHours}</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-evenly gap-3">
          {menu?.map((item) => (
            <MenuItem item={item} />
          ))}
        </div>
      </div>
      <div>
        <Cart />
      </div>
    </div>
  );
};

export default Menu;
