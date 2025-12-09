{{-- resources/views/livewire/pulse/country-cache-hits.blade.php --}}
<x-pulse::card :cols="$cols" :rows="$rows" :class="$class">
    <div class="p-4">
        <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium">Cache Hits (country-aware)</h3>
            <span class="text-[10px] text-muted-foreground">
                @if(request('from') && request('to'))
                    {{ request('from') }} → {{ request('to') }}
                @else
                    30d
                @endif
                @if(request('country')) • {{ request('country') }} @endif
            </span>
        </div>

        <div class="mt-3 text-3xl font-semibold">
            {{ number_format($total) }}
        </div>
    </div>
</x-pulse::card>
