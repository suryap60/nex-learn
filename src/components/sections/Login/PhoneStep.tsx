"use client";

import React from "react";
import Button from "../../ui/Button";

interface PhoneStepProps {
  onContinue: () => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  countryCode: string;
  setCountryCode: (val: string) => void;
  isLoading?: boolean;
}

const countryCodes = [
  { code: "+91", country: "India", flag: "https://flagcdn.com/in.svg" },
  { code: "+1", country: "USA", flag: "https://flagcdn.com/us.svg" },
  { code: "+44", country: "UK", flag: "https://flagcdn.com/gb.svg" },
  { code: "+971", country: "UAE", flag: "https://flagcdn.com/ae.svg" },
  { code: "+61", country: "Australia", flag: "https://flagcdn.com/au.svg" }
];

const PhoneStep: React.FC<PhoneStepProps> = ({ 
  onContinue, 
  phoneNumber, 
  setPhoneNumber, 
  countryCode, 
  setCountryCode, 
  isLoading = false 
}) => {
  const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

  return (
    <div className="animate-fade-up flex flex-col h-full">
      <h2 className="text-[28px] font-bold text-[#1a2b3c] mb-2 font-poppins">Enter your phone number</h2>
      <p className="text-[15px] text-[#556677] leading-relaxed mb-10 font-normal">
        We use your mobile number to identify your account
      </p>

      <div className="mb-6 relative group">
        <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] font-medium text-[#778899] z-10 transition-colors group-focus-within:text-[#2c3e50]">
          Phone number
        </label>
        
        <div className="relative border border-[#dddddd] rounded-lg flex items-center transition-all focus-within:border-[#2c3e50] focus-within:ring-1 focus-within:ring-[#2c3e50] overflow-hidden">
          {/* Country Code Select */}
          <div className="relative flex items-center pl-4 pr-2 border-r border-[#eeeeee] h-full py-4 bg-[#fafafa]">
             <img src={selectedCountry.flag} width="20" alt={selectedCountry.country} className="mr-2 shadow-sm" />
             <span className="text-[#333333] font-bold text-base mr-1">{countryCode}</span>
             <select 
               className="absolute inset-0 opacity-0 cursor-pointer w-full"
               value={countryCode}
               onChange={(e) => setCountryCode(e.target.value)}
             >
               {countryCodes.map(c => (
                 <option key={c.code} value={c.code}>{c.country} ({c.code})</option>
               ))}
             </select>
             <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-1 opacity-60">
               <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>

          <input
            type="tel"
            className="border-none bg-transparent outline-none w-full px-4 py-4 text-base text-[#1a2b3c] font-bold placeholder:font-normal placeholder:text-[#bbbbbb]"
            placeholder="1234 567891"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
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
        isLoading={isLoading}
      >
        Get Started
      </Button>
    </div>
  );
};

export default PhoneStep;
