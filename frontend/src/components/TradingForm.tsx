'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, ArrowDown, ArrowUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MarketPair, WalletData } from '@/types/trading';

interface TradingFormProps {
  pair: MarketPair | null;
  wallet: WalletData | null;
  selectedPrice: number | null;
  onPlaceOrder: (order: {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'market' | 'limit';
    price?: number;
    amount: number;
  }) => Promise<void>;
}

export const TradingForm: React.FC<TradingFormProps> = ({
  pair,
  wallet,
  selectedPrice,
  onPlaceOrder,
}) => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync selected price from order book click
  useEffect(() => {
    if (selectedPrice && pair) {
      setPrice(selectedPrice.toString());
    } else if (pair && !price) {
      setPrice(pair.price.toString());
    }
  }, [selectedPrice, pair]);

  if (!pair) return null;

  const baseAsset = pair.base_asset;
  const quoteAsset = pair.quote_asset;

  // Available balances
  const baseWallet = wallet?.wallets.find(w => w.asset === baseAsset);
  const quoteWallet = wallet?.wallets.find(w => w.asset === quoteAsset || w.asset === 'USD' || w.asset === 'USDT');
  const availableBase = baseWallet ? baseWallet.free : 0;
  const availableQuote = quoteWallet ? quoteWallet.free : 0;

  const currentPrice = orderType === 'market' ? pair.price : parseFloat(price) || pair.price;
  const currentAmount = parseFloat(amount) || 0;
  const total = currentPrice * currentAmount;

  // Percentage slider clicks (25%, 50%, 75%, 100%)
  const handlePercentage = (pct: number) => {
    setPercentage(pct);
    if (side === 'buy') {
      const budget = availableQuote * (pct / 100);
      const computedAmount = currentPrice > 0 ? budget / currentPrice : 0;
      setAmount(computedAmount.toFixed(4));
    } else {
      const computedAmount = availableBase * (pct / 100);
      setAmount(computedAmount.toFixed(4));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (currentAmount <= 0) {
      setErrorMsg('Please enter a valid amount');
      return;
    }

    if (side === 'buy' && total > availableQuote) {
      setErrorMsg(`Insufficient ${quoteAsset}. Needed: $${total.toFixed(2)}, Available: $${availableQuote.toFixed(2)}`);
      return;
    }

    if (side === 'sell' && currentAmount > availableBase) {
      setErrorMsg(`Insufficient ${baseAsset}. Needed: ${currentAmount}, Available: ${availableBase}`);
      return;
    }

    setLoading(true);
    try {
      await onPlaceOrder({
        symbol: pair.symbol,
        side,
        type: orderType,
        price: orderType === 'limit' ? parseFloat(price) : undefined,
        amount: currentAmount,
      });

      setSuccessMsg(`${orderType.toUpperCase()} ${side.toUpperCase()} order placed!`);
      setAmount('');
      setPercentage(0);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error executing order';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b0f17] border-l border-[#1a2333] p-3 text-slate-100 flex flex-col h-full text-xs">
      {/* Side Selector (Buy / Sell) */}
      <div className="grid grid-cols-2 gap-1 p-0.5 bg-[#121824] rounded-xl mb-3 border border-[#1d2738]">
        <button
          onClick={() => {
            setSide('buy');
            setPercentage(0);
          }}
          className={`py-2 rounded-lg font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${
            side === 'buy'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Buy {baseAsset}</span>
        </button>
        <button
          onClick={() => {
            setSide('sell');
            setPercentage(0);
          }}
          className={`py-2 rounded-lg font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${
            side === 'sell'
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowDown className="w-3.5 h-3.5" />
          <span>Sell {baseAsset}</span>
        </button>
      </div>

      {/* Order Type (Limit vs Market) */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setOrderType('limit')}
          className={`px-3 py-1 rounded-md font-semibold transition ${
            orderType === 'limit'
              ? 'bg-[#1b2537] text-white border border-[#2b3b55]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setOrderType('market')}
          className={`px-3 py-1 rounded-md font-semibold transition ${
            orderType === 'market'
              ? 'bg-[#1b2537] text-white border border-[#2b3b55]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Market
        </button>
      </div>

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Price Field */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Order Price</span>
              <span>{quoteAsset}</span>
            </div>
            {orderType === 'limit' ? (
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="w-full bg-[#111722] border border-[#212c3f] rounded-lg px-3 py-2 text-xs font-mono text-white outline-none focus:border-emerald-500"
                  placeholder="0.00"
                />
              </div>
            ) : (
              <div className="w-full bg-[#111722] border border-[#212c3f] rounded-lg px-3 py-2 text-xs font-mono text-slate-400">
                Market Price (Best execution)
              </div>
            )}
          </div>

          {/* Amount Field */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Amount</span>
              <span>{baseAsset}</span>
            </div>
            <input
              type="number"
              step="any"
              value={amount}
              onChange={e => {
                setAmount(e.target.value);
                setPercentage(0);
              }}
              className="w-full bg-[#111722] border border-[#212c3f] rounded-lg px-3 py-2 text-xs font-mono text-white outline-none focus:border-emerald-500"
              placeholder="0.00"
            />
          </div>

          {/* Percentage Presets */}
          <div className="grid grid-cols-4 gap-1 pt-1">
            {[25, 50, 75, 100].map(pct => (
              <button
                type="button"
                key={pct}
                onClick={() => handlePercentage(pct)}
                className={`py-1 text-[11px] font-mono rounded border transition ${
                  percentage === pct
                    ? side === 'buy'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-[#121925] border-[#1f2b3e] text-slate-400 hover:text-slate-200'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>

          {/* Available Balance Info */}
          <div className="p-2.5 rounded-lg bg-[#0e141f] border border-[#1a2333] space-y-1 text-[11px] font-mono">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1 font-sans">
                <Wallet className="w-3 h-3" /> Available {quoteAsset}:
              </span>
              <span className="text-slate-200">${availableQuote.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-sans">Available {baseAsset}:</span>
              <span className="text-slate-200">{availableBase.toFixed(4)}</span>
            </div>
          </div>

          {/* Total Cost / Fee Preview */}
          <div className="p-2.5 rounded-lg bg-[#0e141f] border border-[#1a2333] space-y-1 text-[11px] font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-sans">Order Total:</span>
              <span className="font-bold text-white">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-sans text-[10px]">Trading Fee (0.00% Demo):</span>
              <span>$0.00</span>
            </div>
          </div>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || currentAmount <= 0}
          className={`w-full py-2.5 rounded-xl font-bold text-sm tracking-wide transition cursor-pointer shadow-lg disabled:opacity-50 ${
            side === 'buy'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:opacity-95 shadow-emerald-500/25'
              : 'bg-gradient-to-r from-rose-500 to-red-500 text-white hover:opacity-95 shadow-rose-500/25'
          }`}
        >
          {loading ? 'Processing Order...' : `${side.toUpperCase()} ${baseAsset}`}
        </button>
      </form>
    </div>
  );
};
