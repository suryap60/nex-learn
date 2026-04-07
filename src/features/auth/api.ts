// features/auth/api.ts
import api from "@/src/services/axios";

export const sendOtp = (mobile: string) => {
  const formData = new FormData();
  formData.append("mobile", mobile);

  return api.post("/auth/send-otp", formData);
};

export const verifyOtp = (mobile: string, otp: string) => {
  const formData = new FormData();
  formData.append("mobile", mobile);
  formData.append("otp", otp);
  return api.post("/auth/verify-otp", formData);
};

export const createProfile = (data: any) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return api.post("/auth/create-profile", formData);
};

export const logoutApi = () => {
  return api.post("/auth/logout");
};