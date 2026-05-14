import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const onest = Onest({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-onest',
});

export const metadata: Metadata = {
  title: 'Стоматологическая поликлиника №12',
  description: 'ГАУЗ СО «Стоматологическая поликлиника №12» — запись на приём, график работы, специалисты',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${onest.variable} h-full bg-[#f5f5f5]`}>
      <body className="min-h-full flex flex-col bg-[#f5f5f5] text-[#1f1e22] antialiased">
        <Header />
        <main className="flex-1 max-w-[1200px] w-full mx-auto px-5 py-8 bg-[#f5f5f5]">
          {children}
        </main>
      </body>
    </html>
  );
}
