import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomerMenuItem from "../../Layout/CustomerMenuItem";

const CustomerMenu = () => {
  //previously menu

  // * expected behavior *
  //showcases the menu items pulled from backend

  /*
  To do:
  Pull from backend all menu options
  */

  return (
    <div>
      {menu.map((item) => (
        <CustomerMenuItem item={item} />
      ))}
    </div>
  );
};

export default CustomerMenu;
