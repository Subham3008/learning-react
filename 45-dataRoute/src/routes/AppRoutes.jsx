import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

const AppRoutes = () => {
  let route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default AppRoutes;
