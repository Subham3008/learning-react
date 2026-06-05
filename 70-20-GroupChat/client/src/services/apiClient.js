import env from "../config/env.js";
import authService from "./authService.js";

async function request(path, options = {}) {
  if (!env.apiBaseUrl) {
    throw new Error("VITE_API_BASE_URL is not configured");
  }

  const session = authService.getSession();
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
}

const apiClient = {
  get(path) {
    return request(path);
  },

  post(path, body) {
    return request(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },

  delete(path) {
    return request(path, {
      method: "DELETE",
    });
  },
};

export default apiClient;
