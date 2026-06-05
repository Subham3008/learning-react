import { io } from "socket.io-client";
import env from "../config/env.js";

class SocketService {
  constructor() {
    this.listeners = new Map();
    this.connected = false;
    this.socket = null;
  }

  connect({ token, userId }) {
    if (!token || !userId) {
      return;
    }

    if (!env.useMockSocket) {
      this.connectRealSocket({ token, userId });
      return;
    }

    window.setTimeout(() => {
      this.connected = true;
      this.emitLocal("connection:change", { connected: true });
    }, 300);
  }

  connectRealSocket({ token, userId }) {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(env.socketUrl, {
      auth: { token },
      query: { userId },
      transports: ["websocket"],
    });

    this.socket.on("connect", () => {
      this.connected = true;
      this.emitLocal("connection:change", { connected: true });
    });

    this.socket.on("disconnect", () => {
      this.connected = false;
      this.emitLocal("connection:change", { connected: false });
    });

    this.socket.on("message:new", (payload) => {
      this.emitLocal("message:new", payload);
    });

    this.socket.on("typing:update", (payload) => {
      this.emitLocal("typing:update", payload);
    });
  }

  disconnect() {
    this.connected = false;
    this.emitLocal("connection:change", { connected: false });
    this.socket?.disconnect();
    this.socket = null;
    this.listeners.clear();
  }

  on(eventName, handler) {
    const handlers = this.listeners.get(eventName) || new Set();
    handlers.add(handler);
    this.listeners.set(eventName, handlers);

    return () => {
      handlers.delete(handler);
    };
  }

  emit(eventName, payload) {
    if (!env.useMockSocket && this.socket) {
      this.socket.emit(eventName, payload);
      return;
    }

    if (eventName === "typing:start") {
      this.simulateTypingResponse(payload);
    }

    if (eventName === "message:send") {
      this.simulateIncomingMessage(payload);
    }
  }

  emitLocal(eventName, payload) {
    const handlers = this.listeners.get(eventName);

    if (!handlers) {
      return;
    }

    handlers.forEach((handler) => handler(payload));
  }

  simulateTypingResponse(payload) {
    window.setTimeout(() => {
      this.emitLocal("typing:update", {
        roomId: payload.roomId,
        userId: "mock-user",
        name: payload.mode === "group" ? "Priya" : "Aarav",
        isTyping: true,
      });
    }, 350);

    window.setTimeout(() => {
      this.emitLocal("typing:update", {
        roomId: payload.roomId,
        userId: "mock-user",
        name: payload.mode === "group" ? "Priya" : "Aarav",
        isTyping: false,
      });
    }, 2200);
  }

  simulateIncomingMessage(payload) {
    window.setTimeout(() => {
      this.emitLocal("message:new", {
        mode: payload.mode,
        roomId: payload.roomId,
        message: {
          id: crypto.randomUUID(),
          senderId: "mock-user",
          senderName: payload.mode === "group" ? "Priya" : "Aarav",
          text:
            payload.mode === "group"
              ? "Noted. Everyone in this room can see the update."
              : "Got it, I received your message instantly.",
          createdAt: new Date().toISOString(),
          status: "delivered",
        },
      });
    }, 1200);
  }
}

const socketService = new SocketService();

export default socketService;
