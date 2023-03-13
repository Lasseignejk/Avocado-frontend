import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { FaTimes } from "react-icons/fa";

const CartModal = ({ counter, setCounter, setCartModal }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // ORDER TOTAL CALCULATION
  let finalTotal = 0;
  let amountTotal = 0;
  for (let elem of cart) {
    finalTotal += elem.Amount * elem.ItemPrice;
    amountTotal += elem.Amount;
  }
  return (
    <div className="font-niveau font-bold fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-20 bg-overlay">
      <div className="modal-content  bg-ltgray relative w-[85%] flex flex-col overflow-y-auto rounded-3xl sm:w-[90%] md:mt-[0]">
        <span
          className="absolute top-[10px] right-[10px] text-2xl h-[40px] w-[40px] flex items-center justify-center hover:bg-green hover:text-ltgray ease-in duration-200 hover:cursor-pointer rounded-full bg-ltgray"
          onClick={() => setCartModal(false)}
        >
          <FaTimes />
        </span>
        <div className="flex flex-col justify-center p-4">
          <div>
            <h1 className="mb-4 bg-ltgray text-[2rem] text-center font-black">
              Your Order
            </h1>
          </div>
          <div className=" flex flex-col gap-2">
            {cart?.map((item) => (
              <CartItem item={item} counter={counter} setCounter={setCounter} />
            ))}
          </div>
        </div>
        <button
          className="flex justify-between right-0 bg-green text-gray text-l font-bold w-full p-8 hover:bg-dkgreen"
          onClick={() => dispatch()}
        >
          <h1>Checkout</h1>
          <h1>
            {counter} Items: ${finalTotal}.00
          </h1>
        </button>
      </div>
    </div>
  );
};

export default CartModal;
