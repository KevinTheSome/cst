@php
    $period = request('period', '1_hour');

    $periods = [
        '1_hour' => '1h',
        '6_hours' => '6h',
        '24_hours' => '24h',
        '7_days' => '7d',
    ];
@endphp

<div class="px-6 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    {{-- Period controls --}}
    <div class="flex items-center gap-2">
        <div class="text-xs text-slate-400">Pulse period:</div>

        @foreach ($periods as $key => $label)
            <a
                href="{{ request()->fullUrlWithQuery(['period' => $key]) }}"
                class="px-2.5 py-1 rounded-md text-xs border
                    {{ $period === $key
                        ? 'bg-white text-slate-900 border-white'
                        : 'bg-slate-900/40 text-slate-200 border-slate-700 hover:bg-slate-800/40' }}"
            >
                {{ $label }}
            </a>
        @endforeach
    </div>

    {{-- Search --}}
    <div class="flex items-center gap-2">
        <span class="text-xs text-slate-400">Search cards:</span>
        <input
            id="pulse-card-search"
            type="text"
            placeholder="usage, queues, cache..."
            class="w-64 max-w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm
                   text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-0"
        />
        <button
            type="button"
            id="pulse-card-search-clear"
            class="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-xs
                   text-slate-200 hover:bg-slate-800/40"
        >
            Clear
        </button>
    </div>
</div>


<x-pulse>

    <div data-pulse-card="servers">
        <livewire:pulse.servers cols="full" />
    </div>

    <div data-pulse-card="application usage usage users requests">
        <livewire:pulse.usage cols="4" rows="2" />
    </div>

    <div data-pulse-card="queues jobs">
        <livewire:pulse.queues cols="4" />
    </div>

    <div data-pulse-card="cache">
        <livewire:pulse.cache cols="4" />
    </div>

    <div data-pulse-card="slow queries database sql">
        <livewire:pulse.slow-queries cols="8" />
    </div>

    <div data-pulse-card="exceptions errors">
        <livewire:pulse.exceptions cols="6" />
    </div>

    <div data-pulse-card="slow requests routes http">
        <livewire:pulse.slow-requests cols="6" />
    </div>

    <div data-pulse-card="slow jobs queues">
        <livewire:pulse.slow-jobs cols="6" />
    </div>

    <div data-pulse-card="slow outgoing requests http client">
        <livewire:pulse.slow-outgoing-requests cols="6" />
    </div>

    <div data-pulse-card="country visits geo">
        <livewire:pulse.country-visits cols="4" />
    </div>

    <livewire:pulse.country-visits cols="4" />

    <livewire:pulse.total-site-visits cols="4" />
</x-pulse>
