import { useEffect, useMemo, useState } from "react";
import socketService from "../../../services/socketService.js";

export function useChatRealtime({ token, user, activeMode, activeRoomId }) {
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});

  useEffect(() => {
    socketService.connect({ token, userId: user?.id });

    const offConnection = socketService.on("connection:change", (payload) => {
      setIsConnected(payload.connected);
    });
    const offTyping = socketService.on("typing:update", (payload) => {
      setTypingUsers((current) => ({
        ...current,
        [payload.roomId]: payload.isTyping
          ? { id: payload.userId, name: payload.name }
          : null,
      }));
    });

    return () => {
      offConnection();
      offTyping();
      socketService.disconnect();
    };
  }, [token, user?.id]);

  const activeTypingUser = useMemo(
    () => typingUsers[activeRoomId] || null,
    [activeRoomId, typingUsers]
  );

  const emitTyping = (isTyping) => {
    if (!activeRoomId) {
      return;
    }

    socketService.emit(isTyping ? "typing:start" : "typing:stop", {
      mode: activeMode,
      roomId: activeRoomId,
      userId: user?.id,
      name: user?.name,
    });
  };

  const subscribeToMessages = (handler) =>
    socketService.on("message:new", handler);

  const emitMessage = (message) => {
    socketService.emit("message:send", {
      mode: activeMode,
      roomId: activeRoomId,
      message,
    });
  };

  return {
    activeTypingUser,
    emitMessage,
    emitTyping,
    isConnected,
    subscribeToMessages,
  };
}
