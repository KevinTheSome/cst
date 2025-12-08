<?php

namespace App\Livewire\Pulse;

use Laravel\Pulse\Livewire\Card;
use App\Models\Visit;

class CountryVisits extends Card
{
    public function render()
    {
        $data = Visit::query()
            ->selectRaw('country_code, COUNT(*) as total')
            ->whereNotNull('country_code')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('country_code')
            ->orderByDesc('total')
            ->limit(30)
            ->get();

        return view('livewire.pulse.country-visits', [
            'data' => $data,
        ]);
    }
}
