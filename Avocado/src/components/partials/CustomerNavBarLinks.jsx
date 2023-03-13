import React from "react";
import { Link } from "react-router-dom";

const CustomerNavBarLinks = ({ links }) => {
	return (
		<>
			{links.map((link, index) => (
				<li
					className={
						"border-b-2 border-black h-[50px] flex justify-center items-center w-full md:border-none"
					}
					index={index}>
					<Link
						to={link.path}
						className="flex justify-center items-center w-full hover:bg-[#4e98ba] hover:text-gray duration-200 ease-in rounded-full md:pr-3 md:pl-1 md:py-1 md:w-[150px] lg:w-[200px]">
						<div className="w-full md:flex md:gap-2 items-center justify-center">
							{link.src}
							<h1 className="">{link.title}</h1>
						</div>
					</Link>
				</li>
			))}
		</>
	);
};

export default CustomerNavBarLinks;
