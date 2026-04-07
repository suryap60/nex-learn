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
    <div className="animate-fade-up">
      <h2 className="text-2xl font-bold text-[#1C3141] mb-3">Enter the code we texted you</h2>
      <p className="text-sm text-[#7f8c8d] leading-relaxed mb-8 font-medium">
        We've sent an SMS to <strong>+91 {phoneNumber || "1234 567891"}</strong>
      </p>

      <div className="mb-6 relative">
        <label className="block text-xs font-semibold text-[#1C3141] mb-2">SMS code</label>
        <div className="relative border border-[#e0e0e0] rounded-lg p-3 flex items-center transition-colors focus-within:border-[#1C3141]">
          <input
            type="text"
            className="border-none bg-transparent outline-none w-full text-[15px] text-[#1C3141] font-semibold text-center tracking-widest placeholder:font-normal"
            placeholder="123 456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={7}
          />
        </div>
        <div className="text-sm text-[#1C3141] underline cursor-pointer mt-2.5 font-semibold" onClick={() => alert("OTP Resent!")}>
          Resend code
        </div>
      </div>

      <p className="mt-5 text-xs text-[#95a5a6] leading-relaxed font-medium">
        Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
      </p>

      <button 
        className="w-full bg-[#1C3141] text-white py-3.5 rounded-lg font-semibold text-base cursor-pointer hover:bg-[#162633] active:scale-[0.98] transition-all mt-10"
        onClick={onContinue}
      >
        Get Started
      </button>
    </div>
  );
};

export default OtpStep;
