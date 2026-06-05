const now = new Date();

function minutesAgo(minutes) {
  return new Date(now.getTime() - minutes * 60 * 1000).toISOString();
}

const privateConversations = [
  {
    id: "conv-private-1",
    type: "private",
    participant: {
      id: "user-2",
      name: "Aarav Sharma",
      avatar: "A",
      status: "online",
      lastSeen: "Online",
    },
    unreadCount: 2,
    messages: [
      {
        id: "msg-1",
        senderId: "user-2",
        text: "Hey, are you free to test the socket flow today?",
        createdAt: minutesAgo(32),
        status: "read",
      },
      {
        id: "msg-2",
        senderId: "me",
        text: "Yes, frontend auth is ready. I am building private chat UI now.",
        createdAt: minutesAgo(26),
        status: "read",
      },
      {
        id: "msg-3",
        senderId: "user-2",
        text: "Great. Keep the payload shape simple for backend integration.",
        createdAt: minutesAgo(8),
        status: "delivered",
      },
    ],
  },
  {
    id: "conv-private-2",
    type: "private",
    participant: {
      id: "user-3",
      name: "Priya Das",
      avatar: "P",
      status: "away",
      lastSeen: "Last seen 12 min ago",
    },
    unreadCount: 0,
    messages: [
      {
        id: "msg-4",
        senderId: "user-3",
        text: "Can you add message timestamps in the first version?",
        createdAt: minutesAgo(72),
        status: "read",
      },
      {
        id: "msg-5",
        senderId: "me",
        text: "Done. The UI will show time beside each bubble.",
        createdAt: minutesAgo(64),
        status: "read",
      },
    ],
  },
  {
    id: "conv-private-3",
    type: "private",
    participant: {
      id: "user-4",
      name: "Rahul Verma",
      avatar: "R",
      status: "offline",
      lastSeen: "Last seen yesterday",
    },
    unreadCount: 0,
    messages: [
      {
        id: "msg-6",
        senderId: "me",
        text: "Later we can connect this to Socket.IO rooms.",
        createdAt: minutesAgo(180),
        status: "sent",
      },
    ],
  },
];

const chatService = {
  async getPrivateConversations() {
    return structuredClone(privateConversations);
  },

  async sendPrivateMessage(conversationId, text) {
    return {
      id: crypto.randomUUID(),
      conversationId,
      senderId: "me",
      text,
      createdAt: new Date().toISOString(),
      status: "sent",
    };
  },
};

export default chatService;
