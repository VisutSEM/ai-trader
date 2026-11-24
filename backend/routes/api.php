<?php

use App\Http\Controllers\MarketController;
use App\Http\Controllers\TradingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes for Bost Trader
|--------------------------------------------------------------------------
*/

// Health check
Route::get('/ping', fn () => response()->json(['status' => 'online', 'app' => 'Bost Trader API', 'version' => '1.0.0']));

// Market Data Endpoints
Route::prefix('markets')->group(function () {
    Route::get('/', [MarketController::class, 'index']);
    Route::match(['get', 'post'], '/sync-crypto', [MarketController::class, 'syncCrypto']);
    Route::get('/{symbol}', [MarketController::class, 'show']);
    Route::get('/{symbol}/candles', [MarketController::class, 'candles']);
    Route::get('/{symbol}/orderbook', [MarketController::class, 'orderbook']);
    Route::get('/{symbol}/trades', [MarketController::class, 'trades']);
    Route::get('/{symbol}/analytic', [MarketController::class, 'analytic']);
});

// Trading & Wallet Endpoints
Route::prefix('trading')->group(function () {
    Route::get('/wallet', [TradingController::class, 'getWallet']);
    Route::post('/wallet/reset', [TradingController::class, 'resetWallet']);
    Route::get('/orders', [TradingController::class, 'getOrders']);
    Route::post('/orders', [TradingController::class, 'placeOrder']);
    Route::post('/orders/follow-signal', [TradingController::class, 'followSignal']);
    Route::delete('/orders/{id}', [TradingController::class, 'cancelOrder']);
    Route::get('/signals', [TradingController::class, 'getAllSignals']);
});
