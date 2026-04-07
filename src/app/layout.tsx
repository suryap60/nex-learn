import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NexLearn',
  description: 'Recreating Figma designs with pixel perfection and high performance.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Machine Test',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}