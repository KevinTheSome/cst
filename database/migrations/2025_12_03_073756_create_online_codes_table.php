<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('online_codes', function (Blueprint $table) {
            $table->id();

            $table->string('code')->unique();

            $table->foreignId('online_training_id')
                ->nullable()
                ->constrained('online_trainings')
                ->nullOnDelete();

            $table->unsignedInteger('max_uses')->default(1);
            $table->unsignedInteger('used_count')->default(0);

            $table->string('last_used_by')->nullable();

            // validity
            $table->timestamp('valid_from')->nullable();
            $table->timestamp('valid_until')->nullable();
            $table->timestamp('last_used_at')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('online_codes');
    }
};
