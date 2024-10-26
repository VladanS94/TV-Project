// import React, { useMemo } from "react";
// import { useRoutes } from "react-router-dom";
// import AuthGuard from "../root/AuthGuard";
// import { paths } from "./routes-paths";

// const AppRoutes = () => {
//   const HomePage = useMemo(() => require("../pages/Home/HomePage").default, []);
//   const LogInPage = useMemo(
//     () => require("../pages/LogIn/LogInPage").default,
//     []
//   );
//   const SingleMoviePage = useMemo(
//     () => require("../pages/SingleMovie/SingleMoviePage").default,
//     []
//   );
//   const SignUp = useMemo(() => require("../pages/SignUp/SignUp").default, []);

//   return useRoutes([
//     {
//       path: paths.home,
//       element: (
//         <AuthGuard>
//           <HomePage />
//         </AuthGuard>
//       ),
//     },
//     {
//       path: paths.login,
//       element: <LogInPage />,
//     },
//     {
//       path: paths.signup,
//       element: <SignUp />,
//     },
//     {
//       path: paths.singleMovie,
//       element: (
//         <AuthGuard>
//           <SingleMoviePage />
//         </AuthGuard>
//       ),
//     },
//   ]);
// };

// export default AppRoutes;
