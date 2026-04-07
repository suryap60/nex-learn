"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import LoginLayout from "@/src/components/sections/Login/LoginLayout";
import OtpStep from "@/src/components/sections/Login/OtpStep";
import { verifyOtp } from "@/src/features/auth/api";
import { setAuth } from "@/src/features/auth/slice";

function OtpContent() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const dispatch = useDispatch();

  const handleContinue = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    try {
      const response = await verifyOtp(phone, otp);
      if (response?.data?.token) {
        dispatch(setAuth({ user: response.data.user || null, token: response.data.token }));
      }
      toast.success("OTP verified successfully!");
      router.push(`/auth/profile?phone=${encodeURIComponent(phone)}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <OtpStep
      onContinue={handleContinue}
      phoneNumber={phone}
      otp={otp}
      setOtp={setOtp}
    />
  );
}

export default function OtpPage() {
  return (
    <LoginLayout>
      <Suspense fallback={<div className="h-full flex items-center justify-center">Loading...</div>}>
        <OtpContent />
      </Suspense>
    </LoginLayout>
  );
}
