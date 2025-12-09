<x-pulse::card :cols="$cols" :rows="$rows" :class="$class" wire:poll.10s="">
    <x-pulse::card-header name="Total Site Visits" />

    <div class="p-4 text-center">
        <p class="text-sm text-gray-400">Unique browser sessions</p>
        <p class="mt-2 text-4xl font-semibold">
            {{ number_format($total) }}
        </p>
    </div>
</x-pulse::card>