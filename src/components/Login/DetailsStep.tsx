"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface DetailsStepProps {
  onContinue: () => void;
  isFilled?: boolean;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ onContinue, isFilled = false }) => {
  const [profileImage, setProfileImage] = useState<string | null>(
    isFilled ? "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80" : null
  );
  const [name, setName] = useState(isFilled ? "Nevin Mathew" : "");
  const [email, setEmail] = useState(isFilled ? "nevinmathew@gmail.com" : "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (re) => {
        setProfileImage(re.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="animate-fade-up flex flex-col h-full gap-y-4">
      <h2 className="text-[26px] font-bold text-[#1a2b3c] leading-tight mb-2">Add Your Details</h2>

      <div 
        className={`w-[100px] h-[100px] rounded-xl flex flex-col items-center justify-center cursor-pointer mx-auto relative transition-all ${profileImage ? 'border-none' : 'border-2 border-dashed border-[#dddddd] bg-[#fafafa] hover:border-[#1a2b3c]'}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          hidden 
          onChange={handleFileChange} 
          accept="image/*"
        />
        {profileImage ? (
          <div className="relative w-full h-full">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-xl" />
            <div className="absolute -top-2 -right-2 bg-[#e74c3c] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs cursor-pointer shadow-md" onClick={(e) => {
              e.stopPropagation();
              setProfileImage(null);
            }}>✕</div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 grayscale opacity-60">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            <span className="text-[9px] text-[#556677] text-center font-bold px-2 uppercase tracking-tight">Add Your Profile Picture</span>
          </div>
        )}
      </div>

      <div className="relative group">
        <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] font-medium text-[#778899] z-10">
          Name*
        </label>
        <div className="relative border border-[#dddddd] rounded-lg p-3 flex items-center transition-all focus-within:border-[#2c3e50]">
          <input
            type="text"
            className="border-none bg-transparent outline-none w-full text-base text-[#1a2b3c] font-bold placeholder:font-normal placeholder:text-[#bbbbbb]"
            placeholder="Enter your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="relative group">
        <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] font-medium text-[#778899] z-10">
          Email
        </label>
        <div className="relative border border-[#dddddd] rounded-lg p-3 flex items-center transition-all focus-within:border-[#2c3e50]">
          <input
            type="email"
            className="border-none bg-transparent outline-none w-full text-base text-[#1a2b3c] font-bold placeholder:font-normal placeholder:text-[#bbbbbb]"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="relative group">
        <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] font-medium text-[#778899] z-10">
          Your qualification*
        </label>
        <div className="relative border border-[#dddddd] rounded-lg p-3 flex items-center transition-all focus-within:border-[#2c3e50] cursor-pointer">
          <input
            type="text"
            className="border-none bg-transparent outline-none w-full text-base text-[#1a2b3c] font-bold cursor-pointer placeholder:font-normal placeholder:text-[#bbbbbb]"
            placeholder="Select qualification"
            readOnly
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bbbbbb]">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
          </div>
        </div>
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

export default DetailsStep;
