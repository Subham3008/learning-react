# ChatFlow Frontend

React + Tailwind frontend for a real-time one-to-one and group chat app. The app works in mock mode by default and switches to backend mode when environment URLs are configured.

## Run

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` when backend is ready:

```txt
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Architecture

- `src/core`: app providers and protected routing.
- `src/features`: feature UI for auth and chat.
- `src/services`: API, auth, chat, socket, and mock data services.
- `src/shared`: reusable layouts and base UI components.

## Expected REST Contract

Auth:

```txt
POST /auth/register
POST /auth/login
```

Both should return:

```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "avatar": "U"
  }
}
```

Chats:

```txt
GET /chats/private
GET /chats/groups
POST /chats/private/:conversationId/messages
POST /chats/groups/:groupId/messages
POST /chats/groups
POST /uploads/chat
```

Message shape:

```json
{
  "id": "message-id",
  "senderId": "user-id",
  "senderName": "User",
  "text": "Hello",
  "attachment": null,
  "createdAt": "2026-06-06T10:00:00.000Z",
  "status": "sent"
}
```

## Socket.IO Events

Client emits:

```txt
message:send
typing:start
typing:stop
```

Client listens:

```txt
message:new
typing:update
```

Room payload:

```json
{
  "mode": "private",
  "roomId": "conversation-or-group-id",
  "userId": "user-id",
  "name": "User Name"
}
```
