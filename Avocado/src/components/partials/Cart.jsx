import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart, removeItem } from "../reducers/DashboardSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // ORDER TOTAL CALCULATION
  let finalTotal = 0;
  let amountTotal = 0;
  for (let elem of cart) {
    finalTotal += elem.Amount * elem.ItemPrice;
    amountTotal += elem.Amount;
  }

  // EMPTY CART DISPLAY FUNCTION

  // NUMBER OF TOTAL ITEMS IN ORDER (ITEM.AMOUNT FOR EACH ITEM)

  return (
    <div className="w-[400px] pt-20 min-h-full  p-4 bg-ltgray">
      <div className="flex flex-col justify-center p-4">
        <div>
          <h1 className=" py-4 bg-ltgray text-[2rem] text-center font-black">
            Your Order
          </h1>
        </div>
        <div className=" flex flex-col pt-12 gap-4">
          {cart?.map((item) => (
            <CartItem item={item} />
          ))}
        </div>
      </div>
      <button
        className="flex justify-between right-0 bg-green text-gray text-l font-bold w-full p-8 hover:bg-dkgreen"
        onClick={() => dispatch()}
      >
        <h1>Checkout</h1>
        <h1>
          {cart.length} Items Total: ${finalTotal}.00
        </h1>
      </button>
    </div>
  );
};

export default Cart;
