export const ServerUrl =
  import.meta.env.VITE_SERVER_URL ||
  (import.meta.env.PROD
    ? "https://mock-interview-agent-backend.onrender.com"
    : "http://localhost:8000")
