<?php

namespace App\Livewire\Pulse;

use Carbon\Carbon;
use Livewire\Attributes\Lazy;
use Laravel\Pulse\Livewire\Card;
use App\Models\FormResult;

#[Lazy]
class CstFormSubmissions extends Card
{
    protected $listeners = ['cst-filters-updated' => '$refresh'];

    public function render()
    {
        $source = request()->query('source');
        $from = request()->query('from');
        $to = request()->query('to');

        $query = FormResult::query();

        if ($source) {
            $query->where('code', $source);
        }

        if ($from && $to) {
            $start = Carbon::parse($from)->startOfDay();
            $end = Carbon::parse($to)->endOfDay();

            $query->whereBetween('created_at', [$start, $end]);
        }

        return view('livewire.pulse.cst-form-submissions', [
            'count' => $query->count(),
        ]);
    }
}
