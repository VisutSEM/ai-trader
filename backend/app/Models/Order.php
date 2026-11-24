<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'symbol',
        'side',
        'type',
        'price',
        'amount',
        'filled',
        'total',
        'status',
    ];

    protected $casts = [
        'price' => 'float',
        'amount' => 'float',
        'filled' => 'float',
        'total' => 'float',
    ];
}
