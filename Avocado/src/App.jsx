import { Route, Routes } from "react-router-dom";
import Admin from "./components/pages/Admin";
import AdminMenu from "./components/pages/AdminMenu";
import AdminRestaurant from "./components/pages/AdminRestaurant";
import BOH from "./components/pages/BOH";
import Login from "./components/pages/Login";
import Menu from "./components/pages/Menu";
import Signup from "./components/pages/Signup";
import UserAcct from "./components/pages/UserAcct";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/order" element={<Menu />} />
				<Route path="/BOH" element={<BOH />} />
				<Route path="/account" element={<UserAcct />} />
				<Route path="/restaurantinfo" element={<AdminRestaurant />} />
				<Route path="/menuinfo" element={<AdminMenu />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	);
}

export default App;
