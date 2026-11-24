<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('market_pairs', function (Blueprint $table) {
            $table->id();
            $table->string('symbol')->unique();
            $table->string('display_name');
            $table->string('category')->default('crypto'); // crypto, stocks, forex
            $table->string('base_asset');
            $table->string('quote_asset');
            $table->decimal('price', 18, 6)->default(0);
            $table->decimal('change_24h', 8, 2)->default(0);
            $table->decimal('high_24h', 18, 6)->default(0);
            $table->decimal('low_24h', 18, 6)->default(0);
            $table->decimal('volume_24h', 24, 4)->default(0);
            $table->decimal('market_cap', 24, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('market_pairs');
    }
};
