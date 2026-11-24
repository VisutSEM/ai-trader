<?php

namespace App\Http\Controllers;

use App\Models\MarketPair;
use App\Models\Order;
use App\Models\Trade;
use App\Models\Wallet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TradingController extends Controller
{
    /**
     * Get user wallets and calculated total net worth in USD.
     */
    public function getWallet(): JsonResponse
    {
        $wallets = Wallet::all();
        $pairs = MarketPair::all()->keyBy('base_asset');

        $totalEstimatedUsd = 0;
        $items = [];

        foreach ($wallets as $wallet) {
            $priceUsd = 1.0;
            if ($wallet->asset !== 'USDT' && $wallet->asset !== 'USD') {
                if (isset($pairs[$wallet->asset])) {
                    $priceUsd = (float) $pairs[$wallet->asset]->price;
                }
            }

            $totalAsset = (float) $wallet->free + (float) $wallet->locked;
            $usdValue = $totalAsset * $priceUsd;
            $totalEstimatedUsd += $usdValue;

            $items[] = [
                'id' => $wallet->id,
                'asset' => $wallet->asset,
                'free' => (float) $wallet->free,
                'locked' => (float) $wallet->locked,
                'total' => $totalAsset,
                'usd_price' => $priceUsd,
                'usd_value' => round($usdValue, 2),
            ];
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'wallets' => $items,
                'total_usd_value' => round($totalEstimatedUsd, 2),
            ],
        ]);
    }

    /**
     * Reset demo wallet balances.
     */
    public function resetWallet(): JsonResponse
    {
        Wallet::truncate();
        Order::truncate();

        $initial = [
            ['asset' => 'USDT', 'free' => 50000.00, 'locked' => 0],
            ['asset' => 'USD', 'free' => 50000.00, 'locked' => 0],
            ['asset' => 'XAU', 'free' => 5.00, 'locked' => 0],
            ['asset' => 'BTC', 'free' => 1.45, 'locked' => 0],
            ['asset' => 'ETH', 'free' => 12.00, 'locked' => 0],
            ['asset' => 'SOL', 'free' => 65.50, 'locked' => 0],
            ['asset' => 'NVDA', 'free' => 50.00, 'locked' => 0],
        ];

        foreach ($initial as $w) {
            Wallet::create($w);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Wallet and demo orders reset to default balances ($50,000 USDT/USD + crypto + Gold XAU)',
        ]);
    }

    /**
     * Get user orders.
     */
    public function getOrders(Request $request): JsonResponse
    {
        $query = Order::query()->orderBy('created_at', 'desc');

        if ($request->has('symbol') && !empty($request->symbol)) {
            $symbolClean = strtoupper(str_replace(['/', '-'], '', $request->symbol));
            $query->where('symbol', $symbolClean);
        }

        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        $orders = $query->limit(50)->get();

        return response()->json([
            'status' => 'success',
            'data' => $orders,
        ]);
    }

    /**
     * Place standard order (Market or Limit, Buy or Sell).
     */
    public function placeOrder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'symbol' => 'required|string',
            'side' => 'required|in:buy,sell',
            'type' => 'required|in:limit,market',
            'price' => 'nullable|numeric|gt:0',
            'amount' => 'required|numeric|gt:0',
        ]);

        $symbolClean = strtoupper(str_replace(['/', '-'], '', $validated['symbol']));
        $pair = MarketPair::where('symbol', $symbolClean)
            ->orWhere('symbol', strtoupper($validated['symbol']))
            ->first();

        if (!$pair) {
            return response()->json(['status' => 'error', 'message' => 'Invalid trading pair'], 422);
        }

        $baseAsset = $pair->base_asset;
        $quoteAsset = $pair->quote_asset;

        $executionPrice = $validated['type'] === 'market'
            ? (float) $pair->price
            : (float) $validated['price'];

        $amount = (float) $validated['amount'];
        $totalCost = $executionPrice * $amount;

        return DB::transaction(function () use ($validated, $pair, $baseAsset, $quoteAsset, $executionPrice, $amount, $totalCost) {
            $baseWallet = Wallet::firstOrCreate(['asset' => $baseAsset], ['free' => 0, 'locked' => 0]);
            $quoteWallet = Wallet::firstOrCreate(['asset' => $quoteAsset], ['free' => 0, 'locked' => 0]);

            if ($validated['side'] === 'buy') {
                if ((float) $quoteWallet->free < $totalCost) {
                    return response()->json([
                        'status' => 'error',
                        'message' => "Insufficient {$quoteAsset} balance. Required: " . number_format($totalCost, 2) . ", Available: " . number_format($quoteWallet->free, 2),
                    ], 400);
                }

                if ($validated['type'] === 'market') {
                    $quoteWallet->free -= $totalCost;
                    $quoteWallet->save();

                    $baseWallet->free += $amount;
                    $baseWallet->save();

                    $order = Order::create([
                        'symbol' => $pair->symbol,
                        'side' => 'buy',
                        'type' => 'market',
                        'price' => $executionPrice,
                        'amount' => $amount,
                        'filled' => $amount,
                        'total' => $totalCost,
                        'status' => 'filled',
                    ]);

                    Trade::create([
                        'symbol' => $pair->symbol,
                        'price' => $executionPrice,
                        'amount' => $amount,
                        'total' => $totalCost,
                        'side' => 'buy',
                        'executed_at' => now(),
                    ]);

                    return response()->json([
                        'status' => 'success',
                        'message' => "Successfully bought {$amount} {$baseAsset} at " . number_format($executionPrice, 2) . " {$quoteAsset}",
                        'data' => $order,
                    ]);
                } else {
                    $quoteWallet->free -= $totalCost;
                    $quoteWallet->locked += $totalCost;
                    $quoteWallet->save();

                    $order = Order::create([
                        'symbol' => $pair->symbol,
                        'side' => 'buy',
                        'type' => 'limit',
                        'price' => $executionPrice,
                        'amount' => $amount,
                        'filled' => 0,
                        'total' => $totalCost,
                        'status' => 'open',
                    ]);

                    return response()->json([
                        'status' => 'success',
                        'message' => "Limit Buy order placed for {$amount} {$baseAsset} at \${$executionPrice}",
                        'data' => $order,
                    ]);
                }
            } else {
                if ((float) $baseWallet->free < $amount) {
                    return response()->json([
                        'status' => 'error',
                        'message' => "Insufficient {$baseAsset} balance. Required: {$amount}, Available: {$baseWallet->free}",
                    ], 400);
                }

                if ($validated['type'] === 'market') {
                    $baseWallet->free -= $amount;
                    $baseWallet->save();

                    $quoteWallet->free += $totalCost;
                    $quoteWallet->save();

                    $order = Order::create([
                        'symbol' => $pair->symbol,
                        'side' => 'sell',
                        'type' => 'market',
                        'price' => $executionPrice,
                        'amount' => $amount,
                        'filled' => $amount,
                        'total' => $totalCost,
                        'status' => 'filled',
                    ]);

                    Trade::create([
                        'symbol' => $pair->symbol,
                        'price' => $executionPrice,
                        'amount' => $amount,
                        'total' => $totalCost,
                        'side' => 'sell',
                        'executed_at' => now(),
                    ]);

                    return response()->json([
                        'status' => 'success',
                        'message' => "Successfully sold {$amount} {$baseAsset} for " . number_format($totalCost, 2) . " {$quoteAsset}",
                        'data' => $order,
                    ]);
                } else {
                    $baseWallet->free -= $amount;
                    $baseWallet->locked += $amount;
                    $baseWallet->save();

                    $order = Order::create([
                        'symbol' => $pair->symbol,
                        'side' => 'sell',
                        'type' => 'limit',
                        'price' => $executionPrice,
                        'amount' => $amount,
                        'filled' => 0,
                        'total' => $totalCost,
                        'status' => 'open',
                    ]);

                    return response()->json([
                        'status' => 'success',
                        'message' => "Limit Sell order placed for {$amount} {$baseAsset} at \${$executionPrice}",
                        'data' => $order,
                    ]);
                }
            }
        });
    }

    /**
     * Follow AI Analytic Signal directly (1-click trade follow).
     */
    public function followSignal(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'symbol' => 'required|string',
            'action' => 'required|in:buy,sell',
            'amount_usd' => 'required|numeric|gt:0',
        ]);

        $symbolClean = strtoupper(str_replace(['/', '-'], '', $validated['symbol']));
        $pair = MarketPair::where('symbol', $symbolClean)->first();

        if (!$pair) {
            return response()->json(['status' => 'error', 'message' => 'Market pair not found'], 404);
        }

        $price = (float) $pair->price;
        $totalUsd = (float) $validated['amount_usd'];
        $amount = round($totalUsd / $price, 6);

        // Place market order following signal
        $subRequest = new Request([
            'symbol' => $pair->symbol,
            'side' => $validated['action'],
            'type' => 'market',
            'amount' => $amount,
        ]);

        return $this->placeOrder($subRequest);
    }

    /**
     * Get all active AI Trading Signals across top markets.
     */
    public function getAllSignals(): JsonResponse
    {
        $pairs = MarketPair::where('is_active', true)->get();
        $signals = [];

        foreach ($pairs as $p) {
            $change = (float) $p->change_24h;
            $price = (float) $p->price;

            $action = $change >= -1.0 ? 'buy' : 'sell';
            $confidence = min(94, max(68, 70 + (int)(abs($change) * 3)));
            $targetPrice = $action === 'buy' ? round($price * 1.048, 4) : round($price * 0.952, 4);
            $stopLoss = $action === 'buy' ? round($price * 0.982, 4) : round($price * 1.018, 4);

            $signals[] = [
                'symbol' => $p->symbol,
                'display_name' => $p->display_name,
                'category' => $p->category,
                'price' => $price,
                'change_24h' => $change,
                'action' => $action,
                'verdict' => $action === 'buy' ? ($confidence > 82 ? 'STRONG BUY' : 'BUY') : 'SELL',
                'confidence' => $confidence,
                'target_price' => $targetPrice,
                'stop_loss' => $stopLoss,
                'risk_reward' => '1 : 2.8',
                'timeframe' => '4H Swing',
                'strategy' => 'Bost AI Alpha Trend & Momentum Divergence',
            ];
        }

        return response()->json([
            'status' => 'success',
            'data' => $signals,
        ]);
    }

    /**
     * Cancel an open order.
     */
    public function cancelOrder(int $id): JsonResponse
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['status' => 'error', 'message' => 'Order not found'], 404);
        }

        if ($order->status !== 'open') {
            return response()->json(['status' => 'error', 'message' => 'Only open orders can be cancelled'], 400);
        }

        $pair = MarketPair::where('symbol', $order->symbol)->first();
        $baseAsset = $pair ? $pair->base_asset : 'BTC';
        $quoteAsset = $pair ? $pair->quote_asset : 'USDT';

        DB::transaction(function () use ($order, $baseAsset, $quoteAsset) {
            if ($order->side === 'buy') {
                $wallet = Wallet::where('asset', $quoteAsset)->first();
                if ($wallet) {
                    $wallet->locked = max(0, (float) $wallet->locked - (float) $order->total);
                    $wallet->free = (float) $wallet->free + (float) $order->total;
                    $wallet->save();
                }
            } else {
                $wallet = Wallet::where('asset', $baseAsset)->first();
                if ($wallet) {
                    $wallet->locked = max(0, (float) $wallet->locked - (float) $order->amount);
                    $wallet->free = (float) $wallet->free + (float) $order->amount;
                    $wallet->save();
                }
            }

            $order->status = 'cancelled';
            $order->save();
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Order cancelled and funds unlocked successfully',
            'data' => $order,
        ]);
    }
}
