import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./CustomerSlice";
import adminReducer from "./AdminSlice";
import dashboardReducer from "./DashboardSlice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    admin: adminReducer,
    dashboard: dashboardReducer,
  },
});
