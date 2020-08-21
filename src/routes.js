import React from "react";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { Dashboard } from "./views/Dashboard";
import { Homepage } from "./views/Homepage";
import { Login } from "./views/auth/Login";
import { Register } from "./views/auth/Register";

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
    children: [
      { path: "", element: <Homepage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
];

export default routes;
