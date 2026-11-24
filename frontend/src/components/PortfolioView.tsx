'use client';

import React from 'react';
import {
  Wallet,
  RotateCcw,
  TrendingUp,
  PieChart,
  ShieldCheck,
  DollarSign,
} from 'lucide-react';
import { WalletData, MarketPair } from '@/types/trading';

interface PortfolioViewProps {
  wallet: WalletData | null;
  markets: MarketPair[];
  onResetWallet: () => void;
  onSelectPair: (symbol: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  wallet,
  markets,
  onResetWallet,
  onSelectPair,
}) => {
  if (!wallet) return null;

  const totalWorth = wallet.total_usd_value;

  return (
    <div className="flex-1 bg-[#0a0e16] text-slate-100 p-6 overflow-y-auto">
      {/* Portfolio Top Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121927] via-[#162134] to-[#121a28] border border-[#23324a] shadow-2xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>Total Demo Portfolio Net Worth</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            ${totalWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12.4% (All Time PnL)
            </span>
            <span className="text-slate-500">• Simulated Trading Environment</span>
          </div>
        </div>

        <button
          onClick={onResetWallet}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a2537] hover:bg-[#223149] border border-[#2d3f5d] text-xs font-bold text-slate-200 transition cursor-pointer self-start md:self-auto"
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span>Reset Demo Funds ($50K USD + Gold + Crypto)</span>
        </button>
      </div>

      {/* Asset Distribution Breakdown */}
      <h2 className="text-lg font-bold text-white mb-3">Asset Distribution</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {wallet.wallets.map(w => {
          const pct = ((w.usd_value / (totalWorth || 1)) * 100).toFixed(1);
          return (
            <div
              key={w.asset}
              className="p-4 rounded-2xl bg-[#0e1420] border border-[#1f2b3e] shadow-lg flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#162030] border border-[#27354d] flex items-center justify-center font-bold text-xs text-emerald-400">
                    {w.asset}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{w.asset}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      @ ${w.usd_price.toLocaleString()}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {pct}%
                </span>
              </div>

              <div>
                <div className="text-xs text-slate-400 font-sans">Holdings:</div>
                <div className="text-base font-extrabold font-mono text-white">
                  {w.free.toLocaleString(undefined, { maximumFractionDigits: 4 })} {w.asset}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  ≈ ${w.usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#182333] h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
