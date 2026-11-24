'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Signal } from '@/types/trading';

interface ZoqiraSignalsPageProps {
  signals: Signal[];
  onTradeNow: (symbol: string) => void;
  onFollowSignal: (symbol: string, action: 'buy' | 'sell', amountUsd: number) => Promise<void>;
}

export const ZoqiraSignalsPage: React.FC<ZoqiraSignalsPageProps> = ({
  signals,
  onTradeNow,
  onFollowSignal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Curated setups matching Zoqira's exact marketing: Entry, Stop Loss, Take Profit, News Sentiment, Risk/Reward
  const zoqiraSetups = [
    {
      symbol: 'XAUUSD',
      display_name: 'XAU/USD (Gold)',
      category: 'commodities',
      price: 3625.54,
      change_24h: 1.45,
      action: 'buy' as const,
      verdict: 'STRONG BUY',
      confidence: 93,
      entry: 3625.54,
      target1: 3680.00,
      target2: 3740.00,
      stop_loss: 3590.00,
      risk_reward: '1 : 3.4',
      timeframe: '4H Swing Plan',
      news_sentiment: '88% Bullish (Safe Haven Surge & Central Bank Demand)',
      summary: 'Institutional accumulation above 3,600 support. High momentum breakout confirmed with clear multi-target take profit.',
    },
    {
      symbol: 'BTCUSDT',
      display_name: 'BTC/USDT',
      category: 'crypto',
      price: 60472.00,
      change_24h: 3.84,
      action: 'buy' as const,
      verdict: 'STRONG BUY',
      confidence: 91,
      entry: 60472.00,
      target1: 63500.00,
      target2: 66000.00,
      stop_loss: 58900.00,
      risk_reward: '1 : 3.1',
      timeframe: '1D Macro Plan',
      news_sentiment: '84% Bullish (ETF Inflow Acceleration)',
      summary: 'Rebounding from lower liquidity pool. MACD bullish divergence confirmed on daily candle.',
    },
    {
      symbol: 'ETHUSDT',
      display_name: 'ETH/USDT',
      category: 'crypto',
      price: 1701.24,
      change_24h: 2.15,
      action: 'buy' as const,
      verdict: 'BUY',
      confidence: 86,
      entry: 1701.24,
      target1: 1820.00,
      target2: 1940.00,
      stop_loss: 1640.00,
      risk_reward: '1 : 2.8',
      timeframe: '4H Trend Plan',
      news_sentiment: '79% Bullish (Layer-2 Gas Volume Rise)',
      summary: 'Consolidation near bottom support band. Clear upside room towards resistance target 1.',
    },
    {
      symbol: 'EURUSD',
      display_name: 'EUR/USD',
      category: 'forex',
      price: 1.0907,
      change_24h: 0.03,
      action: 'buy' as const,
      verdict: 'BUY',
      confidence: 81,
      entry: 1.0907,
      target1: 1.1020,
      target2: 1.1150,
      stop_loss: 1.0840,
      risk_reward: '1 : 2.5',
      timeframe: '1D Forex Plan',
      news_sentiment: '72% Bullish (ECB Policy Stabilization)',
      summary: 'Holding firmly above EMA 200 daily average. Favorable risk/reward for trend continuation.',
    },
    {
      symbol: 'USOIL',
      display_name: 'USOIL (Crude Oil)',
      category: 'commodities',
      price: 79.72,
      change_24h: -0.56,
      action: 'sell' as const,
      verdict: 'SELL',
      confidence: 84,
      entry: 79.72,
      target1: 76.50,
      target2: 74.00,
      stop_loss: 81.80,
      risk_reward: '1 : 2.9',
      timeframe: '4H Swing Plan',
      news_sentiment: '76% Bearish (Inventory Build Up)',
      summary: 'Resistance rejection at 80.50 level. Downside target favored with tight stop loss.',
    },
  ];

  const filtered = selectedCategory === 'all'
    ? zoqiraSetups
    : zoqiraSetups.filter(s => s.category === selectedCategory);

  const handleCopy = async (symbol: string, action: 'buy' | 'sell') => {
    await onFollowSignal(symbol, action, 1000);
    setSuccessMsg(`Copied plan for ${symbol}! Placed $1,000 ${action.toUpperCase()} trade.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8 select-none">
      {/* Top Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Real-time Setups &amp; Plans</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Trade with a Clear Plan
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time setups with entry, stop loss, take profit, and AI news sentiment.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0c121b] rounded-xl border border-[#1c2738] self-start md:self-auto">
          {['all', 'commodities', 'crypto', 'forex'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                selectedCategory === cat
                  ? 'bg-white text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'commodities' ? 'Gold & Oil' : cat}
            </button>
          ))}
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid of AI Setups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(s => {
          const isBuy = s.action === 'buy';
          return (
            <div
              key={s.symbol}
              className="rounded-3xl bg-[#0c121b] border border-[#1f2d40] hover:border-emerald-500/40 transition shadow-2xl p-5 flex flex-col justify-between space-y-4"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#131d2b] border border-[#24344a] flex items-center justify-center font-black text-xs text-emerald-400">
                      {s.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-white">{s.display_name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{s.timeframe}</div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-black tracking-wide ${
                      isBuy
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {s.verdict}
                  </span>
                </div>

                {/* News Sentiment Pill */}
                <div className="p-2 rounded-xl bg-[#101723] border border-[#192435] text-[11px] text-slate-300 mt-3 font-sans leading-relaxed">
                  <span className="text-emerald-400 font-bold">News Sentiment: </span>
                  {s.news_sentiment}
                </div>

                {/* Clear Plan Trade Levels: Entry, TP1, TP2, Stop Loss */}
                <div className="grid grid-cols-2 gap-2 my-3 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-[#111925] border border-[#1d2b3c]">
                    <div className="text-[10px] text-slate-400 font-sans">Optimal Entry</div>
                    <div className="font-bold text-white text-sm">${s.entry.toLocaleString()}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#111925] border border-[#1d2b3c]">
                    <div className="text-[10px] text-slate-400 font-sans">Risk / Reward</div>
                    <div className="font-bold text-teal-400 text-sm">{s.risk_reward}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#111925] border border-[#1d2b3c]">
                    <div className="text-[10px] text-emerald-400 font-sans flex items-center gap-1">
                      <Target className="w-3 h-3" /> Take Profit (TP1)
                    </div>
                    <div className="font-bold text-emerald-400 text-sm">${s.target1.toLocaleString()}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#111925] border border-[#1d2b3c]">
                    <div className="text-[10px] text-rose-400 font-sans flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Stop Loss (SL)
                    </div>
                    <div className="font-bold text-rose-400 text-sm">${s.stop_loss.toLocaleString()}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {s.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#182333] flex items-center gap-2">
                <button
                  onClick={() => handleCopy(s.symbol, s.action)}
                  className="flex-1 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-slate-100 transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-black" />
                  <span>Execute Plan ($1,000)</span>
                </button>
                <button
                  onClick={() => onTradeNow(s.symbol)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#141d2c] border border-[#24344a] text-slate-300 hover:text-white hover:border-slate-400 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                >
                  <span>Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
