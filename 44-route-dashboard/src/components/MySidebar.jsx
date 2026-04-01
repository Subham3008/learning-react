import { NavLink } from "react-router";

const navigation = [
  { label: "Dashboard", to: "/" },
  { label: "Crypto", to: "/crypto" },
  { label: "Transactions", to: "/transactions" },
  { label: "Settings", to: "/settings" },
  { label: "Login", to: "/login" },
];

const markets = [
  { label: "BTC/USD", value: "$63,480", tone: "text-emerald-300" },
  { label: "ETH/USD", value: "$3,420", tone: "text-cyan-300" },
  { label: "SOL/USD", value: "$182", tone: "text-amber-300" },
];

const MySidebar = () => {
  return (
    <aside className="w-full bg-[#111827] px-4 py-5 text-slate-200 lg:min-h-screen lg:w-[280px] lg:px-5 lg:py-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            AdminKit
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            Crypto Pro
          </h1>
        </div>
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
          Live
        </div>
      </div>

      <div className="mt-6">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">
          Main
        </p>
        <nav className="mt-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-cyan-400/15 text-white shadow-[inset_0_0_0_1px_rgba(34,211,238,0.18)]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span>{item.label}</span>
              <span className="text-slate-500">›</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
          Market Pulse
        </p>
        <div className="mt-4 space-y-3">
          {markets.map((market) => (
            <div
              key={market.label}
              className="rounded-2xl border border-white/6 bg-black/10 px-3 py-2"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                {market.label}
              </p>
              <p className={`mt-1 text-lg font-semibold ${market.tone}`}>
                {market.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-linear-to-br from-cyan-400 via-sky-500 to-blue-600 p-4 text-slate-950">
        <p className="text-xs font-semibold uppercase tracking-[0.3em]">
          Weekly Sales
        </p>
        <h2 className="mt-3 text-xl font-semibold">
          Your fresh crypto report is ready.
        </h2>
        <p className="mt-2 text-sm text-slate-900/75">
          Download an updated market snapshot and keep your trading desk in
          sync.
        </p>
        <button className="mt-5 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">
          Download report
        </button>
      </div>
    </aside>
  );
};

export default MySidebar;
