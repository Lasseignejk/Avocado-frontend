import React from "react";
import MenuItem from "../partials/MenuItem";

const Menu = () => {
  return (
    <div>
      {menubar.map((item) => (
        <MenuItem item={item} />
      ))}
    </div>
  );
};

export default Menu;
