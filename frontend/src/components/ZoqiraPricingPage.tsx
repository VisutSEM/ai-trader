'use client';

import React from 'react';
import { Check, Zap, Shield, Sparkles } from 'lucide-react';

interface ZoqiraPricingPageProps {
  onSelectPlan: (plan: string) => void;
}

export const ZoqiraPricingPage: React.FC<ZoqiraPricingPageProps> = ({
  onSelectPlan,
}) => {
  const plans = [
    {
      name: 'Partner Free Access',
      badge: 'RECOMMENDED',
      price: '$0',
      period: 'Forever free',
      desc: 'Free full access to all Zoqira Pro signals when you open an account through our partner brokers.',
      features: [
        'Full access to Gold, Forex & Crypto signals',
        'Telegram instant alert feed',
        '1-Click trade follow execution',
        'Standard news sentiment scanner',
        'No monthly fees with active partner trading',
      ],
      buttonText: 'Claim via Partner Account',
      isPopular: false,
    },
    {
      name: 'Pro Trader',
      badge: '7-DAY FREE TRIAL',
      price: '$39',
      period: '/ month',
      desc: 'Complete institutional tool suite for active intraday and swing traders.',
      features: [
        'All multi-asset signals (Gold, Crypto, Forex, Oil)',
        'Private VIP Telegram channel alerts',
        'Sub-second signal broadcast latency',
        'Live technical confirmation breakdown',
        'Risk/Reward calculator & trade journaling',
        'Direct 1-click execution & webhook access',
      ],
      buttonText: 'Start 7-Day Free Trial',
      isPopular: true,
    },
    {
      name: 'Institutional Desk',
      badge: 'UNLIMITED',
      price: '$99',
      period: '/ month',
      desc: 'Dedicated low-latency feed and direct REST/WebSocket API keys for programmatic trading.',
      features: [
        'Everything in Pro Trader',
        'Full REST & WebSocket API access',
        'Custom risk tolerance parameters',
        'Dedicated VIP Telegram concierge desk',
        'Priority feature requests & model weights',
        'Multi-account automated execution bridges',
      ],
      buttonText: 'Subscribe Institutional',
      isPopular: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <div className="mb-12 text-center">
        <span className="lp-eyebrow">Transparent Pricing</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Invest in <span className="text-gradient-gold">Discipline &amp; Edge</span>
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Get 7 days of Pro completely free, or unlock free lifetime access by registering through our partner brokers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
              p.isPopular
                ? 'bg-gradient-to-b from-[#10172a] to-[#070b16] border-2 border-amber-400/50 shadow-2xl scale-[1.02]'
                : 'bg-[#080c16] border border-white/10 hover:border-white/20'
            }`}
          >
            {p.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-lg">
                Most Popular
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {p.badge}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mt-4">{p.name}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">{p.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-white">{p.price}</span>
                <span className="text-xs text-slate-400">{p.period}</span>
              </div>

              <div className="my-6 border-t border-white/5" />

              <ul className="space-y-3 text-xs text-slate-300">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan(p.name)}
              className={`mt-8 w-full py-3.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 ${
                p.isPopular
                  ? 'btn-gold btn-shine text-slate-950 shadow-lg hover:scale-105 duration-150'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{p.buttonText}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
