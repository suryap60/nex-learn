"use client";

import React, { useState, Suspense } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import LoginLayout from "@/src/components/sections/Login/LoginLayout";
import DetailsStep from "@/src/components/sections/Login/DetailsStep";
import { createProfile } from "@/src/features/auth/api";
import { setAuth } from "@/src/features/auth/slice";

function ProfileContent() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const dispatch = useDispatch();

  const handleContinue = async (formData?: any) => {
    setIsLoading(true);
    try {
      //formData includes: name, email, profile_image, qualification
      const response = await createProfile({
        ...formData,
        mobile: phone
      });
      
      const { data } = response;
      
      if (data.success) {
        toast.success(data.message || "Profile created successfully!");
        
        if (data.access_token) {
           dispatch(setAuth({ 
             user: data.user || null, 
             token: data.access_token,
             refreshToken: data.refresh_token
           }));
        }
        
        router.push("/exam");
      } else {
        toast.error(data.message || "Failed to create profile. Please check your details.");
      }
    } catch (error: any) {
      console.error("Profile creation error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
      const errorMsg = error.response?.data?.message || "Failed to create profile. Server returned an error (500).";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DetailsStep onContinue={handleContinue} isLoading={isLoading} />
  );
}

export default function ProfilePage() {
  return (
    <LoginLayout>
      <Suspense fallback={<div className="h-full flex items-center justify-center">Loading...</div>}>
         <ProfileContent />
      </Suspense>
    </LoginLayout>
  );
}
