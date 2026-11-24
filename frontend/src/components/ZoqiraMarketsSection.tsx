'use client';

import React from 'react';
import { ArrowRight, Layers, ArrowLeftRight, Coins, Droplet } from 'lucide-react';

interface ZoqiraMarketsSectionProps {
  onSelectMarket: (symbol: string) => void;
  onOpenAnalysis: () => void;
}

export const ZoqiraMarketsSection: React.FC<ZoqiraMarketsSectionProps> = ({
  onSelectMarket,
  onOpenAnalysis,
}) => {
  const markets = [
    {
      symbol: 'XAUUSD',
      name: 'Gold / XAUUSD',
      desc: "Trade the world's premier safe-haven asset with AI setups that show the entry, stop and targets.",
      tags: ['XAUUSD'],
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 4 7l8 5 8-5-8-5Z"></path>
          <path d="m4 12 8 5 8-5"></path>
          <path d="m4 17 8 5 8-5"></path>
        </svg>
      ),
    },
    {
      symbol: 'EURUSD',
      name: 'Forex',
      desc: 'Major currency pairs with macro and technical confluence.',
      tags: ['EURUSD', 'GBPUSD', 'USDJPY'],
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h13l-3-3"></path>
          <path d="M21 17H8l3 3"></path>
        </svg>
      ),
    },
    {
      symbol: 'BTCUSDT',
      name: 'Crypto',
      desc: '24/7 digital asset signals driven by volatility-aware models.',
      tags: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'],
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M9.5 8.5h4a2 2 0 0 1 0 4h-4m0 0h4.5a2 2 0 0 1 0 4H9.5m0-8V6m0 12v-2m3-10v2m0 8v2"></path>
        </svg>
      ),
    },
    {
      symbol: 'WTIUSD',
      name: 'Oil',
      desc: 'Energy markets analyzed across inventory and momentum cycles.',
      tags: ['USOIL'],
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2s5 6 5 11a5 5 0 0 1-10 0c0-5 5-11 5-11Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="zq-markets" className="relative overflow-hidden border-t border-white/5 bg-[#070b16] scroll-mt-24 py-24">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#070b16] via-[#070b16]/40 to-[#070b16]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center is-revealed">
          <span className="lp-eyebrow">Coverage</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
            Markets we <span className="lp-underline">analyze</span>
          </h2>
          <p className="mt-4 text-slate-400">One engine, every major asset class.</p>
        </div>

        {/* Markets Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 is-revealed">
          {markets.map((mkt, idx) => (
            <div
              key={mkt.name}
              className="lp-card zq-spot relative flex flex-col overflow-hidden p-6 rounded-2xl bg-[#0b1120] border border-white/10 hover:border-amber-400/40 transition duration-300 group"
              style={{ ['--lp-i' as any]: idx }}
            >
              <div className="zq-spot-overlay" aria-hidden="true"></div>
              <div className="relative z-[1] flex flex-col h-full">
                <div className="flex items-center gap-3">
                  <div className="lp-icon h-10 w-10 text-amber-300 group-hover:scale-110 transition-transform">
                    {mkt.icon}
                  </div>
                  <h3 className="font-display font-bold text-white text-lg tracking-tight">
                    {mkt.name}
                  </h3>
                </div>

                <p className="mt-4 flex-1 text-xs leading-relaxed text-slate-400 sm:text-sm font-normal">
                  {mkt.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {mkt.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onSelectMarket(tag)}
                      className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-mono font-semibold text-slate-300 hover:text-white hover:border-white/20 transition cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <button
                  onClick={onOpenAnalysis}
                  className="zq-hit btn-ghost mt-6 inline-flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:border-amber-400/40 hover:bg-amber-400/5 transition cursor-pointer"
                >
                  <span>Explore setups</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
