<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Laravel\Pulse\Livewire\Card;
use App\Models\CountryPulseMetric;

class CountrySlowQueries extends Card
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
            ->where('metric', 'slow_query')
            ->whereBetween('occurred_at', [$start, $end]);

        if ($country) {
            $base->where('country_code', $country);
        }

        $total = (clone $base)->sum('value');

        $byConnection = (clone $base)
            ->whereNotNull('label')
            ->selectRaw('label, SUM(value) as total')
            ->groupBy('label')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return view('livewire.pulse.country-slow-queries', [
            'total' => $total ?? 0,
            'byConnection' => $byConnection,
        ]);
    }
}
