const holdings = [
  ["Bitcoin", "0.84 BTC", "$53,252", "+6.15%"],
  ["Ethereum", "11.2 ETH", "$38,096", "+3.82%"],
  ["Litecoin", "145 LTC", "$8,557", "+1.21%"],
  ["Monero", "52 XMR", "$7,824", "-0.64%"],
];

const Crypto = () => {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
      <section className="rounded-[28px] border border-white/60 bg-white p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)]">
        <p className="text-sm font-medium text-slate-500">Portfolio</p>
        <h3 className="mt-1 text-2xl font-semibold text-slate-950">
          Asset allocation
        </h3>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="pb-4 font-medium">Asset</th>
                <th className="pb-4 font-medium">Holding</th>
                <th className="pb-4 font-medium">Value</th>
                <th className="pb-4 font-medium">24h</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map(([asset, holding, value, change]) => (
                <tr key={asset} className="border-t border-slate-100">
                  <td className="py-4 font-semibold text-slate-900">{asset}</td>
                  <td className="py-4 text-slate-500">{holding}</td>
                  <td className="py-4 text-slate-500">{value}</td>
                  <td
                    className={`py-4 font-medium ${
                      change.startsWith("+")
                        ? "text-emerald-600"
                        : "text-rose-500"
                    }`}
                  >
                    {change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.55)]">
        <p className="text-sm font-medium text-slate-400">Overview</p>
        <h3 className="mt-1 text-2xl font-semibold">Wallet exposure</h3>
        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[64%] rounded-full bg-linear-to-r from-cyan-400 to-blue-500" />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-400">Stable growth mix</span>
            <span className="font-semibold text-cyan-300">64%</span>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          {[
            ["Top gainer", "Ethereum", "text-emerald-400"],
            ["Most traded", "Bitcoin", "text-cyan-300"],
            ["Highest risk", "Monero", "text-amber-300"],
          ].map(([label, value, tone]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-4"
            >
              <span className="text-sm text-slate-400">{label}</span>
              <span className={`text-sm font-semibold ${tone}`}>{value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Crypto;
