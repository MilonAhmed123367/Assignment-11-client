import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import JoinEmployee from "../Pages/JoinEmployee";
import JoinHrManager from "../Pages/JoinHrManager";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
// import AssetList from "../Pages/Dashboard/HR/AssetList";
import MyAssets from "../Pages/Dashboard/Employee/MyAssets";
import AllRequests from "../Pages/Dashboard/HR/AllRequests";
import RequestAsset from "../Pages/Dashboard/Employee/RequestAsset";
import EmployeesList from "../Pages/Dashboard/HR/EmployeesList";
import MyTeam from "../Pages/Dashboard/Employee/MyTeam";
import Profile from "../Pages/Dashboard/Profile";
import PrivateRoute from "./PrivateRoute";
import AddAsset from "../Pages/Dashboard/HR/addAsset";
import Error404 from "../Component/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: '/JoinEmployee',
        element: <PrivateRoute><JoinEmployee></JoinEmployee></PrivateRoute>
      }, {
        path: '/JoinManager',
        element: <PrivateRoute><JoinHrManager></JoinHrManager></PrivateRoute>
      },
      {
        path: '/dashboard',
        element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>
      }
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      // HR Routes
      // s
      {
        path: "add-asset",
        element: <AddAsset />
      },
      {
        path: "requests",
        element: <AllRequests />,
      },
      {
        path: "employees",
        element: <EmployeesList />,
      },

      // Employee Routes
      {
        path: "my-assets",
        element: <MyAssets />,
      },
      {
        path: "request-asset",
        element: <RequestAsset />,
      },
      {
        path: "my-team",
        element: <MyTeam />,
      },

      // Shared
      { path: "profile", element: <Profile /> },

      // Catch all
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
  {
    path: "*",
    Component: Error404
  }
]);

export default router;
