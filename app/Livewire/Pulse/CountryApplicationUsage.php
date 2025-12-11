<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Laravel\Pulse\Livewire\Card;
use App\Models\CountryPulseMetric;

class CountryApplicationUsage extends Card
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

        $query = CountryPulseMetric::query()
            ->selectRaw('label, SUM(value) as total')
            ->where('metric', 'request')
            ->whereBetween('occurred_at', [$start, $end])
            ->whereNotNull('label');

        if ($country) {
            $query->where('country_code', $country);
        }

        $data = $query
            ->groupBy('label')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        return view('livewire.pulse.country-application-usage', [
            'data' => $data,
        ]);
    }
}
