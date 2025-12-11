<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('country_pulse_metrics', function (Blueprint $table) {
            $table->string('label')->nullable()->after('metric');

            $table->index(
                ['metric', 'label', 'country_code', 'occurred_at'],
                'cpm_metric_label_country_time'
            );
        });
    }

    public function down(): void
    {
        Schema::table('country_pulse_metrics', function (Blueprint $table) {
            $table->dropIndex('cpm_metric_label_country_time');
            $table->dropColumn('label');
        });
    }
};
