'use client';

import React, { useState } from 'react';
import {
  Clock,
  CheckCircle,
  FileText,
  PieChart,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Order, Trade, WalletData } from '@/types/trading';

interface BottomPanelProps {
  orders: Order[];
  trades: Trade[];
  wallet: WalletData | null;
  onCancelOrder: (id: number) => Promise<void>;
}

export const BottomPanel: React.FC<BottomPanelProps> = ({
  orders,
  trades,
  wallet,
  onCancelOrder,
}) => {
  const [tab, setTab] = useState<'open' | 'history' | 'trades' | 'assets'>('open');
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const openOrders = orders.filter(o => o.status === 'open');
  const orderHistory = orders.filter(o => o.status !== 'open');

  const handleCancel = async (id: number) => {
    setCancellingId(id);
    try {
      await onCancelOrder(id);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="bg-[#0b0f17] border-t border-[#1a2333] flex flex-col h-56 text-slate-100 select-none text-xs">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-3 h-9 border-b border-[#1a2333] bg-[#0d131d]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab('open')}
            className={`px-3 py-1 font-semibold rounded-md transition flex items-center gap-1.5 ${
              tab === 'open'
                ? 'bg-[#182232] text-emerald-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Open Orders ({openOrders.length})</span>
          </button>
          <button
            onClick={() => setTab('history')}
            className={`px-3 py-1 font-semibold rounded-md transition flex items-center gap-1.5 ${
              tab === 'history'
                ? 'bg-[#182232] text-emerald-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Order History</span>
          </button>
          <button
            onClick={() => setTab('trades')}
            className={`px-3 py-1 font-semibold rounded-md transition flex items-center gap-1.5 ${
              tab === 'trades'
                ? 'bg-[#182232] text-emerald-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Executed Trades</span>
          </button>
          <button
            onClick={() => setTab('assets')}
            className={`px-3 py-1 font-semibold rounded-md transition flex items-center gap-1.5 ${
              tab === 'assets'
                ? 'bg-[#182232] text-emerald-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Asset Balances</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'open' && (
          <div>
            {openOrders.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No open orders currently.</div>
            ) : (
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="text-[10px] text-slate-500 border-b border-[#141b27]">
                    <th className="px-3 py-1.5 font-sans">Market</th>
                    <th className="px-3 py-1.5 font-sans">Type</th>
                    <th className="px-3 py-1.5 font-sans">Side</th>
                    <th className="px-3 py-1.5 font-sans">Price</th>
                    <th className="px-3 py-1.5 font-sans">Amount</th>
                    <th className="px-3 py-1.5 font-sans">Total</th>
                    <th className="px-3 py-1.5 font-sans text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131a26]">
                  {openOrders.map(o => (
                    <tr key={o.id} className="hover:bg-[#141d2c]">
                      <td className="px-3 py-1.5 font-sans font-bold text-slate-200">{o.symbol}</td>
                      <td className="px-3 py-1.5 uppercase text-slate-400">{o.type}</td>
                      <td className="px-3 py-1.5">
                        <span
                          className={`font-bold ${
                            o.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {o.side.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-slate-200">${o.price.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-slate-200">{o.amount}</td>
                      <td className="px-3 py-1.5 text-slate-200">${o.total.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-right font-sans">
                        <button
                          onClick={() => handleCancel(o.id)}
                          disabled={cancellingId === o.id}
                          className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 hover:bg-rose-500/30 transition text-[11px] cursor-pointer"
                        >
                          {cancellingId === o.id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div>
            {orderHistory.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No past orders.</div>
            ) : (
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="text-[10px] text-slate-500 border-b border-[#141b27]">
                    <th className="px-3 py-1.5 font-sans">Market</th>
                    <th className="px-3 py-1.5 font-sans">Type</th>
                    <th className="px-3 py-1.5 font-sans">Side</th>
                    <th className="px-3 py-1.5 font-sans">Price</th>
                    <th className="px-3 py-1.5 font-sans">Amount</th>
                    <th className="px-3 py-1.5 font-sans">Total</th>
                    <th className="px-3 py-1.5 font-sans">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131a26]">
                  {orderHistory.map(o => (
                    <tr key={o.id} className="hover:bg-[#141d2c]">
                      <td className="px-3 py-1.5 font-sans font-bold text-slate-200">{o.symbol}</td>
                      <td className="px-3 py-1.5 uppercase text-slate-400">{o.type}</td>
                      <td className="px-3 py-1.5">
                        <span
                          className={`font-bold ${
                            o.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {o.side.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-slate-200">${o.price.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-slate-200">{o.amount}</td>
                      <td className="px-3 py-1.5 text-slate-200">${o.total.toLocaleString()}</td>
                      <td className="px-3 py-1.5 font-sans uppercase text-[10px]">
                        <span
                          className={`px-1.5 py-0.5 rounded font-semibold ${
                            o.status === 'filled'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'trades' && (
          <div>
            {trades.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No trades executed yet.</div>
            ) : (
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="text-[10px] text-slate-500 border-b border-[#141b27]">
                    <th className="px-3 py-1.5 font-sans">Symbol</th>
                    <th className="px-3 py-1.5 font-sans">Side</th>
                    <th className="px-3 py-1.5 font-sans">Price</th>
                    <th className="px-3 py-1.5 font-sans">Amount</th>
                    <th className="px-3 py-1.5 font-sans">Total USD</th>
                    <th className="px-3 py-1.5 font-sans">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131a26]">
                  {trades.slice(0, 15).map(t => (
                    <tr key={t.id} className="hover:bg-[#141d2c]">
                      <td className="px-3 py-1.5 font-sans font-bold text-slate-200">{t.symbol}</td>
                      <td className="px-3 py-1.5">
                        <span
                          className={`font-bold ${
                            t.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {t.side.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-slate-200">${t.price.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-slate-200">{t.amount}</td>
                      <td className="px-3 py-1.5 text-slate-200">${t.total.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-slate-500 text-[10px]">
                        {new Date(t.executed_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'assets' && (
          <div className="p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {wallet?.wallets.map(w => {
                const totalWorth = wallet.total_usd_value || 1;
                const pct = ((w.usd_value / totalWorth) * 100).toFixed(1);
                return (
                  <div
                    key={w.asset}
                    className="p-2.5 rounded-xl bg-[#111722] border border-[#1e2a3c] space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{w.asset}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">{pct}%</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-100">
                      {w.free.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">${w.usd_value.toLocaleString()}</div>
                    <div className="w-full bg-[#182333] h-1 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
