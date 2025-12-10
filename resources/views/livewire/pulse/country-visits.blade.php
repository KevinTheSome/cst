<x-pulse::card
    id="country-visits"
    :cols="$cols"
    :rows="$rows"
    :class="$class"
>
    <div class="p-4">
        <div class="flex items-center justify-between gap-2">
            <h3 class="text-sm font-medium">
                Visits by Country
            </h3>

            {{-- Small filter hint like Pulse style --}}
            <span class="text-[10px] text-muted-foreground">
                @if(request('from') && request('to'))
                    {{ request('from') }} → {{ request('to') }}
                @else
                    30d
                @endif

                @if(request('country'))
                    • {{ request('country') }}
                @endif
            </span>
        </div>

        @if($data->isEmpty())
            <div class="text-xs text-muted mt-2">No data yet.</div>
        @else
            <table class="w-full text-xs mt-2">
                <thead>
                    <tr>
                        <th class="text-left">Country</th>
                        <th class="text-right">Visits</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($data as $row)
                        <tr>
                            <td class="py-1">{{ $row->country_code }}</td>
                            <td class="py-1 text-right">{{ $row->total }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
</x-pulse::card>
