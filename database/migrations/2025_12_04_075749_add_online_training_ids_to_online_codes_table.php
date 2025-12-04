<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('online_codes', function (Blueprint $table) {
            // JSON works on MySQL/Postgres; for sqlite Laravel maps 'json' to text.
            $table->json('online_training_ids')->nullable()->after('online_training_id');
        });

        // Backfill: if online_training_id exists, copy into array
        // Use chunking for safety on large tables
        DB::table('online_codes')->orderBy('id')->chunkById(100, function ($rows) {
            foreach ($rows as $row) {
                $ids = null;
                if (!is_null($row->online_training_id)) {
                    $ids = json_encode([$row->online_training_id]);
                }
                DB::table('online_codes')->where('id', $row->id)->update([
                    'online_training_ids' => $ids,
                ]);
            }
        });
    }

    public function down(): void
    {
        // We will keep the old column. Remove the added column on rollback.
        Schema::table('online_codes', function (Blueprint $table) {
            $table->dropColumn('online_training_ids');
        });
    }
};
