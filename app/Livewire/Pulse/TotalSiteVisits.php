<?php

namespace App\Livewire\Pulse;

use Laravel\Pulse\Livewire\Card;

class TotalSiteVisits extends Card
{
    public function render()
    {
        $total = $this->aggregateTotal('site_visit', 'count');

        return view('livewire.pulse.total-site-visits', [
            'total' => $total ?? 0,
        ]);
    }
}
