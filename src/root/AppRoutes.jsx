import React, { useMemo } from "react";
import { useRoutes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

export const paths = Object.freeze({
  home: "/",
  id: "/movie/:id",
  login: "/login",
  signup: "/signup",
});

const AppRoutes = () => {
  const HomePage = useMemo(() => require("../pages/HomePage").default, []);
  const LogInPage = useMemo(() => require("../pages/LogInPage").default, []);
  const SingleMoviePage = useMemo(
    () => require("../pages/SingleMoviePage").default,
    []
  );
  const SignUp = useMemo(() => require("../pages/SignUp").default, []);

  return useRoutes([
    {
      path: paths.home,
      element: (
        <ProtectedRoutes>
          <HomePage />
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
