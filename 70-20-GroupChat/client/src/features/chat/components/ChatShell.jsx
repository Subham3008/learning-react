function ChatShell({ sidebar, conversation }) {
  return (
    <section className="mx-auto grid max-w-6xl gap-4 px-5 py-6 lg:grid-cols-[340px_1fr]">
      {sidebar}
      {conversation}
    </section>
  );
}

export default ChatShell;
