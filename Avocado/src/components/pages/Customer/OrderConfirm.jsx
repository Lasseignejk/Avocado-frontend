import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomerNavBar from "../../partials/CustomerNavBar";

const OrderConfirm = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userDetails[0]);
  const restaurant = useSelector((state) => state.currentRestaurant[0]);
  const [orderId, setOrderId] = useState();

  let finalTotal = 0;
  let amountTotal = 0;
  for (let elem of cart) {
    finalTotal += elem.Amount * elem.ItemPrice;
    amountTotal += elem.Amount;
  }

  const [delivery, setDelivery] = useState(false);
  const [pickup, setPickup] = useState(false);

  const [order, setOrder] = useState({
    id: orderId,
    CustomerId: user.id,
    RestaurantId: restaurant.id,
    OrderTotal: finalTotal,
    OrderComplete: false,
    IsPickup: pickup,
    IsDelivery: delivery,
    TotalItems: cart.length,
  });

  const setOptions = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  let orderData = null;

  const getOrderId = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "/order/getorders",
      {
        method: "GET",
        headers: {
          userid: user.id,
        },
      }
    );
    if (!response.ok) {
      window.alert(response.statusText);
    } else {
      orderData = await response.json();
      console.log("data: ", orderData);
    }
  };

  const submitOrder = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "/order/sendorder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await getOrderId();
      setOrderId(orderData[orderData.length - 1].id + 1);
    };
    fetchData();
  }, []);

  console.log("order id: ", orderId);

  // const [orderItems, setOrderItems] = useState({
  //   MenuItemId: cart.id,
  //   OrderId: orderId,
  //   ItemQuantity: cart.Amount,
  //   MenuItemName: cart.ItemName,
  // });

  const submitOrderItems = () => {
    submitOrder();
    cart.forEach((item) => {
      console.log({
        MenuItemId: item.id,
        OrderId: orderId,
        ItemQuantity: item.Amount,
        MenuItemName: item.ItemName,
      });
      const sendItems = async (item) => {
        const response = await fetch(
          import.meta.env.VITE_BACKEND + "/order/sendorderitems",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              MenuItemId: item.id,
              OrderId: orderId,
              ItemQuantity: item.Amount,
              MenuItemName: item.ItemName,
            }),
          }
        );
      };
      sendItems(item);
    });
  };

  return (
    <div className="flex flex-col gap-4 justify-items-center ">
      <CustomerNavBar />
      <div className="flex flex-col m-auto w-[400px] gap-4">
        <h1 className="py-4 text-[2rem] text-center font-black">
          Confirm your order
        </h1>
        <div className="flex flex-col justify-center">
          {cart?.map((item) => (
            <div className="flex gap-3">
              <h1>{item.Amount}</h1>
              <h1>{item.ItemName}</h1>
              <h1>${item.ItemPrice}.00</h1>
            </div>
          ))}
          <textarea
            name="Notes"
            id="Notes"
            rows="5"
            placeholder="Order notes"
            onChange={(e) => setOptions(e)}
          ></textarea>
        </div>
        <h1 className="py-4 text-[2rem] text-center font-black">
          Total: ${finalTotal}.00
        </h1>
        <button
          className="bg-green text-gray text-lg px-3 py-1 duration-200 font-bold tracking-widest hover:bg-dkgreen rounded-full shadow-lg ease-in"
          onClick={() => submitOrderItems()}
        >
          Finish & Pay
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
