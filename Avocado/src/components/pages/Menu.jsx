import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MenuItem from "../partials/MenuItem";
import { setMenu } from "../reducers/MenuSlice";

const Menu = () => {
  // const menu = useSelector((state) => state.menu);
  // const dispatch = useDispatch();

  // const getMenu = async () => {
  //   const response = await fetch("http://localhost:3060/displaymenu");
  //   const json = await response.json();
  //   dispatch(setMenu(json));
  // };

  // useEffect(() => {
  //   getCustomer();
  // }, []);

  // const [accountDetails, setAccountDetails] = useState({});

  // const setFormState = (e) => {
  //   setAccountDetails({
  //     ...accountDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <div>
      {menu.map((item) => (
        <MenuItem item={item} />
      ))}
    </div>
  );
};

export default Menu;
