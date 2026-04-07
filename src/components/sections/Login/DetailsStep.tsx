"use client";

import React, { useRef, useState } from "react";
import Button from "../../ui/Button";

import { PiCameraPlusLight } from "react-icons/pi";

interface DetailsStepProps {
  onContinue: (data?: any) => void;
  isFilled?: boolean;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ onContinue, isFilled = false }) => {
  const [profileImage, setProfileImage] = useState<string | null>(
    isFilled ? "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80" : null
  );
  const [name, setName] = useState(isFilled ? "Nevin Mathew" : "");
  const [email, setEmail] = useState(isFilled ? "nevinmathew@gmail.com" : "");
  const [qualification, setQualification] = useState(isFilled ? "B.Tech/BE" : "");
  const [errors, setErrors] = useState<{name?: string; email?: string; qualification?: string}>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const qualificationsList = [
    "High School", "Diploma", "B.Tech/BE", "BCA", "MCA", "B.Sc", "M.Sc", "MBA", "Other"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (re) => {
        setProfileImage(re.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleNext = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!qualification) {
      newErrors.qualification = "Qualification is required";
    }

    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onContinue({ name, email, profileImage, qualification });
  };

  return (
    <div className="animate-fade-up flex flex-col h-full gap-y-4 pb-2">
      <h2 className="text-[26px] font-bold text-[#1a2b3c] leading-tight mb-2">Add Your Details</h2>

      <div 
        className={`w-[100px] h-[100px] rounded-xl flex flex-col items-center justify-center cursor-pointer mx-auto relative transition-all shrink-0 ${profileImage ? 'border-none' : 'border-2 border-dashed border-[#dddddd] bg-[#fafafa] hover:border-[#1a2b3c]'}`}
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
            <PiCameraPlusLight size={26} className="text-[#1a2b3c]" />
            <span className="text-[9px] text-[#556677] text-center font-bold px-2 uppercase tracking-tight">Add Your Profile Picture</span>
          </div>
        )}
      </div>

      <div className="relative group">
        <label className={`absolute -top-2.5 left-4 bg-white px-2 text-[13px] font-medium z-10 ${errors.name ? 'text-[#e74c3c]' : 'text-[#778899] group-focus-within:text-[#2c3e50]'}`}>
          Name*
        </label>
        <div className={`relative border rounded-lg p-3 flex items-center transition-all ${errors.name ? 'border-[#e74c3c]' : 'border-[#dddddd] focus-within:border-[#2c3e50] focus-within:ring-1 focus-within:ring-[#2c3e50]'}`}>
          <input
            type="text"
            className="border-none bg-transparent outline-none w-full text-base text-[#1a2b3c] font-bold placeholder:font-normal placeholder:text-[#bbbbbb]"
            placeholder="Enter your Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({...errors, name: undefined});
            }}
          />
        </div>
        {errors.name && <span className="text-xs text-[#e74c3c] mt-1 ml-2 block">{errors.name}</span>}
      </div>

      <div className="relative group">
        <label className={`absolute -top-2.5 left-4 bg-white px-2 text-[13px] font-medium z-10 ${errors.email ? 'text-[#e74c3c]' : 'text-[#778899] group-focus-within:text-[#2c3e50]'}`}>
          Email
        </label>
        <div className={`relative border rounded-lg p-3 flex items-center transition-all ${errors.email ? 'border-[#e74c3c]' : 'border-[#dddddd] focus-within:border-[#2c3e50] focus-within:ring-1 focus-within:ring-[#2c3e50]'}`}>
          <input
            type="email"
            className="border-none bg-transparent outline-none w-full text-base text-[#1a2b3c] font-bold placeholder:font-normal placeholder:text-[#bbbbbb]"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({...errors, email: undefined});
            }}
          />
        </div>
        {errors.email && <span className="text-xs text-[#e74c3c] mt-1 ml-2 block">{errors.email}</span>}
      </div>

      <div className="relative group">
        <label className={`absolute -top-2.5 left-4 bg-white px-2 text-[13px] font-medium z-10 ${errors.qualification ? 'text-[#e74c3c]' : 'text-[#778899] group-focus-within:text-[#2c3e50]'}`}>
          Your qualification*
        </label>
        <div className={`relative border rounded-lg p-3 flex items-center transition-all ${errors.qualification ? 'border-[#e74c3c]' : 'border-[#dddddd] focus-within:border-[#2c3e50] focus-within:ring-1 focus-within:ring-[#2c3e50]'}`}>
          <select
            className={`border-none bg-transparent outline-none w-full text-base font-bold cursor-pointer appearance-none ${qualification ? 'text-[#1a2b3c]' : 'text-[#bbbbbb] font-normal'}`}
            value={qualification}
            onChange={(e) => {
              setQualification(e.target.value);
              if (errors.qualification) setErrors({...errors, qualification: undefined});
            }}
          >
            <option value="" disabled>Select qualification</option>
            {qualificationsList.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a2b3c] pointer-events-none">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
          </div>
        </div>
        {errors.qualification && <span className="text-xs text-[#e74c3c] mt-1 ml-2 block">{errors.qualification}</span>}
      </div>

      <Button 
        variant="primary"
        size="xl"
        fullWidth
        className="mt-4 shrink-0"
        onClick={handleNext}
      >
        Get Started
      </Button>
    </div>
  );
};

export default DetailsStep;
