import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam Instructions | NexLearn',
  description: 'Read the exam instructions carefully before starting your MCQ test.',
};

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
