"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoginLayout from "@/src/components/sections/Login/LoginLayout";
import PhoneStep from "@/src/components/sections/Login/PhoneStep";
import { sendOtp } from "@/src/features/auth/api";

export default function PhonePage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (!phoneNumber || phoneNumber.length < 8) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    const fullMobile = `${countryCode}${phoneNumber}`;
    setIsLoading(true);
    try {
      const response = await sendOtp(fullMobile);
      
      if (response.data.success) {
        toast.success(response.data.message || "OTP sent successfully!");
        router.push(`/auth/otp?phone=${encodeURIComponent(fullMobile)}`);
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error: any) {
      console.error("OTP send error:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout>
      <PhoneStep
        onContinue={handleContinue}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        isLoading={isLoading}
      />
    </LoginLayout>
  );
}
