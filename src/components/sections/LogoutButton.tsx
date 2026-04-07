"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { logoutApi } from "@/src/features/auth/api";
import { logout } from "@/src/features/auth/slice";

interface LogoutButtonProps {
  className?: string;
  variant?: "primary" | "soft" | "teal" | "purple";
  size?: "sm" | "md" | "lg" | "xl";
}

export default function LogoutButton({ className, variant = "teal", size = "sm" }: LogoutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logoutApi();
      dispatch(logout());
      toast.success("Logged out successfully");
      router.push("/auth/phone");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to log out");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsModalOpen(true)}
      >
        Logout
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={() => !isLoading && setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl w-full max-w-[400px] overflow-hidden flex flex-col animate-scale-in shadow-2xl relative z-50">
            <div className="p-8 pb-4 text-center">
              <h2 className="text-[20px] font-bold text-[#1a2b3c] font-poppins mb-3">Confirm Logout</h2>
              <p className="text-[14px] text-[#556677] leading-relaxed">
                Are you sure you want to log out of your account?
              </p>
            </div>

            <div className="p-6 bg-[#fafafa] border-t border-[#e5edf5] flex gap-4">
              <Button variant="soft" fullWidth onClick={() => setIsModalOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant="primary" fullWidth onClick={handleLogout} disabled={isLoading} className="bg-[#e74c3c] hover:bg-[#c0392b] border-none text-white relative flex items-center justify-center">
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Log Out"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
