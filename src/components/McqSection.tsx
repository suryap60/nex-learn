"use client";

import React, { useState } from "react";
import Image from "next/image";

const McqSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("B");
  const options = [
    { id: "A", text: "Pataliputra" },
    { id: "B", text: "Harappa" },
    { id: "C", text: "Mohenjo-Daro" },
    { id: "D", text: "Lothal" }
  ];

  const questionStatus = [
     { id: 1, status: 'attended' },
     { id: 2, status: 'not-attended' },
     { id: 3, status: 'attended' },
     { id: 4, status: 'attended' },
     { id: 5, status: 'attended' },
     { id: 6, status: 'marked' },
     { id: 7, status: 'answered-marked' },
     { id: 8, status: 'default' },
     { id: 9, status: 'default' },
     { id: 10, status: 'default' },
  ];

  // Fill remaining 90 questions with 'default' status
  for(let i=11; i<=100; i++) {
    questionStatus.push({ id: i, status: 'default' });
  }

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'attended': return 'bg-[#48bb78] text-white border-[#48bb78]';
      case 'not-attended': return 'bg-[#f56565] text-white border-[#f56565]';
      case 'marked': return 'bg-[#805ad5] text-white border-[#805ad5]';
      case 'answered-marked': return 'bg-[#805ad5] text-white border-2 border-[#48bb78]';
      default: return 'bg-white text-[#556677] border-[#e2e8f0]';
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] font-inter">
      {/* Header */}
      <header className="bg-white px-8 py-4 flex items-center justify-center relative shadow-sm border-b border-[#e5edf5]">
        <div className="relative w-48 h-12">
          <Image 
            src="/assets/images/login/logo-2.png" 
            alt="NexLearn Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
        <button className="absolute right-8 top-1/2 -translate-y-1/2 bg-[#2c7a7b] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#285e61]">
          Logout
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
        
        {/* Left Section - Question Area */}
        <div className="flex-[1.8] flex flex-col gap-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-lg font-bold text-[#1a2b3c]">Ancient Indian History MCQ</h2>
            <div className="bg-white px-3 py-1.5 rounded-lg border border-[#e5edf5] text-sm font-bold text-[#556677]">
              01/100
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#e5edf5] p-6 lg:p-8 min-h-[500px] flex flex-col relative">
            <button className="bg-[#2c7a7b] text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 mb-6 self-start">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
               Read Comprehensive Paragraph
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <div className="mb-6">
              <p className="text-[17px] font-bold text-[#1a2b3c] leading-relaxed mb-6">
                1. Identify the site shown in the image below, which is one of the major urban centers of the Indus Valley Civilization.
              </p>
              <div className="relative w-full max-w-[450px] aspect-video rounded-lg overflow-hidden border border-[#e5edf5]">
                 <img src="https://images.unsplash.com/photo-1590075865003-e48277adc55a?auto=format&fit=crop&w=800&q=80" alt="Historical Site" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="mt-auto">
              <span className="text-[13px] text-[#8899aa] font-medium mb-3 block italic">Choose the answer:</span>
              <div className="flex flex-col gap-3">
                {options.map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedOption === opt.id ? 'border-[#1c2d3a] bg-[#fafafa]' : 'border-[#eef2f6] hover:border-[#cbd5e0]'}`}
                  >
                    <span className="text-base font-bold text-[#1a2b3c]">{opt.id}. {opt.text}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === opt.id ? 'border-[#1c2d3a]' : 'border-[#cbd5e0]'}`}>
                       {selectedOption === opt.id && <div className="w-2.5 h-2.5 bg-[#1c2d3a] rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question Actions */}
          <div className="flex gap-4 items-center">
             <button className="flex-1 bg-[#805ad5] text-white py-4 rounded-lg font-bold text-base hover:bg-[#6b46c1] transition-all active:scale-[0.98]">
               Mark for review
             </button>
             <button className="flex-1 bg-[#d1d5db] text-[#556677] py-4 rounded-lg font-bold text-base cursor-not-allowed">
               Pervious
             </button>
             <button className="flex-1 bg-[#1c2d3a] text-white py-4 rounded-lg font-bold text-base hover:bg-[#15232d] transition-all active:scale-[0.98]">
               Next
             </button>
          </div>
        </div>

        {/* Right Section - Status Panel */}
        <div className="flex-1 flex flex-col gap-6">
           <div className="flex justify-between items-end">
              <h3 className="text-sm font-bold text-[#1a2b3c]">Question No. Sheet:</h3>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[11px] font-bold text-[#556677] uppercase tracking-wider">Remaining Time:</span>
                 <div className="bg-[#1c2d3a] text-white px-3 py-1.5 rounded-md flex items-center gap-2 font-bold text-base shadow-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    87:13
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-[#e5edf5] p-5">
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
                 {questionStatus.map((q) => (
                    <div 
                      key={q.id}
                      className={`aspect-square flex items-center justify-center rounded-lg border text-sm font-bold cursor-pointer transition-all hover:scale-105 ${getStatusClass(q.status)}`}
                    >
                      {q.id}
                    </div>
                 ))}
              </div>

              {/* Legend */}
              <div className="mt-8 grid grid-cols-2 gap-y-3 gap-x-4">
                 {[
                   { label: 'Attended', color: '#48bb78', border: '#48bb78' },
                   { label: 'Not Attended', color: '#f56565', border: '#f56565' },
                   { label: 'Marked For Review', color: '#805ad5', border: '#805ad5' },
                   { label: 'Answered and Marked For Review', color: '#805ad5', border: '#48bb78' }
                 ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                       <div className={`w-4 h-4 rounded-sm border-2`} style={{ backgroundColor: item.color, borderColor: item.border }}></div>
                       <span className="text-[11px] font-bold text-[#556677]">{item.label}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default McqSection;
