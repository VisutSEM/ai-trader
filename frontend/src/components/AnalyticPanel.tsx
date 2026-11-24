'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Target,
  ArrowRight,
  Zap,
  CheckCircle2,
  DollarSign,
  Info,
} from 'lucide-react';
import { AnalyticData } from '@/types/trading';

interface AnalyticPanelProps {
  analytic: AnalyticData | null;
  onFollowSignal: (symbol: string, action: 'buy' | 'sell', amountUsd: number) => Promise<void>;
}

export const AnalyticPanel: React.FC<AnalyticPanelProps> = ({ analytic, onFollowSignal }) => {
  const [followAmount, setFollowAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('1000');
  const [isExecuting, setIsExecuting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!analytic) {
    return (
      <div className="p-6 text-center text-slate-400 bg-[#0d121b] border-l border-[#1c2638] h-full flex flex-col items-center justify-center">
        <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
        <p className="text-sm">Calculating Bost AI Technical Analytics...</p>
      </div>
    );
  }

  const isBuy = analytic.action === 'buy';
  const price = analytic.current_price;
  const potentialProfitPercent = ((analytic.target_price - price) / price) * 100;
  const potentialRiskPercent = ((price - analytic.stop_loss) / price) * 100;

  const currentAmountNum = parseFloat(customAmount) || followAmount;
  const estimatedReturn = currentAmountNum * (1 + Math.abs(potentialProfitPercent) / 100);
  const estimatedProfit = estimatedReturn - currentAmountNum;

  const handleFollowClick = async () => {
    if (currentAmountNum <= 0) return;
    setIsExecuting(true);
    try {
      await onFollowSignal(analytic.symbol, analytic.action, currentAmountNum);
      setSuccessMsg(`Follow trade executed! ${analytic.action.toUpperCase()} $${currentAmountNum.toLocaleString()} of ${analytic.display_name}`);
      setTimeout(() => setSuccessMsg(null), 5000);
    } finally {
      setIsExecuting(false);
    }
  };

  const presetAmounts = [250, 500, 1000, 2500, 5000];

  return (
    <div className="bg-[#0b0f17] border-l border-[#1a2333] text-slate-100 h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-3.5 border-b border-[#1a2333] bg-[#0d131d] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs tracking-tight text-white flex items-center gap-1.5">
              <span>Bost AI Analytic Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-[10px] text-slate-400">{analytic.display_name} Real-time Signal</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Win Rate</div>
          <div className="text-xs font-bold font-mono text-emerald-400">{analytic.win_rate}%</div>
        </div>
      </div>

      <div className="p-3.5 space-y-3.5 flex-1">
        {/* Signal Verdict Box */}
        <div
          className={`p-3 rounded-xl border ${
            isBuy
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-rose-500/10 border-rose-500/30'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              {isBuy ? (
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-400" />
              )}
              <span
                className={`font-black text-sm tracking-wide ${
                  isBuy ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {analytic.verdict}
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-300">
              {analytic.confidence_score}% Confidence
            </div>
          </div>

          {/* Confidence Meter Bar */}
          <div className="w-full bg-[#131b27] h-2 rounded-full overflow-hidden p-[1px]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isBuy
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-rose-500 to-amber-500'
              }`}
              style={{ width: `${analytic.confidence_score}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans">
            {analytic.summary}
          </p>
        </div>

        {/* Trade Levels (Entry, Target, Stop Loss) */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <div className="p-2 rounded-lg bg-[#111722] border border-[#1e2a3c]">
            <div className="text-[10px] text-slate-400 font-sans">Entry Price</div>
            <div className="font-bold text-slate-100">${analytic.entry_price.toLocaleString()}</div>
          </div>
          <div className="p-2 rounded-lg bg-[#111722] border border-[#1e2a3c]">
            <div className="text-[10px] text-emerald-400 font-sans flex items-center gap-1">
              <Target className="w-3 h-3" /> Target (TP)
            </div>
            <div className="font-bold text-emerald-400">${analytic.target_price.toLocaleString()}</div>
            <div className="text-[9px] text-emerald-500 font-semibold">
              +{Math.abs(potentialProfitPercent).toFixed(1)}%
            </div>
          </div>
          <div className="p-2 rounded-lg bg-[#111722] border border-[#1e2a3c]">
            <div className="text-[10px] text-rose-400 font-sans flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" /> Stop (SL)
            </div>
            <div className="font-bold text-rose-400">${analytic.stop_loss.toLocaleString()}</div>
            <div className="text-[9px] text-rose-500 font-semibold">
              -{Math.abs(potentialRiskPercent).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Technical Indicators Breakdown */}
        <div className="p-3 rounded-xl bg-[#101622] border border-[#1c2637] space-y-2.5">
          <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span>Technical Indicators</span>
            <span className="text-[10px] text-slate-400 font-normal">Risk/Reward {analytic.risk_reward}</span>
          </div>

          {/* RSI Gauge */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">RSI (14-period)</span>
              <span className="font-mono font-semibold text-emerald-400">
                {analytic.indicators.rsi.value} ({analytic.indicators.rsi.status})
              </span>
            </div>
            <div className="w-full bg-[#182130] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, analytic.indicators.rsi.value))}%` }}
              />
            </div>
          </div>

          {/* MACD & Trend */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#1b2536] text-[11px]">
            <div>
              <div className="text-slate-400 text-[10px]">MACD Signal</div>
              <div className="font-semibold text-slate-200">{analytic.indicators.macd.status}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Overall Trend</div>
              <div className="font-semibold text-emerald-400">{analytic.indicators.moving_averages.trend}</div>
            </div>
          </div>

          {/* Support / Resistance */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#1b2536] text-[11px] font-mono">
            <div>
              <div className="text-slate-400 text-[10px] font-sans">Support Floor</div>
              <div className="text-slate-200">${analytic.indicators.support_level.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] font-sans">Resistance Roof</div>
              <div className="text-slate-200">${analytic.indicators.resistance_level.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* 1-CLICK FOLLOW SIGNAL ACTION (User requested feature!) */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#141d2b] to-[#0e1520] border-2 border-emerald-500/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>1-Click Copy AI Signal</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              Auto TP/SL
            </span>
          </div>

          {/* Amount Presets */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-300">Select Investment Amount ($USD):</label>
            <div className="grid grid-cols-5 gap-1">
              {presetAmounts.map(amt => (
                <button
                  key={amt}
                  onClick={() => {
                    setFollowAmount(amt);
                    setCustomAmount(amt.toString());
                  }}
                  className={`py-1 text-xs font-mono font-medium rounded-lg border transition ${
                    currentAmountNum === amt
                      ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                      : 'bg-[#182232] border-[#25344d] text-slate-300 hover:bg-[#202d42]'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
            {/* Custom Amount Input */}
            <div className="relative mt-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="number"
                min="10"
                step="10"
                value={customAmount}
                onChange={e => {
                  setCustomAmount(e.target.value);
                  setFollowAmount(parseFloat(e.target.value) || 0);
                }}
                className="w-full pl-8 pr-3 py-1.5 bg-[#0e141f] border border-[#27354d] rounded-lg text-xs font-mono text-white outline-none focus:border-emerald-500"
                placeholder="Custom USD amount"
              />
            </div>
          </div>

          {/* Projected Outcome */}
          <div className="p-2 rounded-lg bg-[#0b1017] border border-[#1e2a3c] text-xs font-mono flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-sans">Projected Profit @ TP:</span>
            <span className="font-bold text-emerald-400">
              +${estimatedProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Big Follow Button */}
          <button
            onClick={handleFollowClick}
            disabled={isExecuting || currentAmountNum <= 0}
            className={`w-full py-2.5 rounded-xl font-black text-sm tracking-wide transition flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
              isBuy
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-black hover:opacity-95 shadow-emerald-500/25'
                : 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-400 text-white hover:opacity-95 shadow-rose-500/25'
            }`}
          >
            {isExecuting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Executing Signal...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>
                  FOLLOW SIGNAL & {analytic.action.toUpperCase()} ${currentAmountNum.toLocaleString()}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {successMsg && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
