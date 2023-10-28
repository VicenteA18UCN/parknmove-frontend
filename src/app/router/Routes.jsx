import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Login from "../../features/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <Login /> }],
  },
]);
