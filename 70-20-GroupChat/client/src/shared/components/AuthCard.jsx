function AuthCard({ title, subtitle, children }) {
  return (
    <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-7">
        <p className="mb-2 text-sm font-semibold text-[#2b7f74]">ChatFlow</p>
        <h2 className="text-3xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}

export default AuthCard;
