const statCards = [
  {
    title: "Total balance",
    primary: "$53,252",
    secondary: "2.30 BTC",
    meta: "+6.15% since last week",
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    title: "USD/BTC",
    primary: "$23,077.05",
    secondary: "EUR 22,617.47",
    meta: "Volume: 132,691 BTC",
    accent: "from-sky-400 to-blue-500",
  },
  {
    title: "LTC/BTC",
    primary: "0.00256",
    secondary: "$59.02",
    meta: "Volume: 31,268 BTC",
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    title: "ETH/BTC",
    primary: "0.07334",
    secondary: "$1,691.76",
    meta: "Volume: 32,982 BTC",
    accent: "from-amber-300 to-orange-500",
  },
];

const markets = [
  ["ETH", "0.02309756", "427.563", "+1.91"],
  ["XRP", "0.00002205", "132.691", "+0.64"],
  ["ETC", "0.00077779", "32.982", "-6.71"],
  ["LTC", "0.00485685", "31.268", "+1.88"],
  ["XMR", "0.00700518", "28.567", "-1.26"],
  ["BSC", "0.02105473", "25.960", "+0.10"],
  ["ABC", "0.02613303", "21.597", "-3.20"],
  ["TRX", "0.00000165", "14.106", "-0.61"],
];

const sellOrders = [
  ["0.03892501", "1.24864875", "1.26329659"],
  ["0.03893754", "0.19373225", "1.45702884"],
  ["0.03895189", "0.00011222", "1.45714106"],
  ["0.03896593", "0.05366476", "1.51080582"],
  ["0.03897932", "0.30856527", "1.81937109"],
];

const buyOrders = [
  ["0.03892000", "0.00873616", "0.00873616"],
  ["0.03890500", "2.58305468", "2.59179084"],
  ["0.03890132", "2.19999989", "4.79179073"],
  ["0.03890053", "0.00322305", "4.79501378"],
  ["0.03889706", "0.60738409", "5.40239787"],
];

const performanceBars = [42, 58, 65, 61, 80, 74, 88, 82, 69, 76, 63, 71];

const cardClass =
  "relative rounded-[28px] border border-white/60 bg-white p-5 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)]";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <article key={card.title} className={`${cardClass} overflow-hidden`}>
            <div
              className={`absolute inset-x-0 top-0 h-1.5 bg-linear-to-r ${card.accent}`}
            />
            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-slate-950">
                  {card.primary}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-400">
                  {card.secondary}
                </p>
              </div>
              <div
                className={`h-14 w-14 rounded-3xl bg-linear-to-br ${card.accent} opacity-90`}
              />
            </div>
            <p className="mt-4 text-sm text-emerald-600">{card.meta}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <article className={cardClass}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex gap-2 text-xs font-semibold text-slate-400">
                {["1m", "5m", "30m", "1h", "1d"].map((range) => (
                  <button
                    key={range}
                    className={`rounded-full px-3 py-1 ${
                      range === "1d"
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">
                LTC/BTC
              </h3>
              <p className="text-sm text-slate-500">
                Momentum and liquidity snapshot across the last 12 intervals.
              </p>
            </div>
            <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600">
              Market options
            </button>
          </div>

          <div className="mt-8 rounded-[28px] bg-slate-950 p-5 text-white">
            <div className="flex h-[280px] items-end gap-3">
              {performanceBars.map((bar, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className="w-full rounded-t-[20px] bg-linear-to-t from-cyan-400 via-sky-500 to-blue-600"
                    style={{ height: `${bar * 2.2}px` }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                    W{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className={`${cardClass} bg-slate-950 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Wallet split</p>
              <h3 className="mt-2 text-2xl font-semibold">$53,252</h3>
            </div>
            <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm text-cyan-300">
              +4.2%
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="relative h-52 w-52 rounded-full bg-[conic-gradient(#22d3ee_0_32%,#38bdf8_32%_58%,#f59e0b_58%_78%,#8b5cf6_78%_100%)] p-6">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Diversified
                  </p>
                  <p className="mt-2 text-3xl font-semibold">78%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {[
              ["Bitcoin", "32%", "bg-cyan-400"],
              ["Ethereum", "26%", "bg-sky-400"],
              ["Litecoin", "20%", "bg-amber-400"],
              ["Monero", "22%", "bg-violet-400"],
            ].map(([label, value, dot]) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${dot}`} />
                  <span className="text-sm text-slate-300">{label}</span>
                </div>
                <span className="text-sm font-medium text-white">{value}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr_1fr]">
        <article className={cardClass}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Markets</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">
                Live order flow
              </h3>
            </div>
            <button className="text-sm font-medium text-sky-600">View all</button>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-3 font-medium">Coin</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Volume</th>
                  <th className="pb-3 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {markets.map(([coin, price, volume, change]) => (
                  <tr key={coin} className="border-t border-slate-100">
                    <td className="py-3 font-semibold text-slate-900">{coin}</td>
                    <td className="py-3 text-slate-500">{price}</td>
                    <td className="py-3 text-slate-500">{volume}</td>
                    <td
                      className={`py-3 font-medium ${
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
        </article>

        <article className={cardClass}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Sell Orders</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">
                Ask book
              </h3>
            </div>
            <button className="text-sm font-medium text-sky-600">View all</button>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">BTC</th>
                  <th className="pb-3 font-medium">Sum</th>
                </tr>
              </thead>
              <tbody>
                {sellOrders.map(([price, btc, sum]) => (
                  <tr key={price} className="border-t border-slate-100">
                    <td className="py-3 font-medium text-rose-500">{price}</td>
                    <td className="py-3 text-slate-500">{btc}</td>
                    <td className="py-3 text-slate-500">{sum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className={cardClass}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Buy Orders</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">
                Bid book
              </h3>
            </div>
            <button className="text-sm font-medium text-sky-600">View all</button>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">BTC</th>
                  <th className="pb-3 font-medium">Sum</th>
                </tr>
              </thead>
              <tbody>
                {buyOrders.map(([price, btc, sum]) => (
                  <tr key={price} className="border-t border-slate-100">
                    <td className="py-3 font-medium text-emerald-600">{price}</td>
                    <td className="py-3 text-slate-500">{btc}</td>
                    <td className="py-3 text-slate-500">{sum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article className={`${cardClass} bg-slate-950 text-white`}>
          <div className="flex items-center gap-2 text-sm">
            {["Buy", "Sell", "Send"].map((tab, index) => (
              <button
                key={tab}
                className={`rounded-full px-4 py-2 ${
                  index === 0 ? "bg-cyan-400 text-slate-950" : "bg-white/8"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-6 max-w-xl">
            <p className="text-sm font-medium text-slate-400">Operations</p>
            <h3 className="mt-1 text-2xl font-semibold">Place new order</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Amount
                </span>
                <input
                  className="mt-2 w-full bg-transparent text-lg outline-none"
                  defaultValue="0.2384"
                />
              </label>
              <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Coin
                </span>
                <select className="mt-2 w-full bg-transparent text-lg outline-none">
                  <option className="text-slate-950">BTC</option>
                  <option className="text-slate-950">ETH</option>
                  <option className="text-slate-950">LTC</option>
                  <option className="text-slate-950">XMR</option>
                </select>
              </label>
              <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Price
                </span>
                <input
                  className="mt-2 w-full bg-transparent text-lg outline-none"
                  defaultValue="$63,480"
                />
              </label>
              <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Total
                </span>
                <input
                  className="mt-2 w-full bg-transparent text-lg outline-none"
                  defaultValue="$15,124.12"
                />
              </label>
            </div>
            <button className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">
              Process to wallet
            </button>
            <p className="mt-4 text-sm text-slate-400">
              The final amount could change depending on current market
              conditions.
            </p>
          </div>
        </article>

        <article className={cardClass}>
          <p className="text-sm font-medium text-slate-500">Insights</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950">
            Session snapshot
          </h3>

          <div className="mt-6 space-y-4">
            {[
              ["Open positions", "18", "text-slate-950"],
              ["Win rate", "67%", "text-emerald-600"],
              ["Avg. spread", "0.42%", "text-sky-600"],
              ["Risk level", "Moderate", "text-amber-500"],
            ].map(([label, value, tone]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
              >
                <span className="text-sm text-slate-500">{label}</span>
                <span className={`text-sm font-semibold ${tone}`}>{value}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
