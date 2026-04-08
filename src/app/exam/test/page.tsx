"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/src/components/ui/Button";
import LogoutButton from "@/src/components/sections/LogoutButton";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { setAnswer, toggleMarkForReview, setVisited, setResultData } from "@/src/features/exam/slice";
import { submitAnswers } from "@/src/features/exam/api";
import { toast } from "react-toastify";

const McqSection: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { questions, config, answers, markedForReview, visited } = useSelector((state: RootState) => state.exam);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [timeLeft, setTimeLeft] = useState(config?.total_time ? config.total_time * 60 : 5400);

  const handleSubmitTest = async (autoSubmit = false) => {
    try {
      setIsSubmitting(true);
      const res = await submitAnswers(answers);
      if (res.data?.success || res.status === 200 || res.status === 201) {
        dispatch(setResultData(res.data));
        toast.success(autoSubmit ? "Time's up! Test submitted." : "Test submitted successfully!");
        router.push('/exam/result');
      } else {
        toast.error("Failed to submit test.");
        setIsSubmitting(false);
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.response?.data?.message || "Failed to submit test to server.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!questions || questions.length === 0) {
      router.push("/exam");
    }
  }, [questions, router]);

  useEffect(() => {
    if (!questions || questions.length === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [questions]);

  if (!questions || questions.length === 0 || !config) return null;

  const currentQ = questions[currentQuestionIndex];
  const qId = currentQ.id;

  useEffect(() => {
    if (qId) {
      dispatch(setVisited(qId));
    }
  }, [qId, dispatch]);

  const getStatusClass = (questionId: string | number) => {
    const answer = answers.find(a => a.question_id === questionId);
    const isMarked = markedForReview.includes(questionId);
    const isAnswered = answer && answer.selected_option_id !== null;
    const isVisited = visited.includes(questionId);

    if (isAnswered && isMarked) return 'bg-[#4CAF50] text-white border-[3px] border-[#800080]';
    if (isMarked) return 'bg-[#800080] text-white border-transparent';
    if (isAnswered) return 'bg-[#4CAF50] text-white border-transparent';
    if (isVisited) return 'bg-[#EE3535] text-white border-transparent';
    
    return 'bg-white text-[#556677] border-[#e2e8f0]';
  };

  const handleOptionSelect = (optId: string | number) => {
    dispatch(setAnswer({ question_id: qId, selected_option_id: optId }));
  };

  const currentAnswer = answers.find(a => a.question_id === qId)?.selected_option_id || null;
  const totalAnswered = answers.filter(a => a.selected_option_id !== null).length;

  const timeStr = `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen md:h-[100dvh] flex flex-col bg-[#F4FCFF] font-inter relative overflow-y-auto md:overflow-hidden custom-scrollbar">
      {(isModalOpen || isSubmitModalOpen) && (
        <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={() => {
          if (!isSubmitting) {
            setIsModalOpen(false);
            setIsSubmitModalOpen(false);
          }
        }}></div>
      )}

      {/* Header */}
      <header className="bg-white px-8 py-4 flex items-center justify-center relative shadow-sm border-b border-[#e5edf5] shrink-0 h-[80px]">
        <div className="relative w-48 h-12">
          <Image src="/assets/images/login/logo-2.png" alt="Logo" fill sizes="192px" className="object-contain" priority />
        </div>
        <LogoutButton className="absolute right-8 top-1/2 -translate-y-1/2" />
      </header>

      {/* Main */}
      <main className="max-w-[1450px] w-full mx-auto p-4 md:p-5 lg:p-6 flex flex-col md:flex-row gap-6 md:flex-1 md:min-h-0">
        
        {/* Left Section */}
        <div className="flex-[1.65] flex flex-col md:h-full">
          <div className="flex justify-between items-center px-1 mb-3 shrink-0 h-[36px]">
            <h2 className="text-lg font-bold text-[#1a2b3c] font-poppins">Subject MCQ Test</h2>
            <div className="bg-white px-3 py-1.5 rounded border border-[#e5edf5] text-sm font-bold text-[#556677]">
              {(currentQuestionIndex + 1).toString().padStart(2, '0')}/{config.questions_count}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#e5edf5] p-5 lg:p-7 flex flex-col relative md:flex-1 md:min-h-[0] md:overflow-y-auto custom-scrollbar">
            {config.instruction && (
              <Button variant="teal" size="sm" className="mb-5 self-start shrink-0 text-[13px] hover:bg-[#1a8585]" onClick={() => setIsModalOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                Read Comprehensive Paragraph
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </Button>
            )}

            <p className="text-[15px] lg:text-[16px] font-bold text-[#1a2b3c] leading-relaxed mb-5 shrink-0">
              {currentQuestionIndex + 1}. {currentQ.text}
            </p>
            {currentQ.image && (
              <div className="relative w-full max-w-[550px] aspect-[16/9] rounded-lg overflow-hidden border border-[#e5edf5] shrink-0 mt-auto">
                <img src={currentQ.image} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="mt-3 shrink-0">
            <span className="text-[12px] text-[#8899aa] font-medium mb-2 pl-1 block">Choose the answer:</span>
            <div className="flex flex-col gap-2.5">
              {currentQ.options.map((opt: any, idx: number) => (
                <div
                  key={opt.id || `opt-${idx}`}
                  onClick={() => handleOptionSelect(opt.id)}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-xl border bg-white cursor-pointer transition-all ${currentAnswer === opt.id ? 'border-[#1c2d3a]' : 'border-[#e2e8f0] hover:border-[#cbd5e0]'}`}
                >
                  <span className="text-[14px] lg:text-[15px] font-bold text-[#1a2b3c]">{opt.id}. {opt.text}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${currentAnswer === opt.id ? 'border-[#1c2d3a]' : 'border-[#cbd5e0]'}`}>
                    {currentAnswer === opt.id && <div className="w-2.5 h-2.5 bg-[#1c2d3a] rounded-full"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mt-5 shrink-0">
            <Button variant="purple" fullWidth onClick={() => dispatch(toggleMarkForReview(qId))} className="py-3.5 lg:py-4 bg-[#800080] hover:bg-[#6a006a] border-none rounded-xl text-[15px]">
              {markedForReview.includes(qId) ? "Unmark Review" : "Mark for review"}
            </Button>
            <Button variant="soft" fullWidth className="py-3.5 lg:py-4 bg-[#d9dde1] text-[#1c2d3a] hover:bg-[#c2c8ce] border-none rounded-xl text-[15px]" disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex(prev => prev - 1)}>
              Previous
            </Button>
            <Button variant="primary" fullWidth className="py-3.5 lg:py-4 bg-[#1c2d3a] border-none rounded-xl text-[15px]" onClick={() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
              } else {
                setIsSubmitModalOpen(true);
              }
            }}>
              {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col md:h-full mt-4 md:mt-0">
          <div className="flex justify-between items-center h-[36px] px-1 mb-3 shrink-0">
            <h3 className="text-[14px] lg:text-[15px] font-bold text-[#1a2b3c]">Question No. Sheet:</h3>
            <div className="flex items-center gap-2 lg:gap-3">
              <span className="text-[12px] lg:text-[13px] font-medium text-[#556677]">Remaining Time:</span>
              <div className="bg-[#1c2d3a] text-white px-3 py-1.5 rounded flex items-center gap-1.5 font-bold text-[13px] lg:text-[14px] shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                {timeStr}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#e5edf5] p-5 lg:p-6 flex flex-col md:flex-1 md:min-h-[0]">
            <div className="grid grid-cols-10 gap-x-1 sm:gap-x-2 gap-y-3 md:overflow-y-auto p-1 md:custom-scrollbar md:flex-1 pb-2">
              {questions.map((q: any, i: number) => (
                <div
                  key={q.id || `q-${i}`}
                  onClick={() => setCurrentQuestionIndex(i)}
                  className={`aspect-square w-full min-w-[30px] flex items-center justify-center rounded border text-sm font-medium cursor-pointer transition-all hover:scale-105 ${currentQuestionIndex === i ? 'font-bold ring-2 ring-offset-1 ring-[#1c2d3a]' : ''} ${getStatusClass(q.id)}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-row flex-wrap md:flex-nowrap items-center justify-between gap-y-3 w-full shrink-0">
              {[
                { label: 'Attended', color: '#4CAF50', border: '#4CAF50' },
                { label: 'Not Attended', color: '#EE3535', border: '#EE3535' }, // We don't track visited explicitly yet so this might not show.
                { label: 'Marked For Review', color: '#800080', border: '#800080' },
                { label: 'Answered and Marked For Review', color: '#4CAF50', border: '#800080' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-[14px] h-[14px] rounded-[3px] shrink-0`} style={{ backgroundColor: item.color, border: `2px solid ${item.border}` }}></div>
                  <span className="text-[10px] lg:text-[11px] font-bold text-[#556677] leading-tight flex-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Paragraph Modal */}
      {isModalOpen && config.instruction && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[850px] max-h-[90vh] overflow-hidden flex flex-col animate-scale-in shadow-2xl">
            <div className="p-8 border-b border-[#e5edf5]">
              <h2 className="text-xl font-bold text-[#1a2b3c] font-poppins">Comprehensive Paragraph</h2>
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar text-[15px] text-[#2c3e50] leading-[1.8] font-medium instruction-content">
              <div dangerouslySetInnerHTML={{ __html: config.instruction }} />
              <style jsx>{`
                .instruction-content :global(ol) {
                  list-style-type: decimal;
                  padding-left: 1.5rem;
                  margin-top: 1rem;
                  margin-bottom: 1rem;
                }
                .instruction-content :global(li) {
                  margin-bottom: 0.75rem;
                  padding-left: 0.5rem;
                }
              `}</style>
            </div>
            <div className="p-6 bg-[#fafafa] border-t border-[#e5edf5] flex justify-end">
              <Button variant="primary" size="lg" className="px-12" onClick={() => setIsModalOpen(false)}>Minimize</Button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[420px] overflow-hidden flex flex-col animate-scale-in shadow-2xl relative z-50">
            {!isSubmitting && (
              <button className="absolute right-5 top-5 text-[#8899aa] hover:text-[#1a2b3c] transition-colors" onClick={() => setIsSubmitModalOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}

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
                <span className="text-[14px] font-bold text-[#1a2b3c]">{timeStr}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f39c12] flex items-center justify-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                  </div>
                  <span className="text-[14px] font-bold text-[#556677]">Total Questions:</span>
                </div>
                <span className="text-[14px] font-bold text-[#1a2b3c]">{config.questions_count}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2ecc71] flex items-center justify-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="text-[14px] font-bold text-[#556677]">Questions Answered:</span>
                </div>
                <span className="text-[14px] font-bold text-[#1a2b3c]">{totalAnswered.toString().padStart(3, '0')}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#805ad5] flex items-center justify-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <span className="text-[14px] font-bold text-[#556677]">Marked for review:</span>
                </div>
                <span className="text-[14px] font-bold text-[#1a2b3c]">{markedForReview.length.toString().padStart(3, '0')}</span>
              </div>

              <div className="pt-4">
                <Button variant="primary" fullWidth className="py-4 shadow-lg active:scale-95 flex items-center justify-center" onClick={() => handleSubmitTest(false)} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : "Submit Test"}
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
