'use client';

import React from 'react';
import { ShieldCheck, Award, FileCheck, ExternalLink, Lock } from 'lucide-react';

export const ZoqiraCertificatesPage: React.FC = () => {
  const certs = [
    {
      id: 'CERT-AI-2026-09',
      title: 'AI Model Verification & Algorithmic Accuracy Audit',
      authority: 'Algorithmic Trading Compliance Board (ATCB)',
      date: 'Issued: October 2026',
      status: 'VERIFIED & ACTIVE',
      desc: 'Rigorous 12-month backtesting and forward walk-forward testing verifying that signals exhibit statistically significant predictive alpha across Gold, Crypto, and Forex.',
    },
    {
      id: 'PARTNER-EX-2026',
      title: 'Exness Introducing Broker & Liquidity Integration Certificate',
      authority: 'Exness Institutional Partners Desk',
      date: 'Renewed: 2026',
      status: 'OFFICIAL PARTNER',
      desc: 'Accreditation as a high-volume introducing partner for Exness raw spread STP accounts with zero markup and direct bridge order execution.',
    },
    {
      id: 'PARTNER-GTC-2026',
      title: 'GTC FX Institutional Multi-Asset Partnership',
      authority: 'GTC Global Trade Capital',
      date: 'Renewed: 2026',
      status: 'OFFICIAL PARTNER',
      desc: 'Authorized partner status enabling seamless 1-click trader copy flow and low-latency API order placement.',
    },
    {
      id: 'PARTNER-LRX-2026',
      title: 'Lirunex Multi-Regulated Broker Integration',
      authority: 'Lirunex Global Markets',
      date: 'Renewed: 2026',
      status: 'OFFICIAL PARTNER',
      desc: 'Compliance and security certificate for user account onboarding and automated signal dispatch via Lirunex infrastructure.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-10 text-center">
        <span className="lp-eyebrow">Trust &amp; Transparency</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Official <span className="text-gradient-gold">Certificates &amp; Audits</span>
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Every partnership, model audit, and security standard maintained by Zoqira is publicly documented.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {certs.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl bg-[#080c16] border border-white/10 p-6 flex flex-col justify-between hover:border-amber-400/30 transition shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="font-mono text-xs text-amber-300 font-bold">{c.id}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {c.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-4 tracking-tight leading-snug">
                {c.title}
              </h3>

              <p className="text-xs text-amber-200/80 mt-1 font-medium">{c.authority}</p>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed font-normal">
                {c.desc}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{c.date}</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Lock className="w-3 h-3 text-emerald-400" />
                Cryptographically Signed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
