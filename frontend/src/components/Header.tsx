'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  Zap,
  Wallet,
  RotateCcw,
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { WalletData, MarketPair } from '@/types/trading';

interface HeaderProps {
  wallet: WalletData | null;
  markets: MarketPair[];
  activeTab: 'terminal' | 'signals' | 'markets' | 'portfolio';
  setActiveTab: (tab: 'terminal' | 'signals' | 'markets' | 'portfolio') => void;
  onSelectPair: (symbol: string) => void;
  onResetWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  wallet,
  markets,
  activeTab,
  setActiveTab,
  onSelectPair,
  onResetWallet,
}) => {
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const topTickers = markets.slice(0, 6);

  const filteredMarkets = searchQuery
    ? markets.filter(
        m =>
          m.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.display_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : markets;

  return (
    <header className="border-b border-[#1e293b] bg-[#0c1017] text-slate-100 select-none">
      {/* Top Ticker Marquee Bar */}
      <div className="flex items-center gap-6 px-4 py-1.5 text-xs border-b border-[#161f2e] bg-[#090d14] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider shrink-0">
          <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span>Live Markets</span>
        </div>
        <div className="flex items-center gap-6 divide-x divide-[#1e293b] whitespace-nowrap">
          {topTickers.map(m => {
            const isPos = m.change_24h >= 0;
            return (
              <button
                key={m.symbol}
                onClick={() => onSelectPair(m.symbol)}
                className="pl-6 first:pl-0 flex items-center gap-2 hover:opacity-80 transition cursor-pointer"
              >
                <span className="font-semibold text-slate-300">{m.display_name}</span>
                <span className="font-mono text-slate-100">
                  ${m.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </span>
                <span
                  className={`text-[11px] font-mono px-1 py-0.5 rounded ${
                    isPos ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {isPos ? '+' : ''}
                  {m.change_24h}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <div
            onClick={() => setActiveTab('terminal')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition">
              <div className="w-full h-full bg-[#0c1017] rounded-[10px] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  BOST<span className="text-emerald-400">TRADER</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  PRO
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'terminal'
                  ? 'bg-[#1b2434] text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#131924]'
              }`}
            >
              Terminal
            </button>
            <button
              onClick={() => setActiveTab('signals')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'signals'
                  ? 'bg-[#1b2434] text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#131924]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Signals Follow</span>
              <span className="text-[10px] bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold px-1.5 py-0.2 rounded-full">
                78% WIN
              </span>
            </button>
            <button
              onClick={() => setActiveTab('markets')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'markets'
                  ? 'bg-[#1b2434] text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#131924]'
              }`}
            >
              Markets Screener
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'portfolio'
                  ? 'bg-[#1b2434] text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#131924]'
              }`}
            >
              Portfolio & Assets
            </button>
          </nav>
        </div>

        {/* Right Action Tools: Search, Demo Balance, Status */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <button
            onClick={() => setShowSearchModal(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141b27] border border-[#1e293b] text-xs text-slate-400 hover:text-slate-200 hover:border-slate-600 transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Market (Gold, BTC, NVDA...)</span>
            <kbd className="px-1.5 py-0.5 bg-[#090d14] text-slate-400 text-[10px] rounded border border-[#1e293b]">
              /
            </kbd>
          </button>

          {/* Backend Status indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111824] border border-[#1f293d] text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            <span>Laravel Backend Active</span>
          </div>

          {/* Demo Wallet Account Pill */}
          <div className="relative">
            <button
              onClick={() => setShowWalletMenu(!showWalletMenu)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-gradient-to-b from-[#1b2434] to-[#121926] border border-[#27354d] hover:border-emerald-500/50 transition cursor-pointer shadow-sm"
            >
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wallet className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 leading-none">Demo Balance</div>
                <div className="text-xs font-bold font-mono text-slate-100">
                  ${wallet ? wallet.total_usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '308,290.54'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {/* Wallet Dropdown */}
            {showWalletMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#0f1521] border border-[#27354d] shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
                  <span className="text-xs font-bold text-slate-200">Asset Balances</span>
                  <button
                    onClick={() => {
                      onResetWallet();
                      setShowWalletMenu(false);
                    }}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Funds</span>
                  </button>
                </div>
                <div className="py-2 space-y-1.5 max-h-56 overflow-y-auto">
                  {wallet?.wallets.map(w => (
                    <div
                      key={w.asset}
                      className="flex items-center justify-between text-xs px-2 py-1 rounded bg-[#151c2a]"
                    >
                      <span className="font-semibold text-slate-200">{w.asset}</span>
                      <div className="text-right font-mono">
                        <div className="text-slate-100">
                          {w.free.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                        </div>
                        <div className="text-[10px] text-slate-400">${w.usd_value.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#1e293b] text-center">
                  <div className="text-[11px] text-slate-400">Total Net Worth</div>
                  <div className="text-sm font-bold font-mono text-emerald-400">
                    ${wallet?.total_usd_value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="w-full max-w-lg bg-[#0f1521] border border-[#27354d] rounded-2xl p-4 shadow-2xl space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-[#171f2e] rounded-xl border border-[#2d3c56]">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search Gold (XAU), Bitcoin (BTC), NVIDIA, Forex..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>
            <div className="max-h-72 overflow-y-auto space-y-1">
              {filteredMarkets.map(m => (
                <div
                  key={m.symbol}
                  onClick={() => {
                    onSelectPair(m.symbol);
                    setShowSearchModal(false);
                    setSearchQuery('');
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1b2536] transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#141d2c] flex items-center justify-center text-xs font-bold text-slate-300">
                      {m.base_asset.slice(0, 3)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100">{m.display_name}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{m.category}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-semibold text-slate-100">${m.price.toLocaleString()}</div>
                    <div
                      className={`text-[10px] ${m.change_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                    >
                      {m.change_24h >= 0 ? '+' : ''}
                      {m.change_24h}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
