import axios from "axios";

const apiUrl = (import.meta as any).env.VITE_API_URL || "http://localhost:4000";

const API = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: { "Content-Type": "application/json" }
});

// Attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;