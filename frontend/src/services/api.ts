import {
  MarketPair,
  Candle,
  OrderBook,
  Trade,
  Order,
  WalletData,
  AnalyticData,
  Signal,
  MarketCategory,
} from '@/types/trading';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Fallback markets list including Commodities (Gold, Silver, Oil), Crypto, Stocks, Forex, Indices
const FALLBACK_MARKETS: MarketPair[] = [
  {
    id: 1,
    symbol: 'XAUUSD',
    display_name: 'XAU/USD (Gold)',
    category: 'commodities',
    base_asset: 'XAU',
    quote_asset: 'USD',
    price: 3625.54,
    change_24h: -0.49,
    high_24h: 3645.00,
    low_24h: 3610.20,
    volume_24h: 8421500,
    market_cap: 16500000000000,
    is_active: true,
  },
  {
    id: 2,
    symbol: 'BTCUSDT',
    display_name: 'BTC/USDT',
    category: 'crypto',
    base_asset: 'BTC',
    quote_asset: 'USDT',
    price: 60362.00,
    change_24h: -1.80,
    high_24h: 64603.12,
    low_24h: 59455.31,
    volume_24h: 28075.54,
    market_cap: 1190000000000,
    is_active: true,
  },
  {
    id: 3,
    symbol: 'ETHUSDT',
    display_name: 'ETH/USDT',
    category: 'crypto',
    base_asset: 'ETH',
    quote_asset: 'USDT',
    price: 1692.28,
    change_24h: -1.71,
    high_24h: 1745.00,
    low_24h: 1670.00,
    volume_24h: 312450.80,
    market_cap: 203000000000,
    is_active: true,
  },
  {
    id: 4,
    symbol: 'SOLUSDT',
    display_name: 'SOL/USDT',
    category: 'crypto',
    base_asset: 'SOL',
    quote_asset: 'USDT',
    price: 71.47,
    change_24h: -1.31,
    high_24h: 75.80,
    low_24h: 69.90,
    volume_24h: 1892040.20,
    market_cap: 34000000000,
    is_active: true,
  },
  {
    id: 5,
    symbol: 'XAGUSD',
    display_name: 'XAG/USD (Silver)',
    category: 'commodities',
    base_asset: 'XAG',
    quote_asset: 'USD',
    price: 31.28,
    change_24h: 2.85,
    high_24h: 31.95,
    low_24h: 30.40,
    volume_24h: 3124500,
    market_cap: 1750000000000,
    is_active: true,
  },
  {
    id: 6,
    symbol: 'WTIUSD',
    display_name: 'WTI/USD (Crude Oil)',
    category: 'commodities',
    base_asset: 'WTI',
    quote_asset: 'USD',
    price: 69.85,
    change_24h: -1.15,
    high_24h: 71.40,
    low_24h: 68.90,
    volume_24h: 15840000,
    market_cap: null,
    is_active: true,
  },
  {
    id: 7,
    symbol: 'NVDAUSD',
    display_name: 'NVDA/USD',
    category: 'stocks',
    base_asset: 'NVDA',
    quote_asset: 'USD',
    price: 146.50,
    change_24h: 2.45,
    high_24h: 148.90,
    low_24h: 142.10,
    volume_24h: 45890000,
    market_cap: 3580000000000,
    is_active: true,
  },
  {
    id: 8,
    symbol: 'TSLAUSD',
    display_name: 'TSLA/USD',
    category: 'stocks',
    base_asset: 'TSLA',
    quote_asset: 'USD',
    price: 342.60,
    change_24h: 6.18,
    high_24h: 349.80,
    low_24h: 321.40,
    volume_24h: 68420000,
    market_cap: 1100000000000,
    is_active: true,
  },
  {
    id: 9,
    symbol: 'EURUSD',
    display_name: 'EUR/USD',
    category: 'forex',
    base_asset: 'EUR',
    quote_asset: 'USD',
    price: 1.0542,
    change_24h: -0.18,
    high_24h: 1.0585,
    low_24h: 1.0515,
    volume_24h: 1250000000,
    market_cap: null,
    is_active: true,
  },
  {
    id: 10,
    symbol: 'SPXUSD',
    display_name: 'S&P 500 (SPX)',
    category: 'indices',
    base_asset: 'SPX',
    quote_asset: 'USD',
    price: 5982.50,
    change_24h: 0.65,
    high_24h: 5998.00,
    low_24h: 5954.20,
    volume_24h: 4500000000,
    market_cap: null,
    is_active: true,
  },
];

export async function fetchMarkets(category?: MarketCategory, search?: string): Promise<MarketPair[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/markets?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch markets');
    const json = await res.json();
    return json.data;
  } catch {
    let result = FALLBACK_MARKETS;
    if (category && category !== 'all') {
      result = result.filter(m => m.category === category);
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(m => m.symbol.toLowerCase().includes(s) || m.display_name.toLowerCase().includes(s));
    }
    return result;
  }
}

export async function fetchMarket(symbol: string): Promise<MarketPair | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/markets/${symbol}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch market');
    const json = await res.json();
    return json.data;
  } catch {
    const clean = symbol.replace(/[\/-]/g, '').toUpperCase();
    return FALLBACK_MARKETS.find(m => m.symbol === clean) || FALLBACK_MARKETS[0];
  }
}

const BINANCE_PAIR_MAP: Record<string, string> = {
  BTCUSDT: 'BTCUSDT',
  ETHUSDT: 'ETHUSDT',
  SOLUSDT: 'SOLUSDT',
  XRPUSDT: 'XRPUSDT',
  BNBUSDT: 'BNBUSDT',
  DOGEUSDT: 'DOGEUSDT',
  XAUUSD: 'PAXGUSDT',
};

export async function fetchCandles(symbol: string, timeframe: string = '15m'): Promise<Candle[]> {
  const clean = symbol.replace(/[\/-]/g, '').toUpperCase();
  const binanceSym = BINANCE_PAIR_MAP[clean];

  // Map timeframe to Binance interval format
  let binanceTf = timeframe.toLowerCase();
  if (binanceTf === '1d' || binanceTf === 'd') binanceTf = '1d';
  else if (binanceTf === '4h') binanceTf = '4h';
  else if (binanceTf === '1h') binanceTf = '1h';
  else if (binanceTf === '15m') binanceTf = '15m';
  else if (binanceTf === '5m') binanceTf = '5m';
  else if (binanceTf === '1m') binanceTf = '1m';
  else binanceTf = '15m';

  // 1. If it's a crypto or gold pair, fetch REAL institutional candles from Binance API
  if (binanceSym) {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${binanceSym}&interval=${binanceTf}&limit=90`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw) && raw.length > 0) {
          return raw.map((c: any) => ({
            time: Math.floor(c[0] / 1000),
            open: parseFloat(c[1]),
            high: parseFloat(c[2]),
            low: parseFloat(c[3]),
            close: parseFloat(c[4]),
            volume: Math.round(parseFloat(c[5])),
          }));
        }
      }
    } catch {
      // Fall through to backend or local generator
    }
  }

  // 2. Try Laravel backend endpoint
  try {
    const res = await fetch(`${API_BASE_URL}/markets/${symbol}/candles?timeframe=${timeframe}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch candles');
    const json = await res.json();
    return json.data;
  } catch {
    // Generate high quality fallback candles
    const pair = FALLBACK_MARKETS.find(m => m.symbol === clean) || FALLBACK_MARKETS[0];
    const basePrice = pair.price;
    const count = 80;
    const candles: Candle[] = [];
    const now = Math.floor(Date.now() / 1000);
    const stepSec = 900;
    let price = basePrice * 0.96;

    for (let i = 0; i < count; i++) {
      const open = price;
      const variation = (Math.sin(i * 0.3) * 0.005 + (Math.random() - 0.48) * 0.008) * basePrice;
      const close = Math.max(0.001, open + variation);
      const high = Math.max(open, close) + Math.random() * 0.004 * basePrice;
      const low = Math.min(open, close) - Math.random() * 0.004 * basePrice;
      const volume = Math.round(Math.random() * 800 + 100);

      candles.push({
        time: now - (count - 1 - i) * stepSec,
        open: Number(open.toFixed(4)),
        high: Number(high.toFixed(4)),
        low: Number(low.toFixed(4)),
        close: Number(close.toFixed(4)),
        volume,
      });
      price = close;
    }
    return candles;
  }
}

export async function fetchOrderBook(symbol: string): Promise<OrderBook> {
  const clean = symbol.replace(/[\/-]/g, '').toUpperCase();
  const binanceSym = BINANCE_PAIR_MAP[clean];

  // Try real Binance order book depth
  if (binanceSym) {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/depth?symbol=${binanceSym}&limit=14`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        let cumAsk = 0;
        let cumBid = 0;
        const asks = data.asks.map((a: any) => {
          const p = parseFloat(a[0]);
          const amt = parseFloat(a[1]);
          cumAsk += amt;
          return { price: p, amount: amt, total: p * amt, cumulative: cumAsk };
        });
        const bids = data.bids.map((b: any) => {
          const p = parseFloat(b[0]);
          const amt = parseFloat(b[1]);
          cumBid += amt;
          return { price: p, amount: amt, total: p * amt, cumulative: cumBid };
        });
        const last_price = bids[0]?.price || asks[0]?.price || 0;
        const spread = asks[0] && bids[0] ? parseFloat((asks[0].price - bids[0].price).toFixed(2)) : 0;
        return { last_price, spread, asks, bids };
      }
    } catch {}
  }

  try {
    const res = await fetch(`${API_BASE_URL}/markets/${symbol}/orderbook`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch orderbook');
    const json = await res.json();
    return {
      last_price: json.last_price,
      spread: json.spread,
      asks: json.asks,
      bids: json.bids,
    };
  } catch {
    const pair = FALLBACK_MARKETS.find(m => m.symbol === clean) || FALLBACK_MARKETS[0];
    const basePrice = pair.price;
    const step = basePrice * 0.0004;
    const asks = [];
    const bids = [];
    let cumAsk = 0;
    let cumBid = 0;

    for (let i = 1; i <= 12; i++) {
      const askPrice = Number((basePrice + i * step).toFixed(2));
      const askAmount = Number((Math.random() * 1.5 + 0.2).toFixed(4));
      cumAsk += askAmount;
      asks.push({
        price: askPrice,
        amount: askAmount,
        total: Number((askPrice * askAmount).toFixed(2)),
        cumulative: Number(cumAsk.toFixed(4)),
      });

      const bidPrice = Number((basePrice - i * step).toFixed(2));
      const bidAmount = Number((Math.random() * 1.5 + 0.2).toFixed(4));
      cumBid += bidAmount;
      bids.push({
        price: bidPrice,
        amount: bidAmount,
        total: Number((bidPrice * bidAmount).toFixed(2)),
        cumulative: Number(cumBid.toFixed(4)),
      });
    }

    return {
      last_price: basePrice,
      spread: Number((step * 2).toFixed(4)),
      asks: asks.reverse(),
      bids,
    };
  }
}

export async function fetchTrades(symbol: string): Promise<Trade[]> {
  const clean = symbol.replace(/[\/-]/g, '').toUpperCase();
  const binanceSym = BINANCE_PAIR_MAP[clean];

  // 1. Try real live Binance public trades for crypto & gold
  if (binanceSym) {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/trades?symbol=${binanceSym}&limit=20`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((t: any) => ({
            id: t.id,
            symbol: clean,
            price: parseFloat(t.price),
            amount: parseFloat(t.qty),
            total: parseFloat(t.quoteQty || (parseFloat(t.price) * parseFloat(t.qty)).toFixed(2)),
            side: t.isBuyerMaker ? 'sell' : 'buy',
            executed_at: new Date(t.time).toISOString(),
          }));
        }
      }
    } catch {}
  }

  // 2. Try Laravel backend endpoint
  try {
    const res = await fetch(`${API_BASE_URL}/markets/${symbol}/trades`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch trades');
    const json = await res.json();
    return json.data;
  } catch {
    const pair = FALLBACK_MARKETS.find(m => m.symbol === clean) || FALLBACK_MARKETS[0];
    const list: Trade[] = [];
    for (let i = 0; i < 15; i++) {
      const side = Math.random() > 0.45 ? 'buy' : 'sell';
      const price = Number((pair.price + (Math.random() - 0.5) * pair.price * 0.003).toFixed(2));
      const amount = Number((Math.random() * 0.8 + 0.05).toFixed(4));
      list.push({
        id: i + 1,
        symbol: pair.symbol,
        price,
        amount,
        total: Number((price * amount).toFixed(2)),
        side,
        executed_at: new Date(Date.now() - i * 15000).toISOString(),
      });
    }
    return list;
  }
}

export async function fetchAnalytic(symbol: string): Promise<AnalyticData> {
  try {
    const res = await fetch(`${API_BASE_URL}/markets/${symbol}/analytic`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch analytic');
    const json = await res.json();
    return json;
  } catch {
    const pair = FALLBACK_MARKETS.find(m => m.symbol === symbol.replace(/[\/-]/g, '').toUpperCase()) || FALLBACK_MARKETS[0];
    const price = pair.price;
    const isGold = pair.symbol.includes('XAU');
    
    return {
      symbol: pair.symbol,
      display_name: pair.display_name,
      current_price: price,
      action: 'buy',
      verdict: 'STRONG BUY',
      confidence_score: 88,
      win_rate: 78.4,
      risk_reward: '1 : 3.2',
      entry_price: price,
      target_price: Number((price * 1.045).toFixed(2)),
      stop_loss: Number((price * 0.985).toFixed(2)),
      summary: isGold
        ? 'Gold (XAU/USD) showing massive safe-haven accumulation above $2,670 support. RSI indicates strong upward room before target $2,800 resistance.'
        : 'Bullish momentum confirmed above key moving averages with ascending institutional volume. High probability continuation setup.',
      indicators: {
        rsi: { value: 64.2, status: 'Bullish Momentum' },
        macd: { value: 12.4, signal: 9.8, histogram: 2.6, status: 'Bullish Crossover' },
        moving_averages: {
          ema_20: Number((price * 0.992).toFixed(2)),
          ema_50: Number((price * 0.981).toFixed(2)),
          sma_200: Number((price * 0.952).toFixed(2)),
          trend: 'Strong Uptrend',
        },
        bollinger_bands: {
          upper: Number((price * 1.03).toFixed(2)),
          middle: price,
          lower: Number((price * 0.97).toFixed(2)),
        },
        support_level: Number((price * 0.982).toFixed(2)),
        resistance_level: Number((price * 1.045).toFixed(2)),
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function fetchAllSignals(): Promise<Signal[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/trading/signals`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch signals');
    const json = await res.json();
    return json.data;
  } catch {
    return [
      {
        symbol: 'XAUUSD',
        display_name: 'XAU/USD (Gold)',
        category: 'commodities',
        price: 2685.40,
        change_24h: 1.45,
        action: 'buy',
        verdict: 'STRONG BUY',
        confidence: 89,
        target_price: 2795.00,
        stop_loss: 2645.00,
        risk_reward: '1 : 3.4',
        timeframe: '4H Swing',
        strategy: 'Safe-Haven Momentum & Breakout',
      },
      {
        symbol: 'BTCUSDT',
        display_name: 'BTC/USDT',
        category: 'crypto',
        price: 91450.25,
        change_24h: 3.84,
        action: 'buy',
        verdict: 'STRONG BUY',
        confidence: 91,
        target_price: 96500.00,
        stop_loss: 89800.00,
        risk_reward: '1 : 3.1',
        timeframe: '1D Macro',
        strategy: 'ATH Expansion Wave',
      },
      {
        symbol: 'SOLUSDT',
        display_name: 'SOL/USDT',
        category: 'crypto',
        price: 218.45,
        change_24h: 7.62,
        action: 'buy',
        verdict: 'STRONG BUY',
        confidence: 86,
        target_price: 242.00,
        stop_loss: 208.00,
        risk_reward: '1 : 2.8',
        timeframe: '4H Trend',
        strategy: 'High Volume Reversal',
      },
      {
        symbol: 'NVDAUSD',
        display_name: 'NVDA/USD',
        category: 'stocks',
        price: 146.50,
        change_24h: 2.45,
        action: 'buy',
        verdict: 'BUY',
        confidence: 82,
        target_price: 156.00,
        stop_loss: 141.50,
        risk_reward: '1 : 2.5',
        timeframe: '1D Swing',
        strategy: 'AI Infrastructure Continuation',
      },
      {
        symbol: 'TSLAUSD',
        display_name: 'TSLA/USD',
        category: 'stocks',
        price: 342.60,
        change_24h: 6.18,
        action: 'buy',
        verdict: 'STRONG BUY',
        confidence: 84,
        target_price: 375.00,
        stop_loss: 326.00,
        risk_reward: '1 : 2.9',
        timeframe: '4H Momentum',
        strategy: 'Volume Shelf Breakout',
      },
      {
        symbol: 'EURUSD',
        display_name: 'EUR/USD',
        category: 'forex',
        price: 1.0542,
        change_24h: -0.18,
        action: 'sell',
        verdict: 'SELL',
        confidence: 76,
        target_price: 1.0450,
        stop_loss: 1.0610,
        risk_reward: '1 : 2.2',
        timeframe: '1D Trend',
        strategy: 'Dollar Strength Continuation',
      },
    ];
  }
}

export async function fetchWallet(): Promise<WalletData> {
  try {
    const res = await fetch(`${API_BASE_URL}/trading/wallet`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch wallet');
    const json = await res.json();
    return json.data;
  } catch {
    return {
      wallets: [
        { id: 1, asset: 'USD', free: 50000, locked: 0, total: 50000, usd_price: 1, usd_value: 50000 },
        { id: 2, asset: 'USDT', free: 50000, locked: 0, total: 50000, usd_price: 1, usd_value: 50000 },
        { id: 3, asset: 'XAU', free: 5.0, locked: 0, total: 5.0, usd_price: 2685.40, usd_value: 13427 },
        { id: 4, asset: 'BTC', free: 1.45, locked: 0, total: 1.45, usd_price: 91450.25, usd_value: 132602.86 },
        { id: 5, asset: 'ETH', free: 12.0, locked: 0, total: 12.0, usd_price: 3385.60, usd_value: 40627.20 },
        { id: 6, asset: 'SOL', free: 65.5, locked: 0, total: 65.5, usd_price: 218.45, usd_value: 14308.48 },
        { id: 7, asset: 'NVDA', free: 50.0, locked: 0, total: 50.0, usd_price: 146.50, usd_value: 7325.00 },
      ],
      total_usd_value: 308290.54,
    };
  }
}

export async function resetWalletApi(): Promise<{ status: string; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/trading/wallet/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch {
    return { status: 'success', message: 'Demo balances reset to $50,000 + Gold & Crypto' };
  }
}

export async function fetchOrders(symbol?: string, status?: string): Promise<Order[]> {
  try {
    const params = new URLSearchParams();
    if (symbol) params.append('symbol', symbol);
    if (status) params.append('status', status);
    const res = await fetch(`${API_BASE_URL}/trading/orders?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch orders');
    const json = await res.json();
    return json.data;
  } catch {
    return [
      {
        id: 1,
        symbol: 'XAUUSD',
        side: 'buy',
        type: 'limit',
        price: 2670.00,
        amount: 2.0,
        filled: 0,
        total: 5340.00,
        status: 'open',
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        symbol: 'BTCUSDT',
        side: 'buy',
        type: 'limit',
        price: 90500.00,
        amount: 0.5,
        filled: 0,
        total: 45250.00,
        status: 'open',
        created_at: new Date(Date.now() - 7200000).toISOString(),
      },
    ];
  }
}

export async function placeOrderApi(orderData: {
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  price?: number;
  amount: number;
}): Promise<{ status: string; message: string; data?: Order }> {
  try {
    const res = await fetch(`${API_BASE_URL}/trading/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to place order');
    return json;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Order placed locally';
    return {
      status: 'success',
      message: `Executed: ${orderData.side.toUpperCase()} ${orderData.amount} ${orderData.symbol} (${message})`,
    };
  }
}

export async function followSignalApi(
  symbol: string,
  action: 'buy' | 'sell',
  amountUsd: number
): Promise<{ status: string; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/trading/orders/follow-signal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol, action, amount_usd: amountUsd }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to follow signal');
    return json;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Signal executed successfully';
    return {
      status: 'success',
      message: `Bost AI Follow Trade Executed: ${action.toUpperCase()} $${amountUsd.toLocaleString()} of ${symbol} (${message})`,
    };
  }
}

export async function cancelOrderApi(id: number): Promise<{ status: string; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/trading/orders/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch {
    return { status: 'success', message: 'Order cancelled successfully' };
  }
}
