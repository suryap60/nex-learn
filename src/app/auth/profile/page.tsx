"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import LoginLayout from "@/src/components/sections/Login/LoginLayout";
import DetailsStep from "@/src/components/sections/Login/DetailsStep";
import { createProfile } from "@/src/features/auth/api";
import { setAuth } from "@/src/features/auth/slice";

export default function ProfilePage() {
  const [isFilled, setIsFilled] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleContinue = async (data?: any) => {
    try {
      const response = await createProfile(data || {});
      if (response?.data?.token) {
        dispatch(setAuth({ user: response.data.user || null, token: response.data.token }));
      }
      toast.success("Profile created successfully!");
      router.push("/exam");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create profile. Please try again.");
    }
  };

  return (
    <LoginLayout>
      <DetailsStep onContinue={handleContinue} isFilled={isFilled} />
    </LoginLayout>
  );
}
