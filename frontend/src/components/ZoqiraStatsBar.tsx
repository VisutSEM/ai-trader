'use client';

import React from 'react';

export const ZoqiraStatsBar: React.FC = () => {
  const stats = [
    { value: '24/7', label: 'AI market analysis' },
    { value: '8+', label: 'Multi-asset markets' },
    { value: '2x', label: 'Technical + news confirm' },
    { value: 'Live', label: 'Telegram alerts' },
    { value: 'Risk-1st', label: 'Trading system' },
  ];

  return (
    <section className="border-y border-white/5 bg-[#0b1120]/60 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-12 md:grid-cols-5 is-revealed">
        {stats.map((stat, i) => (
          <div key={i} className="text-center" style={{ ['--lp-i' as any]: i }}>
            <p className="font-display text-2xl font-bold text-white sm:text-3xl tracking-tight">
              {stat.value}
            </p>
            <p className="mt-1.5 text-xs text-slate-400 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
