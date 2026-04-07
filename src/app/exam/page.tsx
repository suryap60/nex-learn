"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/src/components/ui/Button";
import LogoutButton from "@/src/components/sections/LogoutButton";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "@/src/features/exam/api";
import { setExamData } from "@/src/features/exam/slice";
import { toast } from "react-toastify";
import { RootState } from "@/src/store/store";

const InstructionSection: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const config = useSelector((state: RootState) => state.exam.config);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await getQuestions();
        if (response.data) {
          dispatch(setExamData(response.data));
        }
      } catch (error: any) {
        toast.error("Failed to fetch exam instructions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [dispatch]);

  const totalTimeStr = config ? `${Math.floor(config.total_time / 60)}:${(config.total_time % 60).toString().padStart(2, '0')}` : "00:00";

  return (
    <div className="min-h-screen bg-[#F4FCFF] font-inter flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 md:px-8 py-4 flex items-center justify-center relative shadow-sm h-[80px] shrink-0">
        <div className="relative w-40 md:w-48 h-10 md:h-12">
          <Image
            src="/assets/images/login/logo-2.png"
            alt="NexLearn Logo"
            fill
            sizes="192px"
            className="object-contain"
            priority
          />
        </div>
        <LogoutButton className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2" />
      </header>

      {/* Content */}
      <main className="max-w-[1000px] w-full mx-auto py-8 md:pt-10 md:pb-20 px-4 md:px-8 flex flex-col items-center flex-1">
        {loading ? (
          <div className="flex-1 w-full flex flex-col items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-[#177A9C]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-[#556677] font-medium">Loading exam details...</p>
          </div>
        ) : !config ? (
          <div className="text-center mt-32 text-[#e74c3c] font-bold">Failed to load exam data.</div>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a2b3c] mb-10 text-center font-poppins">
              Ancient Indian History MCQ
            </h1>

            {/* Stats Bar */}
            <div className="w-full max-w-[800px] bg-[#1c2d3a] rounded-xl p-5 sm:p-8 mb-8 sm:mb-12 flex justify-between items-center text-white shadow-xl">
              <div className="flex-1 flex flex-col items-center border-r border-[#3a4d5c] px-1 sm:px-0">
                <span className="text-[10px] sm:text-sm font-medium mb-1 sm:mb-2 opacity-90 uppercase tracking-wide text-center">Total MCQ&apos;s:</span>
                <span className="text-2xl sm:text-4xl font-bold">{config.questions_count}</span>
              </div>
              <div className="flex-1 flex flex-col items-center border-r border-[#3a4d5c] px-1 sm:px-0">
                <span className="text-[10px] sm:text-sm font-medium mb-1 sm:mb-2 opacity-90 uppercase tracking-wide text-center">Total marks:</span>
                <span className="text-2xl sm:text-4xl font-bold">{config.total_marks}</span>
              </div>
              <div className="flex-1 flex flex-col items-center px-1 sm:px-0">
                <span className="text-[10px] sm:text-sm font-medium mb-1 sm:mb-2 opacity-90 uppercase tracking-wide text-center">Total time:</span>
                <span className="text-2xl sm:text-4xl font-bold">{totalTimeStr}</span>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="w-full max-w-[800px] text-left">
              <h2 className="text-lg font-bold text-[#1a2b3c] mb-4">Instructions:</h2>
              <div className="space-y-4 text-[#556677] text-[15px] font-medium leading-relaxed bg-white p-6 rounded-xl border border-[#e5edf5]">
                <p>{config.instruction || "No specific instructions provided for this exam. Maintain honesty."}</p>
                
                <h3 className="font-bold text-[#1a2b3c] text-[16px] mt-6 mb-2">Standard Exam Rules:</h3>
                <ol className="list-decimal list-outside space-y-3.5 pl-5">
                  <li>You have {config.total_time} minutes to complete the test.</li>
                  <li>Test consists of {config.questions_count} multiple-choice q&apos;s.</li>
                  <li>Each incorrect answer will incur a negative mark of -1/4.</li>
                  <li>Do not use any external resources such as dictionaries, websites, or assistance.</li>
                  <li>Your test results will be displayed immediately after submission.</li>
                </ol>
              </div>
            </div>

            {/* Footer Button */}
            <div className="mt-16 w-full flex justify-center">
              <Button
                variant="primary"
                size="xl"
                className="px-20"
                onClick={() => router.push('/exam/test')}
              >
                Start Test
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default InstructionSection;
