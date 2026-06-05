const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
  socketUrl: import.meta.env.VITE_SOCKET_URL || "",
  useMockApi: !import.meta.env.VITE_API_BASE_URL,
  useMockSocket: !import.meta.env.VITE_SOCKET_URL,
};

export default env;
