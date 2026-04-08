import axios from "axios";
import { API_BASE_URL } from "../services/config";


const api  = axios.create({
  baseURL: API_BASE_URL,
});

// Optional: Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  
  // Skip token for registration endpoints
  const authEndpoints = ['auth/send-otp', 'auth/verify-otp', 'auth/create-profile'];
  const isAuthEndpoint = authEndpoints.some(endpoint => config.url?.includes(endpoint));

  if (token && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;