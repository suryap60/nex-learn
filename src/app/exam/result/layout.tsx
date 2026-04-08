import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam Result | NexLearn',
  description: 'View your performance and detailed score breakdown for your recent exam.',
};

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
