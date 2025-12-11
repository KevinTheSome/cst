<x-pulse::card :cols="$cols" :rows="$rows" :class="$class">
    <div class="p-4">
        <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium">Slow Outgoing Requests (country-aware)</h3>
            <span class="text-[10px] text-muted-foreground">
                @if(request('from') && request('to'))
                    {{ request('from') }} → {{ request('to') }}
                @else
                    30d
                @endif
                @if(request('country')) • {{ request('country') }} @endif
            </span>
        </div>

        <div class="mt-3 flex gap-4 text-xs">
            <span>Slow (≥1s): <strong>{{ number_format($slow ?? 0) }}</strong></span>
            <span>Failed: <strong>{{ number_format($failed ?? 0) }}</strong></span>
        </div>

        @if(($hosts ?? collect())->isEmpty())
            <div class="mt-3 text-xs text-muted-foreground">No outgoing data yet.</div>
        @else
            <table class="w-full text-xs mt-3">
                <thead>
                    <tr>
                        <th class="text-left">Host</th>
                        <th class="text-right">Slow</th>
                        <th class="text-right">Failed</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($hosts as $row)
                        <tr class="border-t border-white/5">
                            <td class="py-1">{{ str_replace('host:', '', $row->label) }}</td>
                            <td class="py-1 text-right">{{ number_format($row->slow) }}</td>
                            <td class="py-1 text-right">{{ number_format($row->failed) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
</x-pulse::card>
