<div style="padding: 0 24px; margin: 14px 0 22px 0;">
    <div style="
        display:flex; flex-wrap:wrap; gap:12px 16px; align-items:end; justify-content:space-between;
        padding:12px 14px; border-radius:14px;
        background: rgba(15,23,42,0.35);
        border: 1px solid rgba(148,163,184,0.18);
        backdrop-filter: blur(6px);
    ">
        <div style="display:flex; flex-wrap:wrap; gap:12px;">
            <div>
                <label style="display:block; font-size:11px; font-weight:600; color:#cbd5e1; margin-bottom:6px;">
                    No kurienes (Valsts)
                </label>
                <input
                    type="text"
                    wire:model.defer="country"
                    placeholder="LV, Riga, ..."
                    style="
                        min-width:160px; padding:8px 10px; font-size:12px; color:#f8fafc;
                        background: rgba(2,6,23,0.55);
                        border: 1px solid rgba(148,163,184,0.25);
                        border-radius:8px; outline:none;
                    "
                />
            </div>

            <div>
                <label style="display:block; font-size:11px; font-weight:600; color:#cbd5e1; margin-bottom:6px;">
                    No datuma
                </label>
                <input
                    type="date"
                    wire:model.defer="from"
                    style="
                        min-width:150px; padding:8px 10px; font-size:12px; color:#f8fafc;
                        background: rgba(2,6,23,0.55);
                        border: 1px solid rgba(148,163,184,0.25);
                        border-radius:8px; outline:none;
                    "
                />
            </div>

            <div>
                <label style="display:block; font-size:11px; font-weight:600; color:#cbd5e1; margin-bottom:6px;">
                    Līdz datumam
                </label>
                <input
                    type="date"
                    wire:model.defer="to"
                    style="
                        min-width:150px; padding:8px 10px; font-size:12px; color:#f8fafc;
                        background: rgba(2,6,23,0.55);
                        border: 1px solid rgba(148,163,184,0.25);
                        border-radius:8px; outline:none;
                    "
                />
            </div>
        </div>

        <div style="display:flex; gap:8px;">
            <button
                type="button"
                wire:click="resetFilters"
                style="
                    padding:8px 10px; font-size:11.5px; border-radius:8px;
                    color:#e2e8f0; background: transparent;
                    border: 1px solid rgba(148,163,184,0.3);
                    cursor:pointer;
                "
            >
                Reset
            </button>

            <button
                type="button"
                wire:click="apply"
                style="
                    padding:8px 12px; font-size:11.5px; border-radius:8px;
                    color:#0f172a; background:#f8fafc; border:1px solid #f8fafc;
                    font-weight:600; cursor:pointer;
                "
            >
                Apply
            </button>
        </div>
    </div>
</div>
