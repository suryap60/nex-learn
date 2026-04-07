"use client";

import React from "react";

interface OtpStepProps {
  onContinue: () => void;
  phoneNumber: string;
  otp: string;
  setOtp: (val: string) => void;
}

const OtpStep: React.FC<OtpStepProps> = ({ onContinue, phoneNumber, otp, setOtp }) => {
  return (
    <div className="animate-fade-up flex flex-col h-full">
      <h2 className="text-[28px] font-bold text-[#1a2b3c] mb-2 leading-tight">Enter the code we texted you</h2>
      <p className="text-[15px] text-[#556677] leading-relaxed mb-10 font-normal">
        We've sent an SMS to <strong>+91 {phoneNumber || "1234 567891"}</strong>
      </p>

      <div className="mb-4 relative group">
        {/* Notched Label */}
        <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] font-medium text-[#778899] z-10 transition-colors group-focus-within:text-[#2c3e50]">
          SMS code
        </label>
        
        <div className="relative border border-[#dddddd] rounded-lg p-3.5 flex items-center transition-all focus-within:border-[#2c3e50] focus-within:ring-1 focus-within:ring-[#2c3e50]">
          <input
            type="text"
            className="border-none bg-transparent outline-none w-full text-base text-[#1a2b3c] font-bold placeholder:font-normal placeholder:text-[#bbbbbb]"
            placeholder="123 456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={7}
          />
        </div>
      </div>

      <p className="text-[12px] text-[#8899aa] mb-2 leading-relaxed font-medium">
        Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
      </p>
      
      <div className="mb-10">
        <button className="text-[14px] text-[#1a2b3c] font-bold underline cursor-pointer hover:text-black transition-colors" onClick={() => alert("OTP Resent!")}>
          Resend code
        </button>
      </div>

      <button 
        className="w-full bg-[#1c2d3a] text-white py-4 rounded-xl font-bold text-base cursor-pointer hover:bg-[#15232d] active:scale-[0.98] transition-all mt-auto"
        onClick={onContinue}
      >
        Get Started
      </button>
    </div>
  );
};

export default OtpStep;
