<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    use HasFactory;

    protected $fillable = [
        'symbol',
        'price',
        'amount',
        'total',
        'side',
        'executed_at',
    ];

    protected $casts = [
        'price' => 'float',
        'amount' => 'float',
        'total' => 'float',
        'executed_at' => 'datetime',
    ];
}
