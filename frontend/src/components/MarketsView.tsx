'use client';

import React, { useState } from 'react';
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Filter,
  DollarSign,
} from 'lucide-react';
import { MarketPair, MarketCategory } from '@/types/trading';

interface MarketsViewProps {
  markets: MarketPair[];
  onSelectPair: (symbol: string) => void;
}

export const MarketsView: React.FC<MarketsViewProps> = ({ markets, onSelectPair }) => {
  const [category, setCategory] = useState<MarketCategory>('all');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'volume_24h' | 'price' | 'change_24h'>('volume_24h');
  const [sortAsc, setSortAsc] = useState(false);

  const categories: { id: MarketCategory; label: string }[] = [
    { id: 'all', label: 'All Markets' },
    { id: 'commodities', label: 'Commodities (Gold/Silver/Oil)' },
    { id: 'crypto', label: 'Cryptocurrency' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'forex', label: 'Forex' },
    { id: 'indices', label: 'Indices' },
  ];

  const filtered = markets
    .filter(m => {
      const matchCat = category === 'all' || m.category === category;
      const matchSearch =
        search === '' ||
        m.symbol.toLowerCase().includes(search.toLowerCase()) ||
        m.display_name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return sortAsc ? valA - valB : valB - valA;
    });

  const handleSort = (field: 'volume_24h' | 'price' | 'change_24h') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="flex-1 bg-[#0a0e16] text-slate-100 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Markets Screener</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time market quotes for Commodities (Gold, Silver, Crude Oil), Crypto, Stocks, and Forex.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search symbol (e.g. Gold, XAU, BTC, NVDA)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#101724] border border-[#1f2b3e] rounded-xl text-xs text-white outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition ${
              category === c.id
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20 font-bold'
                : 'bg-[#101724] border border-[#1f2b3e] text-slate-400 hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Markets Table */}
      <div className="rounded-2xl bg-[#0e1420] border border-[#1f2b3e] overflow-hidden shadow-2xl">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="text-[11px] text-slate-400 bg-[#121927] border-b border-[#1f2b3e]">
              <th className="px-4 py-3 font-sans font-bold">Pair</th>
              <th className="px-4 py-3 font-sans font-bold cursor-pointer" onClick={() => handleSort('price')}>
                Price {sortField === 'price' && (sortAsc ? '▲' : '▼')}
              </th>
              <th className="px-4 py-3 font-sans font-bold cursor-pointer" onClick={() => handleSort('change_24h')}>
                24h Change {sortField === 'change_24h' && (sortAsc ? '▲' : '▼')}
              </th>
              <th className="px-4 py-3 font-sans font-bold">24h High</th>
              <th className="px-4 py-3 font-sans font-bold">24h Low</th>
              <th className="px-4 py-3 font-sans font-bold cursor-pointer" onClick={() => handleSort('volume_24h')}>
                24h Volume {sortField === 'volume_24h' && (sortAsc ? '▲' : '▼')}
              </th>
              <th className="px-4 py-3 font-sans font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#172132]">
            {filtered.map(m => {
              const isPos = m.change_24h >= 0;
              return (
                <tr
                  key={m.symbol}
                  onClick={() => onSelectPair(m.symbol)}
                  className="hover:bg-[#141d2c] cursor-pointer transition group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#182233] border border-[#233149] flex items-center justify-center font-bold text-xs text-emerald-400">
                        {m.base_asset.slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-emerald-400 transition font-sans">
                          {m.display_name}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase">{m.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-white">
                    ${m.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        isPos ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {isPos ? '+' : ''}
                      {m.change_24h}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">${m.high_24h.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-300">${m.low_24h.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-300">
                    ${m.volume_24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onSelectPair(m.symbol);
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-sans font-bold text-xs transition"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
