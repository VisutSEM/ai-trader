'use client';

import React from 'react';
import { Terminal, Copy, Check, ExternalLink } from 'lucide-react';

export const ZoqiraApiDocsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-10 text-center">
        <span className="lp-eyebrow">Developer Platform</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Zoqira <span className="text-gradient-gold">API Documentation</span>
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Connect your bots, Python scripts, and algorithmic execution desks directly to Zoqira's live intelligence feed.
        </p>
      </div>

      <div className="space-y-6">
        {/* Endpoint 1 */}
        <div className="rounded-2xl bg-[#080c16] border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 font-mono font-bold text-xs">
              GET
            </span>
            <span className="font-mono text-xs sm:text-sm text-white font-bold">
              https://zoqira.pro/api/markets
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Returns real-time ticker prices, 24h change, payout rates, and active spreads for all monitored assets.
          </p>
          <div className="mt-4 p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto">
            <pre>{`{
  "status": "success",
  "data": [
    { "symbol": "XAUUSD", "name": "Gold / USD", "price": 3625.54, "change_24h": -0.49, "payout_rate": 95 },
    { "symbol": "BTCUSDT", "name": "Bitcoin / USDT", "price": 60472.00, "change_24h": -1.58, "payout_rate": 90 }
  ]
}`}</pre>
          </div>
        </div>

        {/* Endpoint 2 */}
        <div className="rounded-2xl bg-[#080c16] border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 font-mono font-bold text-xs">
              GET
            </span>
            <span className="font-mono text-xs sm:text-sm text-white font-bold">
              https://zoqira.pro/api/trading/signals
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Returns current active AI trade setups including Entry, Stop Loss, Take Profit 1 &amp; 2, and risk/reward ratio.
          </p>
          <div className="mt-4 p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto">
            <pre>{`{
  "status": "success",
  "signals": [
    {
      "symbol": "XAUUSD",
      "action": "sell",
      "entry_price": 3998.40,
      "stop_loss": 4014.90,
      "take_profit_1": 3974.10,
      "risk_reward": "1:2.4",
      "timeframe": "15m",
      "verdict": "STRONG SELL"
    }
  ]
}`}</pre>
          </div>
        </div>

        {/* Endpoint 3 */}
        <div className="rounded-2xl bg-[#080c16] border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-amber-400/15 text-amber-300 font-mono font-bold text-xs">
              POST
            </span>
            <span className="font-mono text-xs sm:text-sm text-white font-bold">
              https://zoqira.pro/api/trading/orders/follow-signal
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            1-Click automated execution of a published signal into your linked demo or live trading wallet.
          </p>
          <div className="mt-4 p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto">
            <pre>{`// Request Body:
{
  "symbol": "XAUUSD",
  "action": "sell",
  "amount_usd": 100
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
