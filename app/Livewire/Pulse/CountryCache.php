<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Laravel\Pulse\Livewire\Card;
use App\Models\CountryPulseMetric;

class CountryCache extends Card
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
            ->whereIn('metric', ['cache_hit', 'cache_miss']);

        if ($country) {
            $base->where('country_code', $country);
        }

        $totals = (clone $base)
            ->selectRaw("
                SUM(CASE WHEN metric = 'cache_hit' THEN value ELSE 0 END) as hits,
                SUM(CASE WHEN metric = 'cache_miss' THEN value ELSE 0 END) as misses
            ")
            ->first();

        $hits = (int) ($totals->hits ?? 0);
        $misses = (int) ($totals->misses ?? 0);
        $requests = $hits + $misses;
        $hitRate = $requests > 0 ? round(($hits / $requests) * 100, 1) : 0;

        // Optional store breakdown if labels exist
        $stores = (clone $base)
            ->whereNotNull('label')
            ->selectRaw("
                label,
                SUM(CASE WHEN metric = 'cache_hit' THEN value ELSE 0 END) as hits,
                SUM(CASE WHEN metric = 'cache_miss' THEN value ELSE 0 END) as misses
            ")
            ->groupBy('label')
            ->orderByDesc('hits')
            ->limit(5)
            ->get();

        return view('livewire.pulse.country-cache', [
            'hits' => $hits,
            'misses' => $misses,
            'hitRate' => $hitRate,
            'stores' => $stores,
        ]);
    }
}
