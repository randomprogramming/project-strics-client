import React from "react";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { Dashboard } from "./views/Dashboard";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "inventory", element: <div>inventory</div> },
      { path: "purchases", element: <div>Purchases</div> },
      { path: "sales", element: <div>sales</div> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
  },
];

export default routes;
