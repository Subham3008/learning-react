import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>
      <div className="px-10 py-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
