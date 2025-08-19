import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalStars from '@/components/3d/GlobalStars';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kushagra Sharma | AI & Backend Developer',
  description: 'The professional portfolio of Kushagra Sharma, showcasing projects in AI, Machine Learning, and Backend Development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // FIX: Changed bg-gray-950 to bg-transparent to allow the GlobalStars component to be visible.
    // The html element's solid background was covering the fixed canvas behind it.
    <html lang="en" className="bg-transparent" suppressHydrationWarning>
      <body className={`${inter.className} text-gray-100 flex flex-col min-h-screen bg-transparent`}>
        <GlobalStars />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}