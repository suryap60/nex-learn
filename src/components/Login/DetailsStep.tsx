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
    <div className="animate-fade-up">
      <h2 className="text-2xl font-bold text-[#1C3141] mb-6">Add Your Details</h2>

      <div 
        className={`w-[120px] h-[120px] rounded-xl flex flex-col items-center justify-center cursor-pointer mx-auto mb-8 relative transition-all ${profileImage ? 'border-none' : 'border-2 border-dashed border-[#e0e0e0] hover:border-[#1C3141]'}`}
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
            <div className="absolute -top-2 -right-2 bg-[#e74c3c] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs cursor-pointer" onClick={(e) => {
              e.stopPropagation();
              setProfileImage(null);
            }}>✕</div>
          </div>
        ) : (
          <>
            <div className="text-2xl text-[#bdc3c7] mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <span className="text-[10px] text-[#bdc3c7] text-center font-medium">Add Your Profile picture</span>
          </>
        )}
      </div>

      <div className="mb-4 relative">
        <label className="block text-xs font-semibold text-[#1C3141] mb-2">Name*</label>
        <div className="relative border border-[#e0e0e0] rounded-lg p-3 flex items-center transition-colors focus-within:border-[#1C3141]">
          <input
            type="text"
            className="border-none bg-transparent outline-none w-full text-[15px] text-[#1C3141] font-semibold placeholder:font-normal"
            placeholder="Enter your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4 relative">
        <label className="block text-xs font-semibold text-[#1C3141] mb-2">Email</label>
        <div className="relative border border-[#e0e0e0] rounded-lg p-3 flex items-center transition-colors focus-within:border-[#1C3141]">
          <input
            type="email"
            className="border-none bg-transparent outline-none w-full text-[15px] text-[#1C3141] font-semibold placeholder:font-normal"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6 relative">
        <label className="block text-xs font-semibold text-[#1C3141] mb-2">Your qualification*</label>
        <div className="relative border border-[#e0e0e0] rounded-lg p-3 flex items-center transition-colors focus-within:border-[#1C3141] cursor-pointer">
          <input
            type="text"
            className="border-none bg-transparent outline-none w-full text-[15px] text-[#1C3141] font-semibold cursor-pointer placeholder:font-normal"
            placeholder="Select qualification"
            readOnly
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bdc3c7]">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
          </div>
        </div>
      </div>

      <button 
        className="w-full bg-[#1C3141] text-white py-3.5 rounded-lg font-semibold text-base cursor-pointer hover:bg-[#162633] active:scale-[0.98] transition-all mt-4"
        onClick={onContinue}
      >
        Get Started
      </button>
    </div>
  );
};

export default DetailsStep;
