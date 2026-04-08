import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | NexLearn',
  description: 'Login to your NexLearn account using your phone number.',
};

export default function PhoneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
