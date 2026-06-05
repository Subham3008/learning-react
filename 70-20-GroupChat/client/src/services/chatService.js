import apiClient from "./apiClient.js";
import env from "../config/env.js";
import {
  groupConversations,
  privateConversations,
} from "./mockData.js";

function createMessage(roomKey, roomId, text, attachment = null) {
  return {
    id: crypto.randomUUID(),
    [roomKey]: roomId,
    senderId: "me",
    senderName: "You",
    text,
    attachment,
    createdAt: new Date().toISOString(),
    status: "sent",
  };
}

const chatService = {
  async getPrivateConversations() {
    if (!env.useMockApi) {
      return apiClient.get("/chats/private");
    }

    return structuredClone(privateConversations);
  },

  async getGroupConversations() {
    if (!env.useMockApi) {
      return apiClient.get("/chats/groups");
    }

    return structuredClone(groupConversations);
  },

  async sendPrivateMessage(conversationId, text, attachment = null) {
    if (!env.useMockApi) {
      return apiClient.post(`/chats/private/${conversationId}/messages`, {
        text,
        attachment,
      });
    }

    return createMessage("conversationId", conversationId, text, attachment);
  },

  async sendGroupMessage(groupId, text, attachment = null) {
    if (!env.useMockApi) {
      return apiClient.post(`/chats/groups/${groupId}/messages`, {
        text,
        attachment,
      });
    }

    return createMessage("groupId", groupId, text, attachment);
  },

  async prepareAttachment(file) {
    if (!env.useMockApi) {
      const formData = new FormData();
      formData.append("file", file);
      return apiClient.post("/uploads/chat", formData);
    }

    return {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      url: URL.createObjectURL(file),
    };
  },

  async createGroup(payload) {
    if (!env.useMockApi) {
      return apiClient.post("/chats/groups", payload);
    }

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
