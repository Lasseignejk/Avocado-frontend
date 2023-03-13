import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavBar from "../partials/AdminNavBar";

// import { setRestaurant } from "../reducers/DashboardSlice";
import RestaurantMenuItemCardBOH from "./Admin/Menu/RestaurantMenuItemCardBOH";
const BOH = () => {
  const restaurantId = useSelector((state) => state.currentRestaurant[0]);
  console.log(restaurantId);

  const [restToEdit, setRestToEdit] = useState([]);
  const [OrderId, setOrderId] = useState([]);
  useEffect(() => {
    console.log("useEffectFired");
    const getOrders = async () => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND + "/admin/restaurant/getOrders",
        {
          method: "GET",
          headers: {
            restaurantid: restaurantId,
          },
        }
      );

      if (!response.ok) {
        window.alert(response?.statusText);
      } else {
        const json = await response?.json();
        setRestToEdit(json);
        console.log(json);
        console.log(restToEdit[0]);
      }
    };
    getOrders();
  }, [restaurantId]);

  // const [OrderId, setOrderId] = useState();
  
  useEffect(() => {
    restToEdit?.map((order) => {
      console.log(order);
        const getOrderItems = async () => {
          const response = await fetch(
            import.meta.env.VITE_BACKEND + "/admin/restaurant/getOrderItems",
            {
              method: "GET",
              headers: {
                orderid: order.id,
              },
            }
          );
          if (!response.ok) {
            window.alert(response.statusText);
          } else {
            const json = await response.json();
            setOrderId(json);
            console.log(json);
          }
        };
        getOrderItems();
    });
  
  }, []);

  return (
    <div className="mb-[55px] lg:flex lg:mb-0 justify-start">
      <AdminNavBar />
      <div className="flex flex-col gap-10 pt-3 lg:w-full lg:px-16 lg:pt-20 lg:flex-row  justify-between">
        <div>
          <div className="flex flex-col gap-3 mb-5">
            <h1 className="text-center text-4xl font-bold text-green lg:text-left">
              {restToEdit[0]?.id}
            </h1>
            <h1 className="text-center text-3xl font-bold lg:text-left">
              Current Orders for {OrderId[0]?.MenuItemName
}
            </h1>
          </div>
          <div className="flex flex-col items-center lg:flex-row lg:flex-wrap gap-3 lg:justify-center">
            {/* {getOrderItems?.map((item) => (
              <RestaurantMenuItemCardBOH setMenu={setMenu} item={item} />
            ))} */}
          </div>
        </div>
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
};

export default BOH;
