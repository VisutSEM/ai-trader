'use client';

import React, { useState } from 'react';
import {
  Brain,
  Cpu,
  Radio,
  Sliders,
  Scale,
  LineChart,
  Send,
  BookOpen,
} from 'lucide-react';

export const ZoqiraFeatures: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
          <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
          <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
          <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
          <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
          <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
        </svg>
      ),
      title: 'LLM Auto Analysis',
      desc: 'Large language models interpret structured market context into clear, explainable setups.',
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"></path>
        </svg>
      ),
      title: 'Smart Signal Engine',
      desc: 'Multi-factor decision logic blends trend, momentum and volatility into one verdict.',
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
          <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
          <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
        </svg>
      ),
      title: 'News Sentiment Scanner',
      desc: 'Live headline sentiment confirms or vetoes a technical bias before you commit.',
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"></path>
        </svg>
      ),
      title: 'Technical Confirmation',
      desc: 'RSI, MACD, EMA stack, ATR and structure analyzed on every signal.',
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
          <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
        </svg>
      ),
      title: 'Risk/Reward Calculator',
      desc: 'Automatic SL/TP placement with transparent reward-to-risk profiling.',
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      ),
      title: 'Win-Rate Tracking',
      desc: 'Outcome tracking across symbols keeps your performance honest.',
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z"></path>
          <path d="M22 2 11 13"></path>
        </svg>
      ),
      title: 'Telegram Alerts',
      desc: 'Instant push of every published signal to your private channel.',
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      title: 'Trade Journal',
      desc: 'Log entries, exits, P/L and screenshots to refine your edge.',
    },
  ];

  return (
    <section id="zq-features" className="mx-auto max-w-7xl px-5 py-24 scroll-mt-24">
      {/* Section Header */}
      <div className="mx-auto mb-14 max-w-2xl text-center is-revealed">
        <span className="lp-eyebrow">Intelligence stack</span>
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
          Everything you need to trade <span className="lp-underline">with conviction</span>
        </h2>
        <p className="mt-4 text-slate-400">
          From data ingestion to disciplined execution — one connected engine.
        </p>
      </div>

      {/* 8 Feature Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 is-revealed">
        {features.map((feat, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="lp-card zq-spot relative overflow-hidden p-4 sm:p-6 transition duration-200 hover:border-amber-400/30 group"
            style={{ ['--lp-i' as any]: i }}
          >
            <div className="zq-spot-overlay" aria-hidden="true"></div>
            <div className="relative z-[1]">
              <div className="lp-icon h-9 w-9 sm:h-11 sm:w-11 text-amber-300 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white sm:mt-5 tracking-tight">
                {feat.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm font-normal">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
