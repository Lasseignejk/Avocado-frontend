import React from "react";
import CustomerNavBar from "../../partials/CustomerNavBar";

const OrderComplete = () => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <CustomerNavBar />
      <img
        className="mx-auto my-10 lg:h-screen md:w-[50%] sm:w-[80%]"
        src="/items/finished.svg"
        alt="ordercomplete"
      />
    </div>
  );
};

export default OrderComplete;
