"use client";

import React from "react";
import Image from "next/image";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/assets/images/login/background-image.jpg')] bg-fixed bg-cover bg-center p-5 font-inter">
      <div className="flex w-full max-w-[1000px] bg-[#2d3e4e] rounded-[24px] overflow-hidden shadow-2xl relative min-h-[600px] p-2 md:p-3 lg:p-4">
        {/* Left Sidebar */}
        <div className="hidden md:flex flex-1 p-10 lg:p-12 flex-col justify-between items-center text-white relative">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14">
              <Image 
                src="/assets/images/login/logo.png" 
                alt="NexLearn Logo" 
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold tracking-tight m-0 leading-tight">NexLearn</h1>
              <span className="text-sm text-[#b0c4de] font-medium leading-none">futuristic learning</span>
            </div>
          </div>
          <div className="w-full flex justify-center mt-auto mb-6">
             <div className="relative w-[90%] h-[320px]">
              <Image 
                src="/assets/images/login/login.png" 
                alt="NexLearn Illustration" 
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Form Area (Separate Card) */}
        <div className="flex-1 md:flex-[0.85] m-2 md:m-3.5 bg-white rounded-[20px] p-8 md:p-12 flex flex-col relative overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
