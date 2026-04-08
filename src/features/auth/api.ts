import api from "@/src/services/axios";
import { AuthResponse } from "./types";
import { API_BASE_URL } from "../../services/config";

export const sendOtp = (mobile: string) => {
  const formData = new FormData();
  formData.append("mobile", mobile);

  return api.post<AuthResponse>("auth/send-otp", formData);
};

export const verifyOtp = (mobile: string, otp: string) => {
  const formData = new FormData();
  formData.append("mobile", mobile);
  formData.append("otp", otp);

  return api.post<AuthResponse>("auth/verify-otp", formData);
};

export const createProfile = (data: {
  mobile: string;
  name: string;
  email: string;
  qualification: string;
  profile_image: File | string | null;
}) => {
  const formData = new FormData();
  
  formData.append("mobile", data.mobile);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("qualification", data.qualification);
  
  if (data.profile_image instanceof File) {
    formData.append("profile_image", data.profile_image);
  }

  return api.post<AuthResponse>("auth/create-profile", formData);
};


export const logoutApi = () => {
  return api.post<AuthResponse>("auth/logout");
};