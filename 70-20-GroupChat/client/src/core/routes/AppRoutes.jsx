import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../../shared/layouts/AuthLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginPage from "../../features/auth/pages/LoginPage.jsx";
import RegisterPage from "../../features/auth/pages/RegisterPage.jsx";
import ChatHomePage from "../../features/chat/pages/ChatHomePage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ChatHomePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
