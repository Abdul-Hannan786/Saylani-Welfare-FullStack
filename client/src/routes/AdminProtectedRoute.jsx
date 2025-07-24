import useStore from "@/store/store";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { user } = useStore();
  return <>{user?.role !== "admin" ? <Navigate to="/" /> : <Outlet />}</>;
};

export default AdminProtectedRoute;
