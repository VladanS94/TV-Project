import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LogInPage from "../pages/LogInPage";
import SingleMoviePage from "../pages/SingleMoviePage";
import ProtectedRoutes from "./ProtectedRoutes";
import SignUp from "../pages/SignUp";

export const paths = Object.freeze({
  home: "/",
  id: "/movie/:id",
  login: "/login",
  signup: "/signup",
});

const AppRoutes = () => {
  return useRoutes([
    {
      path: paths.home,
      element: (
        <ProtectedRoutes>
          <HomePage />,
        </ProtectedRoutes>
      ),
    },
    {
      path: paths.login,
      element: <LogInPage />,
    },
    {
      path: paths.signup,
      element: <SignUp />,
    },
    {
      path: paths.id,
      element: (
        <ProtectedRoutes>
          <SingleMoviePage />
        </ProtectedRoutes>
      ),
    },
  ]);
};

export default AppRoutes;
