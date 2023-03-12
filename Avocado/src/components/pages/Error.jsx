import React from "react";

const Error = () => {
	return (
		<div className="flex flex-col px-10 py-10 items-center gap-10 bg-[url('../../logos/icon_pattern.svg')] bg-repeat bg-center min-h-screen bg-contain">
			<div className="flex flex-col gap-10 items-center text-ltgray">
				<div className="grid place-items-center">
					<img
						src="../../logos/avocado_gray.svg"
						alt=""
						className="w-full lg:w-[400px]"
					/>
				</div>
				<div className="h-[calc(100vh-250px)] grid place-items-center">
					<div className="bg-gray text-black flex flex-col rounded-3xl shadow-2xl items-center justify-center py-5 px-5 gap-5 md:w-[450px]">
						<h1 className="text-6xl font-bold text-green lg:text-[90px]">
							404
						</h1>
						<p className="text-center text-xl md:text-3xl ">
							We can't find the page you're looking for! Please hit the back
							button on your browser to try again.{" "}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Error;
