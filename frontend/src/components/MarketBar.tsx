'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  BarChart2,
  SlidersHorizontal,
  Layers,
  Sparkles,
} from 'lucide-react';
import { MarketPair } from '@/types/trading';

interface MarketBarProps {
  pair: MarketPair | null;
  timeframe: string;
  setTimeframe: (tf: string) => void;
  chartType: 'candles' | 'line';
  setChartType: (type: 'candles' | 'line') => void;
  showIndicators: boolean;
  setShowIndicators: (val: boolean) => void;
  onOpenAnalytics: () => void;
}

export const MarketBar: React.FC<MarketBarProps> = ({
  pair,
  timeframe,
  setTimeframe,
  chartType,
  setChartType,
  showIndicators,
  setShowIndicators,
  onOpenAnalytics,
}) => {
  if (!pair) return null;

  const isPos = pair.change_24h >= 0;
  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1D', '1W'];

  const categoryBadgeColors: Record<string, string> = {
    commodities: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    crypto: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    stocks: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    forex: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    indices: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-[#0d121b] border-b border-[#1c2638] text-slate-100 gap-3">
      {/* Pair Info & Live Ticker */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1b2537] to-[#121926] border border-[#2c3c58] flex items-center justify-center font-bold text-sm text-emerald-400 shadow-inner">
            {pair.base_asset.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">{pair.display_name}</span>
              <span
                className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${
                  categoryBadgeColors[pair.category] || 'bg-slate-800 text-slate-300'
                }`}
              >
                {pair.category}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">{pair.symbol} Spot Market</div>
          </div>
        </div>

        {/* Live Price with Pulse Effect */}
        <div className="pl-4 border-l border-[#1f2b3e]">
          <div className="text-lg font-extrabold font-mono tracking-tight text-white flex items-center gap-1.5">
            ${pair.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            {isPos ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-400" />
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`font-semibold font-mono ${
                isPos ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isPos ? '+' : ''}
              {pair.change_24h}%
            </span>
            <span className="text-slate-500 text-[10px]">24h Change</span>
          </div>
        </div>

        {/* 24h High, Low, Volume Stats */}
        <div className="hidden lg:flex items-center gap-5 pl-4 border-l border-[#1f2b3e] text-xs font-mono">
          <div>
            <div className="text-[10px] text-slate-400 font-sans">24h High</div>
            <div className="text-slate-200 font-medium">${pair.high_24h.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-sans">24h Low</div>
            <div className="text-slate-200 font-medium">${pair.low_24h.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-sans">24h Volume ({pair.base_asset})</div>
            <div className="text-slate-200 font-medium">
              {pair.volume_24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Timeframe Controls & AI Analytic Launcher */}
      <div className="flex items-center gap-2">
        {/* Timeframe Selector */}
        <div className="flex items-center bg-[#131924] rounded-lg p-0.5 border border-[#1e2a3c]">
          {timeframes.map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                timeframe === tf
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#1b2536]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart View Toggle: Candles vs Line */}
        <div className="flex items-center bg-[#131924] rounded-lg p-0.5 border border-[#1e2a3c]">
          <button
            onClick={() => setChartType('candles')}
            title="Candlestick Chart"
            className={`px-2 py-1 text-xs rounded-md transition ${
              chartType === 'candles'
                ? 'bg-[#1e2a3c] text-emerald-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setChartType('line')}
            title="Line Chart"
            className={`px-2 py-1 text-xs rounded-md transition ${
              chartType === 'line'
                ? 'bg-[#1e2a3c] text-emerald-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Technical Indicators toggle */}
        <button
          onClick={() => setShowIndicators(!showIndicators)}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition ${
            showIndicators
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
              : 'bg-[#131924] border-[#1e2a3c] text-slate-400 hover:text-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">MA / Bollinger</span>
        </button>

        {/* AI Analytics Button */}
        <button
          onClick={onOpenAnalytics}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:opacity-95 shadow-md shadow-emerald-500/25 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bost AI Analytic</span>
        </button>
      </div>
    </div>
  );
};
