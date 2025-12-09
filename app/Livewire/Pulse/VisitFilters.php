<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Livewire\Component;
use Livewire\Attributes\Url;

class VisitFilters extends Component
{
    #[Url(as: 'country')]
    public ?string $country = null;

    #[Url(as: 'from')]
    public ?string $from = null;

    #[Url(as: 'to')]
    public ?string $to = null;

    public function mount(): void
    {
        // Default date range: last 7 days
        if (! $this->from || ! $this->to) {
            $this->to = Carbon::today()->toDateString();
            $this->from = Carbon::today()->subDays(6)->toDateString();
        }
    }

    public function apply()
    {
        // Preserve Pulse built-in period if user already has it in URL
        $period = request()->query('period');

        $params = array_filter([
            'period' => $period,
            'country' => $this->country ?: null,
            'from' => $this->from ?: null,
            'to' => $this->to ?: null,
        ]);

        $url = url('/pulse');
        if (count($params)) {
            $url .= '?' . http_build_query($params);
        }

        return redirect()->to($url);
    }

    public function resetFilters()
    {
        $this->country = null;
        $this->to = Carbon::today()->toDateString();
        $this->from = Carbon::today()->subDays(6)->toDateString();

        $period = request()->query('period');

        $params = array_filter([
            'period' => $period,
        ]);

        $url = url('/pulse');
        if (count($params)) {
            $url .= '?' . http_build_query($params);
        }

        return redirect()->to($url);
    }

    public function render()
    {
        return view('livewire.pulse.visit-filters');
    }
}
