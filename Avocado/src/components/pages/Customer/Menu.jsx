import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MenuItem from "../../partials/MenuItem";
import placeholder from "/items/restaurant_placeholder.svg";
import Cart from "../../partials/Cart";
import CustomerNavBar from "../../partials/CustomerNavBar";
import { clearCart } from "../../reducers/DashboardSlice";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "../../partials/CartModal";

const Menu = () => {
	const location = useLocation();
	const restuarant = location.state;
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);
	const [cartModal, setCartModal] = useState(false);
	const [menu, setMenu] = useState();
	const [counter, setCounter] = useState(0);

<<<<<<< Updated upstream
	const getMenu = async () => {
		const response = await fetch(
			import.meta.env.VITE_BACKEND + "/admin/restaurant/getmenu",
			{
				method: "GET",
				headers: {
					restid: restuarant.id,
				},
			}
		);
		console.log(response);
		if (!response.ok) {
			window.alert(response.statusText);
		} else {
			const json = await response.json();
			setMenu(json);
			console.log("menu: ", json);
		}
	};
=======
  const getMenu = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "/admin/restaurant/getmenu",
      {
        method: "GET",
        headers: {
          restid: restuarant.id,
        },
      }
    );
    if (!response.ok) {
      window.alert(response.statusText);
    } else {
      const json = await response.json();
      setMenu(json);
    }
  };
>>>>>>> Stashed changes

	useEffect(() => {
		getMenu();
		dispatch(clearCart());
	}, [restuarant.id]);

	return (
		<>
			<CustomerNavBar />
			<div className="mb-[65px] md:flex lg:mb-[30px]">
				<div className="flex lg:justify-between w-full">
					<div className="flex flex-col gap-8 pt-8 lg:pt-20 lg:pl-16">
						<div className="ml-5 flex gap-4 justify-center lg:ml-0">
							<div className="w-[50px] h-[50px] z-10 bg-dkgreen fixed top-[10px] right-[10px] grid place-items-center rounded-full md:top-[100px] lg:hidden hover:cursor-pointer">
								<FaShoppingCart
									className="text-gray text-2xl"
									onClick={() => setCartModal(true)}
								/>
							</div>
							<div className="w-[30px] h-[30px] border-2 z-[11] fixed top-[38px] right-[5px] rounded-full bg-blue md:top-[130px] grid place-items-center lg:hidden">
								{counter}
							</div>
							<div className="flex gap-6">
								<img
									className="h-20 m-auto"
									src={restuarant.RestLogo ? restuarant.RestLogo : placeholder}
									alt=""
								/>
								<div>
									<h1 className="font-bold text-2xl">{restuarant.RestName}</h1>
									<h1>{restuarant.RestLocation}</h1>
									<h1>{restuarant.RestPhoneNumber}</h1>
									<h1>{restuarant.RestHours}</h1>
								</div>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-evenly gap-7">
							{menu?.map((item, index) => (
								<MenuItem
									item={item}
									key={index}
									counter={counter}
									setCounter={setCounter}
								/>
							))}
						</div>
					</div>
					<div className="hidden lg:block">
						<Cart counter={counter} setCounter={setCounter} />
					</div>
					<>
						{cartModal && (
							<CartModal
								className="fixed"
								counter={counter}
								setCounter={setCounter}
								setCartModal={setCartModal}
							/>
						)}
					</>
				</div>
			</div>
		</>
	);
};

export default Menu;
