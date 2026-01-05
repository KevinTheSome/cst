// resources/js/pages/Admin/Apmaciba/lectureCode.tsx
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

// --- Types ---
type OnlineCode = {
    id: number;
    code: string;
    online_training_id?: number | null;
    online_training_ids?: number[];
    max_uses: number;
    used_count: number;
    last_used_by?: string | null;
    last_used_at?: string | null;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
};

type OnlineTraining = {
    id: number;
    title: any;
    description?: string | null;
    url?: string | null;
    starts_at?: string | null;
    ends_at?: string | null;
    is_active?: boolean;
};

// --- Icons ---
const IconEdit = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
    </svg>
);
const IconRefresh = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
    </svg>
);
const IconTrash = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
    </svg>
);
const IconWarning = () => (
    <svg className="h-12 w-12 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
    </svg>
);
const IconInfo = () => (
    <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const IconCheck = () => (
    <svg className="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- CSRF helper (used for destructive requests) ---
function getCsrfToken() {
    return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content ?? '';
}

export default function LectureCode() {
    const { props } = usePage();
    const initialCodes: OnlineCode[] = (props as any).codes ?? [];
    const trainings: OnlineTraining[] = (props as any).trainings ?? [];

    const [codes, setCodes] = useState<OnlineCode[]>(initialCodes);
    const [creating, setCreating] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // create form state
    const [newCodeData, setNewCodeData] = useState({
        code: '',
        online_training_ids: [] as number[],
        max_uses: 0,
        is_active: true,
    });

    // edit modal state
    const [editing, setEditing] = useState<Partial<OnlineCode> | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // --- POPUP STATES ---
    const [confirmState, setConfirmState] = useState<{
        type: 'delete' | 'regenerate';
        id: number;
        codeName?: string;
    } | null>(null);

    const [alertState, setAlertState] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const [processingAction, setProcessingAction] = useState(false);

    // --- Helpers ---
    const findTrainingTitle = (t?: OnlineTraining) => {
        if (!t) return '—';
        const title = t.title?.lv ?? t.title?.en ?? (typeof t.title === 'string' ? t.title : null);
        return title ?? `Training #${t.id}`;
    };

    const humanDate = (s?: string | null) => (s ? new Date(s).toLocaleString() : '—');

    const toggleCreateTraining = (id: number) => {
        setNewCodeData((prev) => {
            const set = new Set(prev.online_training_ids);
            if (set.has(id)) set.delete(id);
            else set.add(id);
            return { ...prev, online_training_ids: Array.from(set) };
        });
    };

    const toggleEditTraining = (id: number) => {
        setEditing((prev) => {
            const current = prev?.online_training_ids ?? [];
            const set = new Set(current);
            if (set.has(id)) set.delete(id);
            else set.add(id);
            return { ...(prev ?? {}), online_training_ids: Array.from(set) };
        });
    };

    // --- Handlers ---

    const handleCreate = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setFormError(null);

        if (newCodeData.max_uses < 0) {
            setFormError('Max uses must be >= 0');
            return;
        }

        setCreating(true);
        try {
            const payload: any = {
                code: newCodeData.code || null,
                online_training_ids: newCodeData.online_training_ids,
                max_uses: Number(newCodeData.max_uses) || 0,
                is_active: newCodeData.is_active,
            };

            if (Array.isArray(newCodeData.online_training_ids) && newCodeData.online_training_ids.length === 1) {
                payload.online_training_id = newCodeData.online_training_ids[0];
            } else {
                payload.online_training_id = null;
            }

            const csrf = getCsrfToken();
            const res = await axios.post('/admin/lecture/codes', payload, {
                headers: { 'X-CSRF-TOKEN': csrf, Accept: 'application/json' },
            });
            const created: OnlineCode = res.data.code;
            setCodes((prev) => [created, ...prev]);

            setNewCodeData({
                code: '',
                online_training_ids: [],
                max_uses: 0,
                is_active: true,
            });
            setAlertState({ type: 'success', message: 'Code created successfully!' });
        } catch (err: any) {
            setFormError(err?.response?.data?.message || 'Failed to create code.');
        } finally {
            setCreating(false);
        }
    };

    // Trigger custom confirmation for Delete
    const handleDeleteRequest = (id: number, codeName: string) => {
        setConfirmState({ type: 'delete', id, codeName });
    };

    // Trigger custom confirmation for Regenerate
    const handleRegenerateRequest = (id: number, codeName: string) => {
        setConfirmState({ type: 'regenerate', id, codeName });
    };

    // Execute Action after Confirmation
    const proceedWithAction = async () => {
        if (!confirmState) return;
        setProcessingAction(true);

        try {
            const csrf = getCsrfToken();

            if (confirmState.type === 'delete') {
                // POST to destroy endpoint (server expects POST /lecture/codes/{id} or /admin/lecture/codes/{id})
                await axios.post(`/admin/lecture/codes/${confirmState.id}`, {}, { headers: { 'X-CSRF-TOKEN': csrf } });
                setCodes((prev) => prev.filter((c) => c.id !== confirmState.id));
                setAlertState({ type: 'success', message: 'Access code deleted.' });
            } else if (confirmState.type === 'regenerate') {
                // regenerate endpoint kept as /admin/lecture/codes/{id}/regenerate (POST)
                const res = await axios.post(`/admin/lecture/codes/${confirmState.id}/regenerate`, {}, { headers: { 'X-CSRF-TOKEN': csrf } });
                const updated: OnlineCode = res.data.code;
                setCodes((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
                setAlertState({ type: 'success', message: 'Code regenerated successfully.' });
            }
            setConfirmState(null); // Close modal on success
        } catch (err) {
            setAlertState({ type: 'error', message: 'Action failed. Please try again.' });
        } finally {
            setProcessingAction(false);
        }
    };

    const openEdit = (c: OnlineCode) => {
        const editingObj: Partial<OnlineCode> = {
            ...c,
            online_training_ids: (c.online_training_ids ?? (c.online_training_id ? [c.online_training_id] : [])) as number[],
        };
        setEditing(editingObj);
        setEditError(null);
    };

    const handleUpdate = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!editing || typeof editing.id === 'undefined') return;
        setSubmitting(true);
        setEditError(null);

        try {
            const payload: any = {
                code: editing.code,
                online_training_ids: editing.online_training_ids ?? [],
                max_uses: Number(editing.max_uses) || 0,
                is_active: typeof editing.is_active !== 'undefined' ? editing.is_active : true,
            };

            if (Array.isArray(editing.online_training_ids) && editing.online_training_ids.length === 1) {
                payload.online_training_id = editing.online_training_ids[0];
            } else {
                payload.online_training_id = null;
            }

            // POST to the safe update endpoint (server has POST route for update)
            const csrf = getCsrfToken();
            const res = await axios.post(`/admin/lecture/codes/${editing.id}/update`, payload, { headers: { 'X-CSRF-TOKEN': csrf } });
            const updated: OnlineCode = res.data.code;
            setCodes((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            setEditing(null);
            setAlertState({ type: 'success', message: 'Code updated successfully.' });
        } catch (err: any) {
            setEditError(err?.response?.data?.message || 'Failed to update code');
        } finally {
            setSubmitting(false);
        }
    };

    const renderTrainingsForCode = (c: OnlineCode) => {
        const ids: number[] = (c.online_training_ids ?? (c.online_training_id ? [c.online_training_id] : [])) as number[];
        if (!ids || ids.length === 0) return 'All trainings';
        const names = ids
            .map((id) => trainings.find((t) => t.id === id))
            .filter(Boolean)
            .map((t) => findTrainingTitle(t));
        return names.join(', ');
    };

    return (
        <>
            <Head title="Lecture codes" />

            <div className="mx-auto w-full max-w-7xl space-y-8 p-4 md:p-8">
                {/* --- Page Header --- */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Lecture Access</h1>
                        <p className="mt-1 text-slate-400">Manage validation codes for online course access.</p>
                    </div>
                </div>

                {/* --- Create Form --- */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl transition-all">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
                            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                            Generate New Code
                        </h2>

                        <form onSubmit={handleCreate} className="grid grid-cols-1 gap-6 md:grid-cols-12">
                            <div className="flex flex-col gap-2 md:col-span-4">
                                <label className="text-xs font-medium tracking-wider text-slate-400 uppercase">Custom Code (Optional)</label>
                                <div className="relative">
                                    <input
                                        value={newCodeData.code}
                                        onChange={(e) => setNewCodeData((s) => ({ ...s, code: e.target.value }))}
                                        placeholder="Leave empty to auto-generate"
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 transition-all focus:border-emerald-500/50 focus:bg-black/40 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-5">
                                <label className="text-xs font-medium tracking-wider text-slate-400 uppercase">Applicable Trainings</label>
                                <div className="custom-scrollbar h-[120px] overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-2">
                                    {trainings.length === 0 ? (
                                        <div className="flex h-full items-center justify-center text-xs text-white/40">No trainings available</div>
                                    ) : (
                                        <div className="space-y-1">
                                            {trainings.map((t) => {
                                                const checked = newCodeData.online_training_ids.includes(t.id);
                                                return (
                                                    <label
                                                        key={t.id}
                                                        className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors ${checked ? 'bg-emerald-500/10' : 'hover:bg-white/5'}`}
                                                    >
                                                        <div
                                                            className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${checked ? 'border-emerald-500 bg-emerald-500 text-black' : 'border-slate-600 bg-transparent'}`}
                                                        >
                                                            {checked && (
                                                                <svg
                                                                    className="h-3.5 w-3.5"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="3"
                                                                >
                                                                    <path d="M5 13l4 4L19 7"></path>
                                                                </svg>
                                                            )}
                                                            <input
                                                                type="checkbox"
                                                                checked={checked}
                                                                onChange={() => toggleCreateTraining(t.id)}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                        <span className={`text-sm ${checked ? 'font-medium text-emerald-400' : 'text-slate-300'}`}>
                                                            {findTrainingTitle(t)}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <p className="pl-1 text-[10px] text-slate-500">
                                    Selected:{' '}
                                    {newCodeData.online_training_ids.length > 0 ? newCodeData.online_training_ids.length : 'All (Universal Access)'}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-3">
                                <label className="text-xs font-medium tracking-wider text-slate-400 uppercase">Max Uses</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min={0}
                                        value={newCodeData.max_uses}
                                        onChange={(e) => setNewCodeData((s) => ({ ...s, max_uses: Number(e.target.value) }))}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white transition-all focus:border-emerald-500/50 focus:bg-black/40 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                                    />
                                </div>
                                <p className="pl-1 text-[10px] text-slate-500">Set to 0 for unlimited uses.</p>
                            </div>

                            <div className="mt-2 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-4 md:col-span-12 md:flex-row">
                                <div className="text-xs text-slate-400">
                                    {formError && <span className="rounded-lg bg-rose-400/10 px-2 py-1 font-medium text-rose-400">{formError}</span>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className={`w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-8 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/30 focus:ring-2 focus:ring-emerald-500/40 focus:outline-none disabled:opacity-70 disabled:hover:scale-100 md:w-auto ${creating ? 'cursor-wait' : ''}`}
                                >
                                    {creating ? 'Creating...' : 'Create Access Code'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* --- Data Table --- */}
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
                        <h3 className="text-lg font-semibold text-white">Active Codes</h3>
                        <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-xs text-slate-500">{codes.length} records</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-white/5 text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    <th className="px-6 py-4 whitespace-nowrap">Code & Date</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Access Scope</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap">Usage</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap">Status</th>
                                    <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {codes.map((c) => (
                                    <tr key={c.id} className="group transition-colors hover:bg-white/[0.02]">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-mono text-base font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">
                                                    {c.code}
                                                </span>
                                                <span className="text-xs text-slate-500">{humanDate(c.created_at)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-[200px] truncate text-slate-300" title={renderTrainingsForCode(c)}>
                                                {renderTrainingsForCode(c)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
                                                <span className={c.used_count >= c.max_uses && c.max_uses !== 0 ? 'text-rose-400' : 'text-white'}>
                                                    {c.used_count}
                                                </span>
                                                <span className="text-slate-600">/</span>
                                                <span>{c.max_uses === 0 ? '∞' : c.max_uses}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                                                    c.is_active
                                                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                                        : 'border-slate-700 bg-slate-800 text-slate-400'
                                                }`}
                                            >
                                                {c.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2 opacity-80 transition-opacity group-hover:opacity-100">
                                                <button
                                                    type="button"
                                                    onClick={() => openEdit(c)}
                                                    className="rounded-lg bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                                                    title="Edit"
                                                >
                                                    <IconEdit />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRegenerateRequest(c.id, c.code)}
                                                    className="rounded-lg bg-slate-800 p-2 text-blue-400 transition-colors hover:bg-blue-500/20 hover:text-blue-300"
                                                    title="Regenerate Code"
                                                >
                                                    <IconRefresh />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteRequest(c.id, c.code)}
                                                    className="rounded-lg bg-slate-800 p-2 text-rose-400 transition-colors hover:bg-rose-500/20 hover:text-rose-300"
                                                    title="Delete"
                                                >
                                                    <IconTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {codes.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            <p className="text-base">No codes found</p>
                                            <p className="text-sm">Create your first access code above.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- CONFIRMATION POP-UP (Modal) --- */}
                {confirmState && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                            onClick={() => !processingAction && setConfirmState(null)}
                        />
                        <div className="animate-in fade-in zoom-in relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl duration-200">
                            <div className="p-6 text-center">
                                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/50">
                                    {confirmState.type === 'delete' ? <IconWarning /> : <IconInfo />}
                                </div>

                                <h3 className="mb-2 text-xl font-bold text-white">
                                    {confirmState.type === 'delete' ? 'Delete Access Code?' : 'Regenerate Code?'}
                                </h3>

                                <p className="mb-6 text-sm text-slate-400">
                                    {confirmState.type === 'delete'
                                        ? `Are you sure you want to delete code "${confirmState.codeName}"? This action cannot be undone.`
                                        : `This will replace code "${confirmState.codeName}" with a new random string. The old code will stop working immediately.`}
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        disabled={processingAction}
                                        onClick={() => setConfirmState(null)}
                                        className="flex-1 rounded-xl border border-white/10 bg-transparent py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={processingAction}
                                        onClick={proceedWithAction}
                                        className={`flex-1 rounded-xl py-3 text-sm font-bold shadow-lg transition-all hover:scale-[1.02] ${
                                            confirmState.type === 'delete'
                                                ? 'bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-600'
                                                : 'bg-blue-500 text-white shadow-blue-500/20 hover:bg-blue-600'
                                        }`}
                                    >
                                        {processingAction ? 'Processing...' : confirmState.type === 'delete' ? 'Yes, Delete' : 'Yes, Regenerate'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- ALERT / NOTIFICATION POP-UP --- */}
                {alertState && (
                    <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-transparent" /> {/* No clickable background for simple alerts, but centrally aligned */}
                        <div className="animate-in slide-in-from-bottom-10 fade-in pointer-events-auto relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl duration-300">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">{alertState.type === 'success' ? <IconCheck /> : <IconWarning />}</div>
                                <h3 className="mb-1 text-lg font-bold text-white">{alertState.type === 'success' ? 'Success' : 'Error'}</h3>
                                <p className="mb-6 text-sm text-slate-400">{alertState.message}</p>
                                <button
                                    onClick={() => setAlertState(null)}
                                    className="w-full rounded-xl bg-slate-800 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                                >
                                    Okay, got it
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Edit Modal --- */}
                {editing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditing(null)}></div>

                        <div className="animate-in fade-in zoom-in relative w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-2xl duration-200">
                            <h3 className="mb-6 text-xl font-bold text-white">Edit Access Code</h3>

                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium tracking-wider text-slate-400 uppercase">Code String</label>
                                    <input
                                        value={editing.code ?? ''}
                                        onChange={(e) => setEditing((s) => ({ ...(s ?? {}), code: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium tracking-wider text-slate-400 uppercase">Assigned Trainings</label>
                                    <div className="custom-scrollbar h-[150px] overflow-y-auto rounded-xl border border-white/10 bg-black/40 p-2">
                                        {trainings.length === 0 && <div className="p-2 text-xs text-white/50">No trainings available</div>}
                                        {trainings.map((t) => {
                                            const checked = (editing.online_training_ids ?? []).includes(t.id);
                                            return (
                                                <label
                                                    key={t.id}
                                                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors ${checked ? 'bg-emerald-500/10' : 'hover:bg-white/5'}`}
                                                >
                                                    <div
                                                        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${checked ? 'border-emerald-500 bg-emerald-500 text-black' : 'border-slate-600 bg-transparent'}`}
                                                    >
                                                        {checked && (
                                                            <svg
                                                                className="h-3 w-3"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth="3"
                                                            >
                                                                <path d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                        )}
                                                        <input
                                                            type="checkbox"
                                                            checked={checked}
                                                            onChange={() => toggleEditTraining(t.id)}
                                                            className="hidden"
                                                        />
                                                    </div>
                                                    <span className={`text-sm ${checked ? 'text-emerald-400' : 'text-slate-300'}`}>
                                                        {findTrainingTitle(t)}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium tracking-wider text-slate-400 uppercase">Max Uses</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={typeof editing.max_uses !== 'undefined' ? editing.max_uses : 0}
                                        onChange={(e) => setEditing((s) => ({ ...(s ?? {}), max_uses: Number(e.target.value) }))}
                                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none"
                                    />
                                </div>

                                {editError && <div className="rounded-lg bg-rose-500/10 px-4 py-2 text-sm text-rose-400">{editError}</div>}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        disabled={submitting}
                                        type="submit"
                                        className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-900 transition-colors hover:bg-emerald-400"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditing(null)}
                                        className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-3 font-semibold text-white transition-colors hover:bg-white/5"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// Ensure the Persistent Layout is correctly applied
(LectureCode as any).layout = (page: React.ReactNode) => <AdminLayout title="Lecture codes">{page}</AdminLayout>;
