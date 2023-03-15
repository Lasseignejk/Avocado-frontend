import React from "react";
import CustomerNavBar from "../../partials/CustomerNavBar";

const OrderComplete = () => {
	return (
		<div className="flex flex-col justify-center gap-4">
			<CustomerNavBar />
			<img
				className="m-auto lg:h-[calc(100vh-200px)] md:h-[calc(100vh-300px)] p-10"
				src="/items/finished.svg"
				alt="ordercomplete"
			/>
		</div>
	);
};

export default OrderComplete;
