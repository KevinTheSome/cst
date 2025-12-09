@php
    $periodKey = request('period');

    $periodLabel = match ($periodKey) {
        '1_hour' => '1h',
        '6_hours' => '6h',
        '24_hours' => '24h',
        '7_days' => '7d',
        default => null,
    };
@endphp

<x-pulse::card :cols="$cols" :rows="$rows" :class="$class" wire:poll.10s="">
    <div class="flex items-center justify-between px-4 pt-4">
        <x-pulse::card-header name="Total Site Visits" />

        <span class="text-[10px] text-muted-foreground">
            @if(request('from') && request('to'))
                {{ request('from') }} → {{ request('to') }}
            @elseif($periodLabel)
                {{ $periodLabel }}
            @else
                30d
            @endif

            @if(request('country'))
                • {{ request('country') }}
            @endif
        </span>
    </div>

    <div class="p-4 text-center">
        <p class="text-sm text-gray-400">Unique browser sessions</p>
        <p class="mt-2 text-4xl font-semibold">
            {{ number_format($total) }}
        </p>
    </div>
</x-pulse::card>
