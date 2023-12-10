import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectId, selectPriority } from "../../features/account/userSlice";

export default function RequireAuth() {
  const userPrio = useSelector(selectPriority);
  if (userPrio === 1) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
