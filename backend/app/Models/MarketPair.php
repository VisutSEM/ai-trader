<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarketPair extends Model
{
    use HasFactory;

    protected $fillable = [
        'symbol',
        'display_name',
        'category',
        'base_asset',
        'quote_asset',
        'price',
        'change_24h',
        'high_24h',
        'low_24h',
        'volume_24h',
        'market_cap',
        'is_active',
    ];

    protected $casts = [
        'price' => 'float',
        'change_24h' => 'float',
        'high_24h' => 'float',
        'low_24h' => 'float',
        'volume_24h' => 'float',
        'market_cap' => 'float',
        'is_active' => 'boolean',
    ];
}
