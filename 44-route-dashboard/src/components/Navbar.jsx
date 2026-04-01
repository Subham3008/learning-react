import { useLocation } from "react-router";

const pageMeta = {
  "/": {
    title: "Crypto Dashboard",
    subtitle: "A live overview of balances, markets, and recent activity.",
  },
  "/crypto": {
    title: "Crypto Assets",
    subtitle: "Track wallet distribution and strongest movers across coins.",
  },
  "/transactions": {
    title: "Transactions",
    subtitle: "Review recent transfers, settlements, and order execution.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Manage account preferences, notifications, and security.",
  },
  "/login": {
    title: "Sign In",
    subtitle: "Access your trading workspace and keep your portfolio in sync.",
  },
};

const Navbar = () => {
  const location = useLocation();
  const current = pageMeta[location.pathname] ?? {
    title: "Dashboard",
    subtitle: "Manage your workspace.",
  };

  return (
    <header className="border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-600">
            React Dashboard
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            {current.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{current.subtitle}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex min-w-[220px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <svg
              className="h-4 w-4 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
            <input
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="Search market, wallet, order..."
            />
          </label>

          <div className="flex items-center gap-3">
            <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
              Invite a friend
            </button>
            <button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10">
              New project
            </button>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-cyan-300 text-sm font-semibold text-white">
                CH
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Charles Hall
                </p>
                <p className="text-xs text-slate-500">Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
