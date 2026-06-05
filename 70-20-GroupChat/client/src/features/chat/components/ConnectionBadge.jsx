function ConnectionBadge({ isConnected }) {
  return (
    <div className="hidden items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 md:flex">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          isConnected ? "bg-emerald-500" : "bg-amber-400"
        }`}
      />
      {isConnected ? "Realtime connected" : "Connecting"}
    </div>
  );
}

export default ConnectionBadge;
