const transactions = [
  ["#TR-1042", "Deposit", "BTC Wallet", "0.245 BTC", "Completed"],
  ["#TR-1041", "Exchange", "ETH to BTC", "1.80 ETH", "Completed"],
  ["#TR-1040", "Withdrawal", "USDT Wallet", "$2,400", "Pending"],
  ["#TR-1039", "Transfer", "Cold Storage", "0.40 BTC", "Completed"],
];

const Transaction = () => {
  return (
    <section className="rounded-[28px] border border-white/60 bg-white p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)]">
      <p className="text-sm font-medium text-slate-500">Ledger</p>
      <h3 className="mt-1 text-2xl font-semibold text-slate-950">
        Recent transactions
      </h3>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="pb-4 font-medium">ID</th>
              <th className="pb-4 font-medium">Type</th>
              <th className="pb-4 font-medium">Source</th>
              <th className="pb-4 font-medium">Amount</th>
              <th className="pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(([id, type, source, amount, status]) => (
              <tr key={id} className="border-t border-slate-100">
                <td className="py-4 font-semibold text-slate-900">{id}</td>
                <td className="py-4 text-slate-500">{type}</td>
                <td className="py-4 text-slate-500">{source}</td>
                <td className="py-4 text-slate-500">{amount}</td>
                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      status === "Completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Transaction;
