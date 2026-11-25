export type MarketCategory = 'all' | 'commodities' | 'crypto' | 'stocks' | 'forex' | 'indices';

export interface MarketPair {
  id: number;
  symbol: string;
  display_name: string;
  category: 'commodities' | 'crypto' | 'stocks' | 'forex' | 'indices';
  base_asset: string;
  quote_asset: string;
  price: number;
  change_24h: number;
  high_24h: number;
  low_24h: number;
  volume_24h: number;
  payout_rate?: number; // e.g. 92% for Zoqira binary/quick trading
  market_cap?: number | null;
  decimals?: number;
  is_active: boolean;
}

export interface Candle {
  time: number; // Unix timestamp
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
  cumulative: number;
}

export interface OrderBook {
  last_price: number;
  spread: number;
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
}

export interface Trade {
  id: number;
  symbol: string;
  price: number;
  amount: number;
  total: number;
  side: 'buy' | 'sell';
  executed_at: string;
}

export interface Order {
  id: number;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  price: number;
  amount: number;
  filled: number;
  total: number;
  status: 'open' | 'filled' | 'cancelled';
  created_at: string;
}

export interface QuickTrade {
  id: string;
  symbol: string;
  display_name: string;
  direction: 'up' | 'down';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  durationSeconds: number;
  remainingSeconds: number;
  payoutPercent: number;
  status: 'active' | 'won' | 'lost';
  payoutAmount: number;
  createdAt: number;
  startTime?: number;
  endTime?: number;
  exitPrice?: number;
  payout?: number;
}

export interface WalletItem {
  id: number;
  asset: string;
  free: number;
  locked: number;
  total: number;
  usd_price: number;
  usd_value: number;
}

export interface WalletData {
  wallets: WalletItem[];
  total_usd_value: number;
  usd_balance?: number;
}

export interface AnalyticData {
  symbol: string;
  display_name: string;
  current_price: number;
  action: 'buy' | 'sell';
  verdict: string;
  confidence_score: number;
  win_rate: number;
  risk_reward: string;
  entry_price: number;
  target_price: number;
  stop_loss: number;
  summary: string;
  indicators: {
    rsi: {
      value: number;
      status: string;
    };
    macd: {
      value: number;
      signal: number;
      histogram: number;
      status: string;
    };
    moving_averages: {
      ema_20: number;
      ema_50: number;
      sma_200: number;
      trend: string;
    };
    bollinger_bands: {
      upper: number;
      middle: number;
      lower: number;
    };
    support_level: number;
    resistance_level: number;
  };
  timestamp: string;
}

export interface Signal {
  symbol: string;
  display_name: string;
  category: string;
  price: number;
  change_24h: number;
  action: 'buy' | 'sell';
  verdict: string;
  confidence: number;
  target_price: number;
  stop_loss: number;
  risk_reward: string;
  timeframe: string;
  strategy: string;
}

export interface AiModelVote {
  modelName: 'Claude 3.7' | 'ChatGPT-4o' | 'DeepSeek-R1' | 'Gemini 2.0';
  provider: 'Anthropic' | 'OpenAI' | 'DeepSeek' | 'Google';
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  color: string;
  thesis: string;
  specialty: string;
}

export interface MultiAiEnsembleSignal {
  id: string;
  symbol: string;
  display_name: string;
  category: 'commodities' | 'crypto' | 'forex';
  price: number;
  change_24h: number;
  consensusAction: 'buy' | 'sell';
  consensusVerdict: string;
  consensusScore: number;
  winRate: number;
  agreementRatio: string;
  entry: number;
  target1: number;
  target2: number;
  stop_loss: number;
  risk_reward: string;
  timeframe: string;
  macroSentiment: string;
  ensembleAnalysis: string;
  models: {
    claude: AiModelVote;
    chatgpt: AiModelVote;
    deepseek: AiModelVote;
    gemini: AiModelVote;
  };
}
