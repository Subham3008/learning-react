import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../core/providers/AuthProvider.jsx";

function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="grid min-h-screen bg-[#f7f8fb] lg:grid-cols-[0.95fr_1.05fr]">
      <section className="hidden bg-[#132238] px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#2fb7a6] text-lg font-bold">
            C
          </div>
          <h1 className="mt-10 max-w-xl text-5xl font-semibold leading-tight">
            ChatFlow
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-200">
            A clean frontend shell for one-to-one and group conversations,
            ready for JWT, Socket.IO, and MongoDB APIs.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm text-slate-200">
          <div className="rounded-md bg-white/10 p-4">Private chat</div>
          <div className="rounded-md bg-white/10 p-4">Group rooms</div>
          <div className="rounded-md bg-white/10 p-4">Live status</div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10">
        <Outlet />
      </section>
    </main>
  );
}

export default AuthLayout;
