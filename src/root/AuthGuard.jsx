import React from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../router/routes-paths";
import { useLocalStorage } from "react-use";

const AuthGuard = ({ children }) => {
  const [token] = useLocalStorage("token");

  const userID = localStorage.getItem("User");

  if (!userID) {
    return <Navigate to={paths.signup} />;
  } else if (!token) {
    return <Navigate to={paths.login} />;
  }
  return children;
};

export default AuthGuard;
