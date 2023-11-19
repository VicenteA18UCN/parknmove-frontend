import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Login from "../../features/auth/Login";
import Welcome from "../../features/account/Welcome";
import RequireAuth from "./RequireAuth";
import Users from "../../features/account/Users";
import Parkings from "../../features/account/Parkings";

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
        children: [{ path: "welcome", element: <Welcome /> }],
      },
      {
        path: "/main",
        element: <RequireAuth />,
        children: [{ path: "users", element: <Users /> }],
      },
      {
        path: "/main",
        element: <RequireAuth />,
        children: [{ path: "parkings", element: <Parkings /> }],
      }
    ],
  },
]);
