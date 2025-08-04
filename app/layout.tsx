import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalStars from '@/components/3d/GlobalStars';

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
    // FIX: Added suppressHydrationWarning to the html tag.
    // This tells React to ignore minor mismatches caused by browser extensions.
    <html lang="en" className="bg-gray-950" suppressHydrationWarning>
      <body className={`${inter.className} text-gray-100 flex flex-col min-h-screen bg-transparent`}>
        <GlobalStars />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}