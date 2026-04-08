// features/auth/api.ts
import api from "@/src/services/axios";

export interface AuthResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  user?: any;
}

export const sendOtp = (mobile: string) => {
  const formData = new FormData();
  formData.append("mobile", mobile);

  return api.post<AuthResponse>("/auth/send-otp", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const verifyOtp = (mobile: string, otp: string) => {
  const formData = new FormData();
  formData.append("mobile", mobile);
  formData.append("otp", otp);

  return api.post<AuthResponse>("/auth/verify-otp", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createProfile = (data: Record<string, any>) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return api.post<AuthResponse>("/auth/create-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const logoutApi = () => {
  return api.post<AuthResponse>("/auth/logout");
};