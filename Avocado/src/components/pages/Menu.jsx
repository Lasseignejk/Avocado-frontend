import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MenuItem from "../partials/MenuItem";

const Menu = () => {
  return (
    <div>
      {menu.map((item) => (
        <MenuItem item={item} />
      ))}
    </div>
  );
};

export default Menu;
