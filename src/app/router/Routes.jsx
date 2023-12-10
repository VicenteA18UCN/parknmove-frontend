import React from "react";
import { createBrowserRouter, Navigate, BrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Navbar from "../layout/Navbar";
import Login from "../../features/auth/Login";
import Welcome from "../../features/account/Welcome";
import RequireAuth from "./RequireAuth";
import Users from "../../features/account/Users";
import Parkings from "../../features/account/Parkings";
import EditForm from "../../features/account/EditForm";
import History from "../../features/account/History";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to={"/main/welcome"} /> },
      { path: "/login", element: <Login /> },
      {
        path: "/main",
        element: <RequireAuth />,
        children: [
          { path: "welcome", element: <Welcome /> },
          { path: "users", element: <Users /> },
          { path: "parkings", element: <Parkings /> },
          { path: "report", element: <History/> },
          
        ],
      },
    ],
  },
]);

export const AppRouter = () => (
  <BrowserRouter>
    {router}
  </BrowserRouter>
);