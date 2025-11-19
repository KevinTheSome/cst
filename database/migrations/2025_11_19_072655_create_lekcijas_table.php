<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lekcijas', function (Blueprint $table) {
            $table->id();

            $table->string('code')->unique();
            $table->unsignedInteger('uses')->default(0);
            $table->timestampTz('expiration_date');

            $table->string('lekcijas');
            $table->index('lekcijas');

            $table->timestamps();

            $table->index('expiration_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lekcijas');
    }
};
