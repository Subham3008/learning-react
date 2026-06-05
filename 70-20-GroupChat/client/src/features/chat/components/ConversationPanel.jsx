import { formatMessageTime } from "../utils/formatters.js";

function ConversationPanel({ conversation, draft, onDraftChange, onSend }) {
  return (
    <section className="flex min-h-[620px] flex-col rounded-md border border-slate-200 bg-white">
      <header className="flex items-center justify-between border-b border-slate-200 p-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#dff5f0] font-bold text-[#236a61]">
            {conversation.participant.avatar}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-slate-950">
              {conversation.participant.name}
            </h2>
            <p className="text-sm text-slate-500">
              {conversation.participant.lastSeen}
            </p>
          </div>
        </div>

        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          type="button"
        >
          Details
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f8fb] p-4">
        {conversation.messages.map((message) => {
          const isMine = message.senderId === "me";

          return (
            <div
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              key={message.id}
            >
              <div
                className={`max-w-[78%] rounded-md px-4 py-3 shadow-sm ${
                  isMine
                    ? "bg-[#2b7f74] text-white"
                    : "border border-slate-200 bg-white text-slate-900"
                }`}
              >
                <p className="text-sm leading-6">{message.text}</p>
                <div
                  className={`mt-2 flex items-center gap-2 text-[11px] ${
                    isMine ? "text-white/75" : "text-slate-400"
                  }`}
                >
                  <span>{formatMessageTime(message.createdAt)}</span>
                  {isMine && <span>{message.status}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        className="flex items-end gap-3 border-t border-slate-200 p-4"
        onSubmit={onSend}
      >
        <textarea
          className="min-h-11 flex-1 resize-none rounded-md border border-slate-300 px-3 py-2 text-sm leading-6 outline-none focus:border-[#2b7f74] focus:ring-4 focus:ring-[#2b7f74]/10"
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Type a message"
          rows={1}
          value={draft}
        />
        <button
          className="h-11 rounded-md bg-[#2b7f74] px-5 text-sm font-semibold text-white transition hover:bg-[#236a61] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!draft.trim()}
          type="submit"
        >
          Send
        </button>
      </form>
    </section>
  );
}

export default ConversationPanel;
