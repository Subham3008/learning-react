import GroupMemberList from "./GroupMemberList.jsx";
import { formatMessageTime } from "../utils/formatters.js";

function ConversationPanel({
  conversation,
  draft,
  onDraftChange,
  onDeleteMessage,
  onSend,
  onTyping,
  typingUser,
}) {
  const isGroup = conversation.type === "group";

  const handleDraftChange = (event) => {
    onDraftChange(event.target.value);
    onTyping(Boolean(event.target.value.trim()));
  };

  return (
    <section className="flex min-h-[620px] overflow-hidden rounded-md border border-slate-200 bg-white">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#dff5f0] font-bold text-[#236a61]">
              {isGroup ? conversation.avatar : conversation.participant.avatar}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-slate-950">
                {isGroup ? conversation.name : conversation.participant.name}
              </h2>
              <p className="truncate text-sm text-slate-500">
                {isGroup
                  ? `${conversation.members.length} members`
                  : conversation.participant.lastSeen}
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

        {isGroup && conversation.description && (
          <div className="border-b border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            {conversation.description}
          </div>
        )}

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
                  {isGroup && !isMine && (
                    <p className="mb-1 text-xs font-semibold text-[#236a61]">
                      {message.senderName}
                    </p>
                  )}
                  <p className="text-sm leading-6">{message.text}</p>
                  <div
                    className={`mt-2 flex items-center gap-2 text-[11px] ${
                      isMine ? "text-white/75" : "text-slate-400"
                    }`}
                  >
                    <span>{formatMessageTime(message.createdAt)}</span>
                    {isMine && <span>{message.status}</span>}
                    {isMine && (
                      <button
                        className="font-semibold underline-offset-2 hover:underline"
                        onClick={() => onDeleteMessage(message.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {conversation.messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-center">
              <p className="text-sm text-slate-500">
                No messages yet. Start this conversation.
              </p>
            </div>
          )}
        </div>

        <div className="min-h-9 border-t border-slate-200 bg-white px-4 py-2">
          {typingUser ? (
            <p className="text-sm font-medium text-[#236a61]">
              {typingUser.name} is typing...
            </p>
          ) : (
            <p className="text-sm text-slate-400">Socket room ready</p>
          )}
        </div>

        <form
          className="flex items-end gap-3 border-t border-slate-200 p-4"
          onSubmit={onSend}
        >
          <textarea
            className="min-h-11 flex-1 resize-none rounded-md border border-slate-300 px-3 py-2 text-sm leading-6 outline-none focus:border-[#2b7f74] focus:ring-4 focus:ring-[#2b7f74]/10"
            onBlur={() => onTyping(false)}
            onChange={handleDraftChange}
            placeholder={isGroup ? "Send message to group" : "Type a message"}
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
      </div>

      {isGroup && <GroupMemberList members={conversation.members} />}
    </section>
  );
}

export default ConversationPanel;
