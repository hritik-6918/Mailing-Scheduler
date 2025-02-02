import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Email Campaign Manager',
  description: 'Schedule and manage your email campaigns',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b">
          <div className="container mx-auto px-4 py-3">
            <Link 
              href="/mailings" 
              className="flex items-center gap-2 text-lg font-semibold hover:text-primary/90 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Email Campaigns</span>
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}