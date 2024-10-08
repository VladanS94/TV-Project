import React from "react";
import { paths } from "./AppRoutes";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  const userID = localStorage.getItem("User");

  if (!userID) {
    return <Navigate to={paths.signup} />;
  } else if (!isAuthenticated) {
    return <Navigate to={paths.login}  />;
  }
  return children;
};

export default ProtectedRoutes;
