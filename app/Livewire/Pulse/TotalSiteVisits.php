<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Laravel\Pulse\Livewire\Card;
use App\Models\Visit;

class TotalSiteVisits extends Card
{
    protected $listeners = ['visit-filters-updated' => '$refresh'];

    public function render()
    {
        $country = request()->query('country');
        $from = request()->query('from');
        $to = request()->query('to');

        // If filters are NOT used -> keep original Pulse behavior
        if (! $country && ! ($from && $to)) {
            $total = $this->aggregateTotal('site_visit', 'count');

            return view('livewire.pulse.total-site-visits', [
                'total' => $total ?? 0,
            ]);
        }

        // If filters ARE used -> compute from visits table
        $start = now()->subDays(30);
        $end = now();

        if ($from && $to) {
            $start = Carbon::parse($from)->startOfDay();
            $end = Carbon::parse($to)->endOfDay();
        }

        $query = Visit::query()
            ->whereBetween('created_at', [$start, $end]);

        if ($country) {
            $query->where('country_code', $country);
        }

        $total = $query->count();

        return view('livewire.pulse.total-site-visits', [
            'total' => $total ?? 0,
        ]);
    }
}
