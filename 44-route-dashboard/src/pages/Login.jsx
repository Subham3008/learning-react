const Login = () => {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="grid overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-linear-to-br from-slate-950 via-slate-900 to-sky-900 p-8 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
            Welcome back
          </p>
          <h3 className="mt-4 text-4xl font-semibold">
            Sign in to your crypto workspace.
          </h3>
          <p className="mt-4 max-w-md text-sm text-slate-300">
            Access watchlists, live orders, balance insights, and the full
            dashboard shell you asked to integrate into this project.
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Email</span>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Password</span>
              <input
                type="password"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
                placeholder="Enter password"
              />
            </label>
          </div>
          <button className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
            Sign in
          </button>
        </div>
      </section>
    </div>
  );
};

export default Login;
