import React from "react";
import { Link } from "react-router-dom";

const AdminNavBarLinks = ({ links }) => {
	return (
		<>
			{links.map((link, index) => (
				<li className="border-b-2 border-gray pb-5 h-[50px]" index={index}>
					<Link
						to={link.path}
						className=" flex justify-center w-full hover:bg-dkgreen hover:text-gray duration-200 ease-in rounded-full lg:px-3 lg:py-1">
						<div className="lg:w-full lg:flex lg:gap-2 lg:items-center">
							{link.src}
							<h1 className="">{link.title}</h1>
						</div>
					</Link>
				</li>
			))}
		</>
	);
};

export default AdminNavBarLinks;
