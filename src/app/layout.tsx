import { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/src/store/StoreProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'NexLearn',
  description: 'Recreating Figma designs with pixel perfection and high performance.',
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