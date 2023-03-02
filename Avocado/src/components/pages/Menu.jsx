import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MenuItem from "../partials/MenuItem";
import { fetchMenu } from "../reducers/MenuSlice";

const Menu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  return (
    <div>
      {/* {menu.map((item) => (
        <MenuItem item={item} />
      ))} */}
    </div>
  );
};

export default Menu;
