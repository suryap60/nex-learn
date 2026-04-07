"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoginLayout from "@/src/components/sections/Login/LoginLayout";
import PhoneStep from "@/src/components/sections/Login/PhoneStep";
import { sendOtp } from "@/src/features/auth/api";

export default function PhonePage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleContinue = async () => {
    if (!phoneNumber) {
      toast.error("Please enter a valid phone number");
      return;
    }
    try {
      await sendOtp(phoneNumber);
      toast.success("OTP sent successfully!");
      router.push(`/auth/otp?phone=${encodeURIComponent(phoneNumber)}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <LoginLayout>
      <PhoneStep
        onContinue={handleContinue}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    </LoginLayout>
  );
}
