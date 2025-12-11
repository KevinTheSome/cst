<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Laravel\Pulse\Livewire\Card;
use App\Models\CountryPulseMetric;

class CountrySlowOutgoingRequests extends Card
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
            ->whereIn('metric', ['slow_outgoing', 'outgoing_failed']);

        if ($country) {
            $base->where('country_code', $country);
        }

        $totals = (clone $base)
            ->selectRaw("
                SUM(CASE WHEN metric = 'slow_outgoing' THEN value ELSE 0 END) as slow,
                SUM(CASE WHEN metric = 'outgoing_failed' THEN value ELSE 0 END) as failed
            ")
            ->first();

        $slow = (int) ($totals->slow ?? 0);
        $failed = (int) ($totals->failed ?? 0);

        $hosts = (clone $base)
            ->whereNotNull('label')
            ->selectRaw("
                label,
                SUM(CASE WHEN metric = 'slow_outgoing' THEN value ELSE 0 END) as slow,
                SUM(CASE WHEN metric = 'outgoing_failed' THEN value ELSE 0 END) as failed
            ")
            ->groupBy('label')
            ->orderByDesc('slow')
            ->limit(10)
            ->get();

        return view('livewire.pulse.country-slow-outgoing-requests', [
            'slow' => $slow,
            'failed' => $failed,
            'hosts' => $hosts,
        ]);
    }
}
