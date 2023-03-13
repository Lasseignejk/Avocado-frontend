import React from "react";
import { useSelector } from "react-redux";
import CustomerNavBar from "../../partials/CustomerNavBar";

const OrderConfirm = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userDetails[0]);
  console.log(user);
  console.log(cart);

  let finalTotal = 0;
  let amountTotal = 0;
  for (let elem of cart) {
    finalTotal += elem.Amount * elem.ItemPrice;
    amountTotal += elem.Amount;
  }

  const submitOrder = async () => {
    const order = {};
  };

  // const sendItemUpdate = async () => {
  // 	const dataTosend = {
  // 		...updateItem,
  // 		ItemBreakfast: breakfast,
  // 		ItemIsPopular: popular,
  // 		ItemAvailable: available,
  // 		ItemDinner: dinner,
  // 		ItemLunch: lunch,
  // 		id: item.id,
  // 	};

  // 	const data = await fetch(
  // 		import.meta.env.VITE_BACKEND + "/admin/restaurant/updatemenuitem",
  // 		{
  // 			method: "POST",
  // 			headers: {
  // 				"Content-Type": "application/json",
  // 			},
  // 			body: JSON.stringify(dataTosend),
  // 		}
  // 	);
  // 	setToggle(!toggle);

  // 	toast.success("Item Updated!", {
  // 		position: toast.POSITION.TOP_CENTER,
  // 		icon: <img src="../../logos/icon_green.svg" />,
  // 	});
  // };

  return (
    <div>
      <CustomerNavBar />
      <div className="flex flex-col gap-4">
        <h1 className="py-4 text-[2rem] text-center font-black">
          Confirm your order
        </h1>
        <div>
          {cart?.map((item) => (
            <div className="flex gap-3">
              <h1>{item.Amount}</h1>
              <h1>{item.ItemName}</h1>
              <h1>${item.ItemPrice}.00</h1>
            </div>
          ))}
        </div>
        <h1 className="py-4 text-[2rem] text-center font-black">
          Total: ${finalTotal}.00
        </h1>
        <button className="bg-green text-gray text-lg px-3 py-1 duration-200 font-bold tracking-widest hover:bg-dkgreen rounded-full shadow-lg ease-in">
          Submit
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
