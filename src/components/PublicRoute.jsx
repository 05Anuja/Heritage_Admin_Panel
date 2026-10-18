import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

const PublicRoute = () => {
  if (isTokenValid()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
