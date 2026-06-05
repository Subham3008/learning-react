import { formatMessageTime } from "../utils/formatters.js";

function ConversationList({
  activeConversationId,
  conversations,
  mode = "private",
  onSelect,
}) {
  return (
    <div>
      <div className="border-b border-slate-200 p-4">
        <h2 className="mb-4 text-base font-semibold text-slate-950">
          {mode === "private" ? "Private chats" : "Group rooms"}
        </h2>
        <input
          className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#2b7f74] focus:ring-4 focus:ring-[#2b7f74]/10"
          placeholder={mode === "private" ? "Search user" : "Search group"}
          type="search"
        />
      </div>

      <div className="max-h-[calc(100vh-230px)] overflow-y-auto p-2">
        {conversations.map((conversation) => {
          const lastMessage = conversation.messages.at(-1);
          const isActive = conversation.id === activeConversationId;
          const title =
            mode === "private" ? conversation.participant.name : conversation.name;
          const avatar =
            mode === "private"
              ? conversation.participant.avatar
              : conversation.avatar;
          const status =
            mode === "private" ? conversation.participant.status : "online";

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
                {avatar}
                <span
                  className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white ${
                    status === "online"
                      ? "bg-emerald-500"
                      : status === "away"
                        ? "bg-amber-400"
                        : "bg-slate-300"
                  }`}
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-slate-950">
                    {title}
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
    </div>
  );
}

export default ConversationList;
