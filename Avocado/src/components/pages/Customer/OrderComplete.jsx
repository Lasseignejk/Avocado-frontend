import React from "react";
import CustomerNavBar from "../../partials/CustomerNavBar";

const OrderComplete = () => {
  return (
    <div className="flex flex-col gap-4">
      <CustomerNavBar />
      <h1>Order Complete!</h1>
    </div>
  );
};

export default OrderComplete;
