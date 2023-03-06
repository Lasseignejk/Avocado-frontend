import { Route, Routes } from "react-router-dom";
import Admin from "./components/pages/Admin";
import AdminMenu from "./components/pages/AdminMenu";
import AdminRestaurant from "./components/pages/AdminRestaurant";
import BOH from "./components/pages/BOH";
import Login from "./components/pages/Login";
import Menu from "./components/pages/Menu";
import Signup from "./components/pages/Signup";
import UserAcct from "./components/pages/UserAcct";
import AdminNavTest from "./components/pages/AdminNavTest";

import DashboardLogin from "./components/Layout/DashboardLogin";
import Error from "./components/Layout/Error";
import CustomerDashboard from "./components/Layout/CustomerDashboard";
import RestaurantDashboard from "./components/Layout/RestaurantDashboard";
import DashboardSignup from "./components/Layout/DashboardSignup";
import RestaurantAdmin from "./components/Layout/RestaurantAdmin";
import DashboardEditAccount from "./components/Layout/DashboardEditAccount";
import RestaurantAdminMenu from "./components/Layout/RestaurantAdminMenu";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardLogin />} />
        <Route path="/accountSignUp" element={<DashboardSignup />} />
        <Route path="/customerDashboard" element={<CustomerDashboard />} />
        <Route path="/restaurantDashboard" element={<RestaurantDashboard />} />
        <Route path="*" element={<Error />} />
        <Route path="/myrestaurants" element={<RestaurantAdmin />} />
        <Route path="/myadminaccount" element={<DashboardEditAccount />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order" element={<Menu />} />
        <Route path="/BOH" element={<BOH />} />
        <Route path="/account" element={<UserAcct />} />
        <Route path="/restaurantinfo" element={<AdminRestaurant />} />
        <Route path="/menuinfo" element={<RestaurantAdminMenu />} />
        <Route path="/navtest" element={<AdminNavTest />} />
      </Routes>
    </div>
  );
}

export default App;
