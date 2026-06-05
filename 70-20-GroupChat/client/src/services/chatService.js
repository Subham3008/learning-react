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

const groupConversations = [
  {
    id: "group-1",
    type: "group",
    name: "Socket.IO Learners",
    description: "Realtime chat implementation planning room.",
    avatar: "S",
    unreadCount: 4,
    members: [
      { id: "me", name: "You", avatar: "Y", role: "Admin", status: "online" },
      {
        id: "user-2",
        name: "Aarav Sharma",
        avatar: "A",
        role: "Member",
        status: "online",
      },
      {
        id: "user-3",
        name: "Priya Das",
        avatar: "P",
        role: "Member",
        status: "away",
      },
      {
        id: "user-4",
        name: "Rahul Verma",
        avatar: "R",
        role: "Member",
        status: "offline",
      },
    ],
    messages: [
      {
        id: "group-msg-1",
        senderId: "user-2",
        senderName: "Aarav",
        text: "Group room payload should include groupId and sender details.",
        createdAt: minutesAgo(42),
        status: "read",
      },
      {
        id: "group-msg-2",
        senderId: "me",
        senderName: "You",
        text: "Yes, this UI is keeping group data separate from private chats.",
        createdAt: minutesAgo(34),
        status: "read",
      },
      {
        id: "group-msg-3",
        senderId: "user-3",
        senderName: "Priya",
        text: "Member list is useful for showing online users too.",
        createdAt: minutesAgo(11),
        status: "delivered",
      },
    ],
  },
  {
    id: "group-2",
    type: "group",
    name: "Frontend Team",
    description: "UI tasks, auth screens, and chat layouts.",
    avatar: "F",
    unreadCount: 0,
    members: [
      { id: "me", name: "You", avatar: "Y", role: "Admin", status: "online" },
      {
        id: "user-5",
        name: "Neha Singh",
        avatar: "N",
        role: "Member",
        status: "online",
      },
      {
        id: "user-6",
        name: "Karan Mehta",
        avatar: "K",
        role: "Member",
        status: "offline",
      },
    ],
    messages: [
      {
        id: "group-msg-4",
        senderId: "user-5",
        senderName: "Neha",
        text: "Keep the group panel simple for the first frontend version.",
        createdAt: minutesAgo(95),
        status: "read",
      },
    ],
  },
];

const chatService = {
  async getPrivateConversations() {
    return structuredClone(privateConversations);
  },

  async getGroupConversations() {
    return structuredClone(groupConversations);
  },

  async sendPrivateMessage(conversationId, text, attachment = null) {
    return {
      id: crypto.randomUUID(),
      conversationId,
      senderId: "me",
      text,
      attachment,
      createdAt: new Date().toISOString(),
      status: "sent",
    };
  },

  async sendGroupMessage(groupId, text, attachment = null) {
    return {
      id: crypto.randomUUID(),
      groupId,
      senderId: "me",
      senderName: "You",
      text,
      attachment,
      createdAt: new Date().toISOString(),
      status: "sent",
    };
  },

  async prepareAttachment(file) {
    return {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      url: URL.createObjectURL(file),
    };
  },

  async createGroup(payload) {
    return {
      id: crypto.randomUUID(),
      type: "group",
      name: payload.name,
      description: payload.description || "New group conversation.",
      avatar: payload.name.slice(0, 1).toUpperCase(),
      unreadCount: 0,
      members: [
        { id: "me", name: "You", avatar: "Y", role: "Admin", status: "online" },
        ...payload.members.map((member, index) => ({
          id: `new-member-${index + 1}-${member.toLowerCase()}`,
          name: member,
          avatar: member.slice(0, 1).toUpperCase(),
          role: "Member",
          status: "offline",
        })),
      ],
      messages: [],
    };
  },
};

export default chatService;
