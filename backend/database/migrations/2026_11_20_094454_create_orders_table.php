<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('symbol');
            $table->enum('side', ['buy', 'sell']);
            $table->enum('type', ['limit', 'market']);
            $table->decimal('price', 18, 6);
            $table->decimal('amount', 18, 6);
            $table->decimal('filled', 18, 6)->default(0);
            $table->decimal('total', 18, 6);
            $table->enum('status', ['open', 'filled', 'cancelled'])->default('open');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
