<?php

namespace Database\Seeders;

use App\Models\MarketPair;
use App\Models\Order;
use App\Models\Trade;
use App\Models\Wallet;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Comprehensive Market Pairs for Traders (Commodities, Crypto, Stocks, Forex, Indices)
        $pairs = [
            // Commodities (Gold, Silver, Oil)
            [
                'symbol' => 'XAUUSD',
                'display_name' => 'XAU/USD (Gold)',
                'category' => 'commodities',
                'base_asset' => 'XAU',
                'quote_asset' => 'USD',
                'price' => 2685.40,
                'change_24h' => 1.45,
                'high_24h' => 2698.80,
                'low_24h' => 2664.20,
                'volume_24h' => 8421500.00,
                'market_cap' => 16500000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'XAGUSD',
                'display_name' => 'XAG/USD (Silver)',
                'category' => 'commodities',
                'base_asset' => 'XAG',
                'quote_asset' => 'USD',
                'price' => 31.28,
                'change_24h' => 2.85,
                'high_24h' => 31.95,
                'low_24h' => 30.40,
                'volume_24h' => 3124500.00,
                'market_cap' => 1750000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'WTIUSD',
                'display_name' => 'WTI/USD (Crude Oil)',
                'category' => 'commodities',
                'base_asset' => 'WTI',
                'quote_asset' => 'USD',
                'price' => 69.85,
                'change_24h' => -1.15,
                'high_24h' => 71.40,
                'low_24h' => 68.90,
                'volume_24h' => 15840000.00,
                'market_cap' => null,
                'is_active' => true,
            ],

            // Crypto
            [
                'symbol' => 'BTCUSDT',
                'display_name' => 'BTC/USDT',
                'category' => 'crypto',
                'base_asset' => 'BTC',
                'quote_asset' => 'USDT',
                'price' => 91450.25,
                'change_24h' => 3.84,
                'high_24h' => 92600.00,
                'low_24h' => 88120.50,
                'volume_24h' => 48215.34,
                'market_cap' => 1805000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'ETHUSDT',
                'display_name' => 'ETH/USDT',
                'category' => 'crypto',
                'base_asset' => 'ETH',
                'quote_asset' => 'USDT',
                'price' => 3385.60,
                'change_24h' => 2.15,
                'high_24h' => 3450.00,
                'low_24h' => 3290.00,
                'volume_24h' => 312450.80,
                'market_cap' => 407000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'SOLUSDT',
                'display_name' => 'SOL/USDT',
                'category' => 'crypto',
                'base_asset' => 'SOL',
                'quote_asset' => 'USDT',
                'price' => 218.45,
                'change_24h' => 7.62,
                'high_24h' => 224.50,
                'low_24h' => 201.10,
                'volume_24h' => 1892040.20,
                'market_cap' => 102000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'XRPUSDT',
                'display_name' => 'XRP/USDT',
                'category' => 'crypto',
                'base_asset' => 'XRP',
                'quote_asset' => 'USDT',
                'price' => 1.4820,
                'change_24h' => 14.25,
                'high_24h' => 1.5500,
                'low_24h' => 1.2800,
                'volume_24h' => 98214500.00,
                'market_cap' => 84000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'BNBUSDT',
                'display_name' => 'BNB/USDT',
                'category' => 'crypto',
                'base_asset' => 'BNB',
                'quote_asset' => 'USDT',
                'price' => 658.30,
                'change_24h' => -0.85,
                'high_24h' => 672.00,
                'low_24h' => 650.10,
                'volume_24h' => 215400.10,
                'market_cap' => 96000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'DOGEUSDT',
                'display_name' => 'DOGE/USDT',
                'category' => 'crypto',
                'base_asset' => 'DOGE',
                'quote_asset' => 'USDT',
                'price' => 0.3845,
                'change_24h' => 5.40,
                'high_24h' => 0.4120,
                'low_24h' => 0.3620,
                'volume_24h' => 154200000.00,
                'market_cap' => 56000000000,
                'is_active' => true,
            ],

            // Stocks
            [
                'symbol' => 'NVDAUSD',
                'display_name' => 'NVDA/USD',
                'category' => 'stocks',
                'base_asset' => 'NVDA',
                'quote_asset' => 'USD',
                'price' => 146.50,
                'change_24h' => 2.45,
                'high_24h' => 148.90,
                'low_24h' => 142.10,
                'volume_24h' => 45890000.00,
                'market_cap' => 3580000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'AAPLUSD',
                'display_name' => 'AAPL/USD',
                'category' => 'stocks',
                'base_asset' => 'AAPL',
                'quote_asset' => 'USD',
                'price' => 228.80,
                'change_24h' => -0.32,
                'high_24h' => 231.50,
                'low_24h' => 227.10,
                'volume_24h' => 32150000.00,
                'market_cap' => 3480000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'TSLAUSD',
                'display_name' => 'TSLA/USD',
                'category' => 'stocks',
                'base_asset' => 'TSLA',
                'quote_asset' => 'USD',
                'price' => 342.60,
                'change_24h' => 6.18,
                'high_24h' => 349.80,
                'low_24h' => 321.40,
                'volume_24h' => 68420000.00,
                'market_cap' => 1100000000000,
                'is_active' => true,
            ],
            [
                'symbol' => 'MSFTUSD',
                'display_name' => 'MSFT/USD',
                'category' => 'stocks',
                'base_asset' => 'MSFT',
                'quote_asset' => 'USD',
                'price' => 428.20,
                'change_24h' => 1.12,
                'high_24h' => 431.00,
                'low_24h' => 424.50,
                'volume_24h' => 24100000.00,
                'market_cap' => 3180000000000,
                'is_active' => true,
            ],

            // Forex
            [
                'symbol' => 'EURUSD',
                'display_name' => 'EUR/USD',
                'category' => 'forex',
                'base_asset' => 'EUR',
                'quote_asset' => 'USD',
                'price' => 1.0542,
                'change_24h' => -0.18,
                'high_24h' => 1.0585,
                'low_24h' => 1.0515,
                'volume_24h' => 1250000000.00,
                'market_cap' => null,
                'is_active' => true,
            ],
            [
                'symbol' => 'GBPUSD',
                'display_name' => 'GBP/USD',
                'category' => 'forex',
                'base_asset' => 'GBP',
                'quote_asset' => 'USD',
                'price' => 1.2645,
                'change_24h' => 0.28,
                'high_24h' => 1.2690,
                'low_24h' => 1.2605,
                'volume_24h' => 840000000.00,
                'market_cap' => null,
                'is_active' => true,
            ],
            [
                'symbol' => 'USDJPY',
                'display_name' => 'USD/JPY',
                'category' => 'forex',
                'base_asset' => 'USD',
                'quote_asset' => 'JPY',
                'price' => 154.35,
                'change_24h' => 0.42,
                'high_24h' => 154.95,
                'low_24h' => 153.80,
                'volume_24h' => 960000000.00,
                'market_cap' => null,
                'is_active' => true,
            ],

            // Indices
            [
                'symbol' => 'SPXUSD',
                'display_name' => 'S&P 500 (SPX)',
                'category' => 'indices',
                'base_asset' => 'SPX',
                'quote_asset' => 'USD',
                'price' => 5982.50,
                'change_24h' => 0.65,
                'high_24h' => 5998.00,
                'low_24h' => 5954.20,
                'volume_24h' => 4500000000.00,
                'market_cap' => null,
                'is_active' => true,
            ],
            [
                'symbol' => 'NDXUSD',
                'display_name' => 'Nasdaq 100 (NDX)',
                'category' => 'indices',
                'base_asset' => 'NDX',
                'quote_asset' => 'USD',
                'price' => 20865.00,
                'change_24h' => 1.15,
                'high_24h' => 20950.00,
                'low_24h' => 20710.00,
                'volume_24h' => 5200000000.00,
                'market_cap' => null,
                'is_active' => true,
            ],
        ];

        foreach ($pairs as $pair) {
            MarketPair::updateOrCreate(['symbol' => $pair['symbol']], $pair);
        }

        // 2. Seed Wallets (USDT, USD, Gold XAU, BTC, ETH, SOL, NVDA)
        $wallets = [
            ['asset' => 'USDT', 'free' => 50000.00, 'locked' => 0],
            ['asset' => 'USD', 'free' => 50000.00, 'locked' => 0],
            ['asset' => 'XAU', 'free' => 5.00, 'locked' => 0], // 5 oz of Gold
            ['asset' => 'BTC', 'free' => 1.45, 'locked' => 0],
            ['asset' => 'ETH', 'free' => 12.00, 'locked' => 0],
            ['asset' => 'SOL', 'free' => 65.50, 'locked' => 0],
            ['asset' => 'NVDA', 'free' => 50.00, 'locked' => 0],
        ];

        foreach ($wallets as $wallet) {
            Wallet::updateOrCreate(['asset' => $wallet['asset']], $wallet);
        }

        // 3. Seed Initial Sample Orders
        Order::create([
            'symbol' => 'XAUUSD',
            'side' => 'buy',
            'type' => 'limit',
            'price' => 2670.00,
            'amount' => 2.0,
            'filled' => 0,
            'total' => 5340.00,
            'status' => 'open',
        ]);

        Order::create([
            'symbol' => 'BTCUSDT',
            'side' => 'buy',
            'type' => 'limit',
            'price' => 90500.00,
            'amount' => 0.5000,
            'filled' => 0,
            'total' => 45250.00,
            'status' => 'open',
        ]);
    }
}
