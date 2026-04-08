import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify OTP | NexLearn',
  description: 'Verify your phone number with the OTP sent to your mobile device.',
};

export default function OtpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
