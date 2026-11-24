'use client';

import React, { useEffect, useRef } from 'react';
import { Zap, BarChart2, Trophy, ArrowDown } from 'lucide-react';

interface ZoqiraHeroProps {
  onStartFreeTrial: () => void;
  onViewSignals: () => void;
}

export const ZoqiraHero: React.FC<ZoqiraHeroProps> = ({
  onStartFreeTrial,
  onViewSignals,
}) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mount the WebGL caustics effect from caustics.js if available
    if (typeof window !== 'undefined' && (window as any).initCaustics) {
      try {
        (window as any).initCaustics();
      } catch (e) {
        // Fallback gracefully to the glowing SVG caustic mesh
      }
    }
  }, []);

  return (
    <section id="zq-hero" className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#04060c]">
      {/* 1. Deep Oceanic Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(120% 80% at 70% 15%, #0b3d52 0%, #06202f 40%, #04060c 78%)',
        }}
      />

      {/* 2. Authentic Bioluminescent Neural / Caustic Web Mesh SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <svg
          className="absolute inset-0 w-full h-full opacity-65"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="causticGlow" cx="65%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#5fe0d6" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#13909e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#04060c" stopOpacity="0" />
            </radialGradient>
            <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing Ambient Radial Wash */}
          <rect width="100%" height="100%" fill="url(#causticGlow)" />

          {/* Curved Caustic Filaments & Intersecting Strands */}
          <g stroke="#5fe0d6" strokeWidth="1.2" strokeOpacity="0.45" fill="none" filter="url(#glowBlur)">
            <path d="M-100,180 Q250,80 600,240 T1250,180 T1920,320" />
            <path d="M-50,380 Q320,240 750,420 T1450,280 T2100,460" />
            <path d="M120,40 Q480,220 900,120 T1680,260 T2200,140" />
            <path d="M180,560 Q620,380 1080,580 T1800,440 T2300,620" />
            <path d="M400,-50 Q600,300 800,650 T1200,900" strokeWidth="0.8" strokeOpacity="0.3" />
            <path d="M900,-80 Q1100,260 1350,580 T1600,920" strokeWidth="0.8" strokeOpacity="0.3" />

            {/* Connecting Cross-Links (Cellular web structure) */}
            <line x1="250" y1="80" x2="320" y2="240" strokeDasharray="3 3" strokeOpacity="0.5" />
            <line x1="600" y1="240" x2="750" y2="420" strokeDasharray="3 3" strokeOpacity="0.5" />
            <line x1="900" y1="120" x2="1080" y2="380" strokeDasharray="3 3" strokeOpacity="0.5" />
            <line x1="1250" y1="180" x2="1450" y2="280" strokeDasharray="3 3" strokeOpacity="0.5" />
            <line x1="1680" y1="260" x2="1800" y2="440" strokeDasharray="3 3" strokeOpacity="0.5" />
          </g>

          {/* Web Nodes with Soft Halos */}
          <g fill="#5fe0d6">
            <circle cx="250" cy="80" r="3" opacity="0.8" />
            <circle cx="600" cy="240" r="4" opacity="0.9" />
            <circle cx="750" cy="420" r="3.5" opacity="0.75" />
            <circle cx="900" cy="120" r="4.5" opacity="0.85" />
            <circle cx="1250" cy="180" r="4" opacity="0.8" />
            <circle cx="1450" cy="280" r="3.5" opacity="0.75" />
            <circle cx="1680" cy="260" r="4.5" opacity="0.9" />
          </g>
        </svg>

        {/* WebGL Canvas Layer */}
        <div
          ref={canvasContainerRef}
          data-caustics=""
          aria-hidden="true"
          data-colors="#03141f,#0a4560,#13909e,#5fe0d6,#f2fffc"
          data-bg="#04060c"
          className="absolute inset-0 pointer-events-none"
        >
          <canvas className="absolute inset-0 h-full w-full opacity-60" />
        </div>
      </div>

      {/* 3. Vignette Overlays */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#04060c]/90 via-[#04060c]/40 to-transparent"></div>
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#04060c] via-transparent to-[#04060c]/40"></div>

      {/* 4. Main Content Grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left Column: Hero Copy & CTA */}
        <div className="text-center lg:text-left">
          {/* Eyebrow Live Badge */}
          <div>
            <span className="lp-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              </span>
              <span>AI MARKET ENGINE · LIVE NOW</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Trade Gold, Forex &amp; <br className="hidden sm:inline" />
            Crypto with <br className="hidden sm:inline" />
            <span className="text-shimmer font-extrabold">a clear plan</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300 lg:mx-0 font-normal">
            Real-time setups and clear plans with entry, stop loss and take profit — read by an AI desk
            with news sentiment and risk/reward.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
            <button
              onClick={onStartFreeTrial}
              className="btn-gold btn-shine rounded-xl px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shadow-xl"
            >
              <span>Start Free Trial</span>
              <Zap className="h-4 w-4 fill-current" />
            </button>
            <button
              onClick={onViewSignals}
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 cursor-pointer"
            >
              <BarChart2 className="h-4 w-4 text-emerald-400" />
              <span>View Signals</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            <span className="flex -space-x-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#04060c] text-[11px] font-bold bg-amber-400 text-slate-950 shadow">
                H
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#04060c] text-[11px] font-bold bg-emerald-400 text-slate-950 shadow">
                S
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#04060c] text-[11px] font-bold bg-cyan-400 text-slate-950 shadow">
                S
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#04060c] text-[11px] font-bold bg-amber-300 text-slate-950 shadow">
                C
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#04060c] text-[11px] font-bold bg-teal-400 text-slate-950 shadow">
                C
              </span>
            </span>
            <p className="text-xs text-slate-400">
              <span className="font-bold text-white">15,290</span> traders have signed up to Zoqira
            </p>
          </div>
        </div>

        {/* Right Column: Floating Team & Partners Card */}
        <div className="w-full max-w-md mx-auto lg:max-w-none">
          <div className="relative">
            {/* Ambient Multi-Hue Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-500/10 via-transparent to-cyan-500/10 blur-2xl pointer-events-none"></div>

            {/* Window Glass Container */}
            <div className="relative rounded-3xl p-5 bg-[#080d1a]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-2 pb-3.5 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80"></span>
                  <span className="ml-2 inline-flex items-center gap-1.5 font-bold text-slate-200">
                    <Trophy className="h-3.5 w-3.5 text-amber-300" />
                    <span className="text-[11px] uppercase tracking-wider text-amber-200 font-bold">
                      TEAM &amp; PARTNERS
                    </span>
                  </span>
                </div>
                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  ● 2 profiles
                </span>
              </div>

              {/* Profiles List */}
              <div className="relative space-y-3 mt-3.5">
                {/* Profile 1: Visut */}
                <div className="rounded-2xl bg-[#0b1120] p-4 border border-white/10 hover:border-amber-400/30 transition shadow-lg">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/visut.jpg"
                      alt="Visut"
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-amber-400/30 shadow-md"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                        <span className="truncate">Visut</span>
                        <svg
                          className="h-4 w-4 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#14be91"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          role="img"
                          aria-label="Verified"
                        >
                          <path d="M21 12a9 9 0 1 1-3.6-7.2"></path>
                          <path d="M8 12.5l3 3L21 5"></path>
                        </svg>
                      </div>
                      <p className="truncate text-xs text-slate-400 font-medium mt-0.5">Dev · Founder</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                      143K followers
                    </span>
                  </div>

                  {/* Social Buttons */}
                  <div className="mt-3.5 flex items-center gap-2">
                    <a
                      href="https://www.tiktok.com/@angkerith01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-200 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-white transition"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19.6 7.2a5.4 5.4 0 0 1-3.4-1.2 5.5 5.5 0 0 1-1.9-3H11v12.6a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.7a6 6 0 0 0-.8-.1 6 6 0 1 0 6 6V9.8a8.6 8.6 0 0 0 5.3 1.8V8.3c-.6 0-1.3-.4-2-1.1Z"></path>
                      </svg>
                      <span>TikTok</span>
                    </a>
                    <a
                      href="https://web.facebook.com/profile.php?id=100087747956497"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-200 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white transition"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4Z"></path>
                      </svg>
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>

                {/* Profile 2: VONG */}
                <div className="rounded-2xl bg-[#0b1120] p-4 border border-white/10 hover:border-amber-400/30 transition shadow-lg">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/vong.jpg"
                      alt="VONG"
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-amber-400/30 shadow-md"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                        <span className="truncate">VONG</span>
                        <svg
                          className="h-4 w-4 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#14be91"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          role="img"
                          aria-label="Verified"
                        >
                          <path d="M21 12a9 9 0 1 1-3.6-7.2"></path>
                          <path d="M8 12.5l3 3L21 5"></path>
                        </svg>
                      </div>
                      <p className="truncate text-xs text-slate-400 font-medium mt-0.5">Co Founder</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                      120K followers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block" aria-hidden="true">
        <ArrowDown className="h-5 w-5 text-slate-400 animate-bounce" />
      </div>
    </section>
  );
};
