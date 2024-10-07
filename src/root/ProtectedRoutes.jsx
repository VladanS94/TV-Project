import React from "react";
import { paths } from "./AppRoutes";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem("User");

  if (!isAuthenticated) {
    return <Navigate to={paths.signup} replace />;
  }

  return children;
};

export default ProtectedRoutes;
