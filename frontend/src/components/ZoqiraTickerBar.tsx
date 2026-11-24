'use client';

import React from 'react';
import { MarketPair } from '@/types/trading';

interface ZoqiraTickerBarProps {
  markets?: MarketPair[];
  onSelectSymbol?: (symbol: string) => void;
}

export const ZoqiraTickerBar: React.FC<ZoqiraTickerBarProps> = ({
  markets = [],
  onSelectSymbol,
}) => {
  // Priority symbols matching Zoqira header
  const priority = ['XAUUSD', 'BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'EURUSD', 'GBPUSD', 'USOIL'];

  const displayList = priority.map((sym) => {
    const live = markets.find((m) => m.symbol === sym);
    if (live) {
      const isPos = live.change_24h >= 0;
      return {
        symbol: live.symbol,
        price: live.price.toLocaleString(undefined, {
          minimumFractionDigits: live.price < 10 ? 4 : 2,
          maximumFractionDigits: live.price < 10 ? 4 : 2,
        }),
        change: `${isPos ? '+' : ''}${live.change_24h.toFixed(2)}%`,
        isPositive: isPos,
        tag: sym === 'XAUUSD' || sym === 'EURUSD' || sym === 'GBPUSD' ? '~1 min' : sym === 'USOIL' ? 'delayed' : undefined,
      };
    }

    // Default reference values while connecting
    const defaults: Record<string, any> = {
      XAUUSD: { price: '3,625.54', change: '-0.49%', isPositive: false, tag: '~1 min' },
      BTCUSDT: { price: '60,362.00', change: '-1.80%', isPositive: false },
      ETHUSDT: { price: '1,692.28', change: '-1.71%', isPositive: false },
      SOLUSDT: { price: '71.47', change: '-1.31%', isPositive: false },
      EURUSD: { price: '1.0907', change: '+0.03%', isPositive: true, tag: '~1 min' },
      GBPUSD: { price: '1.3043', change: '+0.06%', isPositive: true, tag: '~1 min' },
      USOIL: { price: '79.72', change: '-0.56%', isPositive: false, tag: 'delayed' },
    };

    return {
      symbol: sym,
      ...(defaults[sym] || { price: '0.00', change: '0.00%', isPositive: true }),
    };
  });

  return (
    <div className="w-full bg-[#03060a] border-b border-white/5 px-4 lg:px-8 py-2 overflow-x-auto no-scrollbar select-none text-[11px] font-mono">
      <div className="flex items-center gap-8 whitespace-nowrap min-w-max">
        {displayList.map((t) => (
          <div
            key={t.symbol}
            onClick={() => onSelectSymbol && onSelectSymbol(t.symbol)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition group"
          >
            <span className="font-bold text-slate-200 group-hover:text-amber-300 transition">
              {t.symbol}
            </span>
            <span className="text-slate-100 font-semibold">{t.price}</span>
            <span className={t.isPositive ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
              {t.change}
            </span>
            {t.tag && (
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded border ${
                  t.tag === 'LIVE'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    : 'text-slate-400 bg-white/5 border-white/10'
                }`}
              >
                {t.tag}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
