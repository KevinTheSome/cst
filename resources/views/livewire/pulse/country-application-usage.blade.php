<x-pulse::card :cols="$cols" :rows="$rows" :class="$class">
    <div class="p-4">
        <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium">Application Usage (country-aware)</h3>
            <span class="text-[10px] text-muted-foreground">
                @if(request('from') && request('to'))
                    {{ request('from') }} → {{ request('to') }}
                @else
                    30d
                @endif
                @if(request('country')) • {{ request('country') }} @endif
            </span>
        </div>

        @if($data->isEmpty())
            <div class="mt-3 text-xs text-muted-foreground">No data yet.</div>
        @else
            <table class="w-full text-xs mt-3">
                <thead>
                    <tr>
                        <th class="text-left">User</th>
                        <th class="text-right">Requests</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($data as $row)
                        <tr class="border-t border-white/5">
                            <td class="py-1">{{ $row->label }}</td>
                            <td class="py-1 text-right">{{ $row->total }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
</x-pulse::card>
