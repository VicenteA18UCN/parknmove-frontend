import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectId } from "../../features/account/userSlice";

export default function RequireAuth() {
  const userId = useSelector(selectId);
  if (userId) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
