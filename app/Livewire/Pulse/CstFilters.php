<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Livewire\Component;
use Livewire\Attributes\Url;
use App\Models\FormResult;

class CstFilters extends Component
{
    // "no kurienes" - piem., forma/anketa tips vai ID
    #[Url(as: 'source')]
    public ?string $source = null;

    #[Url(as: 'from')]
    public ?string $from = null;

    #[Url(as: 'to')]
    public ?string $to = null;

    public function mount(): void
    {
        // Defaulti, ja nav query string
        if (! $this->from || ! $this->to) {
            $this->to = Carbon::today()->toDateString();
            $this->from = Carbon::today()->subDays(6)->toDateString(); // pēdējās 7 dienas
        }
    }

    public function apply(): void
    {
        // Nekas īpašs nav jādara: #[Url] jau sinhronizē query string
        // Bet varam izsaukt refresh, ja vēlies:
        $this->dispatch('cst-filters-updated');
    }

    public function resetFilters(): void
    {
        $this->source = null;
        $this->to = Carbon::today()->toDateString();
        $this->from = Carbon::today()->subDays(6)->toDateString();

        $this->dispatch('cst-filters-updated');
    }

    public function render()
    {
        return view('livewire.pulse.cst-filters');
    }
    public function getCodesProperty()
{
    return FormResult::query()
        ->whereNotNull('code')
        ->distinct()
        ->orderBy('code')
        ->pluck('code');
}
}
