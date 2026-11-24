'use client';

import React from 'react';
import Image from 'next/image';

interface ZoqiraPartnersSectionProps {
  onOpenRegister: () => void;
}

export const ZoqiraPartnersSection: React.FC<ZoqiraPartnersSectionProps> = ({
  onOpenRegister,
}) => {
  const partners = [
    {
      name: 'Exness',
      desc: 'Instant withdrawals · Raw spread from 0.0',
      logo: '/exness-d06f1a1d03.jpg',
    },
    {
      name: 'GTC FX',
      desc: 'Global multi-asset institutional liquidity',
      logo: '/gtc-fx-918298a9ac.png',
    },
    {
      name: 'Lirunex',
      desc: 'Multi-regulated STP execution & safety',
      logo: '/lirunex-0ca48c3d12.jpg',
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#070b16] py-14">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-5 text-center animate-rise is-revealed">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
          Partner brokers
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl tracking-tight">
          Open a partner account — get 7 days of Pro free
        </h2>
      </div>

      {/* Partners Marquee / Responsive Row */}
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-2">
          {partners.map((partner) => (
            <button
              key={partner.name}
              onClick={onOpenRegister}
              className="group flex shrink-0 items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 transition hover:border-amber-400/40 hover:bg-amber-400/5 cursor-pointer backdrop-blur-sm"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="h-9 w-9 rounded-xl bg-white/95 object-contain p-1 shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="text-left">
                <span className="block text-sm font-bold text-white tracking-tight">
                  {partner.name}
                </span>
                <span className="block text-[11px] text-slate-400 font-medium">
                  {partner.desc}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
