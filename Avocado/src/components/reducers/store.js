import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "./DashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
