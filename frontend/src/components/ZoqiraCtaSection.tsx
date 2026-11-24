'use client';

import React from 'react';
import { Zap, BarChart2 } from 'lucide-react';

interface ZoqiraCtaSectionProps {
  onStartFreeTrial: () => void;
  onViewSignals: () => void;
}

export const ZoqiraCtaSection: React.FC<ZoqiraCtaSectionProps> = ({
  onStartFreeTrial,
  onViewSignals,
}) => {
  return (
    <section id="zq-cta" className="mx-auto max-w-7xl px-5 py-24 scroll-mt-24">
      <div className="border-beam is-revealed relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-r from-amber-500/20 via-emerald-500/30 to-amber-500/20">
        <div className="relative overflow-hidden px-8 py-16 text-center sm:py-20 rounded-3xl bg-[#080d1a] border border-white/10 shadow-2xl">
          {/* Subtle Glow Orbs */}
          <div
            className="lp-orb left-[15%] top-0 h-56 w-56 opacity-40 pointer-events-none"
            style={{ ['--zq-orb' as any]: 'rgba(255, 185, 0, .1)' }}
          ></div>
          <div
            className="lp-orb lp-orb--slow bottom-0 right-[12%] h-64 w-64 opacity-40 pointer-events-none"
            style={{ ['--zq-orb' as any]: 'rgba(20, 184, 166, .1)' }}
          ></div>

          <div className="relative z-10">
            <span className="lp-eyebrow">Get started</span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl tracking-tight">
              Trade with <span className="text-shimmer">data</span>, not emotion.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed">
              Start free today and let the AI engine surface setups that pass its checks while you stay disciplined.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <button
                onClick={onStartFreeTrial}
                className="btn-gold btn-shine rounded-xl px-8 py-3.5 text-sm font-bold text-slate-950 transition hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <span>Start Free Trial</span>
                <Zap className="h-4 w-4 fill-current" />
              </button>
              <button
                onClick={onViewSignals}
                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 cursor-pointer"
              >
                <BarChart2 className="h-4 w-4 text-emerald-400" />
                <span>View Signals</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
