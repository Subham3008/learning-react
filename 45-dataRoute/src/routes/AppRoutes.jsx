import { RouterProvider, createBrowserRouter, Navigate } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import ProtectedDashboardRoutes from "./ProtectedDashboardRoutes";
import AuthProtectedRoutes from "./AuthProtectedRoutes";
import { getAllProducts } from "../api/productApi";
import ProductDetails from "../pages/productDetails";


const AppRoutes = () => {
  const route = createBrowserRouter([
    // 🔹 Root redirect
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },

    // 🔹 Auth Routes (Login / Register)
    {
      path: "/login",
      element: <AuthProtectedRoutes />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <Login />,
            },
          ],
        },
      ],
    },
    {
      path: "/register",
      element: <AuthProtectedRoutes />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <Register />,
            },
          ],
        },
      ],
    },

    // 🔹 Dashboard (Protected)
    {
      path: "/dashboard",
      element: <ProtectedDashboardRoutes />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              index: true,
              loader: async () => {
                return await getAllProducts();
              },
              hydrateFallbackElement: (
                <h1 className="text-2xl font-bold">Loading products...</h1>
              ),
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
            {
              path: "product/details/:id",
              element: <ProductDetails />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
};

export default AppRoutes;
