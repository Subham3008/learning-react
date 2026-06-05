import env from "../config/env.js";

const SESSION_KEY = "chatflow_session";

function createMockSession(user) {
  return {
    token: `mock-jwt-${crypto.randomUUID()}`,
    user: {
      id: crypto.randomUUID(),
      name: user.name || "Chat User",
      email: user.email,
      avatar: user.name?.slice(0, 1).toUpperCase() || "U",
    },
  };
}

const authService = {
  getSession() {
    const rawSession = localStorage.getItem(SESSION_KEY);

    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession);
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  },

  async login(payload) {
    if (!env.useMockApi) {
      const response = await fetch(`${env.apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const session = await response.json();

      if (!response.ok) {
        throw new Error(session?.message || "Login failed");
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }

    const session = createMockSession({
      email: payload.email,
      name: payload.email.split("@")[0],
    });

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  async register(payload) {
    if (!env.useMockApi) {
      const response = await fetch(`${env.apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const session = await response.json();

      if (!response.ok) {
        throw new Error(session?.message || "Registration failed");
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }

    const session = createMockSession(payload);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },
};

export default authService;
