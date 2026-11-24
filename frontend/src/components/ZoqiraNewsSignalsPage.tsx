'use client';

import React from 'react';
import { Radio, TrendingUp, AlertTriangle, ExternalLink, Calendar, Zap } from 'lucide-react';

interface ZoqiraNewsSignalsPageProps {
  onTradeSymbol: (symbol: string) => void;
}

export const ZoqiraNewsSignalsPage: React.FC<ZoqiraNewsSignalsPageProps> = ({
  onTradeSymbol,
}) => {
  const newsItems = [
    {
      id: 1,
      time: '12 mins ago',
      impact: 'HIGH',
      symbol: 'XAUUSD',
      title: 'US Core PCE Price Index Rises 0.2% MoM, In-Line with Forecasts',
      summary: 'Inflation metrics confirm Fed rate cut trajectory. US 10-year Treasury yields pull back 4 bps to 4.18%, triggering immediate bid on Gold towards $3,635 resistance.',
      sentiment: 'BULLISH',
      confidence: '94%',
      action: 'BUY',
    },
    {
      id: 2,
      time: '42 mins ago',
      impact: 'HIGH',
      symbol: 'BTCUSDT',
      title: 'Spot Bitcoin ETF Net Inflows Exceed $420M in Single Session',
      summary: 'Institutional accumulation accelerates ahead of options expiry. Derivative open interest indicates gamma squeeze potential above $62,000.',
      sentiment: 'BULLISH',
      confidence: '91%',
      action: 'BUY',
    },
    {
      id: 3,
      time: '2 hours ago',
      impact: 'MEDIUM',
      symbol: 'EURUSD',
      title: 'ECB Reaffirms Gradual Easing Path Amid German Industrial Recovery',
      summary: 'Euro gains support against USD as European manufacturing indices surprise to the upside. Resistance noted at 1.0940.',
      sentiment: 'NEUTRAL',
      confidence: '78%',
      action: 'HOLD',
    },
    {
      id: 4,
      time: '3 hours ago',
      impact: 'HIGH',
      symbol: 'USOIL',
      title: 'OPEC+ Signals Production Extension as Middle East Shipping Halts',
      summary: 'Strait of Hormuz transit alerts trigger crude supply risk premium. WTI crude re-tests $80.50 resistance channel.',
      sentiment: 'BULLISH',
      confidence: '89%',
      action: 'BUY',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="lp-eyebrow">Real-Time Newsdesk</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          AI News <span className="text-gradient-gold">Sentiment Signals</span>
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          High-impact macroeconomic catalysts and central bank policy filtered through LLM reasoning to confirm technical setups.
        </p>
      </div>

      {/* Global Macro Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="rounded-2xl bg-[#090d18] border border-white/10 p-5">
          <p className="text-xs text-slate-400 font-medium">Gold / Safe-Haven Bias</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-emerald-400 font-mono">+74% Bullish</span>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">
              STRONG BID
            </span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full w-[74%]" />
          </div>
        </div>

        <div className="rounded-2xl bg-[#090d18] border border-white/10 p-5">
          <p className="text-xs text-slate-400 font-medium">Crypto Sentiment</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-amber-300 font-mono">+68% Greed</span>
            <span className="px-2 py-1 bg-amber-400/10 text-amber-300 text-xs font-bold rounded-lg border border-amber-400/20">
              ACCUMULATION
            </span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-400 h-full w-[68%]" />
          </div>
        </div>

        <div className="rounded-2xl bg-[#090d18] border border-white/10 p-5">
          <p className="text-xs text-slate-400 font-medium">US Dollar Index (DXY)</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-red-400 font-mono">-58% Weak</span>
            <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/20">
              BEARISH BIAS
            </span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-red-400 h-full w-[58%]" />
          </div>
        </div>
      </div>

      {/* News Feeds List */}
      <div className="space-y-4">
        {newsItems.map((news) => (
          <div
            key={news.id}
            className="rounded-2xl bg-[#080c16] border border-white/10 p-6 hover:border-amber-400/30 transition shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 font-mono font-bold text-xs text-amber-300">
                  {news.symbol}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/20">
                  {news.impact} IMPACT
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {news.time}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">AI Confidence:</span>
                <span className="font-mono text-xs font-bold text-emerald-400">{news.confidence}</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mt-4 tracking-tight">
              {news.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-normal">
              {news.summary}
            </p>

            <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">News Sentiment:</span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    news.sentiment === 'BULLISH'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-700/40 text-slate-300'
                  }`}
                >
                  {news.sentiment}
                </span>
              </div>

              <button
                onClick={() => onTradeSymbol(news.symbol)}
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition cursor-pointer flex items-center gap-1.5 shadow"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Trade {news.symbol}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
