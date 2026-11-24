'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';
import { MarketPair, QuickTrade, WalletData } from '@/types/trading';

interface ZoqiraQuickTradeProps {
  pair: MarketPair | null;
  wallet: WalletData | null;
  activeTrades: QuickTrade[];
  onPlaceQuickTrade: (trade: {
    symbol: string;
    display_name: string;
    direction: 'up' | 'down';
    amount: number;
    durationSeconds: number;
    payoutPercent: number;
  }) => void;
}

export const ZoqiraQuickTrade: React.FC<ZoqiraQuickTradeProps> = ({
  pair,
  wallet,
  activeTrades,
  onPlaceQuickTrade,
}) => {
  const [amount, setAmount] = useState<number>(100);
  const [duration, setDuration] = useState<number>(60); // 60 seconds (1m)
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!pair) return null;

  const payoutPercent = pair.payout_rate || (pair.symbol.includes('XAU') ? 95 : 90);
  const totalReturn = amount * (1 + payoutPercent / 100);
  const netProfit = totalReturn - amount;

  const quoteWallet = wallet?.wallets.find(w => w.asset === 'USD' || w.asset === 'USDT');
  const availableUsd = quoteWallet ? quoteWallet.free : 50000;

  const durations = [
    { label: '30s', seconds: 30 },
    { label: '1m', seconds: 60 },
    { label: '2m', seconds: 120 },
    { label: '5m', seconds: 300 },
  ];

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handleTrade = (direction: 'up' | 'down') => {
    setErrorMsg(null);
    if (amount <= 0) {
      setErrorMsg('Please enter a valid investment amount');
      return;
    }
    if (amount > availableUsd) {
      setErrorMsg(`Insufficient balance. Available: $${availableUsd.toLocaleString()}`);
      return;
    }

    onPlaceQuickTrade({
      symbol: pair.symbol,
      display_name: pair.display_name,
      direction,
      amount,
      durationSeconds: duration,
      payoutPercent,
    });
  };

  return (
    <div className="bg-[#0b0f17] border-l border-[#1a2333] p-4 text-slate-100 flex flex-col h-full select-none text-xs">
      {/* Zoqira Pro Banner */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1a2333]">
        <div className="flex items-center gap-1.5 font-bold text-sm text-white">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Zoqira Quick Option</span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs">
          +{payoutPercent}% Payout
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {/* Expiration Time Selector */}
        <div>
          <label className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5" /> Expiration Time:
            </span>
            <span className="font-mono text-emerald-400 font-bold">
              {durations.find(d => d.seconds === duration)?.label}
            </span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {durations.map(d => (
              <button
                key={d.seconds}
                onClick={() => setDuration(d.seconds)}
                className={`py-2 rounded-xl text-xs font-mono font-bold transition border ${
                  duration === d.seconds
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-md'
                    : 'bg-[#121824] border-[#1e2a3c] text-slate-400 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Investment Amount */}
        <div>
          <label className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
            <span className="font-semibold">Investment ($USD):</span>
            <span className="font-mono text-slate-400 text-[10px]">
              Balance: ${availableUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAmount(Math.max(10, amount - 25))}
              className="w-10 h-10 rounded-xl bg-[#121824] border border-[#1e2a3c] flex items-center justify-center text-slate-300 hover:text-white transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              min="10"
              step="10"
              value={amount}
              onChange={e => setAmount(Math.max(10, parseFloat(e.target.value) || 10))}
              className="flex-1 h-10 bg-[#121824] border border-[#1e2a3c] rounded-xl px-3 font-mono font-bold text-center text-base text-white outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => setAmount(amount + 25)}
              className="w-10 h-10 rounded-xl bg-[#121824] border border-[#1e2a3c] flex items-center justify-center text-slate-300 hover:text-white transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-6 gap-1 mt-2">
            {presetAmounts.map(p => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`py-1 text-[11px] font-mono rounded-lg border transition ${
                  amount === p
                    ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                    : 'bg-[#121824] border-[#1e2a3c] text-slate-400 hover:text-white'
                }`}
              >
                ${p}
              </button>
            ))}
          </div>
        </div>

        {/* Payout & Return Calculation Box */}
        <div className="p-3 rounded-xl bg-[#101623] border border-[#1e2b3e] space-y-1 font-mono">
          <div className="flex items-center justify-between text-xs text-slate-400 font-sans">
            <span>Profit Rate:</span>
            <span className="text-emerald-400 font-bold font-mono">+{payoutPercent}%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-sans">
            <span>Net Profit:</span>
            <span className="text-emerald-400 font-bold font-mono">+${netProfit.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm pt-1 border-t border-[#192435]">
            <span className="font-sans font-bold text-slate-200">Total Payout:</span>
            <span className="font-black text-emerald-400 text-base font-mono">
              ${totalReturn.toFixed(2)}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Big Zoqira Action Buttons: CALL / UP and PUT / DOWN */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* CALL / UP */}
          <button
            onClick={() => handleTrade('up')}
            className="py-4 rounded-2xl bg-gradient-to-t from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-black font-black text-sm tracking-wide transition shadow-xl shadow-emerald-500/25 flex flex-col items-center justify-center gap-1 cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5 text-base">
              <TrendingUp className="w-5 h-5 group-hover:-translate-y-0.5 transition" />
              <span>UP (BUY)</span>
            </div>
            <span className="text-[11px] font-mono font-bold opacity-80">+${netProfit.toFixed(2)}</span>
          </button>

          {/* PUT / DOWN */}
          <button
            onClick={() => handleTrade('down')}
            className="py-4 rounded-2xl bg-gradient-to-t from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-black text-sm tracking-wide transition shadow-xl shadow-rose-500/25 flex flex-col items-center justify-center gap-1 cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5 text-base">
              <TrendingDown className="w-5 h-5 group-hover:translate-y-0.5 transition" />
              <span>DOWN (SELL)</span>
            </div>
            <span className="text-[11px] font-mono font-bold opacity-80">+${netProfit.toFixed(2)}</span>
          </button>
        </div>
      </div>

      {/* Active Trades Live Tracker in Sidebar */}
      {activeTrades.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[#1a2333] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
            <span>Active Options ({activeTrades.length})</span>
            <span className="text-emerald-400 animate-pulse text-[10px]">LIVE</span>
          </div>
          <div className="max-h-36 overflow-y-auto space-y-1.5">
            {activeTrades.map(t => {
              const isProfit =
                t.direction === 'up'
                  ? pair.price >= t.entryPrice
                  : pair.price <= t.entryPrice;
              return (
                <div
                  key={t.id}
                  className={`p-2 rounded-xl border text-xs font-mono transition ${
                    isProfit
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className={t.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'}>
                      {t.direction.toUpperCase()} ${t.amount}
                    </span>
                    <span className="text-white bg-[#121927] px-1.5 py-0.5 rounded text-[10px]">
                      {t.remainingSeconds}s
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span>Entry: ${t.entryPrice.toLocaleString()}</span>
                    <span className={isProfit ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {isProfit ? `+$${(t.amount * (t.payoutPercent / 100)).toFixed(2)}` : '-$0'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
