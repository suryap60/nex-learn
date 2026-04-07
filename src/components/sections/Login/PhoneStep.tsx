"use client";

import React from "react";
import Button from "../../ui/Button";

interface PhoneStepProps {
  onContinue: () => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
}

const PhoneStep: React.FC<PhoneStepProps> = ({ onContinue, phoneNumber, setPhoneNumber }) => {
  return (
    <div className="animate-fade-up flex flex-col h-full">
      <h2 className="text-[28px] font-bold text-[#1a2b3c] mb-2 font-poppins">Enter your phone number</h2>
      <p className="text-[15px] text-[#556677] leading-relaxed mb-10 font-normal">
        We use your mobile number to identify your account
      </p>

      <div className="mb-6 relative group">
        {/* Notched Label */}
        <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] font-medium text-[#778899] z-10 transition-colors group-focus-within:text-[#2c3e50]">
          Phone number
        </label>
        
        <div className="relative border border-[#dddddd] rounded-lg p-3.5 flex items-center transition-all focus-within:border-[#2c3e50] focus-within:ring-1 focus-within:ring-[#2c3e50]">
          <div className="flex items-center gap-2 mr-3 text-[#1a2b3c] font-bold text-base">
            <span className="flex items-center gap-1.5">
               <img src="https://flagcdn.com/in.svg" width="20" alt="India" className="rounded-sm" />
               +91
            </span>
          </div>
          <input
            type="tel"
            className="border-none bg-transparent outline-none w-full text-base text-[#1a2b3c] font-bold placeholder:font-normal placeholder:text-[#bbbbbb]"
            placeholder="1234 567891"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <p className="text-[12px] text-[#8899aa] mb-12 leading-relaxed">
        By tapping Get started, you agree to the <a href="#" className="text-[#1a2b3c] font-bold underline">Terms & Conditions</a>
      </p>

      <Button 
        variant="primary"
        size="xl"
        fullWidth
        className="mt-auto"
        onClick={onContinue}
      >
        Get Started
      </Button>
    </div>
  );
};

export default PhoneStep;
