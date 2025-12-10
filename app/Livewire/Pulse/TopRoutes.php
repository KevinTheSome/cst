<?php

namespace App\Livewire\Pulse;

use Laravel\Pulse\Livewire\Card;
use Illuminate\Support\Facades\DB;

class TopRoutes extends Card
{
    public int $limit = 12;

    public function render()
    {
        $topRoutes = DB::table('route_hits')
            ->orderByDesc('hits')
            ->limit($this->limit)
            ->pluck('hits', 'path')
            ->toArray();

        return view('livewire.pulse.top-routes', [
            'topRoutes' => $topRoutes,
        ]);
    }
}
