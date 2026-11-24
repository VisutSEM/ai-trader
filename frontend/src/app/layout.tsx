import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Trading Signals for Gold, Forex & Crypto — Zoqira',
  description:
    'Real-time setups and clear plans with entry, stop loss and take profit — read by an AI desk with news sentiment and risk/reward.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth lp-ready">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#04060c] text-slate-100 antialiased selection:bg-amber-400/20 selection:text-amber-200">
        {children}
        <Script src="/caustics.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
