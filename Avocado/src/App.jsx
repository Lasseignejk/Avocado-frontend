import { Route, Routes } from "react-router-dom";

// Login, Sign Up
import DashboardLogin from "./components/Layout/DashboardLogin";
import DashboardSignup from "./components/Layout/DashboardSignup";

// Admin
import RestaurantDashboard from "./components/Layout/RestaurantDashboard";
import AdminAccount from "./components/pages/Admin/AdminAccount";
import BOH from "./components/pages/Admin/BOH/BOH";
import ManageRestaurants from "./components/pages/Admin/ManageRestaurants/ManageRestaurants";
import RestaurantMenu from "./components/pages/Admin/Menu/RestaurantMenu";
import Reports from "./components/Layout/Reports";

// Customer
import CustomerDashboard from "./components/Layout/CustomerDashboard";
import Menu from "./components/pages/Customer/Menu";
import OrderComplete from "./components/pages/Customer/OrderComplete";
import CustomerAccount from "./components/pages/Customer/CustomerAccount";

// Misc
import Error from "./components/pages/Error";
import LoggedInAuthGaurd from "./components/Layout/LoggedInAuthGaurd";
import CustomerAuthGaurd from "./components/Layout/CustomerAuthGaurd";
import RestaurantAuthGaurd from "./components/Layout/RestaurantAuthGaurd";
import OrderConfirm from "./components/pages/Customer/OrderConfirm";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<DashboardLogin />} />
				<Route path="/signup" element={<DashboardSignup />} />

				<Route
					path="/restaurantDashboard"
					element={
						<LoggedInAuthGaurd>
							{/*<CustomerAuthGaurd>*/}
							<RestaurantDashboard />
							{/*</CustomerAuthGaurd>*/}
						</LoggedInAuthGaurd>
					}
				/>
				{/* Admin Routes */}
				<Route path="/managerestaurants" element={<ManageRestaurants />} />
				<Route path="/adminaccount" element={<AdminAccount />} />
				<Route path="/reports" element={<Reports />} />
				<Route path="/BOH" element={<BOH />} />
				<Route path="/menuinfo" element={<RestaurantMenu />} />

				{/* Customer Routes */}
				<Route path="/customerdashboard" element={<CustomerDashboard />} />
				<Route path="/customeraccount" element={<CustomerAccount />} />
				<Route path="confirmation" element={<OrderConfirm />} />
				<Route path="/finished" element={<OrderComplete />} />

				{/* Misc */}
				<Route path="*" element={<Error />} />
				<Route path="/menu" element={<Menu />} />
			</Routes>
		</div>
	);
}

export default App;
