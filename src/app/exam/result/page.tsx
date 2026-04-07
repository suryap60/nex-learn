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
    { label: "Total Questions:", value: config?.questions_count?.toString().padStart(3, '0') || "000", color: "#DDA428", iconProps: { src: "/assets/images/result/icon-1.png" } },
    { label: "Correct Answers:", value: result.correct?.toString().padStart(3, '0') || "000", color: "#4CAF50", iconProps: { src: "/assets/images/result/icon-2.png" } },
    { label: "Incorrect Answers:", value: result.wrong?.toString().padStart(3, '0') || "000", color: "#EE3535", iconProps: { src: "/assets/images/result/icon-3.png" } },
    { label: "Not Attended Questions:", value: result.not_attended?.toString().padStart(3, '0') || "000", color: "#5C5C5C", noImage: true }
  ];

  return (
    <div className="min-h-screen bg-[#F4FCFF] font-inter">
      {/* Header */}
      <header className="bg-white px-8 py-4 flex items-center justify-center relative shadow-sm">
        <div className="relative w-48 h-12">
          <Image src="/assets/images/login/logo-2.png" alt="NexLearn Logo" fill sizes="192px" className="object-contain" priority />
        </div>
        <LogoutButton className="absolute right-8 top-1/2 -translate-y-1/2" />
      </header>

      {/* Content Container */}
      <main className="max-w-[1240px] mx-auto pt-[80px] pb-20 px-4 md:px-8 flex flex-col items-center">
        
        {/* Results Box */}
        <div 
          className="w-full max-w-[900px] rounded-3xl p-1 pb-1 shadow-2xl relative flex flex-col"
          style={{ background: 'linear-gradient(307.95deg, #1C3141 2.54%, #177A9C 79.7%)' }}
        >
          {/* Top Pass/Fail Status Banner Placeholder if needed */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-12 py-5 text-center w-[85%] max-w-[600px] border border-[#e5edf5]">
            <h2 className="text-[#1a2b3c] text-xl font-bold font-poppins">Total Score</h2>
            <div className="text-4xl font-black text-[#177A9C] mt-1">{result.score || 0}</div>
          </div>

          <div className="bg-white rounded-[22px] p-5 md:p-10 pt-[70px] mt-[10px] w-full flex-auto flex flex-col">
            <h3 className="text-xl font-bold text-[#1a2b3c] text-center mb-8 font-poppins px-2 md:px-10">
              Exam Submission Successful
            </h3>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-4 md:gap-5 p-4 md:p-5 md:pr-8 rounded-xl bg-white shadow-sm border border-[#e5edf5] hover:border-[#cbd5e0] transition-colors">
                  <div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden"
                    style={{ backgroundColor: stat.color }}
                  >
                    {!stat.noImage && stat.iconProps ? (
                      <Image src={stat.iconProps.src} alt={stat.label} fill className="object-contain p-2.5 md:p-3" />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] md:text-[13px] font-bold text-[#8899aa] uppercase tracking-wide mb-0.5">{stat.label}</span>
                    <span className="text-xl md:text-2xl font-black text-[#1a2b3c] leading-none">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions aligned to bottom */}
            <div className="mt-auto flex flex-col sm:flex-row justify-center gap-3 md:gap-4 border-t border-[#e5edf5] pt-8">
              <Button variant="soft" size="xl" fullWidth className="px-12 bg-[#f4fcff] text-[#1a8585] border border-[#1a8585] hover:bg-[#e0f7f7] w-full sm:w-auto" onClick={() => router.push('/exam')}>
                Retake Exam
              </Button>
              <Button variant="primary" size="xl" fullWidth className="px-12 bg-[#1a2b3c] shadow-lg shadow-[#1a2b3c]/20 w-full sm:w-auto" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultSection;
