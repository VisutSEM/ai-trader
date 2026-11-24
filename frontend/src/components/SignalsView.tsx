'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { Signal } from '@/types/trading';

interface SignalsViewProps {
  signals: Signal[];
  onSelectPair: (symbol: string) => void;
  onFollowSignal: (symbol: string, action: 'buy' | 'sell', amountUsd: number) => Promise<void>;
}

export const SignalsView: React.FC<SignalsViewProps> = ({
  signals,
  onSelectPair,
  onFollowSignal,
}) => {
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'commodities' | 'crypto'>('all');
  const [followAmounts, setFollowAmounts] = useState<Record<string, number>>({});
  const [executingSymbol, setExecutingSymbol] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filtered = signals.filter(s => {
    if (filter === 'buy') return s.action === 'buy';
    if (filter === 'sell') return s.action === 'sell';
    if (filter === 'commodities') return s.category === 'commodities';
    if (filter === 'crypto') return s.category === 'crypto';
    return true;
  });

  const getAmount = (symbol: string) => followAmounts[symbol] || 1000;

  const handleSetAmount = (symbol: string, amt: number) => {
    setFollowAmounts(prev => ({ ...prev, [symbol]: amt }));
  };

  const handleExecute = async (s: Signal) => {
    const amt = getAmount(s.symbol);
    setExecutingSymbol(s.symbol);
    try {
      await onFollowSignal(s.symbol, s.action, amt);
      setSuccessMsg(`Followed AI Signal: ${s.action.toUpperCase()} $${amt.toLocaleString()} on ${s.display_name}!`);
      setTimeout(() => setSuccessMsg(null), 5000);
    } finally {
      setExecutingSymbol(null);
    }
  };

  return (
    <div className="flex-1 bg-[#0a0e16] text-slate-100 p-6 overflow-y-auto">
      {/* Banner */}
      <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-[#121927] via-[#162134] to-[#121a28] border border-[#23324a] shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BOST AI QUANT & TECHNICAL SIGNALS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Trade Follow Live AI Analytics
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Follow institutional-grade algorithmic signals across <span className="text-emerald-400 font-semibold">Gold (XAU/USD)</span>,
            Crypto, Stocks, and Forex. Automatically execute trades with preset Take Profit, Stop Loss, and Risk Management.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-[#1e2a3c] text-xs font-mono">
            <div>
              <span className="text-slate-400 font-sans">Avg Win Rate: </span>
              <span className="font-bold text-emerald-400">78.4%</span>
            </div>
            <div>
              <span className="text-slate-400 font-sans">Signals Active: </span>
              <span className="font-bold text-slate-200">{signals.length} Markets</span>
            </div>
            <div>
              <span className="text-slate-400 font-sans">Execution Mode: </span>
              <span className="font-bold text-teal-400">1-Click Auto Allocation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-[#101724] rounded-xl border border-[#1d293d]">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              filter === 'all' ? 'bg-[#1b2537] text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Signals ({signals.length})
          </button>
          <button
            onClick={() => setFilter('commodities')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              filter === 'commodities' ? 'bg-[#1b2537] text-amber-400 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Gold & Commodities
          </button>
          <button
            onClick={() => setFilter('crypto')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              filter === 'crypto' ? 'bg-[#1b2537] text-indigo-400 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Crypto
          </button>
          <button
            onClick={() => setFilter('buy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              filter === 'buy' ? 'bg-emerald-500/20 text-emerald-400 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Strong Buys
          </button>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => {
          const isBuy = s.action === 'buy';
          const amt = getAmount(s.symbol);
          const isExecuting = executingSymbol === s.symbol;
          const returnEstimate = amt * (1 + Math.abs((s.target_price - s.price) / s.price));

          return (
            <div
              key={s.symbol}
              className="rounded-2xl bg-[#0e1420] border border-[#1f2b3e] p-4 flex flex-col justify-between hover:border-emerald-500/40 transition shadow-xl space-y-4"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#162030] border border-[#27354d] flex items-center justify-center font-bold text-xs text-emerald-400">
                      {s.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{s.display_name}</div>
                      <div className="text-[11px] text-slate-400 uppercase font-mono">{s.strategy}</div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-black tracking-wide ${
                      isBuy
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {s.verdict}
                  </span>
                </div>

                {/* Price and Confidence */}
                <div className="flex items-center justify-between py-2 border-y border-[#172132] font-mono">
                  <div>
                    <div className="text-[10px] text-slate-500 font-sans">Current Price</div>
                    <div className="font-bold text-sm text-slate-100">${s.price.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-sans">Confidence</div>
                    <div className="font-bold text-sm text-emerald-400">{s.confidence}%</div>
                  </div>
                </div>

                {/* TP & SL Levels */}
                <div className="grid grid-cols-2 gap-2 my-3 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-[#121926] border border-[#1c2637]">
                    <div className="text-[10px] text-emerald-400 font-sans flex items-center gap-1">
                      <Target className="w-3 h-3" /> Target Price (TP)
                    </div>
                    <div className="font-bold text-emerald-400">${s.target_price.toLocaleString()}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#121926] border border-[#1c2637]">
                    <div className="text-[10px] text-rose-400 font-sans flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Stop Loss (SL)
                    </div>
                    <div className="font-bold text-rose-400">${s.stop_loss.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Amount Select & Follow Action */}
              <div className="pt-2 border-t border-[#172132] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Investment:</span>
                  <div className="flex items-center gap-1 font-mono">
                    {[500, 1000, 2500].map(val => (
                      <button
                        key={val}
                        onClick={() => handleSetAmount(s.symbol, val)}
                        className={`px-2 py-0.5 rounded text-[11px] border transition ${
                          amt === val
                            ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                            : 'bg-[#151d2c] border-[#222e43] text-slate-300'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExecute(s)}
                    disabled={isExecuting}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 shadow-lg cursor-pointer ${
                      isBuy
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:opacity-95 shadow-emerald-500/20'
                        : 'bg-gradient-to-r from-rose-500 to-red-500 text-white hover:opacity-95 shadow-rose-500/20'
                    }`}
                  >
                    {isExecuting ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        <span>Following...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>FOLLOW {s.action.toUpperCase()} (${amt})</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onSelectPair(s.symbol)}
                    title="Open Chart in Terminal"
                    className="p-2 rounded-xl bg-[#141d2c] border border-[#222e43] text-slate-300 hover:text-white hover:border-slate-500 transition cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
