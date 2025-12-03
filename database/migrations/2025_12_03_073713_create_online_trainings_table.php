<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('online_trainings', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->text('description')->nullable();
            $table->string('slug')->unique();     
            $table->string('platform')->nullable();
            $table->string('url')->nullable();    

            // schedule
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();

            // status flags
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('online_trainings');
    }
};
