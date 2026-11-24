'use client';

import React from 'react';
import Image from 'next/image';

interface ZoqiraFooterProps {
  onNavigate: (tab: string) => void;
  onOpenRegister: () => void;
}

export const ZoqiraFooter: React.FC<ZoqiraFooterProps> = ({
  onNavigate,
  onOpenRegister,
}) => {
  return (
    <footer className="border-t border-white/5 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-1">
            <button
              onClick={() => onNavigate('home')}
              className="zq-hit inline-flex items-center gap-2.5 cursor-pointer"
            >
              <img
                src="/logo.png"
                alt="Zoqira"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 object-contain"
              />
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Zoq<span className="text-gradient-gold">ira</span>
              </span>
            </button>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed font-normal">
              Trade with Data, Not Emotion. AI-powered analysis across global markets.
            </p>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">Product</h4>
            <ul className="mt-3.5 space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('signals')}
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  AI Signals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news-signals')}
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  News Signals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track-record')}
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  Track Record
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('certificates')}
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  Certificates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terminal')}
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  Market Analysis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">Company</h4>
            <ul className="mt-3.5 space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  Blog &amp; Updates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('api')}
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  API for AI clients
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <a
                  href="#disclaimer"
                  className="zq-hit hover:text-white transition cursor-pointer text-left"
                >
                  Risk Disclaimer
                </a>
              </li>
              <li>
                <span className="text-slate-500">Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Get Started */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">Get started</h4>
            <p className="mt-3.5 text-sm text-slate-400 leading-relaxed font-normal">
              Join thousands trading with data, not emotion.
            </p>
            <button
              onClick={onOpenRegister}
              className="btn-gold mt-4 inline-block rounded-xl px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              Create free account
            </button>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div id="disclaimer" className="mt-12 border-t border-white/5 pt-8">
          <p className="text-xs leading-relaxed text-slate-500">
            Signals are for educational and analysis purposes only. This is not financial advice. Trading involves risk and you can lose money.
          </p>
          <p className="mt-4 text-xs text-slate-600">
            © 2026 Zoqira. All rights reserved. Zoqira is an introducing partner of Exness, Lirunex and GTC FX and may earn a commission. Zoqira is not owned by or acting for any broker.
          </p>
        </div>
      </div>
    </footer>
  );
};
