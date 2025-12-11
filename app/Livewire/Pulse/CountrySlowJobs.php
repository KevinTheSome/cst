<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Laravel\Pulse\Livewire\Card;
use App\Models\CountryPulseMetric;

class CountrySlowJobs extends Card
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
            ->where('metric', 'slow_job')
            ->whereBetween('occurred_at', [$start, $end]);

        if ($country) {
            $query->where('country_code', $country);
        }

        $total = (clone $query)->sum('value');

        $jobs = (clone $query)
            ->whereNotNull('label')
            ->selectRaw('label, SUM(value) as total')
            ->groupBy('label')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        return view('livewire.pulse.country-slow-jobs', [
            'total' => $total ?? 0,
            'jobs' => $jobs,
        ]);
    }
}
