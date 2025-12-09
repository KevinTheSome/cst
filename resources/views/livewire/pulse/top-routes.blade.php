<x-pulse::card id="top-routes" :cols="$cols" :rows="$rows" class="$class">
    <div class="p-4">
        <h3 class="text-sm font-medium">Top Routes</h3>

        @if(empty($topRoutes))
            <div class="text-xs text-muted">No data yet.</div>
        @else
            <table class="w-full text-xs mt-2">
                <thead>
                    <tr><th class="text-left">Route / Path</th><th class="text-right">Hits</th></tr>
                </thead>
                <tbody>
                    @foreach($topRoutes as $path => $count)
                        <tr>
                            <td class="py-1">{{ $path }}</td>
                            <td class="py-1 text-right">{{ $count }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
</x-pulse::card>
