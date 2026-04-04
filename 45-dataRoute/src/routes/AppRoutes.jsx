import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import ProtectedDashboardRoutes from "./ProtectedDashboardRoutes";
import AuthProtectedRoutes from "./AuthProtectedRoutes";

const AppRoutes = () => {
  let route = createBrowserRouter([
    {
      path: "/dashboard",
      element: <ProtectedDashboardRoutes />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "about",
              element: <About />,
            },
            {
              path: "contact",
              element: <Contact />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <AuthProtectedRoutes />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default AppRoutes;
