import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ongoing Test | NexLearn',
  description: 'Your MCQ exam is in progress. Good luck!',
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
