<div class="mb-6">
    <div
        class="rounded-2xl border border-slate-200/10 bg-slate-900/40 p-4 shadow-sm backdrop-blur
               dark:border-slate-800/60 dark:bg-slate-900/40"
    >
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            {{-- Left side inputs --}}
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3">
                <div>
                    <label class="mb-1 block text-xs font-medium text-slate-300">
                        No kurienes (code)
                    </label>

                    <select
                        wire:model.defer="source"
                        class="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm
                            text-slate-100
                            focus:border-slate-500 focus:ring-0"
                    >
                        <option value="">
                            -- Visi kodi --
                        </option>

                        @foreach ($this->codes as $code)
                            <option value="{{ $code }}">{{ $code }}</option>
                        @endforeach
                    </select>

                    <div class="mt-1 text-[10px] text-slate-500">
                        Pieejamie kodi no <code>form_results.code</code>
                    </div>
                </div>


                <div>
                    <label class="mb-1 block text-xs font-medium text-slate-300">
                        No datuma
                    </label>
                    <input
                        type="date"
                        wire:model.defer="from"
                        class="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm
                               text-slate-100
                               focus:border-slate-500 focus:ring-0"
                    />
                </div>

                <div>
                    <label class="mb-1 block text-xs font-medium text-slate-300">
                        Līdz datumam
                    </label>
                    <input
                        type="date"
                        wire:model.defer="to"
                        class="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm
                               text-slate-100
                               focus:border-slate-500 focus:ring-0"
                    />
                </div>
            </div>

            {{-- Right side buttons --}}
            <div class="flex flex-wrap gap-2">
                <button
                    type="button"
                    wire:click="resetFilters"
                    class="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm
                           text-slate-200 hover:bg-slate-800/40"
                >
                    Reset
                </button>

                <button
                    type="button"
                    wire:click="apply"
                    class="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900
                           hover:bg-slate-100"
                >
                    Apply
                </button>
            </div>
        </div>

        <div class="mt-3 text-xs text-slate-400">
            Filtri tiks ielikti URL kā query parametri:
            <code class="rounded bg-slate-950/60 px-1.5 py-0.5 text-slate-300">
                ?source=...&from=YYYY-MM-DD&to=YYYY-MM-DD
            </code>
        </div>
    </div>
</div>
