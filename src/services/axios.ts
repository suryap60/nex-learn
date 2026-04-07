import axios from "axios";
import { API } from "./endpoints";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = localStorage.getItem("refresh_token");
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API.AUTH.REFRESH}`, { refresh });
                localStorage.setItem("access_token", data.access);
                return api(originalRequest);
            } catch (e) {
                localStorage.clear();
                window.location.href = "/auth/phone";
            }
        }
        return Promise.reject(err);
    }
);

export default api;