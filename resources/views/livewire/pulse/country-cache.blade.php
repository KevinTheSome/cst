<x-pulse::card :cols="$cols" :rows="$rows" :class="$class">
    <div class="p-4">
        <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium">Cache (country-aware)</h3>
            <span class="text-[10px] text-muted-foreground">
                @if(request('from') && request('to'))
                    {{ request('from') }} → {{ request('to') }}
                @else
                    30d
                @endif
                @if(request('country')) • {{ request('country') }} @endif
            </span>
        </div>

        <div class="mt-3 grid grid-cols-3 gap-3">
            <div class="rounded-lg border border-white/5 p-3">
                <div class="text-[10px] text-muted-foreground">Hits</div>
                <div class="text-lg font-semibold">{{ number_format($hits) }}</div>
            </div>

            <div class="rounded-lg border border-white/5 p-3">
                <div class="text-[10px] text-muted-foreground">Misses</div>
                <div class="text-lg font-semibold">{{ number_format($misses) }}</div>
            </div>

            <div class="rounded-lg border border-white/5 p-3">
                <div class="text-[10px] text-muted-foreground">Hit rate</div>
                <div class="text-lg font-semibold">{{ $hitRate }}%</div>
            </div>
        </div>

        @if(($stores ?? collect())->isNotEmpty())
            <div class="mt-4">
                <div class="text-[10px] text-muted-foreground mb-2">Top stores</div>
                <table class="w-full text-xs">
                    <thead>
                        <tr>
                            <th class="text-left">Store</th>
                            <th class="text-right">Hits</th>
                            <th class="text-right">Misses</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($stores as $row)
                            <tr class="border-t border-white/5">
                                <td class="py-1">{{ str_replace('store:', '', $row->label) }}</td>
                                <td class="py-1 text-right">{{ number_format($row->hits) }}</td>
                                <td class="py-1 text-right">{{ number_format($row->misses) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
</x-pulse::card>
