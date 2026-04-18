import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Login";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../pages/Home";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/actions/authAction";
import { removeUser } from "../features/AppSlice";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      dispatch(removeUser());
    }
    (async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(loginUser(res.data));
      } catch (err) {
        console.log("Error from accessToken api", err);
      }
    })();
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
