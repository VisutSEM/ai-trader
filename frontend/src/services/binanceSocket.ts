/**
 * Real-Time Binance WebSocket Service for Bost-Trader
 * Provides sub-second live price updates, 24h ticker changes, and live candlestick streaming.
 * 100% Free, Public, Zero API Key Required.
 */

export interface LiveTickerUpdate {
  symbol: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}

export interface LiveKlineUpdate {
  symbol: string;
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isClosed: boolean;
}

// Map platform symbols to Binance symbols
const SYMBOL_MAP: Record<string, string> = {
  XAUUSD: 'paxgusdt', // Paxos Gold (Physical oz Gold spot on Binance)
  BTCUSDT: 'btcusdt',
  ETHUSDT: 'ethusdt',
  SOLUSDT: 'solusdt',
  XRPUSDT: 'xrpusdt',
  BNBUSDT: 'bnbusdt',
  DOGEUSDT: 'dogeusdt',
};

const REVERSE_MAP: Record<string, string> = {
  PAXGUSDT: 'XAUUSD',
  BTCUSDT: 'BTCUSDT',
  ETHUSDT: 'ETHUSDT',
  SOLUSDT: 'SOLUSDT',
  XRPUSDT: 'XRPUSDT',
  BNBUSDT: 'BNBUSDT',
  DOGEUSDT: 'DOGEUSDT',
};

class BinanceMarketSocket {
  private tickerWs: WebSocket | null = null;
  private klineWs: WebSocket | null = null;
  private tickerListeners: ((update: LiveTickerUpdate) => void)[] = [];
  private klineListeners: ((kline: LiveKlineUpdate) => void)[] = [];
  private activeKlineSymbol: string | null = null;
  private activeKlineInterval: string = '15m';
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initTickerStream();
    }
  }

  // Connect to combined multi-ticker stream for all supported assets
  public initTickerStream() {
    if (this.tickerWs && (this.tickerWs.readyState === WebSocket.OPEN || this.tickerWs.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const streams = Object.values(SYMBOL_MAP)
      .map((s) => `${s}@ticker`)
      .join('/');

    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;

    try {
      this.tickerWs = new WebSocket(wsUrl);

      this.tickerWs.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload && payload.data && payload.data.s) {
            const rawSymbol = payload.data.s;
            const appSymbol = REVERSE_MAP[rawSymbol] || rawSymbol;
            const d = payload.data;

            const update: LiveTickerUpdate = {
              symbol: appSymbol,
              price: parseFloat(d.c),
              change24h: parseFloat(d.P),
              high24h: parseFloat(d.h),
              low24h: parseFloat(d.l),
              volume24h: parseFloat(d.v),
            };

            this.tickerListeners.forEach((fn) => fn(update));
          }
        } catch (e) {
          // ignore parsing glitches
        }
      };

      this.tickerWs.onerror = () => {
        this.scheduleTickerReconnect();
      };

      this.tickerWs.onclose = () => {
        this.scheduleTickerReconnect();
      };
    } catch (e) {
      this.scheduleTickerReconnect();
    }
  }

  private scheduleTickerReconnect() {
    if (this.reconnectTimeout) return;
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null;
      this.initTickerStream();
    }, 4000);
  }

  // Subscribe to live kline (candlestick) updates for the currently viewed chart pair
  public subscribeKline(appSymbol: string, interval: string = '15m') {
    const binanceSym = SYMBOL_MAP[appSymbol] || appSymbol.toLowerCase();

    // Map interval names
    let tf = interval.toLowerCase();
    if (tf === '1d' || tf === 'd') tf = '1d';
    else if (tf === '4h') tf = '4h';
    else if (tf === '1h') tf = '1h';
    else if (tf === '15m') tf = '15m';
    else if (tf === '5m') tf = '5m';
    else if (tf === '1m') tf = '1m';
    else tf = '15m';

    if (this.activeKlineSymbol === binanceSym && this.activeKlineInterval === tf && this.klineWs?.readyState === WebSocket.OPEN) {
      return;
    }

    this.activeKlineSymbol = binanceSym;
    this.activeKlineInterval = tf;

    if (this.klineWs) {
      try {
        this.klineWs.close();
      } catch {}
      this.klineWs = null;
    }

    const wsUrl = `wss://stream.binance.com:9443/ws/${binanceSym}@kline_${tf}`;

    try {
      this.klineWs = new WebSocket(wsUrl);

      this.klineWs.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload && payload.k) {
            const k = payload.k;
            const update: LiveKlineUpdate = {
              symbol: appSymbol,
              time: Math.floor(k.t / 1000),
              open: parseFloat(k.o),
              high: parseFloat(k.h),
              low: parseFloat(k.l),
              close: parseFloat(k.c),
              volume: parseFloat(k.v),
              isClosed: k.x,
            };

            this.klineListeners.forEach((fn) => fn(update));
          }
        } catch {}
      };

      this.klineWs.onerror = () => {};
    } catch {}
  }

  // Listener registrations
  public onTicker(callback: (update: LiveTickerUpdate) => void) {
    this.tickerListeners.push(callback);
    return () => {
      this.tickerListeners = this.tickerListeners.filter((fn) => fn !== callback);
    };
  }

  public onKline(callback: (kline: LiveKlineUpdate) => void) {
    this.klineListeners.push(callback);
    return () => {
      this.klineListeners = this.klineListeners.filter((fn) => fn !== callback);
    };
  }
}

export const binanceSocket = new BinanceMarketSocket();
