<?php

namespace App\Livewire\Pulse;

use Laravel\Pulse\Livewire\Card;
use App\Models\CountryPulseMetric;
use Carbon\Carbon;

class CountryCacheHits extends Card
{
    protected $listeners = ['visit-filters-updated' => '$refresh'];

public function render()
{
    $country = request()->query('country');
    $from = request()->query('from');
    $to = request()->query('to');

    $start = now()->subDays(30)->startOfDay();
    $end = now()->endOfDay();

    if ($from && $to) {
        $start = \Carbon\Carbon::parse($from)->startOfDay();
        $end = \Carbon\Carbon::parse($to)->endOfDay();
    }

    $query = \App\Models\CountryPulseMetric::query()
        ->where('metric', 'cache_hit')
        ->whereBetween('occurred_at', [$start, $end]);

    if ($country) {
        $query->where('country_code', $country);
    }

    $total = $query->sum('value');

    return view('livewire.pulse.country-cache-hits', [
        'total' => $total ?? 0,
    ]);
}

}
