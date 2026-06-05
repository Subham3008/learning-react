import { formatMessageTime } from "../utils/formatters.js";

function ConversationList({ conversations, activeConversationId, onSelect }) {
  return (
    <aside className="rounded-md border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-950">
            Private chats
          </h2>
          <button
            className="rounded-md bg-[#2b7f74] px-3 py-2 text-sm font-semibold text-white"
            type="button"
          >
            New
          </button>
        </div>
        <input
          className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#2b7f74] focus:ring-4 focus:ring-[#2b7f74]/10"
          placeholder="Search user"
          type="search"
        />
      </div>

      <div className="max-h-[calc(100vh-230px)] overflow-y-auto p-2">
        {conversations.map((conversation) => {
          const lastMessage = conversation.messages.at(-1);
          const isActive = conversation.id === activeConversationId;

          return (
            <button
              className={`mb-2 grid w-full grid-cols-[44px_1fr_auto] gap-3 rounded-md p-3 text-left transition ${
                isActive
                  ? "bg-[#eefbf8] ring-1 ring-[#2b7f74]"
                  : "hover:bg-slate-50"
              }`}
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              type="button"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-md bg-[#dff5f0] font-bold text-[#236a61]">
                {conversation.participant.avatar}
                <span
                  className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white ${
                    conversation.participant.status === "online"
                      ? "bg-emerald-500"
                      : conversation.participant.status === "away"
                        ? "bg-amber-400"
                        : "bg-slate-300"
                  }`}
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-slate-950">
                    {conversation.participant.name}
                  </p>
                </div>
                <p className="mt-1 truncate text-sm text-slate-500">
                  {lastMessage?.text}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-slate-400">
                  {lastMessage ? formatMessageTime(lastMessage.createdAt) : ""}
                </span>
                {conversation.unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2b7f74] px-1.5 text-xs font-bold text-white">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default ConversationList;
