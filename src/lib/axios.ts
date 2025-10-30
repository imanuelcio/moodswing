import axios from "axios";

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

console.log("🔧 [API] Axios configured with baseURL:", import.meta.env.VITE_API_URL);

// Request interceptor - add logging and token
api.interceptors.request.use(
  (config) => {
    console.log(`📤 [API] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');

    // Add token from localStorage if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("❌ [API] Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - add logging
api.interceptors.response.use(
  (response) => {
    console.log(`📥 [API] ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
    console.log("📦 [API] Response data:", response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`❌ [API] ${error.config?.method?.toUpperCase()} ${error.config?.url} - Status: ${error.response.status}`);
      console.error("❌ [API] Error response:", error.response.data);

      if (error.response.status === 401) {
        console.warn("⚠️ [API] Unauthorized - token may be expired");
      }
    } else if (error.request) {
      console.error("❌ [API] No response received:", error.request);
      console.error("❌ [API] Is backend running at", import.meta.env.VITE_API_URL, "?");
    } else {
      console.error("❌ [API] Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);
