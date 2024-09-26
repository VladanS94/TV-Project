import React from "react";
import { Navigate } from "react-router-dom";
import { paths } from "./AppRoutes";

const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem("users");
  // const user = JSON.parse(localStorage.userData ?? "null");
  // console.log(localStorage.userData);

  // if (user) {
  //   return <Navigate to={paths.login} />;
  // }

  return children;
};

export default ProtectedRoutes;
