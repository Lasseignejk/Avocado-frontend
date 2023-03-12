import React from "react";

const Error = () => {
	return (
		<div className="flex flex-col px-10 py-10 items-center gap-10 bg-[url('../../logos/icon_pattern.svg')] bg-repeat bg-center min-h-screen bg-contain">
			<div>
				<img
					src="../../logos/avocado_green.svg"
					alt=""
					className="w-full sm:w-1/2 lg:w-[400px]"
				/>
			</div>
			<h1 className="text-6xl font-bold">404</h1>
			<p className="text-center text-2xl">
				We can't find the page you're looking for! Please hit the back button on
				your browser to try again.{" "}
			</p>
		</div>
	);
};

export default Error;
