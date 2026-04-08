"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Button from "@/src/components/ui/Button";
import LogoutButton from "@/src/components/sections/LogoutButton";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useRouter } from "next/navigation";

const ResultSection: React.FC = () => {
  const result = useSelector((state: RootState) => state.exam.result);
  const config = useSelector((state: RootState) => state.exam.config);
  const router = useRouter();

  useEffect(() => {
    if (!result) {
      router.replace("/exam");
    }
  }, [result, router]);

  if (!result) return null;

  const stats = [
    { label: "Total Questions:", value: config?.questions_count || 100, color: "#DDA428", icon: <Image src="/assets/images/result/icon-1.png" width={18} height={18} alt="Total" /> },
    { label: "Correct Answers:", value: result.correct?.toString().padStart(3, '0') || "000", color: "#4CAF50", icon: <Image src="/assets/images/result/icon-2.png" width={18} height={18} alt="Correct" /> },
    { label: "Incorrect Answers:", value: result.wrong?.toString().padStart(3, '0') || "000", color: "#EE3535", icon: <Image src="/assets/images/result/icon-3.png" width={18} height={18} alt="Incorrect" /> },
    { label: "Not Attended Questions:", value: result.not_attended?.toString().padStart(3, '0') || "000", color: "#5C5C5C", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="12" x2="16" y2="12"></line></svg> }
  ];

  return (
    <div className="min-h-screen bg-[#F4FCFF] font-inter flex flex-col">
      {/* Header */}
      <header className="bg-white px-8 py-4 flex items-center justify-center relative shadow-sm h-[80px]">
        <div className="relative w-48 h-12">
          <Image src="/assets/images/login/logo-2.png" alt="NexLearn" fill sizes="192px" className="object-contain" priority />
        </div>
        <LogoutButton className="absolute right-8 top-1/2 -translate-y-1/2" />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-[480px] flex flex-col items-center">
          
          {/* Score Card */}
          <div 
            className="w-full rounded-[20px] p-8 pb-10 shadow-lg text-center mb-8"
            style={{ background: 'linear-gradient(135deg, #1C3141 0%, #177A9C 100%)' }}
          >
            <span className="text-white/80 text-[15px] font-medium mb-2 block tracking-wide">Marks Obtained:</span>
            <div className="text-white text-[56px] font-bold leading-tight">
              {result.score || 0} / {config?.total_marks || 100}
            </div>
          </div>

          {/* Stats List */}
          <div className="w-full space-y-4 mb-10 px-2 lg:px-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-[34px] h-[34px] rounded-[6px] flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.icon}
                  </div>
                  <span className="text-[#556677] text-[15px] font-bold">{stat.label}</span>
                </div>
                <span className="text-[#1a2b3c] text-[16px] font-extrabold tracking-wider">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Done Button */}
          <Button 
            variant="primary" 
            size="xl" 
            fullWidth 
            className="bg-[#1c2d3a] hover:bg-[#15232d] shadow-md py-4 rounded-[12px] text-[15px] font-bold uppercase tracking-widest"
            onClick={() => router.push('/exam')}
          >
            Done
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ResultSection;
