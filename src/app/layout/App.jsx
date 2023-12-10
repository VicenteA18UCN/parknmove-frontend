import React from "react";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
