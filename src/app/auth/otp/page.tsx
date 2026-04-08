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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const dispatch = useDispatch();

  const handleContinue = async () => {
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await verifyOtp(phone, otp);
      const { data } = response;
      
      if (data.success) {
        toast.info(data.message || "OTP verified successfully!");
        
        if (data.login && data.access_token) {
          // User already exists, log them in
          dispatch(setAuth({ 
            user: data.user || null, 
            token: data.access_token,
            refreshToken: data.refresh_token
          }));
          
          toast.success("Welcome back!");
          router.push("/exam"); // Redirect to exam instructions page
        } else {
          // New user, go to profile creation
          router.push(`/auth/profile?phone=${encodeURIComponent(phone)}`);
        }
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (error: any) {
      console.error("OTP verify error:", error);
      toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OtpStep
      onContinue={handleContinue}
      phoneNumber={phone}
      otp={otp}
      setOtp={setOtp}
      isLoading={isLoading}
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
