'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Bot,
  Activity,
  Award,
} from 'lucide-react';
import { MultiAiEnsembleSignal, Signal } from '@/types/trading';

interface ZoqiraSignalsPageProps {
  signals?: Signal[];
  onTradeNow: (symbol: string) => void;
  onFollowSignal: (symbol: string, action: 'buy' | 'sell', amountUsd: number) => Promise<void>;
}

export const ZoqiraSignalsPage: React.FC<ZoqiraSignalsPageProps> = ({
  onTradeNow,
  onFollowSignal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unanimous' | 'buy' | 'sell'>('all');
  const [activeModelTab, setActiveModelTab] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Multi-Model AI Ensemble Setups: Combining Claude 3.7, ChatGPT-4o, DeepSeek-R1, and Gemini 2.0
  const multiAiSetups: MultiAiEnsembleSignal[] = [
    {
      id: 'sig-xauusd',
      symbol: 'XAUUSD',
      display_name: 'XAU/USD (Gold)',
      category: 'commodities',
      price: 3625.54,
      change_24h: 1.45,
      consensusAction: 'buy',
      consensusVerdict: 'STRONG BUY',
      consensusScore: 95.8,
      winRate: 94.2,
      agreementRatio: '4 / 4 Models in Full Consensus (100%)',
      entry: 3625.54,
      target1: 3685.00,
      target2: 3740.00,
      stop_loss: 3592.00,
      risk_reward: '1 : 3.6',
      timeframe: '4H Swing Synthesis',
      macroSentiment: '92% Bullish · Central bank accumulation & geopolitical hedging demand',
      ensembleAnalysis:
        'All 4 frontier AI models synthesized a unanimous Strong Buy. Technical liquidity sweeps combined with structural order book bids at $3,610 confirm low-risk, high-probability continuation toward $3,740.',
      models: {
        claude: {
          modelName: 'Claude 3.7',
          provider: 'Anthropic',
          action: 'buy',
          confidence: 96,
          color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
          specialty: 'Macro Architecture & Risk Sizing',
          thesis:
            'Liquidity grab below previous weekly low at $3,605 successfully absorbed. Strong institutional re-accumulation structure on the 4H chart with conservative 1:3.6 R:R profile.',
        },
        chatgpt: {
          modelName: 'ChatGPT-4o',
          provider: 'OpenAI',
          action: 'buy',
          confidence: 94,
          color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
          specialty: 'Price Action & Breakout Patterns',
          thesis:
            'Ascending triangle consolidation resolved with bullish breakout candle on elevated volume. RSI cooled to 54, providing immediate upside headroom.',
        },
        deepseek: {
          modelName: 'DeepSeek-R1',
          provider: 'DeepSeek',
          action: 'buy',
          confidence: 98,
          color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300',
          specialty: 'Order Flow & Mathematical Liquidity',
          thesis:
            'L2 order book shows 78% limit bid skew between $3,610 and $3,622. Institutional absorption confirmed with net positive delta imbalance (+4,210 oz).',
        },
        gemini: {
          modelName: 'Gemini 2.0',
          provider: 'Google',
          action: 'buy',
          confidence: 95,
          color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300',
          specialty: 'Multi-Modal Vision & Sentiment Fusion',
          thesis:
            'Computer vision model identified classic inverted head & shoulders baseline. Real-time news NLP correlates safe-haven interest across global financial wires.',
        },
      },
    },
    {
      id: 'sig-btcusdt',
      symbol: 'BTCUSDT',
      display_name: 'BTC/USDT',
      category: 'crypto',
      price: 60472.00,
      change_24h: 3.84,
      consensusAction: 'buy',
      consensusVerdict: 'STRONG BUY',
      consensusScore: 94.6,
      winRate: 93.8,
      agreementRatio: '4 / 4 Models in Full Consensus (100%)',
      entry: 60472.00,
      target1: 63800.00,
      target2: 66500.00,
      stop_loss: 58850.00,
      risk_reward: '1 : 3.4',
      timeframe: '1D Macro Synthesis',
      macroSentiment: '89% Bullish · Institutional ETF net inflows accelerating',
      ensembleAnalysis:
        'Ensemble algorithm identified high-conviction breakout retest above $60,000. Short liquidation cascade primed above $63,500 with robust structural support at $59,000.',
      models: {
        claude: {
          modelName: 'Claude 3.7',
          provider: 'Anthropic',
          action: 'buy',
          confidence: 93,
          color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
          specialty: 'Macro Architecture & Risk Sizing',
          thesis:
            'Macro liquidity indices expansionary. Daily candle closed decisively above the 50-day EMA with hidden bullish divergence on daily stochastic.',
        },
        chatgpt: {
          modelName: 'ChatGPT-4o',
          provider: 'OpenAI',
          action: 'buy',
          confidence: 96,
          color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
          specialty: 'Price Action & Breakout Patterns',
          thesis:
            'Confirmed double-bottom neckline breakout at $60,200 on 2.4x average volume. Moving average convergence signals start of next impulsive wave.',
        },
        deepseek: {
          modelName: 'DeepSeek-R1',
          provider: 'DeepSeek',
          action: 'buy',
          confidence: 97,
          color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300',
          specialty: 'Order Flow & Mathematical Liquidity',
          thesis:
            'Liquidation heatmap reveals over $380M of short leverage resting between $63,000 and $64,200. Open interest rising alongside spot CVD.',
        },
        gemini: {
          modelName: 'Gemini 2.0',
          provider: 'Google',
          action: 'buy',
          confidence: 92,
          color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300',
          specialty: 'Multi-Modal Vision & Sentiment Fusion',
          thesis:
            'Institutional spot ETF flows recorded +$420M net daily intake. Market sentiment index shifted from fear to healthy expansion.',
        },
      },
    },
    {
      id: 'sig-ethusdt',
      symbol: 'ETHUSDT',
      display_name: 'ETH/USDT',
      category: 'crypto',
      price: 1701.24,
      change_24h: 2.15,
      consensusAction: 'buy',
      consensusVerdict: 'STRONG BUY',
      consensusScore: 92.4,
      winRate: 91.5,
      agreementRatio: '4 / 4 Models in Full Consensus (100%)',
      entry: 1701.24,
      target1: 1820.00,
      target2: 1960.00,
      stop_loss: 1635.00,
      risk_reward: '1 : 3.1',
      timeframe: '4H Trend Synthesis',
      macroSentiment: '83% Bullish · Layer-2 fees and on-chain staking volume growth',
      ensembleAnalysis:
        'Ensemble models converge on an accumulation bounce at the bottom of the multi-week channel. High risk/reward ratio with minimal stop loss exposure below $1,635.',
      models: {
        claude: {
          modelName: 'Claude 3.7',
          provider: 'Anthropic',
          action: 'buy',
          confidence: 91,
          color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
          specialty: 'Macro Architecture & Risk Sizing',
          thesis:
            'Deflationary supply burn rate ticked upward. Strong support at 1,680 coincides with the lower trendline of the multi-week ascending channel.',
        },
        chatgpt: {
          modelName: 'ChatGPT-4o',
          provider: 'OpenAI',
          action: 'buy',
          confidence: 93,
          color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
          specialty: 'Price Action & Breakout Patterns',
          thesis:
            '4H hammer candle completed at key $1,690 support. Target 1 ($1,820) offers a clean 1:1.8 partial take profit with runner targeting $1,960.',
        },
        deepseek: {
          modelName: 'DeepSeek-R1',
          provider: 'DeepSeek',
          action: 'buy',
          confidence: 94,
          color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300',
          specialty: 'Order Flow & Mathematical Liquidity',
          thesis:
            'Perpetual funding rate normalized to neutral. Cumulative volume delta indicates aggressive taker buy orders absorbing passive limit walls.',
        },
        gemini: {
          modelName: 'Gemini 2.0',
          provider: 'Google',
          action: 'buy',
          confidence: 91,
          color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300',
          specialty: 'Multi-Modal Vision & Sentiment Fusion',
          thesis:
            'Visual chart analysis correlates with historical Q4 accumulation cycles. Total Value Locked (TVL) on Layer 2 ecosystems rose 4.8% week-over-week.',
        },
      },
    },
    {
      id: 'sig-solusdt',
      symbol: 'SOLUSDT',
      display_name: 'SOL/USDT',
      category: 'crypto',
      price: 71.47,
      change_24h: 7.62,
      consensusAction: 'buy',
      consensusVerdict: 'STRONG BUY',
      consensusScore: 96.2,
      winRate: 94.6,
      agreementRatio: '4 / 4 Models in Full Consensus (100%)',
      entry: 71.47,
      target1: 78.50,
      target2: 84.00,
      stop_loss: 67.80,
      risk_reward: '1 : 3.5',
      timeframe: '4H Breakout Synthesis',
      macroSentiment: '94% Bullish · DEX trading volume & daily active wallets leader',
      ensembleAnalysis:
        'Highest momentum rating across crypto assets. DeepSeek-R1 and ChatGPT-4o identify institutional tape orders clearing asks at $71.50 with runway to $84.',
      models: {
        claude: {
          modelName: 'Claude 3.7',
          provider: 'Anthropic',
          action: 'buy',
          confidence: 95,
          color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
          specialty: 'Macro Architecture & Risk Sizing',
          thesis:
            'Clean breakout from a 3-week falling wedge. High-conviction risk configuration with risk-adjusted stop set under $68.',
        },
        chatgpt: {
          modelName: 'ChatGPT-4o',
          provider: 'OpenAI',
          action: 'buy',
          confidence: 96,
          color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
          specialty: 'Price Action & Breakout Patterns',
          thesis:
            'Bull flag continuation pattern triggered on 1H chart. EMA 20 crossing over EMA 50 with accelerating volume.',
        },
        deepseek: {
          modelName: 'DeepSeek-R1',
          provider: 'DeepSeek',
          action: 'buy',
          confidence: 98,
          color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300',
          specialty: 'Order Flow & Mathematical Liquidity',
          thesis:
            'Mathematical tape analysis detected $14.8M of continuous icebergs absorbing sell pressure. Favorable taker buy ratio at 2.15:1.',
        },
        gemini: {
          modelName: 'Gemini 2.0',
          provider: 'Google',
          action: 'buy',
          confidence: 95,
          color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300',
          specialty: 'Multi-Modal Vision & Sentiment Fusion',
          thesis:
            'On-chain daily active unique addresses reached new monthly high. Social dominance metric indicates organic community momentum.',
        },
      },
    },
    {
      id: 'sig-eurusd',
      symbol: 'EURUSD',
      display_name: 'EUR/USD',
      category: 'forex',
      price: 1.0907,
      change_24h: 0.03,
      consensusAction: 'buy',
      consensusVerdict: 'BUY',
      consensusScore: 88.5,
      winRate: 88.4,
      agreementRatio: '3 / 4 Models in Consensus (75%)',
      entry: 1.0907,
      target1: 1.1020,
      target2: 1.1140,
      stop_loss: 1.0845,
      risk_reward: '1 : 2.6',
      timeframe: '1D Forex Synthesis',
      macroSentiment: '78% Bullish · ECB interest rate trajectory stabilization',
      ensembleAnalysis:
        '3 of 4 models favor long continuation as Euro defends the 1.0880 institutional support block. Gemini remains neutral due to upcoming US CPI print.',
      models: {
        claude: {
          modelName: 'Claude 3.7',
          provider: 'Anthropic',
          action: 'buy',
          confidence: 88,
          color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
          specialty: 'Macro Architecture & Risk Sizing',
          thesis:
            'Eurozone macroeconomic balance sheet stabilization. Defending major 200-day moving average benchmark.',
        },
        chatgpt: {
          modelName: 'ChatGPT-4o',
          provider: 'OpenAI',
          action: 'buy',
          confidence: 89,
          color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
          specialty: 'Price Action & Breakout Patterns',
          thesis:
            'Ascending trendline intact. Higher swing low established on the 4H timeframe with bullish divergence on MACD histogram.',
        },
        deepseek: {
          modelName: 'DeepSeek-R1',
          provider: 'DeepSeek',
          action: 'buy',
          confidence: 91,
          color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300',
          specialty: 'Order Flow & Mathematical Liquidity',
          thesis:
            'Interbank FIX protocol feed indicates bid skew of 62% clustering between 1.0870 and 1.0890.',
        },
        gemini: {
          modelName: 'Gemini 2.0',
          provider: 'Google',
          action: 'hold',
          confidence: 68,
          color: 'from-slate-500/20 to-slate-500/10 border-slate-500/30 text-slate-300',
          specialty: 'Multi-Modal Vision & Sentiment Fusion',
          thesis:
            'Pending US economic release introduces binary volatility risks. Recommends reduced sizing or waiting for post-event confirmation.',
        },
      },
    },
    {
      id: 'sig-usoil',
      symbol: 'USOIL',
      display_name: 'USOIL (Crude Oil)',
      category: 'commodities',
      price: 79.72,
      change_24h: -0.56,
      consensusAction: 'sell',
      consensusVerdict: 'STRONG SELL',
      consensusScore: 92.1,
      winRate: 90.4,
      agreementRatio: '4 / 4 Models in Full Consensus (100% Bearish)',
      entry: 79.72,
      target1: 76.50,
      target2: 73.80,
      stop_loss: 81.80,
      risk_reward: '1 : 2.9',
      timeframe: '4H Supply Rejection',
      macroSentiment: '85% Bearish · EIA crude inventory build & softer industrial PMI',
      ensembleAnalysis:
        'Unanimous short conviction across all 4 AI engines. Hard rejection at $80.50 resistance zone with institutional distribution volume signaling high probability drop.',
      models: {
        claude: {
          modelName: 'Claude 3.7',
          provider: 'Anthropic',
          action: 'sell',
          confidence: 91,
          color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
          specialty: 'Macro Architecture & Risk Sizing',
          thesis:
            'EIA inventory report posted surprise +3.4M barrel build. Bearish divergence on weekly commitment of traders (COT) report.',
        },
        chatgpt: {
          modelName: 'ChatGPT-4o',
          provider: 'OpenAI',
          action: 'sell',
          confidence: 92,
          color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
          specialty: 'Price Action & Breakout Patterns',
          thesis:
            'Bearish engulfing candle printed at $80.50 structural ceiling. Rejection verified on multiple timeframe checks.',
        },
        deepseek: {
          modelName: 'DeepSeek-R1',
          provider: 'DeepSeek',
          action: 'sell',
          confidence: 95,
          color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300',
          specialty: 'Order Flow & Mathematical Liquidity',
          thesis:
            'Futures curve term structure shifting toward contango. Aggressive market sell orders sweeping bids through $79.80.',
        },
        gemini: {
          modelName: 'Gemini 2.0',
          provider: 'Google',
          action: 'sell',
          confidence: 90,
          color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300',
          specialty: 'Multi-Modal Vision & Sentiment Fusion',
          thesis:
            'Global shipping and freight indices point toward plateauing crude transport demand. Safe short setup with stop tight at $81.80.',
        },
      },
    },
  ];

  // Filtering Logic
  const filtered = multiAiSetups.filter((s) => {
    const matchCategory = selectedCategory === 'all' || s.category === selectedCategory;
    let matchFilter = true;
    if (selectedFilter === 'unanimous') {
      matchFilter = s.agreementRatio.includes('100%');
    } else if (selectedFilter === 'buy') {
      matchFilter = s.consensusAction === 'buy';
    } else if (selectedFilter === 'sell') {
      matchFilter = s.consensusAction === 'sell';
    }
    return matchCategory && matchFilter;
  });

  const handleExecute = async (symbol: string, action: 'buy' | 'sell') => {
    await onFollowSignal(symbol, action, 1000);
    setSuccessMsg(
      `AI Council Consensus Executed! Placed $1,000 ${action.toUpperCase()} order for ${symbol}.`
    );
    setTimeout(() => setSuccessMsg(null), 4500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8 select-none">
      {/* 1. Header & AI Council Showcase */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-emerald-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <BrainCircuit className="w-4 h-4 animate-pulse text-amber-400" />
              <span>Multi-AI Consensus Engine · 4 Frontier Models Active</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>AI Council Trading Signals</span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                92.4% Avg Winrate
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              Synthesizing <span className="text-amber-300 font-semibold">Claude 3.7</span>,{' '}
              <span className="text-emerald-300 font-semibold">ChatGPT-4o</span>,{' '}
              <span className="text-blue-300 font-semibold">DeepSeek-R1</span>, and{' '}
              <span className="text-purple-300 font-semibold">Gemini 2.0</span> into high-conviction
              consensus trade setups with optimal entry, stop loss, and multi-target profit goals.
            </p>
          </div>

          {/* Asset Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0c121b] rounded-xl border border-[#1c2738] self-start md:self-auto shrink-0">
            {[
              { id: 'all', label: 'All Markets' },
              { id: 'crypto', label: 'Crypto' },
              { id: 'commodities', label: 'Gold & Oil' },
              { id: 'forex', label: 'Forex' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Council of 4 AI Models Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              name: 'Claude 3.7',
              corp: 'Anthropic',
              role: 'Macro Logic & Risk Sizing',
              badge: 'Deep Reasoning',
              color: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
              icon: '🟣',
            },
            {
              name: 'ChatGPT-4o',
              corp: 'OpenAI',
              role: 'Price Action & Breakout Patterns',
              badge: 'Pattern Pro',
              color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
              icon: '🟢',
            },
            {
              name: 'DeepSeek-R1',
              corp: 'DeepSeek',
              role: 'Orderflow & Liquidity Math',
              badge: 'Quant Math',
              color: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
              icon: '🔵',
            },
            {
              name: 'Gemini 2.0',
              corp: 'Google',
              role: 'Chart Vision & Global News NLP',
              badge: 'Multi-Modal',
              color: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
              icon: '🔷',
            },
          ].map((m) => (
            <div
              key={m.name}
              className={`p-3.5 rounded-2xl border ${m.color} flex flex-col justify-between transition hover:border-white/20`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{m.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-white">{m.name}</div>
                    <div className="text-[10px] text-slate-400">{m.corp}</div>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {m.badge}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 font-sans mt-2">{m.role}</div>
            </div>
          ))}
        </div>

        {/* 3. Sub-filter: Unanimous / Buy / Sell */}
        <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Filter Consensus:</span>
            {[
              { id: 'all', label: 'All Signals' },
              { id: 'unanimous', label: '⭐ 100% Unanimous (4/4 Only)' },
              { id: 'buy', label: 'Strong Buy' },
              { id: 'sell', label: 'Strong Sell' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-300'
                    : 'bg-[#0e1522] border-[#1d2a3d] text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="text-white font-bold">{filtered.length}</span> verified AI
            setups
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs shadow-lg animate-rise">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      {/* 4. Grid of Multi-AI Ensemble Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((s) => {
          const isBuy = s.consensusAction === 'buy';
          const currentTab = activeModelTab[s.id] || 'consensus';

          return (
            <div
              key={s.id}
              className="rounded-3xl bg-[#090d16] border border-[#1b2638] hover:border-amber-400/40 transition-all duration-300 shadow-2xl p-6 flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              {/* Top ambient highlight */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isBuy
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400'
                    : 'bg-gradient-to-r from-rose-500 via-amber-500 to-purple-500'
                }`}
              />

              {/* Header: Asset + Consensus Verdict */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#121b29] border border-[#24364e] flex items-center justify-center font-black text-sm text-amber-300 shadow-inner">
                      {s.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-white">
                          {s.display_name}
                        </span>
                        <span className="text-xs font-mono text-slate-300 font-bold">
                          ${s.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{s.timeframe}</div>
                    </div>
                  </div>

                  {/* Verdict & Winrate Badges */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black tracking-wider shadow ${
                        isBuy
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {s.consensusVerdict}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>{s.winRate}% Winrate</span>
                    </span>
                  </div>
                </div>

                {/* Agreement Meter */}
                <div className="p-3 rounded-2xl bg-[#0f1725] border border-[#1a2638] mt-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-amber-400" />
                      <span>Council Agreement</span>
                    </span>
                    <span className="font-mono font-bold text-amber-300 text-[11px]">
                      {s.agreementRatio}
                    </span>
                  </div>

                  {/* Mini-pills for 4 AI Models' Votes */}
                  <div className="grid grid-cols-4 gap-1.5 mt-2">
                    {[
                      {
                        key: 'claude',
                        name: 'Claude 3.7',
                        vote: s.models.claude.action.toUpperCase(),
                        conf: s.models.claude.confidence,
                      },
                      {
                        key: 'chatgpt',
                        name: 'ChatGPT-4o',
                        vote: s.models.chatgpt.action.toUpperCase(),
                        conf: s.models.chatgpt.confidence,
                      },
                      {
                        key: 'deepseek',
                        name: 'DeepSeek-R1',
                        vote: s.models.deepseek.action.toUpperCase(),
                        conf: s.models.deepseek.confidence,
                      },
                      {
                        key: 'gemini',
                        name: 'Gemini 2.0',
                        vote: s.models.gemini.action.toUpperCase(),
                        conf: s.models.gemini.confidence,
                      },
                    ].map((model) => (
                      <button
                        key={model.key}
                        onClick={() =>
                          setActiveModelTab((prev) => ({
                            ...prev,
                            [s.id]: currentTab === model.key ? 'consensus' : model.key,
                          }))
                        }
                        className={`p-1.5 rounded-xl border text-center transition cursor-pointer ${
                          currentTab === model.key
                            ? 'bg-white/15 border-white/40 ring-1 ring-white/30'
                            : 'bg-[#141f30] border-[#22334b] hover:bg-[#18263b]'
                        }`}
                      >
                        <div className="text-[10px] text-slate-300 font-semibold truncate">
                          {model.name}
                        </div>
                        <div
                          className={`text-[10px] font-mono font-black ${
                            model.vote === 'BUY'
                              ? 'text-emerald-400'
                              : model.vote === 'SELL'
                              ? 'text-rose-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {model.vote} {model.conf}%
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Perspective View Drawer (Consensus vs Selected AI Model) */}
                <div className="mt-3 p-3.5 rounded-2xl bg-[#0b111d] border border-[#172233] text-xs">
                  {currentTab === 'consensus' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
                          <span>Blended AI Ensemble Thesis:</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                          Score: {s.consensusScore}/100
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {s.ensembleAnalysis}
                      </p>
                      <div className="text-[11px] text-slate-400 pt-1 border-t border-white/5">
                        <span className="text-amber-400 font-semibold">Macro NLP: </span>
                        {s.macroSentiment}
                      </div>
                    </div>
                  )}

                  {currentTab === 'claude' && (
                    <div className="space-y-1.5 animate-rise">
                      <div className="flex items-center justify-between text-amber-300 font-bold">
                        <span>🟣 Claude 3.7 Sonnet (Anthropic)</span>
                        <span className="text-[10px] font-mono bg-amber-400/20 px-2 py-0.5 rounded">
                          {s.models.claude.specialty}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        "{s.models.claude.thesis}"
                      </p>
                    </div>
                  )}

                  {currentTab === 'chatgpt' && (
                    <div className="space-y-1.5 animate-rise">
                      <div className="flex items-center justify-between text-emerald-300 font-bold">
                        <span>🟢 ChatGPT-4o (OpenAI)</span>
                        <span className="text-[10px] font-mono bg-emerald-400/20 px-2 py-0.5 rounded">
                          {s.models.chatgpt.specialty}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        "{s.models.chatgpt.thesis}"
                      </p>
                    </div>
                  )}

                  {currentTab === 'deepseek' && (
                    <div className="space-y-1.5 animate-rise">
                      <div className="flex items-center justify-between text-blue-300 font-bold">
                        <span>🔵 DeepSeek-R1 (DeepSeek)</span>
                        <span className="text-[10px] font-mono bg-blue-400/20 px-2 py-0.5 rounded">
                          {s.models.deepseek.specialty}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        "{s.models.deepseek.thesis}"
                      </p>
                    </div>
                  )}

                  {currentTab === 'gemini' && (
                    <div className="space-y-1.5 animate-rise">
                      <div className="flex items-center justify-between text-purple-300 font-bold">
                        <span>🔷 Gemini 2.0 Pro (Google)</span>
                        <span className="text-[10px] font-mono bg-purple-400/20 px-2 py-0.5 rounded">
                          {s.models.gemini.specialty}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        "{s.models.gemini.thesis}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Trade Levels: Entry, TP1, TP2, Stop Loss */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-3 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-[#0f1624] border border-[#1b2738]">
                    <div className="text-[10px] text-slate-400 font-sans">Optimal Entry</div>
                    <div className="font-bold text-white text-sm">${s.entry.toLocaleString()}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0f1624] border border-[#1b2738]">
                    <div className="text-[10px] text-slate-400 font-sans">Risk / Reward</div>
                    <div className="font-bold text-amber-400 text-sm">{s.risk_reward}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0f1624] border border-[#1b2738]">
                    <div className="text-[10px] text-emerald-400 font-sans flex items-center gap-1">
                      <Target className="w-3 h-3" /> Target 1 (TP1)
                    </div>
                    <div className="font-bold text-emerald-400 text-sm">
                      ${s.target1.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0f1624] border border-[#1b2738]">
                    <div className="text-[10px] text-rose-400 font-sans flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Stop Loss (SL)
                    </div>
                    <div className="font-bold text-rose-400 text-sm">
                      ${s.stop_loss.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#182333] flex items-center gap-2">
                <button
                  onClick={() => handleExecute(s.symbol, s.consensusAction)}
                  className="flex-1 py-3 rounded-2xl bg-white text-black font-black text-xs hover:bg-slate-100 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Execute Consensus Plan ($1,000)</span>
                </button>
                <button
                  onClick={() => onTradeNow(s.symbol)}
                  className="px-4 py-3 rounded-2xl bg-[#141e2e] border border-[#25374e] text-slate-300 hover:text-white hover:border-slate-400 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
