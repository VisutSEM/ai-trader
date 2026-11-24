# Bost Trader 📈⚡

**Bost Trader** is an institutional-grade, multi-asset trading platform and analytical terminal built with a high-performance **Next.js** frontend and a robust **Laravel** backend.

---

## 🌟 Key Features

### 1. Multi-Market Coverage
- **Commodities:** Gold (`XAU/USD`), Silver (`XAG/USD`), Crude Oil (`WTI/USD`).
- **Cryptocurrency:** Bitcoin (`BTC/USDT`), Ethereum (`ETH/USDT`), Solana (`SOL/USDT`), XRP (`XRP/USDT`), BNB, Dogecoin.
- **Stocks & Equities:** NVIDIA (`NVDA/USD`), Apple (`AAPL/USD`), Tesla (`TSLA/USD`), Microsoft (`MSFT/USD`).
- **Forex:** EUR/USD, GBP/USD, USD/JPY, AUD/USD.
- **Major Indices:** S&P 500 (`SPX/USD`), Nasdaq 100 (`NDX/USD`).

### 2. Bost AI Analytic & 1-Click Signal Follow
- **Algorithmic Technical Indicators:** Real-time 14-period RSI, MACD Bullish/Bearish Crossover, Moving Averages (EMA 20, EMA 50, SMA 200), and Bollinger Bands.
- **Actionable Verdicts:** `STRONG BUY`, `BUY`, `NEUTRAL`, `SELL`, and `STRONG SELL` with confidence score (e.g., 88%) and historical win rate (~78.4%).
- **Automated Levels:** Automatic calculation of Optimal Entry Price, Target Price (TP), and Stop Loss (SL).
- **1-Click Trade Follow:** Traders can choose an investment size ($250, $500, $1,000, $2,500, $5,000, or custom) and follow the AI signal directly with a single click.

### 3. Professional Trading Terminal
- **Interactive Candlestick & Volume Chart:** High-performance canvas chart supporting `1m`, `5m`, `15m`, `1h`, `4h`, `1D`, `1W` intervals, crosshairs, tooltips, and indicator overlays.
- **Real-Time Order Book & Market Depth:** Live asks and bids with cumulative depth visualization, spread indicator, and tick direction.
- **Order Execution Engine:** Limit and Market orders with quick percentage allocation sliders (25%, 50%, 75%, 100%).
- **Multi-Asset Wallet:** Pre-loaded with demo funds:
  - \$50,000 USD / USDT
  - 5 oz Physical Gold (`XAU`)
  - 1.45 BTC, 12 ETH, 65.5 SOL, 50 NVDA
  - 1-Click "Reset Demo Funds" button.

---

## 🚀 Quick Start Guide

### Option 1: 1-Click Launch (Recommended)
Double-click `start-all.bat` in the root folder (`D:\bost-trader\start-all.bat`).  
It will automatically start both the Laravel API and the Next.js frontend, and open `http://localhost:3000` in your browser.

### Option 2: Manual Start

#### Backend (Laravel)
```bash
cd D:\bost-trader\backend
php artisan serve --port=8000
```
API endpoints will be live at `http://localhost:8000/api`.

#### Frontend (Next.js)
```bash
cd D:\bost-trader\frontend
npm run dev -- -p 3000
```
Terminal interface will be accessible at `http://localhost:3000`.

---

## 🔌 API Architecture (Laravel)

| Route | Method | Description |
|---|---|---|
| `/api/markets` | `GET` | List all market pairs (filterable by category & search) |
| `/api/markets/{symbol}` | `GET` | Get single market details and 24h ticker |
| `/api/markets/{symbol}/candles` | `GET` | Historical OHLCV candlestick data for charts |
| `/api/markets/{symbol}/orderbook` | `GET` | Real-time order book bids and asks with depth |
| `/api/markets/{symbol}/trades` | `GET` | Recent market trade history |
| `/api/markets/{symbol}/analytic` | `GET` | Bost AI technical indicators & signal verdict |
| `/api/trading/wallet` | `GET` | User balances and total USD net worth |
| `/api/trading/wallet/reset` | `POST` | Reset demo funds to initial balances |
| `/api/trading/orders` | `GET` | Open orders and order history |
| `/api/trading/orders` | `POST` | Execute manual Limit or Market trade |
| `/api/trading/orders/follow-signal` | `POST` | 1-Click execute trade following AI Analytic signal |
| `/api/trading/orders/{id}` | `DELETE` | Cancel open limit order and release locked funds |
| `/api/trading/signals` | `GET` | All active AI Trading Signals across markets |

---

## 🛠 Project Structure

```
D:\bost-trader\
├── backend/                  # Laravel 11/13 API Application
│   ├── app/Http/Controllers/ # MarketController, TradingController
│   ├── app/Models/           # MarketPair, Order, Wallet, Trade
│   ├── database/             # SQLite DB, Migrations, Seeders
│   └── routes/api.php        # RESTful API routing
├── frontend/                 # Next.js 16 + React 19 + Tailwind CSS Terminal
│   ├── src/app/              # Next.js App Router (page.tsx, layout.tsx)
│   ├── src/components/       # Header, TradingChart, AnalyticPanel, OrderBook, TradingForm, etc.
│   ├── src/services/api.ts   # Unified API service with failover fallback
│   └── src/types/trading.ts  # TypeScript domain models
├── start-all.bat             # 1-Click launcher
├── start-backend.bat         # Backend server script
├── start-frontend.bat        # Frontend dev server script
└── README.md
```
