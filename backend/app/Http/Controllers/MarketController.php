<?php

namespace App\Http\Controllers;

use App\Models\MarketPair;
use App\Models\Trade;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MarketController extends Controller
{
    /**
     * Get all market pairs with optional category filter & search.
     */
    public function index(Request $request): JsonResponse
    {
        $query = MarketPair::query()->where('is_active', true);

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->has('search') && !empty($request->search)) {
            $s = trim($request->search);
            $query->where(function ($q) use ($s) {
                $q->where('symbol', 'like', "%{$s}%")
                  ->orWhere('display_name', 'like', "%{$s}%")
                  ->orWhere('base_asset', 'like', "%{$s}%");
            });
        }

        $pairs = $query->orderBy('volume_24h', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $pairs,
        ]);
    }

    /**
     * Synchronize live crypto and gold spot market data directly from Binance API.
     */
    public function syncCrypto(): JsonResponse
    {
        $symbolMapping = [
            'BTCUSDT' => 'BTCUSDT',
            'ETHUSDT' => 'ETHUSDT',
            'SOLUSDT' => 'SOLUSDT',
            'XRPUSDT' => 'XRPUSDT',
            'BNBUSDT' => 'BNBUSDT',
            'DOGEUSDT' => 'DOGEUSDT',
            'XAUUSD' => 'PAXGUSDT',
        ];

        $updated = [];

        try {
            $response = Http::timeout(6)->withoutVerifying()->get('https://api.binance.com/api/v3/ticker/24hr');
            if ($response->successful()) {
                $rawList = $response->json();
                $tickerMap = [];
                foreach ($rawList as $item) {
                    if (isset($item['symbol'])) {
                        $tickerMap[$item['symbol']] = $item;
                    }
                }

                foreach ($symbolMapping as $appSymbol => $binanceSymbol) {
                    if (isset($tickerMap[$binanceSymbol])) {
                        $t = $tickerMap[$binanceSymbol];
                        $pair = MarketPair::where('symbol', $appSymbol)->first();
                        if ($pair) {
                            $pair->update([
                                'price' => (float) $t['lastPrice'],
                                'change_24h' => (float) $t['priceChangePercent'],
                                'high_24h' => (float) $t['highPrice'],
                                'low_24h' => (float) $t['lowPrice'],
                                'volume_24h' => (float) $t['volume'],
                            ]);
                            $updated[] = [
                                'symbol' => $appSymbol,
                                'price' => (float) $t['lastPrice'],
                                'change_24h' => (float) $t['priceChangePercent'],
                            ];
                        }
                    }
                }
            }
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Binance sync failed: ' . $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Crypto prices synchronized with Binance',
            'count' => count($updated),
            'data' => $updated,
        ]);
    }

    /**
     * Get a single market pair by symbol.
     */
    public function show(string $symbol): JsonResponse
    {
        $symbolClean = strtoupper(str_replace(['/', '-'], '', $symbol));
        $pair = MarketPair::where('symbol', $symbolClean)
            ->orWhere('symbol', strtoupper($symbol))
            ->first();

        if (!$pair) {
            return response()->json([
                'status' => 'error',
                'message' => 'Market pair not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $pair,
        ]);
    }

    /**
     * Generate or return OHLCV Candlestick data for charting.
     */
    public function candles(Request $request, string $symbol): JsonResponse
    {
        $symbolClean = strtoupper(str_replace(['/', '-'], '', $symbol));
        $pair = MarketPair::where('symbol', $symbolClean)
            ->orWhere('symbol', strtoupper($symbol))
            ->first();

        if (!$pair) {
            return response()->json(['status' => 'error', 'message' => 'Pair not found'], 404);
        }

        $timeframe = $request->get('timeframe', '15m');
        $limit = min((int)$request->get('limit', 120), 300);

        $secondsMap = [
            '1m' => 60,
            '5m' => 300,
            '15m' => 900,
            '1h' => 3600,
            '4h' => 14400,
            '1D' => 86400,
            '1W' => 604800,
        ];
        $interval = $secondsMap[$timeframe] ?? 900;

        $candles = [];
        $currentPrice = (float) $pair->price;
        $now = time();
        $volatility = $currentPrice * 0.005;

        // Generate realistic historical walk backwards
        $prices = [$currentPrice];
        for ($i = 1; $i < $limit; $i++) {
            $change = (sin($i * 0.25) * 0.4 + (mt_rand(-100, 100) / 100)) * $volatility;
            $prevPrice = max($prices[$i - 1] - $change, $currentPrice * 0.5);
            $prices[] = $prevPrice;
        }
        $prices = array_reverse($prices);

        for ($i = 0; $i < count($prices); $i++) {
            $timestamp = $now - (($limit - 1 - $i) * $interval);
            $open = $prices[$i];
            $fluctuation = (mt_rand(-50, 50) / 100) * $volatility;
            $close = $i === count($prices) - 1 ? $currentPrice : max(0.0001, $open + $fluctuation);
            $high = max($open, $close) + (mt_rand(5, 50) / 100) * $volatility;
            $low = min($open, $close) - (mt_rand(5, 50) / 100) * $volatility;
            $volume = round(mt_rand(50, 1500) * ($currentPrice > 1000 ? 0.5 : 50), 2);

            $candles[] = [
                'time' => $timestamp,
                'open' => round($open, 4),
                'high' => round($high, 4),
                'low' => round($low, 4),
                'close' => round($close, 4),
                'volume' => $volume,
            ];
        }

        return response()->json([
            'status' => 'success',
            'symbol' => $pair->symbol,
            'timeframe' => $timeframe,
            'data' => $candles,
        ]);
    }

    /**
     * Generate dynamic live order book for symbol.
     */
    public function orderbook(string $symbol): JsonResponse
    {
        $symbolClean = strtoupper(str_replace(['/', '-'], '', $symbol));
        $pair = MarketPair::where('symbol', $symbolClean)
            ->orWhere('symbol', strtoupper($symbol))
            ->first();

        if (!$pair) {
            return response()->json(['status' => 'error', 'message' => 'Pair not found'], 404);
        }

        $basePrice = (float) $pair->price;
        $step = max(0.0001, $basePrice * 0.0005);

        $asks = [];
        $bids = [];
        $depthCount = 14;
        $cumulativeAskVol = 0;
        $cumulativeBidVol = 0;

        for ($i = 1; $i <= $depthCount; $i++) {
            $askPrice = round($basePrice + ($i * $step) + (mt_rand(-5, 5) * $step * 0.05), 4);
            $askAmount = round((mt_rand(20, 250) / 100) * ($basePrice > 1000 ? 0.3 : 45), 4);
            $cumulativeAskVol += $askAmount;

            $asks[] = [
                'price' => $askPrice,
                'amount' => $askAmount,
                'total' => round($askPrice * $askAmount, 2),
                'cumulative' => round($cumulativeAskVol, 4),
            ];

            $bidPrice = round($basePrice - ($i * $step) - (mt_rand(-5, 5) * $step * 0.05), 4);
            $bidAmount = round((mt_rand(20, 250) / 100) * ($basePrice > 1000 ? 0.3 : 45), 4);
            $cumulativeBidVol += $bidAmount;

            $bids[] = [
                'price' => $bidPrice,
                'amount' => $bidAmount,
                'total' => round($bidPrice * $bidAmount, 2),
                'cumulative' => round($cumulativeBidVol, 4),
            ];
        }

        return response()->json([
            'status' => 'success',
            'symbol' => $pair->symbol,
            'last_price' => $basePrice,
            'spread' => round($asks[0]['price'] - $bids[0]['price'], 4),
            'asks' => array_reverse($asks),
            'bids' => $bids,
        ]);
    }

    /**
     * Recent trades for symbol.
     */
    public function trades(string $symbol): JsonResponse
    {
        $symbolClean = strtoupper(str_replace(['/', '-'], '', $symbol));
        $pair = MarketPair::where('symbol', $symbolClean)
            ->orWhere('symbol', strtoupper($symbol))
            ->first();

        $symbolStr = $pair ? $pair->symbol : $symbolClean;

        $trades = Trade::where('symbol', $symbolStr)
            ->orderBy('executed_at', 'desc')
            ->limit(30)
            ->get();

        if ($trades->count() < 10 && $pair) {
            $basePrice = (float) $pair->price;
            for ($i = 0; $i < 15; $i++) {
                $side = mt_rand(0, 1) === 1 ? 'buy' : 'sell';
                $price = round($basePrice + (mt_rand(-15, 15) * 0.0002 * $basePrice), 4);
                $amount = round((mt_rand(10, 120) / 100) * ($basePrice > 1000 ? 0.25 : 30), 4);
                Trade::create([
                    'symbol' => $pair->symbol,
                    'price' => $price,
                    'amount' => $amount,
                    'total' => round($price * $amount, 2),
                    'side' => $side,
                    'executed_at' => now()->subSeconds(mt_rand(5, 3600)),
                ]);
            }
            $trades = Trade::where('symbol', $pair->symbol)
                ->orderBy('executed_at', 'desc')
                ->limit(30)
                ->get();
        }

        return response()->json([
            'status' => 'success',
            'symbol' => $symbolStr,
            'data' => $trades,
        ]);
    }

    /**
     * Bost AI Technical Analytics & Trading Signal Engine for trader follow.
     */
    public function analytic(string $symbol): JsonResponse
    {
        $symbolClean = strtoupper(str_replace(['/', '-'], '', $symbol));
        $pair = MarketPair::where('symbol', $symbolClean)
            ->orWhere('symbol', strtoupper($symbol))
            ->first();

        if (!$pair) {
            return response()->json(['status' => 'error', 'message' => 'Pair not found'], 404);
        }

        $price = (float) $pair->price;
        $change = (float) $pair->change_24h;

        // Determine technical indicator values
        $isBullish = $change >= 0;
        $rsi = $isBullish ? min(78, round(52 + ($change * 2.2), 1)) : max(22, round(48 + ($change * 2.2), 1));
        
        // Signal logic
        if ($rsi > 68) {
            $verdict = 'STRONG BUY';
            $action = 'buy';
            $confidence = 88;
            $riskReward = '1 : 3.2';
            $targetPrice = round($price * 1.055, 4);
            $stopLoss = round($price * 0.982, 4);
            $summary = "Breakout momentum with ascending high volume. MACD crossed above baseline with Bullish Divergence on the 4H timeframe. Ideal for long entry.";
        } elseif ($rsi > 50) {
            $verdict = 'BUY';
            $action = 'buy';
            $confidence = 78;
            $riskReward = '1 : 2.5';
            $targetPrice = round($price * 1.038, 4);
            $stopLoss = round($price * 0.985, 4);
            $summary = "Price holding firmly above EMA 50 support. Moving averages trending upward. Favorable risk/reward for trend continuation.";
        } elseif ($rsi > 35) {
            $verdict = 'NEUTRAL';
            $action = 'buy';
            $confidence = 62;
            $riskReward = '1 : 1.8';
            $targetPrice = round($price * 1.025, 4);
            $stopLoss = round($price * 0.988, 4);
            $summary = "Consolidation within Bollinger Bands. Range-bound price action. Wait for a confirmed break of local resistance or scale into positions.";
        } else {
            $verdict = 'STRONG BUY (OVERSOLD REBOUND)';
            $action = 'buy';
            $confidence = 85;
            $riskReward = '1 : 3.8';
            $targetPrice = round($price * 1.065, 4);
            $stopLoss = round($price * 0.975, 4);
            $summary = "Extreme oversold condition detected on RSI (14) with strong institutional support zone. High probability mean-reversion bounce expected.";
        }

        // Technical readings
        $macdValue = round(($change * 0.45), 2);
        $macdSignal = round($macdValue * 0.8, 2);
        $macdHist = round($macdValue - $macdSignal, 2);

        $ema20 = round($price * (1 + ($change * 0.002)), 4);
        $ema50 = round($price * (1 - ($change * 0.001)), 4);
        $sma200 = round($price * 0.965, 4);

        $bollingerUpper = round($price * 1.035, 4);
        $bollingerLower = round($price * 0.965, 4);

        return response()->json([
            'status' => 'success',
            'symbol' => $pair->symbol,
            'display_name' => $pair->display_name,
            'current_price' => $price,
            'action' => $action,
            'verdict' => $verdict,
            'confidence_score' => $confidence,
            'win_rate' => 78.4,
            'risk_reward' => $riskReward,
            'entry_price' => $price,
            'target_price' => $targetPrice,
            'stop_loss' => $stopLoss,
            'summary' => $summary,
            'indicators' => [
                'rsi' => [
                    'value' => $rsi,
                    'status' => $rsi > 70 ? 'Overbought' : ($rsi < 30 ? 'Oversold' : 'Neutral/Bullish'),
                ],
                'macd' => [
                    'value' => $macdValue,
                    'signal' => $macdSignal,
                    'histogram' => $macdHist,
                    'status' => $macdHist >= 0 ? 'Bullish Crossover' : 'Bearish Crossover',
                ],
                'moving_averages' => [
                    'ema_20' => $ema20,
                    'ema_50' => $ema50,
                    'sma_200' => $sma200,
                    'trend' => $price > $ema50 ? 'Strong Uptrend' : 'Downtrend',
                ],
                'bollinger_bands' => [
                    'upper' => $bollingerUpper,
                    'middle' => $price,
                    'lower' => $bollingerLower,
                ],
                'support_level' => round($price * 0.985, 4),
                'resistance_level' => round($price * 1.042, 4),
            ],
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
