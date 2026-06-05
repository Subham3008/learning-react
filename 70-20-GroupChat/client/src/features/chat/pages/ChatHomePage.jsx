import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../core/providers/AuthProvider.jsx";
import chatService from "../../../services/chatService.js";
import ChatShell from "../components/ChatShell.jsx";
import ChatSidebar from "../components/ChatSidebar.jsx";
import ConversationPanel from "../components/ConversationPanel.jsx";

function ChatHomePage() {
  const { user, logout } = useAuth();
  const [activeMode, setActiveMode] = useState("private");
  const [conversations, setConversations] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadConversations() {
      const [nextConversations, nextGroups] = await Promise.all([
        chatService.getPrivateConversations(),
        chatService.getGroupConversations(),
      ]);

      if (isMounted) {
        setConversations(nextConversations);
        setGroups(nextGroups);
        setActiveConversationId(nextConversations[0]?.id || "");
      }
    }

    loadConversations();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeConversation = useMemo(
    () => {
      const source = activeMode === "private" ? conversations : groups;

      return source.find(
        (conversation) => conversation.id === activeConversationId
      );
    },
    [activeConversationId, activeMode, conversations, groups]
  );

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!draft.trim() || !activeConversationId) {
      return;
    }

    const message =
      activeMode === "private"
        ? await chatService.sendPrivateMessage(activeConversationId, draft.trim())
        : await chatService.sendGroupMessage(activeConversationId, draft.trim());

    const updater = (current) =>
      current.map((conversation) =>
        conversation.id === activeConversationId
          ? {
              ...conversation,
              unreadCount: 0,
              messages: [...conversation.messages, message],
            }
          : conversation
      );

    if (activeMode === "private") {
      setConversations(updater);
    } else {
      setGroups(updater);
    }

    setDraft("");
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    setDraft("");

    const source = mode === "private" ? conversations : groups;
    setActiveConversationId(source[0]?.id || "");
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    setDraft("");

    const setter = activeMode === "private" ? setConversations : setGroups;
    setter((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation
      )
    );
  };

  const handleCreateGroup = async (payload) => {
    const group = await chatService.createGroup(payload);
    setGroups((current) => [group, ...current]);
    setActiveMode("group");
    setActiveConversationId(group.id);
    setDraft("");
  };

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

      <ChatShell
        sidebar={
          <ChatSidebar
            activeMode={activeMode}
            activeConversationId={activeConversationId}
            conversations={conversations}
            groups={groups}
            onCreateGroup={handleCreateGroup}
            onModeChange={handleModeChange}
            onSelect={handleSelectConversation}
          />
        }
        conversation={
          activeConversation ? (
            <ConversationPanel
              conversation={activeConversation}
              draft={draft}
              onDraftChange={setDraft}
              onSend={handleSendMessage}
            />
          ) : (
            <section className="flex min-h-[620px] items-center justify-center rounded-md border border-slate-200 bg-white p-6 text-center">
              <p className="text-sm text-slate-500">No conversation found.</p>
            </section>
          )
        }
      />
    </main>
  );
}

export default ChatHomePage;
