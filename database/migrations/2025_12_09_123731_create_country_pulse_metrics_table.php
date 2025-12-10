<?php

// database/migrations/xxxx_xx_xx_create_country_pulse_metrics_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('country_pulse_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('metric');          // e.g. cache_hit, job_failed, slow_request, exception
            $table->string('country_code')->nullable(); // LV, US...
            $table->unsignedInteger('value')->default(1); // count increment
            $table->timestamp('occurred_at')->index();
            $table->timestamps();

            $table->index(['metric', 'country_code', 'occurred_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('country_pulse_metrics');
    }
};

