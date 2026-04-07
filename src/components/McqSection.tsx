"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "./ui/Button";

const McqSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("B");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

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
    <div className="min-h-screen bg-[#f0f9ff] font-inter relative">
      {/* Dimmed Background Overlay */}
      {(isModalOpen || isSubmitModalOpen) && (
        <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={() => {
          setIsModalOpen(false);
          setIsSubmitModalOpen(false);
        }}></div>
      )}

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
        <Button 
          variant="teal" 
          size="sm" 
          className="absolute right-8 top-1/2 -translate-y-1/2"
        >
          Logout
        </Button>
      </header>

      {/* Main Container */}
      <main className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
        
        {/* Left Section - Question Area */}
        <div className="flex-[1.8] flex flex-col gap-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-lg font-bold text-[#1a2b3c] font-poppins">Ancient Indian History MCQ</h2>
            <div className="bg-white px-3 py-1.5 rounded-lg border border-[#e5edf5] text-sm font-bold text-[#556677]">
              {currentQuestion.toString().padStart(2, '0')}/100
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#e5edf5] p-6 lg:p-8 min-h-[500px] flex flex-col relative">
            <Button 
              variant="teal" 
              size="sm" 
              className="mb-6 self-start text-[13px]"
              onClick={() => setIsModalOpen(true)}
            >
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
               Read Comprehensive Paragraph
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </Button>

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
             <Button 
               variant="purple" 
               fullWidth
               className="py-4"
             >
               Mark for review
             </Button>
             <Button 
               variant="soft" 
               fullWidth
               className="py-4"
               disabled={currentQuestion === 1}
               onClick={() => setCurrentQuestion(prev => prev - 1)}
             >
               Previous
             </Button>
             <Button 
               variant="primary" 
               fullWidth
               className="py-4"
               onClick={() => {
                 if (currentQuestion < 100) {
                    setCurrentQuestion(prev => prev + 1);
                 } else {
                    setIsSubmitModalOpen(true);
                 }
               }}
             >
               {currentQuestion === 100 ? "Submit" : "Next"}
             </Button>
          </div>
        </div>

        {/* Right Section - Status Panel */}
        <div className="flex-1 flex flex-col gap-6">
           <div className="flex justify-between items-end">
              <h3 className="text-sm font-bold text-[#1a2b3c]">Question Numbers:</h3>
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
                      onClick={() => setCurrentQuestion(q.id)}
                      className={`aspect-square flex items-center justify-center rounded-lg border text-sm font-bold cursor-pointer transition-all hover:scale-105 ${currentQuestion === q.id ? 'ring-2 ring-[#1c2d3a] ring-offset-2' : ''} ${getStatusClass(q.status)}`}
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

      {/* Comprehensive Paragraph Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[850px] max-h-[90vh] overflow-hidden flex flex-col animate-scale-in shadow-2xl">
            <div className="p-8 border-b border-[#e5edf5]">
               <h2 className="text-xl font-bold text-[#1a2b3c] font-poppins">Comprehensive Paragraph</h2>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar text-[15px] text-[#2c3e50] leading-[1.8] space-y-6 font-medium">
              <p>Ancient Indian history spans several millennia and offers a profound glimpse into the origins of one of the world&apos;s oldest and most diverse civilizations. It begins with the Indus Valley Civilization (c. 2500–1500 BCE), which is renowned for its advanced urban planning, architecture, and water management systems.</p>
              <p>It was during this time that the varna system (social hierarchy) began to develop, which later evolved into the caste system.</p>
              <p>The 6th century BCE marked a turning point with the emergence of new religious and philosophical movements. Buddhism and Jainism, led by Gautama Buddha and Mahavira, challenged the existing Vedic orthodoxy.</p>
              <p>The Maurya Empire (c. 322–185 BCE), founded by Chandragupta Maurya, became the first large empire to unify much of the Indian subcontinent.</p>
            </div>

            <div className="p-6 bg-[#fafafa] border-t border-[#e5edf5] flex justify-end">
              <Button variant="primary" size="lg" className="px-12" onClick={() => setIsModalOpen(false)}>Minimize</Button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Test Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[420px] overflow-hidden flex flex-col animate-scale-in shadow-2xl relative">
            <button 
              className="absolute right-5 top-5 text-[#8899aa] hover:text-[#1a2b3c] transition-colors"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="p-8 pb-4">
               <h2 className="text-[17px] font-bold text-[#1a2b3c] font-poppins text-center mb-10">Are you sure you want to submit the test?</h2>
            </div>
            
            <div className="px-10 pb-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1c2d3a] flex items-center justify-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <span className="text-[14px] font-bold text-[#556677]">Remaining Time:</span>
                </div>
                <span className="text-[14px] font-bold text-[#1a2b3c]">87:13</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f39c12] flex items-center justify-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                  </div>
                  <span className="text-[14px] font-bold text-[#556677]">Total Questions:</span>
                </div>
                <span className="text-[14px] font-bold text-[#1a2b3c]">100</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2ecc71] flex items-center justify-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="text-[14px] font-bold text-[#556677]">Questions Answered:</span>
                </div>
                <span className="text-[14px] font-bold text-[#1a2b3c]">003</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#805ad5] flex items-center justify-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <span className="text-[14px] font-bold text-[#556677]">Marked for review:</span>
                </div>
                <span className="text-[14px] font-bold text-[#1a2b3c]">001</span>
              </div>

              <div className="pt-4">
                <Button 
                  variant="primary" 
                  fullWidth 
                  className="py-4 shadow-lg active:scale-95"
                  onClick={() => alert("Test Submitted!")}
                >
                  Submit Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default McqSection;
