const settings = [
  ["Price alerts", "Enabled"],
  ["Trade confirmations", "Email + Push"],
  ["Two-factor authentication", "Required"],
  ["Default settlement", "USDT wallet"],
];

const Setting = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="rounded-[28px] border border-white/60 bg-white p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)]">
        <p className="text-sm font-medium text-slate-500">Preferences</p>
        <h3 className="mt-1 text-2xl font-semibold text-slate-950">
          Trading workspace settings
        </h3>
        <div className="mt-6 space-y-4">
          {settings.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
            >
              <span className="text-sm text-slate-600">{label}</span>
              <span className="text-sm font-semibold text-slate-900">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.55)]">
        <p className="text-sm font-medium text-slate-400">Security</p>
        <h3 className="mt-1 text-2xl font-semibold">Account protection</h3>
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/10 px-4 py-4">
            <p className="text-sm text-slate-400">Last sign in</p>
            <p className="mt-1 text-lg font-semibold">Apr 1, 2026 at 4:20 PM</p>
          </div>
          <div className="rounded-2xl border border-white/10 px-4 py-4">
            <p className="text-sm text-slate-400">Approved devices</p>
            <p className="mt-1 text-lg font-semibold">4 active sessions</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Setting;
