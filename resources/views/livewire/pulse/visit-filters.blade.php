<div class="h-full w-full col-span-full">
    <div class="
        flex flex-col md:flex-row items-end md:items-center justify-between gap-4 
        p-4 md:p-5 rounded-xl
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        shadow-sm
    ">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto flex-1">
            
            <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
                    No kurienes (Valsts)
                </label>
                <input
                    type="text"
                    wire:model.defer="country"
                    placeholder="LV, Riga, ..."
                    class="
                        w-full px-3 py-2 text-sm rounded-md
                        bg-gray-50 dark:bg-gray-950/50
                        border border-gray-200 dark:border-gray-700
                        text-gray-900 dark:text-gray-100
                        placeholder-gray-400 dark:placeholder-gray-600
                        focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                        transition-colors
                    "
                />
            </div>

            <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
                    No datuma
                </label>
                <input
                    type="date"
                    wire:model.defer="from"
                    class="
                        w-full px-3 py-2 text-sm rounded-md
                        bg-gray-50 dark:bg-gray-950/50
                        border border-gray-200 dark:border-gray-700
                        text-gray-900 dark:text-white-100
                        focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                        [color-scheme:light] dark:[color-scheme:dark]
                    "
                />
            </div>

            <div class="flex flex-col gap-1.5">
                <label class="text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
                    Līdz datumam
                </label>
                <input
                    type="date"
                    wire:model.defer="to"
                    class="
                        w-full px-3 py-2 text-sm rounded-md
                        bg-gray-50 dark:bg-gray-950/50
                        border border-gray-200 dark:border-gray-700
                        text-gray-900 dark:text-white-100
                        focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                        [color-scheme:light] dark:[color-scheme:dark]
                    "
                />
            </div>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0">
            <button
                type="button"
                wire:click="resetFilters"
                class="
                    px-3 py-2 text-xs font-semibold rounded-md
                    text-gray-600 dark:text-gray-400
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-colors
                "
            >
                Reset
            </button>

            <button
                type="button"
                wire:click="apply"
                class="
                    px-4 py-2 text-xs font-bold rounded-md shadow-sm
                    bg-purple-600 text-white hover:bg-purple-500
                    dark:bg-purple-500 dark:hover:bg-purple-400
                    transition-colors
                "
            >
                Apply
            </button>
        </div>
    </div>
</div>