function ChatState({ title, message }) {
  return (
    <section className="mx-auto flex min-h-[620px] max-w-6xl items-center justify-center px-5 py-6">
      <div className="w-full rounded-md border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
      </div>
    </section>
  );
}

export default ChatState;
