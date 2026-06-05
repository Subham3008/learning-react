class SocketService {
  constructor() {
    this.listeners = new Map();
    this.connected = false;
  }

  connect({ token, userId }) {
    if (!token || !userId) {
      return;
    }

    window.setTimeout(() => {
      this.connected = true;
      this.emitLocal("connection:change", { connected: true });
    }, 300);
  }

  disconnect() {
    this.connected = false;
    this.emitLocal("connection:change", { connected: false });
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
    if (eventName === "typing:start") {
      this.simulateTypingResponse(payload);
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
}

const socketService = new SocketService();

export default socketService;
