'use client';

import React, { useState } from 'react';
import { ArrowUp, ArrowDown, BookOpen, Clock } from 'lucide-react';
import { OrderBook, Trade } from '@/types/trading';

interface OrderBookProps {
  orderBook: OrderBook | null;
  trades: Trade[];
  baseAsset: string;
  quoteAsset: string;
  onSelectPrice: (price: number) => void;
}

export const OrderBookComponent: React.FC<OrderBookProps> = ({
  orderBook,
  trades,
  baseAsset,
  quoteAsset,
  onSelectPrice,
}) => {
  const [tab, setTab] = useState<'book' | 'trades'>('book');

  if (!orderBook) return null;

  const maxAskCum = orderBook.asks.length > 0 ? orderBook.asks[0].cumulative : 1;
  const maxBidCum = orderBook.bids.length > 0 ? orderBook.bids[orderBook.bids.length - 1].cumulative : 1;
  const maxCum = Math.max(maxAskCum, maxBidCum, 1);

  return (
    <div className="bg-[#0b0f17] border-r border-[#1a2333] flex flex-col h-full text-slate-100 select-none text-xs">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-3 h-9 border-b border-[#1a2333] bg-[#0d131d]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab('book')}
            className={`px-2.5 py-1 font-semibold rounded-md transition flex items-center gap-1.5 ${
              tab === 'book'
                ? 'bg-[#182232] text-emerald-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Order Book</span>
          </button>
          <button
            onClick={() => setTab('trades')}
            className={`px-2.5 py-1 font-semibold rounded-md transition flex items-center gap-1.5 ${
              tab === 'trades'
                ? 'bg-[#182232] text-emerald-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Recent Trades</span>
          </button>
        </div>
      </div>

      {tab === 'book' ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Column Titles */}
          <div className="grid grid-cols-3 px-3 py-1.5 text-[10px] text-slate-500 font-mono border-b border-[#141b27]">
            <span>Price ({quoteAsset})</span>
            <span className="text-right">Size ({baseAsset})</span>
            <span className="text-right">Total</span>
          </div>

          {/* Asks (Sells - Red) */}
          <div className="flex-1 flex flex-col justify-end overflow-hidden py-1">
            {orderBook.asks.slice(-9).map((ask, idx) => {
              const depthPct = Math.min(100, (ask.cumulative / maxCum) * 100);
              return (
                <div
                  key={idx}
                  onClick={() => onSelectPrice(ask.price)}
                  className="relative grid grid-cols-3 px-3 py-0.5 font-mono text-[11px] hover:bg-rose-500/10 cursor-pointer group"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-rose-500/15 pointer-events-none transition-all"
                    style={{ width: `${depthPct}%` }}
                  />
                  <span className="relative text-rose-400 font-semibold group-hover:underline">
                    {ask.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                  </span>
                  <span className="relative text-right text-slate-300">
                    {ask.amount.toFixed(4)}
                  </span>
                  <span className="relative text-right text-slate-400">
                    ${ask.total.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mid Price & Spread Bar */}
          <div className="px-3 py-1.5 my-0.5 bg-[#101724] border-y border-[#182232] flex items-center justify-between font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-white">
                ${orderBook.last_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </span>
              <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-[10px] text-slate-400">Spread: {orderBook.spread.toFixed(4)}</span>
          </div>

          {/* Bids (Buys - Green) */}
          <div className="flex-1 flex flex-col overflow-hidden py-1">
            {orderBook.bids.slice(0, 9).map((bid, idx) => {
              const depthPct = Math.min(100, (bid.cumulative / maxCum) * 100);
              return (
                <div
                  key={idx}
                  onClick={() => onSelectPrice(bid.price)}
                  className="relative grid grid-cols-3 px-3 py-0.5 font-mono text-[11px] hover:bg-emerald-500/10 cursor-pointer group"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-emerald-500/15 pointer-events-none transition-all"
                    style={{ width: `${depthPct}%` }}
                  />
                  <span className="relative text-emerald-400 font-semibold group-hover:underline">
                    {bid.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                  </span>
                  <span className="relative text-right text-slate-300">
                    {bid.amount.toFixed(4)}
                  </span>
                  <span className="relative text-right text-slate-400">
                    ${bid.total.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Recent Trades Stream */
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="grid grid-cols-3 px-3 py-1.5 text-[10px] text-slate-500 font-mono border-b border-[#141b27]">
            <span>Price</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Time</span>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {trades.map(t => {
              const date = new Date(t.executed_at);
              const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
              const isBuy = t.side === 'buy';
              return (
                <div
                  key={t.id}
                  className="grid grid-cols-3 px-3 py-1 font-mono text-[11px] hover:bg-[#141d2a]"
                >
                  <span className={`font-semibold ${isBuy ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ${t.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                  </span>
                  <span className="text-right text-slate-300">{t.amount.toFixed(4)}</span>
                  <span className="text-right text-slate-500 text-[10px]">{timeStr}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
