import { useAuth } from "../../../core/providers/AuthProvider.jsx";

function ChatHomePage() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <header className="border-b border-slate-200 bg-white px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2b7f74]">
              ChatFlow
            </p>
            <h1 className="text-xl font-semibold text-slate-950">
              Chat workspace
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#dff5f0] text-sm font-bold text-[#236a61]">
              {user?.avatar}
            </div>
            <button
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={logout}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-md border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-950">Chats</h2>
            <button
              className="rounded-md bg-[#2b7f74] px-3 py-2 text-sm font-semibold text-white"
              type="button"
            >
              New
            </button>
          </div>
          <div className="space-y-3">
            {["Private chats", "Group chats", "Unread"].map((item) => (
              <button
                className="w-full rounded-md border border-slate-200 px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-[#2b7f74] hover:bg-[#eefbf8]"
                key={item}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-md border border-slate-200 bg-white p-6">
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold text-slate-950">
              Protected chat area
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Auth flow is ready. Next feature can add private and group chat UI
              on top of this protected workspace.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default ChatHomePage;
