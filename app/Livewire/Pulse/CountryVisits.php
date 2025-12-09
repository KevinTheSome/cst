<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Laravel\Pulse\Livewire\Card;
use App\Models\Visit;

class CountryVisits extends Card
{
    protected $listeners = ['visit-filters-updated' => '$refresh'];

    public function render()
    {
        $country = request()->query('country');
        $from = request()->query('from');
        $to = request()->query('to');

        // Default: last 30 days (same as your current behavior)
        $start = now()->subDays(30);
        $end = now();

        // If date filters are provided, use them instead
        if ($from && $to) {
            $start = Carbon::parse($from)->startOfDay();
            $end = Carbon::parse($to)->endOfDay();
        }

        $query = Visit::query()
            ->selectRaw('country_code, COUNT(*) as total')
            ->whereNotNull('country_code')
            ->whereBetween('created_at', [$start, $end]);

        // Optional country filter
        if ($country) {
            $query->where('country_code', $country);
        }

        $data = $query
            ->groupBy('country_code')
            ->orderByDesc('total')
            ->limit(30)
            ->get();

        return view('livewire.pulse.country-visits', [
            'data' => $data,
        ]);
    }
}
