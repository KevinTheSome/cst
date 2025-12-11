<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Laravel\Pulse\Livewire\Card;
use App\Models\CountryPulseMetric;

class CountryQueues extends Card
{
    protected $listeners = ['visit-filters-updated' => '$refresh'];

    public function render()
    {
        $country = request('country');
        $from = request('from');
        $to = request('to');

        $start = now()->subDays(30)->startOfDay();
        $end = now()->endOfDay();

        if ($from && $to) {
            $start = Carbon::parse($from)->startOfDay();
            $end = Carbon::parse($to)->endOfDay();
        }

        $base = CountryPulseMetric::query()
            ->whereBetween('occurred_at', [$start, $end])
            ->whereIn('metric', ['job_queued', 'job_processed', 'job_failed'])
            ->whereNotNull('label');

        if ($country) {
            $base->where('country_code', $country);
        }

        // ✅ Rename data collection to avoid clash with layout $rows
        $queues = (clone $base)
            ->selectRaw("
                label,
                SUM(CASE WHEN metric = 'job_queued' THEN value ELSE 0 END) as queued,
                SUM(CASE WHEN metric = 'job_processed' THEN value ELSE 0 END) as processed,
                SUM(CASE WHEN metric = 'job_failed' THEN value ELSE 0 END) as failed
            ")
            ->groupBy('label')
            ->orderByDesc('processed')
            ->limit(10)
            ->get();

        $totals = (clone $base)
            ->selectRaw("
                SUM(CASE WHEN metric = 'job_queued' THEN value ELSE 0 END) as queued,
                SUM(CASE WHEN metric = 'job_processed' THEN value ELSE 0 END) as processed,
                SUM(CASE WHEN metric = 'job_failed' THEN value ELSE 0 END) as failed
            ")
            ->first();

        return view('livewire.pulse.country-queues', [
            'queues' => $queues,
            'totals' => $totals,
        ]);
    }
}
