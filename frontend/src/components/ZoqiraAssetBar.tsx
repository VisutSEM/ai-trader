'use client';

import React from 'react';
import { MarketPair } from '@/types/trading';
import { Plus, Flame } from 'lucide-react';

interface ZoqiraAssetBarProps {
  markets: MarketPair[];
  selectedPair: MarketPair | null;
  onSelectPair: (symbol: string) => void;
  onOpenScreener: () => void;
}

export const ZoqiraAssetBar: React.FC<ZoqiraAssetBarProps> = ({
  markets,
  selectedPair,
  onSelectPair,
  onOpenScreener,
}) => {
  // Priority display: Gold first, then high payout crypto/forex
  const prioritySymbols = ['XAUUSD', 'BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'EURUSD', 'NVDAUSD', 'SPXUSD'];
  const topMarkets = markets
    .slice()
    .sort((a, b) => {
      const idxA = prioritySymbols.indexOf(a.symbol);
      const idxB = prioritySymbols.indexOf(b.symbol);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    })
    .slice(0, 8);

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#090d14] border-b border-[#162030] overflow-x-auto no-scrollbar select-none text-xs">
      {topMarkets.map(m => {
        const isSelected = selectedPair?.symbol === m.symbol;
        const payout = m.payout_rate || (m.symbol.includes('XAU') ? 95 : 90);
        const isGold = m.symbol.includes('XAU');

        return (
          <button
            key={m.symbol}
            onClick={() => onSelectPair(m.symbol)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 border ${
              isSelected
                ? 'bg-[#152033] border-emerald-500/50 text-white shadow-md'
                : 'bg-[#0e141f] border-[#1a2536] text-slate-400 hover:text-slate-200 hover:bg-[#121927]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {isGold && <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />}
              <span className="font-bold text-xs">{m.display_name}</span>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                isSelected
                  ? 'bg-emerald-500 text-black'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {payout}%
            </span>
          </button>
        );
      })}

      {/* Add / Browse More Markets */}
      <button
        onClick={onOpenScreener}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0e141f] border border-dashed border-[#233148] text-slate-400 hover:text-white hover:border-emerald-500/50 transition cursor-pointer shrink-0 text-xs"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>More Markets</span>
      </button>
    </div>
  );
};
