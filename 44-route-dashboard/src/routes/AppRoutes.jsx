import { Navigate, Route, Routes } from "react-router";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Crypto from "../pages/Crypto";
import Transaction from "../pages/Transaction";
import Setting from "../pages/Setting";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
