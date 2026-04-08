import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Setup Profile | NexLearn',
  description: 'Complete your NexLearn profile to start taking exams.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
