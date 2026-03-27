import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://helloam.bot'),
  title: {
    default: 'AM — The AI that does the work',
    template: '%s | AM',
  },
  description: 'AM is your digital coworker. Give it a goal, not a task.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'AM',
    title: 'AM — The AI that does the work',
    description: 'AM is your digital coworker. Give it a goal, not a task.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AM — The AI that does the work' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AM — The AI that does the work',
    description: 'AM is your digital coworker. Give it a goal, not a task.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
