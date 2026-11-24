'use client';

import React, { useState } from 'react';
import { Search, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketPair, MarketCategory } from '@/types/trading';

interface MarketListSidebarProps {
  markets: MarketPair[];
  selectedPair: MarketPair | null;
  onSelectPair: (symbol: string) => void;
}

export const MarketListSidebar: React.FC<MarketListSidebarProps> = ({
  markets,
  selectedPair,
  onSelectPair,
}) => {
  const [category, setCategory] = useState<MarketCategory>('all');
  const [search, setSearch] = useState('');

  const categories: { id: MarketCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'commodities', label: 'Gold/Oil' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'forex', label: 'Forex' },
    { id: 'indices', label: 'Indices' },
  ];

  const filtered = markets.filter(m => {
    const matchesCategory = category === 'all' || m.category === category;
    const matchesSearch =
      search === '' ||
      m.symbol.toLowerCase().includes(search.toLowerCase()) ||
      m.display_name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0b0f17] border-r border-[#1a2333] flex flex-col h-full text-slate-100 select-none text-xs w-64 shrink-0">
      {/* Search Input */}
      <div className="p-2 border-b border-[#1a2333]">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#121925] rounded-lg border border-[#1e2a3c]">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search pair..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 p-1.5 border-b border-[#1a2333] overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-2 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition ${
              category === cat.id
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#141b27]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Market Pairs List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#131b27]">
        {filtered.map(pair => {
          const isSelected = selectedPair?.symbol === pair.symbol;
          const isPos = pair.change_24h >= 0;
          return (
            <div
              key={pair.symbol}
              onClick={() => onSelectPair(pair.symbol)}
              className={`flex items-center justify-between p-2.5 hover:bg-[#141d2c] cursor-pointer transition ${
                isSelected ? 'bg-[#182335] border-l-2 border-emerald-400' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#131a26] border border-[#202c40] flex items-center justify-center font-bold text-[10px] text-slate-300">
                  {pair.base_asset.slice(0, 3)}
                </div>
                <div>
                  <div className="font-semibold text-slate-100 flex items-center gap-1 text-[11px]">
                    <span>{pair.display_name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase">{pair.category}</div>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="font-bold text-slate-100 text-[11px]">
                  ${pair.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
                <div
                  className={`text-[10px] flex items-center justify-end gap-0.5 ${
                    isPos ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPos ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                  <span>
                    {isPos ? '+' : ''}
                    {pair.change_24h}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
