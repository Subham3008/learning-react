import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <section className="max-w-xl rounded-[32px] border border-white/60 bg-white p-10 text-center shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)]">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-600">
          Error
        </p>
        <h3 className="mt-4 text-5xl font-semibold text-slate-950">404</h3>
        <p className="mt-4 text-slate-500">
          This page does not exist in the dashboard route tree yet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to dashboard
        </Link>
      </section>
    </div>
  );
};

export default NotFound;
