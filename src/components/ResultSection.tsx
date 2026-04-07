"use client";

import React from "react";
import Image from "next/image";

const ResultSection: React.FC = () => {
  const stats = [
    { label: "Total Questions:", value: "100", color: "bg-[#f39c12]", icon: "📁" },
    { label: "Correct Answers:", value: "003", color: "bg-[#2ecc71]", icon: "✅" },
    { label: "Incorrect Answers:", value: "001", color: "bg-[#e74c3c]", icon: "❌" },
    { label: "Not Attended Questions:", value: "096", color: "bg-[#7f8c8d]", icon: "📄" }
  ];

  return (
    <div className="min-h-screen bg-[#f0f9ff] font-inter">
      {/* Header */}
      <header className="bg-white px-8 py-4 flex items-center justify-center relative shadow-sm">
        <div className="relative w-48 h-12">
          <Image 
            src="/assets/images/login/logo-2.png" 
            alt="NexLearn Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
        <button className="absolute right-8 top-1/2 -translate-y-1/2 bg-[#2c7a7b] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#285e61] transition-colors">
          Logout
        </button>
      </header>

      {/* Content Container */}
      <main className="max-w-[1000px] mx-auto pt-16 flex flex-col items-center px-6">
        
        {/* Score Card */}
        <div className="w-full max-w-[500px] bg-gradient-to-b from-[#1c2d3a] to-[#15232d] p-10 rounded-2xl text-center text-white shadow-2xl mb-12">
          <span className="text-lg font-medium opacity-90 block mb-3">Marks Obtained:</span>
          <h1 className="text-6xl font-bold tracking-tight">100 / 100</h1>
        </div>

        {/* Stats List */}
        <div className="w-full max-w-[500px] flex flex-col gap-5 px-4 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`${stat.color} w-10 min-w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg shadow-sm`}>
                  {stat.icon}
                </div>
                <span className="text-lg font-bold text-[#556677]">{stat.label}</span>
              </div>
              <span className="text-xl font-bold text-[#1a2b3c]">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Done Button */}
        <button className="w-full max-w-[500px] bg-[#1c2d3a] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#15232d] shadow-lg transition-all active:scale-[0.98]">
          Done
        </button>
      </main>
    </div>
  );
};

export default ResultSection;
