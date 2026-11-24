'use client';

import React from 'react';
import { QuickTrade } from '@/types/trading';
import { TrendingUp, TrendingDown, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface ActiveTradesOverlayProps {
  activeTrades: QuickTrade[];
  completedTrade: QuickTrade | null;
  onDismissCompleted: () => void;
  currentPrice: number;
}

export const ActiveTradesOverlay: React.FC<ActiveTradesOverlayProps> = ({
  activeTrades,
  completedTrade,
  onDismissCompleted,
  currentPrice,
}) => {
  return (
    <>
      {/* Active Trades Floating HUD on Bottom-Right of Chart */}
      {activeTrades.length > 0 && (
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
          {activeTrades.map(trade => {
            const isProfit =
              trade.direction === 'up'
                ? currentPrice >= trade.entryPrice
                : currentPrice <= trade.entryPrice;
            const potentialProfit = trade.amount * (trade.payoutPercent / 100);

            return (
              <div
                key={trade.id}
                className={`p-3 rounded-2xl backdrop-blur-md border shadow-2xl transition-all duration-300 w-64 ${
                  isProfit
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                    : 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <div className="flex items-center gap-1.5">
                    {trade.direction === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-rose-400" />
                    )}
                    <span>
                      {trade.direction.toUpperCase()} ${trade.amount}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 font-mono text-[11px] text-white">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{trade.remainingSeconds}s</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mt-1">
                  <span>Entry: ${trade.entryPrice.toFixed(2)}</span>
                  <span className={`font-bold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isProfit ? `+${potentialProfit.toFixed(2)} USD` : '-$0.00'}
                  </span>
                </div>

                {/* Progress countdown bar */}
                <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      isProfit ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}
                    style={{
                      width: `${(trade.remainingSeconds / trade.durationSeconds) * 100}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trade Result Celebration Modal */}
      {completedTrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div
            className={`w-full max-w-sm p-6 rounded-3xl border shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200 ${
              completedTrade.status === 'won'
                ? 'bg-gradient-to-b from-[#0f241a] to-[#0a1510] border-emerald-500/50'
                : 'bg-gradient-to-b from-[#241215] to-[#150a0c] border-rose-500/50'
            }`}
          >
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-lg">
              {completedTrade.status === 'won' ? (
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40">
                  <XCircle className="w-9 h-9" />
                </div>
              )}
            </div>

            <div>
              <div
                className={`text-xl font-black tracking-tight ${
                  completedTrade.status === 'won' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {completedTrade.status === 'won' ? 'PROFIT WON!' : 'TRADE EXPIRED'}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {completedTrade.display_name} • {completedTrade.direction.toUpperCase()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono space-y-1.5">
              <div className="text-xs text-slate-400 font-sans">
                {completedTrade.status === 'won' ? 'Net Payout Credited:' : 'Investment:'}
              </div>
              <div
                className={`text-3xl font-black ${
                  completedTrade.status === 'won' ? 'text-emerald-400' : 'text-slate-400 line-through'
                }`}
              >
                ${completedTrade.status === 'won' ? completedTrade.payoutAmount.toFixed(2) : completedTrade.amount.toFixed(2)}
              </div>
            </div>

            <button
              onClick={onDismissCompleted}
              className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide cursor-pointer transition shadow-lg ${
                completedTrade.status === 'won'
                  ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-emerald-500/25'
                  : 'bg-rose-500 text-white hover:bg-rose-400 shadow-rose-500/25'
              }`}
            >
              Continue Trading
            </button>
          </div>
        </div>
      )}
    </>
  );
};
