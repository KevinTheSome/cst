<x-pulse::card :cols="$cols" :rows="$rows" :class="$class">
    <x-pulse::card-header name="CST Form Results">
        <x-slot:icon>
            <span class="text-lg">🧾</span>
        </x-slot:icon>
    </x-pulse::card-header>

    <div class="p-4">
        <div class="text-3xl font-semibold">
            {{ $count }}
        </div>
        <div class="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Balstīts uz filtriem no URL
        </div>
    </div>
</x-pulse::card>
