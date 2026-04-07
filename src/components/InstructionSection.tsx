"use client";

import React from "react";
import Image from "next/image";

const InstructionSection: React.FC = () => {
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

      {/* Content */}
      <main className="max-w-[1000px] mx-auto pt-10 pb-20 px-8 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1a2b3c] mb-10 text-center">
          Ancient Indian History MCQ
        </h1>

        {/* Stats Bar */}
        <div className="w-full max-w-[800px] bg-[#1c2d3a] rounded-xl p-8 mb-12 flex justify-between items-center text-white shadow-xl">
           <div className="flex-1 flex flex-col items-center border-r border-[#3a4d5c]">
              <span className="text-sm font-medium mb-2 opacity-90 uppercase tracking-wide">Total MCQ&apos;s:</span>
              <span className="text-4xl font-bold">100</span>
           </div>
           <div className="flex-1 flex flex-col items-center border-r border-[#3a4d5c]">
              <span className="text-sm font-medium mb-2 opacity-90 uppercase tracking-wide">Total marks:</span>
              <span className="text-4xl font-bold">100</span>
           </div>
           <div className="flex-1 flex flex-col items-center">
              <span className="text-sm font-medium mb-2 opacity-90 uppercase tracking-wide">Total time:</span>
              <span className="text-4xl font-bold">90:00</span>
           </div>
        </div>

        {/* Instructions Section */}
        <div className="w-full max-w-[800px] text-left">
           <h2 className="text-lg font-bold text-[#1a2b3c] mb-4">Instructions:</h2>
           <ol className="list-decimal list-outside space-y-3.5 text-[#556677] font-medium text-[15px] pl-5">
              <li>You have 100 minutes to complete the test.</li>
              <li>Test consists of 100 multiple-choice q&apos;s.</li>
              <li>You are allowed 2 retest attempts if you do not pass on the first try.</li>
              <li>Each incorrect answer will incur a negative mark of -1/4.</li>
              <li>Ensure you are in a quiet environment and have a stable internet connection.</li>
              <li>Keep an eye on the timer, and try to answer all questions within the given time.</li>
              <li>Do not use any external resources such as dictionaries, websites, or assistance.</li>
              <li>Complete the test honestly to accurately assess your proficiency level.</li>
              <li>Check answers before submitting.</li>
              <li>Your test results will be displayed immediately after submission, indicating whether you have passed or need to retake the test.</li>
           </ol>
        </div>

        {/* Footer Button */}
        <div className="mt-16 w-full flex justify-center">
           <button className="bg-[#1c2d3a] text-white px-16 py-3.5 rounded-lg font-bold text-lg hover:bg-[#15232d] shadow-lg transition-all active:scale-[0.98]">
              Start Test
           </button>
        </div>
      </main>
    </div>
  );
};

export default InstructionSection;
