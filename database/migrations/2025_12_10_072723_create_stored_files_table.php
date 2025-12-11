<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('stored_files', function (Blueprint $table) {
        $table->id();
        $table->string('title_lv')->nullable();
        $table->string('title_en')->nullable();
        $table->string('path');
        $table->string('mime_type')->nullable();
        $table->unsignedBigInteger('size')->nullable();
        $table->json('tags')->nullable();
        $table->timestamps();
});

    }

    public function down()
    {
        Schema::dropIfExists('stored_files');
    }
};
