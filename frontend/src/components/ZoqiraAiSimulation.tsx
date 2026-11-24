'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Activity, Check, CheckCircle2, ChevronRight, Play, Pause } from 'lucide-react';

interface ZoqiraAiSimulationProps {
  onFollowSignal?: (symbol: string, action: 'buy' | 'sell', price: number) => void;
}

export const ZoqiraAiSimulation: React.FC<ZoqiraAiSimulationProps> = ({
  onFollowSignal,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [logText, setLogText] = useState<string>('boot · engine online, models warm');
  const [publishedDir, setPublishedDir] = useState<'SELL' | 'BUY'>('SELL');
  const [entryPrice, setEntryPrice] = useState<string>('3,998.40');
  const [slPrice, setSlPrice] = useState<string>('4,014.90');
  const [tpPrice, setTpPrice] = useState<string>('3,974.10');
  const [analystVotes, setAnalystVotes] = useState<string[]>(['', '', '', '']);
  const [consensusCount, setConsensusCount] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const samples = [
    {
      dir: 'SELL' as const,
      entry: '3,998.40',
      sl: '4,014.90',
      tp: '3,974.10',
      votes: ['SELL', 'SELL', 'SELL', 'HOLD'],
      notes: [
        'Lower highs into supply',
        'Yields firm, dollar bid',
        'Crowd still long gold',
        'Stop sits above the zone',
      ],
    },
    {
      dir: 'BUY' as const,
      entry: '3,981.20',
      sl: '3,966.50',
      tp: '4,003.70',
      votes: ['BUY', 'BUY', 'HOLD', 'BUY'],
      notes: [
        'Demand defended the retest',
        'Real yields easing off',
        'Shorts crowded near lows',
        'Tight stop under the wick',
      ],
    },
  ];

  // Automated step sequencer
  useEffect(() => {
    if (!isPlaying) return;

    const sequence = [
      {
        step: 0,
        delay: 2400,
        action: () => {
          setLogText('boot · engine online, loading loss memory & strategy book');
          setAnalystVotes(['', '', '', '']);
          setConsensusCount(0);
        },
      },
      {
        step: 1,
        delay: 2600,
        action: () => {
          setLogText('scanning XAUUSD 15m · volume profile & liquidity sweep');
        },
      },
      {
        step: 2,
        delay: 3200,
        action: () => {
          setLogText('convening AI council · 4 specialized models debating thesis');
          setAnalystVotes(['SELL', 'SELL', 'SELL', 'HOLD']);
          setConsensusCount(3);
        },
      },
      {
        step: 3,
        delay: 4500,
        action: () => {
          setLogText('signal published — entry 3,998.40 · SL 4,014.90 · TP 3,974.10');
          setPublishedDir('SELL');
          setEntryPrice('3,998.40');
          setSlPrice('4,014.90');
          setTpPrice('3,974.10');
        },
      },
    ];

    let currentIndex = activeStep;
    const executeCurrent = () => {
      const item = sequence[currentIndex];
      item.action();
      setActiveStep(item.step);

      timerRef.current = setTimeout(() => {
        currentIndex = (currentIndex + 1) % sequence.length;
        executeCurrent();
      }, item.delay);
    };

    executeCurrent();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying]);

  const handleStepClick = (idx: number) => {
    setIsPlaying(false);
    setActiveStep(idx);
    if (idx === 0) {
      setLogText('boot · engine online, models warm');
      setAnalystVotes(['', '', '', '']);
      setConsensusCount(0);
    } else if (idx === 1) {
      setLogText('scanning XAUUSD 15m · structure & liquidity');
    } else if (idx === 2) {
      setLogText('convening AI council · multi-agent consensus');
      setAnalystVotes(['SELL', 'SELL', 'SELL', 'HOLD']);
      setConsensusCount(3);
    } else if (idx === 3) {
      setLogText('signal published · live execution available');
    }
  };

  return (
    <section id="zq-how" className="relative overflow-hidden border-t border-white/5 scroll-mt-24 py-24 bg-[#050814]">
      {/* Background Orbs */}
      <div className="lp-orb left-[6%] top-[20%] h-64 w-64 opacity-50" style={{ ['--zq-orb' as any]: 'rgba(255, 185, 0, .08)' }}></div>
      <div className="lp-orb lp-orb--slow bottom-[8%] right-[8%] h-72 w-72 opacity-50" style={{ ['--zq-orb' as any]: 'rgba(0, 212, 146, .07)' }}></div>

      <div className="relative mx-auto max-w-7xl px-5">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center is-revealed">
          <span className="lp-eyebrow">How it works</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
            See how the <span className="lp-underline">AI works</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Watch the intelligence flow — from the AI core to a published BUY/SELL signal.
          </p>
        </div>

        {/* AI Console Main Stage */}
        <div id="zq-ai" ref={containerRef} className="is-revealed max-w-4xl mx-auto">
          <div className="zqai bg-gradient-to-b from-[#0d1220]/95 to-[#080b14]/95 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            {/* Top Bar */}
            <div className="zqai-top flex items-center justify-between pb-4 border-b border-white/5">
              <span className="zqai-live inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Engine live
              </span>
              <div className="flex items-center gap-3">
                <span className="zqai-pair text-xs font-mono font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                  XAUUSD · 15m
                </span>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                  title={isPlaying ? 'Pause simulation' : 'Play simulation'}
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Step Progress Rail */}
            <div className="zqai-rail relative my-6">
              <div className="relative flex items-center justify-between">
                {/* Connecting track line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${(activeStep / 3) * 100}%` }}
                  />
                </div>

                {['Wake', 'Scan', 'Debate', 'Publish'].map((label, idx) => {
                  const isActive = activeStep === idx;
                  const isDone = activeStep > idx;
                  return (
                    <button
                      key={label}
                      onClick={() => handleStepClick(idx)}
                      className={`relative z-10 flex flex-col items-center gap-2 group cursor-pointer`}
                    >
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isActive
                            ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20 scale-110 shadow-lg'
                            : isDone
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-[#121929] text-slate-400 border border-white/10 group-hover:border-white/30'
                        }`}
                      >
                        {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                      </span>
                      <span
                        className={`text-xs font-semibold tracking-wide ${
                          isActive ? 'text-amber-300 font-bold' : isDone ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Screen Display */}
            <div className="zqai-screen relative rounded-2xl bg-[#070a14] border border-white/5 p-6 min-h-[300px] flex items-center justify-center overflow-hidden">
              {/* Scan Bar Animation in step 1 */}
              {activeStep === 1 && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse pointer-events-none" />
              )}

              {/* Scene 0: Wake (Core Engine) */}
              {activeStep === 0 && (
                <div className="flex flex-col items-center justify-center py-6 animate-rise">
                  <div className="relative flex items-center justify-center w-28 h-28 mb-6">
                    <div className="absolute inset-0 rounded-full bg-amber-400/10 animate-ping opacity-30" />
                    <div className="absolute -inset-2 rounded-full border border-amber-400/30 animate-spin [animation-duration:8s]" />
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                      <Zap className="w-8 h-8 text-slate-950 fill-current" />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
                    {['Market data', 'Loss memory', 'Risk engine', 'Strategy book'].map((chip, i) => (
                      <span
                        key={chip}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 animate-rise"
                        style={{ animationDelay: `${i * 120}ms` }}
                      >
                        ● {chip}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Scene 1: Scan (Market Chart) */}
              {activeStep === 1 && (
                <div className="w-full flex flex-col items-center py-4 animate-rise">
                  <div className="flex items-center justify-between w-full mb-3 text-xs text-slate-400">
                    <span className="font-mono text-amber-300 font-bold">XAUUSD Supply 4,014.00</span>
                    <span className="text-cyan-400">Scanning Order Flow...</span>
                  </div>
                  {/* Candlestick visualization bars */}
                  <div className="h-36 w-full flex items-end justify-between gap-2 px-4 py-2 bg-[#090e1a] rounded-xl border border-white/5 relative">
                    <div className="absolute top-8 left-0 right-0 border-b border-dashed border-red-400/40" />
                    {[
                      { h: '45%', color: 'bg-emerald-400' },
                      { h: '60%', color: 'bg-emerald-400' },
                      { h: '50%', color: 'bg-red-400' },
                      { h: '70%', color: 'bg-emerald-400' },
                      { h: '85%', color: 'bg-emerald-400' },
                      { h: '65%', color: 'bg-red-400' },
                      { h: '90%', color: 'bg-emerald-400' },
                      { h: '95%', color: 'bg-red-400' },
                      { h: '75%', color: 'bg-red-400' },
                      { h: '60%', color: 'bg-red-400' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                        <div className={`w-1 bg-slate-600 h-full max-h-[85%] opacity-40`} />
                        <div
                          className={`w-full rounded-sm ${bar.color} opacity-80`}
                          style={{ height: bar.h }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scene 2: Debate (AI Council) */}
              {activeStep === 2 && (
                <div className="w-full max-w-lg space-y-3 py-4 animate-rise">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-300">Council Consensus</span>
                    <span className="font-mono font-bold text-amber-300">{consensusCount} / 4 Agreed</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                      style={{ width: `${(consensusCount / 4) * 100}%` }}
                    />
                  </div>

                  {[
                    { role: 'TA', label: 'Technical', desc: 'Lower highs into supply zone', vote: 'SELL' },
                    { role: 'NEWS', label: 'Macro Sentiment', desc: 'Yields firm, dollar bid pressure', vote: 'SELL' },
                    { role: 'FLOW', label: 'Order Flow', desc: 'Institutional sell liquidity resting', vote: 'SELL' },
                    { role: 'RISK', label: 'Risk Guard', desc: 'R:R 1:2.4 meets discipline threshold', vote: 'HOLD' },
                  ].map((council, i) => (
                    <div
                      key={council.role}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center">
                          {council.role}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-white">{council.label}</p>
                          <p className="text-[11px] text-slate-400">{council.desc}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-md ${
                          council.vote === 'SELL'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                            : 'bg-slate-700/50 text-slate-300'
                        }`}
                      >
                        {council.vote}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Scene 3: Publish (Live Signal Card) */}
              {activeStep === 3 && (
                <div className="w-full max-w-md py-3 animate-rise">
                  <div className="rounded-2xl border border-red-500/30 bg-red-950/15 p-5 relative overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-red-500 text-black font-extrabold text-xs">
                          {publishedDir}
                        </span>
                        <span className="font-bold text-white text-base">XAU/USD</span>
                        <span className="text-xs text-slate-400">Gold Spot</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">1:2.4 R:R</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 my-4 text-center">
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <p className="text-[10px] text-slate-400 font-medium">Entry</p>
                        <p className="text-xs font-mono font-bold text-white mt-0.5">{entryPrice}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <p className="text-[10px] text-red-400 font-medium">Stop Loss</p>
                        <p className="text-xs font-mono font-bold text-red-400 mt-0.5">{slPrice}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <p className="text-[10px] text-emerald-400 font-medium">Take Profit</p>
                        <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{tpPrice}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onFollowSignal && onFollowSignal('XAUUSD', 'sell', 3998.40)}
                      className="w-full py-2.5 rounded-xl bg-red-500 text-black font-bold text-xs hover:bg-red-400 transition cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Execute Follow Trade (SELL Gold)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Stream Logs */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="truncate">{logText}</span>
              </span>
              <span className="text-[11px] text-slate-500 shrink-0">v2.4-engine</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
