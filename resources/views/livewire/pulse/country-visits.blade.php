<x-pulse::card id="country-visits" :cols="$cols" :rows="$rows" class="$class">
    <div class="p-4">
        <h3 class="text-sm font-medium">Visits by Country (30d)</h3>

        @if($data->isEmpty())
            <div class="text-xs text-muted">No data yet.</div>
        @else
            <table class="w-full text-xs mt-2">
                <thead>
                    <tr><th class="text-left">Country</th><th class="text-right">Visits</th></tr>
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
