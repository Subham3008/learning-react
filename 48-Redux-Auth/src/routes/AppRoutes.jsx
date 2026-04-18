import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Login";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../pages/Home";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../features/AppSlice";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      (async () => {
        const res = await axios.get(`https://dummyjson.com/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(addUser(res.data));
        try {
        } catch (err) {
          console.log("Error from accessToken api", err);
        }
      })();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoutes />,
      children: [
        {
          element: <AuthLayouts />,
          children: [
            {
              path: "",
              element: <Login />,
            },
          ],
        },
      ],
    },

    {
      path: "/main",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
