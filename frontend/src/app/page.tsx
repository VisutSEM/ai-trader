'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ZoqiraTickerBar } from '@/components/ZoqiraTickerBar';
import { ZoqiraNavbar } from '@/components/ZoqiraNavbar';
import { ZoqiraHero } from '@/components/ZoqiraHero';
import { ZoqiraStatsBar } from '@/components/ZoqiraStatsBar';
import { ZoqiraFeatures } from '@/components/ZoqiraFeatures';
import { ZoqiraAiSimulation } from '@/components/ZoqiraAiSimulation';
import { ZoqiraMarketsSection } from '@/components/ZoqiraMarketsSection';
import { ZoqiraPartnersSection } from '@/components/ZoqiraPartnersSection';
import { ZoqiraCtaSection } from '@/components/ZoqiraCtaSection';
import { ZoqiraFooter } from '@/components/ZoqiraFooter';
import { ZoqiraRail } from '@/components/ZoqiraRail';
import { ZoqiraTelegramPill } from '@/components/ZoqiraTelegramPill';
import { ZoqiraPwaBar } from '@/components/ZoqiraPwaBar';
import { ZoqiraAuthModal } from '@/components/ZoqiraAuthModal';
import { ZoqiraSignalsPage } from '@/components/ZoqiraSignalsPage';
import { ZoqiraNewsSignalsPage } from '@/components/ZoqiraNewsSignalsPage';
import { ZoqiraTrackRecordPage } from '@/components/ZoqiraTrackRecordPage';
import { ZoqiraCertificatesPage } from '@/components/ZoqiraCertificatesPage';
import { ZoqiraPricingPage } from '@/components/ZoqiraPricingPage';
import { ZoqiraBlogPage } from '@/components/ZoqiraBlogPage';
import { ZoqiraApiDocsPage } from '@/components/ZoqiraApiDocsPage';
import { ZoqiraContactPage } from '@/components/ZoqiraContactPage';

// Trading Terminal Components
import { MarketBar } from '@/components/MarketBar';
import { TradingChart } from '@/components/TradingChart';
import { AnalyticPanel } from '@/components/AnalyticPanel';
import { OrderBookComponent } from '@/components/OrderBook';
import { TradingForm } from '@/components/TradingForm';
import { MarketListSidebar } from '@/components/MarketListSidebar';
import { BottomPanel } from '@/components/BottomPanel';
import { ZoqiraAssetBar } from '@/components/ZoqiraAssetBar';
import { ZoqiraQuickTrade } from '@/components/ZoqiraQuickTrade';
import { ActiveTradesOverlay } from '@/components/ActiveTradesOverlay';

import {
  fetchMarkets,
  fetchMarket,
  fetchCandles,
  fetchOrderBook,
  fetchTrades,
  fetchAnalytic,
  fetchAllSignals,
  fetchWallet,
  resetWalletApi,
  fetchOrders,
  placeOrderApi,
  followSignalApi,
  cancelOrderApi,
} from '@/services/api';

import { binanceSocket } from '@/services/binanceSocket';

import {
  MarketPair,
  Candle,
  OrderBook,
  Trade,
  Order,
  WalletData,
  AnalyticData,
  Signal,
  QuickTrade,
} from '@/types/trading';
import { Zap, BarChart2, RefreshCw } from 'lucide-react';

export default function Home() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  // Terminal Trading State
  const [tradingMode, setTradingMode] = useState<'zoqira-quick' | 'spot'>('zoqira-quick');
  const [markets, setMarkets] = useState<MarketPair[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('XAUUSD');
  const [selectedPair, setSelectedPair] = useState<MarketPair | null>(null);
  const [timeframe, setTimeframe] = useState<string>('15m');
  const [chartType, setChartType] = useState<'candles' | 'line'>('candles');
  const [showIndicators, setShowIndicators] = useState<boolean>(true);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const [candles, setCandles] = useState<Candle[]>([]);
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [analytic, setAnalytic] = useState<AnalyticData | null>(null);
  const [signals, setSignals] = useState<Signal[]>([]);

  // Zoqira Pro Active Binary Option Trades
  const [activeTrades, setActiveTrades] = useState<QuickTrade[]>([]);
  const [completedTrade, setCompletedTrade] = useState<QuickTrade | null>(null);

  // Price ref for countdown evaluation
  const priceRef = useRef<number>(2685.40);
  if (selectedPair) {
    priceRef.current = selectedPair.price;
  }

  // Load Initial Markets & Global State
  useEffect(() => {
    async function init() {
      const [mkts, sigs, wal, ords] = await Promise.all([
        fetchMarkets(),
        fetchAllSignals(),
        fetchWallet(),
        fetchOrders(),
      ]);
      setMarkets(mkts);
      setSignals(sigs);
      setWallet(wal);
      setOrders(ords);

      const defaultPair = mkts.find((m) => m.symbol === 'XAUUSD') || mkts[0];
      if (defaultPair) {
        setSelectedPair(defaultPair);
        setSelectedSymbol(defaultPair.symbol);
        priceRef.current = defaultPair.price;
      }
    }
    init();
  }, []);

  // Fetch data for selected symbol & timeframe
  const loadPairData = useCallback(async (symbol: string, tf: string) => {
    const [c, ob, tr, an] = await Promise.all([
      fetchCandles(symbol, tf),
      fetchOrderBook(symbol),
      fetchTrades(symbol),
      fetchAnalytic(symbol),
    ]);
    setCandles(c);
    setOrderBook(ob);
    setTrades(tr);
    setAnalytic(an);
  }, []);

  useEffect(() => {
    if (selectedSymbol) {
      loadPairData(selectedSymbol, timeframe);
    }
  }, [selectedSymbol, timeframe, loadPairData]);

  // Real-Time Binance WebSocket multi-ticker stream for crypto & gold
  useEffect(() => {
    binanceSocket.initTickerStream();

    const unsubTicker = binanceSocket.onTicker((update) => {
      setMarkets((prev) =>
        prev.map((m) =>
          m.symbol === update.symbol
            ? {
                ...m,
                price: update.price,
                change_24h: update.change24h,
                high_24h: Math.max(m.high_24h, update.high24h || update.price),
                low_24h: Math.min(m.low_24h, update.low24h || update.price),
                volume_24h: update.volume24h || m.volume_24h,
              }
            : m
        )
      );

      setSelectedPair((curr) => {
        if (!curr || curr.symbol !== update.symbol) return curr;
        priceRef.current = update.price;
        return {
          ...curr,
          price: update.price,
          change_24h: update.change24h,
          high_24h: Math.max(curr.high_24h, update.high24h || update.price),
          low_24h: Math.min(curr.low_24h, update.low24h || update.price),
          volume_24h: update.volume24h || curr.volume_24h,
        };
      });
    });

    return () => {
      unsubTicker();
    };
  }, []);

  // Real-Time Kline (Candlestick) streaming for the active chart
  useEffect(() => {
    if (selectedSymbol) {
      binanceSocket.subscribeKline(selectedSymbol, timeframe);
    }
  }, [selectedSymbol, timeframe]);

  useEffect(() => {
    const unsubKline = binanceSocket.onKline((kline) => {
      if (kline.symbol !== selectedSymbol) return;

      setCandles((prev) => {
        if (!prev || prev.length === 0) return prev;
        const lastIdx = prev.length - 1;
        const last = prev[lastIdx];

        // Same period: update current developing candle
        if (Math.abs(last.time - kline.time) < 60 || last.time === kline.time) {
          const updated = [...prev];
          updated[lastIdx] = {
            ...last,
            high: Math.max(last.high, kline.high),
            low: Math.min(last.low, kline.low),
            close: kline.close,
            volume: kline.volume,
          };
          return updated;
        }

        // New candle period started
        if (kline.time > last.time) {
          return [
            ...prev.slice(1),
            {
              time: kline.time,
              open: kline.open,
              high: kline.high,
              low: kline.low,
              close: kline.close,
              volume: kline.volume,
            },
          ];
        }

        return prev;
      });
    });

    return () => {
      unsubKline();
    };
  }, [selectedSymbol]);

  // Subtle live polling micro-jitter strictly for non-crypto pairs (Forex & Oil)
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prev) =>
        prev.map((m) => {
          if (m.category === 'crypto' || m.symbol === 'XAUUSD') {
            return m;
          }
          const delta = (Math.random() - 0.49) * (m.price * 0.0004);
          const newPrice = Number((m.price + delta).toFixed(m.decimals || 4));
          return {
            ...m,
            price: newPrice,
            high_24h: Math.max(m.high_24h, newPrice),
            low_24h: Math.min(m.low_24h, newPrice),
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleSelectPair = (pair: MarketPair) => {
    setSelectedPair(pair);
    setSelectedSymbol(pair.symbol);
    priceRef.current = pair.price;
  };

  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbol(symbol);
    const pair = markets.find((m) => m.symbol === symbol);
    if (pair) {
      setSelectedPair(pair);
      priceRef.current = pair.price;
    }
  };

  // Place Spot Order
  const handlePlaceOrder = async (orderData: {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'market' | 'limit';
    price?: number;
    amount: number;
  }) => {
    await placeOrderApi(orderData);
    const [updatedWallet, updatedOrders, updatedTrades] = await Promise.all([
      fetchWallet(),
      fetchOrders(),
      fetchTrades(orderData.symbol),
    ]);
    setWallet(updatedWallet);
    setOrders(updatedOrders);
    setTrades(updatedTrades);
  };

  // 1-Click Follow Signal Action
  const handleFollowSignal = async (
    symbol: string,
    action: 'buy' | 'sell',
    amountUsd: number
  ) => {
    await followSignalApi(symbol, action, amountUsd);
    const [updatedWallet, updatedOrders, updatedTrades] = await Promise.all([
      fetchWallet(),
      fetchOrders(),
      fetchTrades(symbol),
    ]);
    setWallet(updatedWallet);
    setOrders(updatedOrders);
    setTrades(updatedTrades);
  };

  // Place Fast Zoqira Binary Option Trade
  const handlePlaceQuickTrade = (tradeData: {
    symbol: string;
    display_name: string;
    direction: 'up' | 'down';
    amount: number;
    durationSeconds: number;
    payoutPercent: number;
  }) => {
    if (!selectedPair) return;
    const now = Date.now();
    const newTrade: QuickTrade = {
      id: `zq-${now}-${Math.random().toString(36).substring(2, 6)}`,
      symbol: tradeData.symbol,
      display_name: tradeData.display_name,
      direction: tradeData.direction,
      amount: tradeData.amount,
      entryPrice: selectedPair.price,
      currentPrice: selectedPair.price,
      payoutPercent: tradeData.payoutPercent,
      durationSeconds: tradeData.durationSeconds,
      remainingSeconds: tradeData.durationSeconds,
      status: 'active',
      payoutAmount: tradeData.amount * (1 + tradeData.payoutPercent / 100),
      createdAt: now,
      startTime: now,
      endTime: now + tradeData.durationSeconds * 1000,
    };

    setActiveTrades((prev) => [...prev, newTrade]);

    if (wallet) {
      setWallet({
        ...wallet,
        wallets: wallet.wallets.map((w) =>
          w.asset === 'USD' || w.asset === 'USDT'
            ? { ...w, free: Math.max(0, w.free - tradeData.amount) }
            : w
        ),
      });
    }

    setTimeout(() => {
      const exitPrice = priceRef.current;
      const isWin =
        tradeData.direction === 'up'
          ? exitPrice > newTrade.entryPrice
          : exitPrice < newTrade.entryPrice;

      const payout = isWin ? tradeData.amount * (1 + newTrade.payoutPercent / 100) : 0;

      const finishedTrade: QuickTrade = {
        ...newTrade,
        exitPrice,
        status: isWin ? 'won' : 'lost',
        payout,
      };

      setActiveTrades((prev) => prev.filter((t) => t.id !== newTrade.id));
      setCompletedTrade(finishedTrade);

      if (isWin && wallet) {
        setWallet((prev) =>
          prev
            ? {
                ...prev,
                wallets: prev.wallets.map((w) =>
                  w.asset === 'USD' || w.asset === 'USDT'
                    ? { ...w, free: w.free + payout }
                    : w
                ),
              }
            : null
        );
      }
    }, tradeData.durationSeconds * 1000);
  };

  const handleCancelOrder = async (id: number) => {
    await cancelOrderApi(id);
    const [updatedWallet, updatedOrders] = await Promise.all([
      fetchWallet(),
      fetchOrders(),
    ]);
    setWallet(updatedWallet);
    setOrders(updatedOrders);
  };

  const handleResetWallet = async () => {
    await resetWalletApi();
    const [updatedWallet, updatedOrders] = await Promise.all([
      fetchWallet(),
      fetchOrders(),
    ]);
    setWallet(updatedWallet);
    setOrders(updatedOrders);
  };

  return (
    <div className="min-h-screen bg-[#04060c] text-slate-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-200">
      {/* 1. Top Real-Time Quotes Ticker Bar */}
      <ZoqiraTickerBar
        markets={markets}
        onSelectSymbol={(s) => {
          handleSelectSymbol(s);
          setCurrentPage('terminal');
        }}
      />

      {/* 2. Zoqira Global Navbar */}
      <ZoqiraNavbar
        activePage={currentPage}
        setActivePage={setCurrentPage}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setAuthModalOpen(true);
        }}
      />

      {/* 3. Main Views Router */}
      <main className="flex-1">
        {/* === HOME PAGE: FULL ZOQIRA MARKETING & PLATFORM SHOWCASE === */}
        {currentPage === 'home' && (
          <div className="relative">
            {/* Right side floating navigation rail */}
            <ZoqiraRail />

            {/* Hero Section */}
            <ZoqiraHero
              onStartFreeTrial={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
              onViewSignals={() => setCurrentPage('signals')}
            />

            {/* Key Stats Bar */}
            <ZoqiraStatsBar />

            {/* Intelligence Stack Features */}
            <ZoqiraFeatures />

            {/* See How AI Works Interactive Pipeline */}
            <ZoqiraAiSimulation onFollowSignal={handleFollowSignal} />

            {/* Markets We Analyze */}
            <ZoqiraMarketsSection
              onSelectMarket={(s) => {
                setSelectedSymbol(s);
                setCurrentPage('terminal');
              }}
              onOpenAnalysis={() => setCurrentPage('terminal')}
            />

            {/* Partner Brokers Section */}
            <ZoqiraPartnersSection
              onOpenRegister={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
            />

            {/* CTA Section */}
            <ZoqiraCtaSection
              onStartFreeTrial={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
              onViewSignals={() => setCurrentPage('signals')}
            />
          </div>
        )}

        {/* === AI SIGNALS VIEW === */}
        {currentPage === 'signals' && (
          <ZoqiraSignalsPage
            signals={signals}
            onTradeNow={(s) => {
              setSelectedSymbol(s);
              setCurrentPage('terminal');
            }}
            onFollowSignal={handleFollowSignal}
          />
        )}

        {/* === NEWS SIGNALS VIEW === */}
        {currentPage === 'news-signals' && (
          <ZoqiraNewsSignalsPage
            onTradeSymbol={(s) => {
              setSelectedSymbol(s);
              setCurrentPage('terminal');
            }}
          />
        )}

        {/* === TRACK RECORD VIEW === */}
        {currentPage === 'track-record' && (
          <ZoqiraTrackRecordPage
            onStartFreeTrial={() => {
              setAuthMode('register');
              setAuthModalOpen(true);
            }}
          />
        )}

        {/* === CERTIFICATES VIEW === */}
        {currentPage === 'certificates' && <ZoqiraCertificatesPage />}

        {/* === PRICING VIEW === */}
        {currentPage === 'pricing' && (
          <ZoqiraPricingPage
            onSelectPlan={(plan) => {
              setAuthMode('register');
              setAuthModalOpen(true);
            }}
          />
        )}

        {/* === BLOG & NEWS VIEW === */}
        {(currentPage === 'blog' || currentPage === 'news') && <ZoqiraBlogPage />}

        {/* === API DOCS VIEW === */}
        {currentPage === 'api' && <ZoqiraApiDocsPage />}

        {/* === CONTACT VIEW === */}
        {currentPage === 'contact' && <ZoqiraContactPage />}

        {/* === LIVE MARKET ANALYSIS & TRADING TERMINAL === */}
        {currentPage === 'terminal' && (
          <div className="flex flex-col h-[calc(100vh-85px)] overflow-hidden bg-[#080b11]">
            {/* Asset Payout Rates Bar */}
            <ZoqiraAssetBar
              markets={markets}
              selectedPair={selectedPair}
              onSelectPair={handleSelectSymbol}
              onOpenScreener={() => setCurrentPage('signals')}
            />

            {/* Sub-Header & Mode Switcher */}
            <div className="relative">
              <MarketBar
                pair={selectedPair}
                timeframe={timeframe}
                setTimeframe={setTimeframe}
                chartType={chartType}
                setChartType={setChartType}
                showIndicators={showIndicators}
                setShowIndicators={setShowIndicators}
                onOpenAnalytics={() => setCurrentPage('signals')}
              />

              {/* Quick Option vs Spot Mode Switcher */}
              <div className="absolute right-4 top-2 hidden xl:flex items-center gap-1 bg-[#131b28] p-1 rounded-xl border border-[#233148]">
                <button
                  onClick={() => setTradingMode('zoqira-quick')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    tradingMode === 'zoqira-quick'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Zoqira Quick Option (UP/DOWN)</span>
                </button>
                <button
                  onClick={() => setTradingMode('spot')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    tradingMode === 'spot'
                      ? 'bg-[#1e2a3c] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Spot / Order Book</span>
                </button>
              </div>
            </div>

            {/* Main Trading Terminal Workspace */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left: Market List Sidebar */}
              <MarketListSidebar
                markets={markets}
                selectedPair={selectedPair}
                onSelectPair={handleSelectSymbol}
              />

              {/* Center: Candlestick Chart & Bottom Orders */}
              <div className="flex-1 flex flex-col min-w-0 border-r border-[#1a2333] relative">
                <ActiveTradesOverlay
                  activeTrades={activeTrades}
                  completedTrade={completedTrade}
                  onDismissCompleted={() => setCompletedTrade(null)}
                  currentPrice={selectedPair ? selectedPair.price : 2685.40}
                />

                <div className="flex-1 relative min-h-0">
                  <TradingChart
                    candles={candles}
                    symbol={selectedPair?.display_name || selectedSymbol}
                    chartType={chartType}
                    showIndicators={showIndicators}
                  />
                </div>

                <BottomPanel
                  orders={orders}
                  trades={trades}
                  wallet={wallet}
                  onCancelOrder={handleCancelOrder}
                />
              </div>

              {/* Center-Right: Order Book (in Spot Mode) */}
              {tradingMode === 'spot' && (
                <div className="w-64 xl:w-72 hidden md:flex flex-col shrink-0">
                  <OrderBookComponent
                    orderBook={orderBook}
                    trades={trades}
                    baseAsset={selectedPair?.base_asset || 'XAU'}
                    quoteAsset={selectedPair?.quote_asset || 'USD'}
                    onSelectPrice={(p) => setSelectedPrice(p)}
                  />
                </div>
              )}

              {/* Right: Zoqira Quick UP/DOWN Trade Box OR Spot Order Form */}
              <div className="w-80 xl:w-96 flex flex-col shrink-0 overflow-y-auto">
                {tradingMode === 'zoqira-quick' ? (
                  <>
                    <div className="flex-1">
                      <ZoqiraQuickTrade
                        pair={selectedPair}
                        wallet={wallet}
                        activeTrades={activeTrades}
                        onPlaceQuickTrade={handlePlaceQuickTrade}
                      />
                    </div>

                    {/* AI Signal Shortcut Box */}
                    <div className="border-t border-[#1a2333] p-3.5 bg-[#0d121c]">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-white flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Zoqira AI Signal</span>
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">
                          {analytic?.verdict || 'STRONG BUY'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                        {analytic?.summary ||
                          'Bullish momentum indicated on Gold (XAU/USD). High payout probability.'}
                      </p>
                      <button
                        onClick={() =>
                          handleFollowSignal(selectedSymbol, analytic?.action || 'buy', 100)
                        }
                        className="w-full py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold text-xs hover:bg-emerald-500 hover:text-black transition cursor-pointer"
                      >
                        Copy AI Signal ({analytic?.action.toUpperCase() || 'BUY'} $100)
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="min-h-[420px]">
                      <AnalyticPanel
                        analytic={analytic}
                        onFollowSignal={handleFollowSignal}
                      />
                    </div>
                    <div className="border-t border-[#1a2333] flex-1">
                      <TradingForm
                        pair={selectedPair}
                        wallet={wallet}
                        selectedPrice={selectedPrice}
                        onPlaceOrder={handlePlaceOrder}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. Footer (shown on all pages except terminal) */}
      {currentPage !== 'terminal' && (
        <ZoqiraFooter
          onNavigate={setCurrentPage}
          onOpenRegister={() => {
            setAuthMode('register');
            setAuthModalOpen(true);
          }}
        />
      )}

      {/* 5. Persistent Floating Elements */}
      <ZoqiraTelegramPill />
      <ZoqiraPwaBar
        onInstall={() => {
          setAuthMode('register');
          setAuthModalOpen(true);
        }}
      />

      {/* 6. Authentication / Free Trial Modal */}
      <ZoqiraAuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
          setCurrentPage('terminal');
        }}
      />
    </div>
  );
}
