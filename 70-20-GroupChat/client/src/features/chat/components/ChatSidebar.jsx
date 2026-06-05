import ConversationList from "./ConversationList.jsx";
import GroupCreateForm from "./GroupCreateForm.jsx";

function ChatSidebar({
  activeMode,
  activeConversationId,
  conversations,
  groups,
  onCreateGroup,
  onModeChange,
  onSelect,
}) {
  const items = activeMode === "private" ? conversations : groups;

  return (
    <aside className="rounded-md border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <div className="grid grid-cols-2 rounded-md bg-slate-100 p-1">
          <button
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
              activeMode === "private"
                ? "bg-white text-[#236a61] shadow-sm"
                : "text-slate-500"
            }`}
            onClick={() => onModeChange("private")}
            type="button"
          >
            Private
          </button>
          <button
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
              activeMode === "group"
                ? "bg-white text-[#236a61] shadow-sm"
                : "text-slate-500"
            }`}
            onClick={() => onModeChange("group")}
            type="button"
          >
            Groups
          </button>
        </div>
      </div>

      {activeMode === "group" && <GroupCreateForm onCreate={onCreateGroup} />}

      <ConversationList
        activeConversationId={activeConversationId}
        conversations={items}
        mode={activeMode}
        onSelect={onSelect}
      />
    </aside>
  );
}

export default ChatSidebar;
