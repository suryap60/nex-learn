import { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/src/store/StoreProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'NexLearn | Advanced MCQ Exam Platform',
  description: 'Experience a premium, futuristic learning and examination platform with NexLearn. Real-time MCQ tests, detailed analytics, and seamless authentication.',
  keywords: ['exam platform', 'MCQ test', 'online examination', 'learning management system', 'NexLearn'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StoreProvider>
          {children}
        </StoreProvider>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </body>
    </html>
  );
}