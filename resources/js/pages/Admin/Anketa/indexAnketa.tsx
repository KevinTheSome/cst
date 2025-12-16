import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router, usePage } from '@inertiajs/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { 
    Search, 
    Filter, 
    Plus, 
    FileText, 
    Calendar, 
    Trash2, 
    Edit, 
    Eye, 
    Hash, 
    X, 
    RotateCcw,
    ArrowUpDown
} from 'lucide-react';

// --- Custom Modal Icon ---
const IconWarning = () => (
    <svg className="h-12 w-12 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

interface FormResultType {
    id: number;
    code: string;
    title: any;
    created_at?: string;
    data: {
        title: any;
        fields: any[];
    };
}

interface Filters {
    type?: string;
    code?: string;
    from?: string;
    to?: string;
    search?: string;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
}

interface PageProps {
    formData: FormResultType[];
    filters?: Filters;
}

function FormsList() {
    const { formData, filters: serverFilters } = usePage<PageProps>().props;
    const [forms, setForms] = useState<FormResultType[]>([]);
    const { __, lang } = useLang();

    // Modal States
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<FormResultType | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [localFilters, setLocalFilters] = useState<Filters>({
        type: serverFilters?.type ?? '',
        code: serverFilters?.code ?? '',
        from: serverFilters?.from ?? '',
        to: serverFilters?.to ?? '',
        search: serverFilters?.search ?? '',
        orderBy: serverFilters?.orderBy ?? 'created_at',
        orderDir: serverFilters?.orderDir ?? 'desc',
    });

    useEffect(() => {
        setForms(formData || []);
    }, [formData]);

    // Check if any filter (except default sort) is active
    const hasActiveFilters = 
        localFilters.type || 
        localFilters.code || 
        localFilters.from || 
        localFilters.to || 
        (localFilters.orderBy !== 'created_at') || 
        (localFilters.orderDir !== 'desc');

    const handleDelete = () => {
        if (!deleteTarget) return;

        setIsDeleting(true);

        router.post(
            `/admin/anketa/destroy/${deleteTarget.id}`,
            { _method: 'delete' },
            {
                onSuccess: () => {
                    setForms((prev) => prev.filter((f) => f.id !== deleteTarget.id));
                    setDeleteTarget(null);
                    setIsDeleting(false);
                },

                onError: (errors) => {
                    console.error('Delete error:', errors);
                    setIsDeleting(false);
                },
            }
        );
    };


    const applyFilters = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsFilterModalOpen(false);

        router.get('/admin/anketa', 
            { ...localFilters } as any,
            { preserveState: true, replace: true }
        );
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const resetFilters = () => {
        setLocalFilters({
            type: '',
            code: '',
            from: '',
            to: '',
            search: '',
            orderBy: 'created_at',
            orderDir: 'desc',
        });
        setIsFilterModalOpen(false);
        router.get('/admin/anketa', {}, { preserveState: false, replace: true });
    };

    const getFormTitle = (form: FormResultType) => {
        const resolve = (val: any) => {
            if (!val) return null;
            if (typeof val === 'string') return val;
            return val[lang] || val['lv'] || val['en'] || Object.values(val)[0] || null;
        };
        return resolve(form.data?.title) || resolve(form.title) || 'Untitled Form';
    };

    return (
        <div className="min-h-screen pb-24 sm:px-6 lg:px-8">
            <Head title={__('anketa.index.page_title')} />

            <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
                
                {/* --- Mobile Header --- */}
                <div className="relative overflow-hidden border-b border-white/10 bg-slate-900 px-4 py-6 sm:rounded-3xl sm:border sm:p-8 sm:shadow-2xl">
                    <div className="relative z-10 flex flex-col gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <FileText className="h-4 w-4 text-emerald-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                                    {__('anketa.index.label')}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
                                {__('anketa.index.heading')}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* --- Toolbar --- */}
                <div className="px-4 sm:px-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative w-full sm:max-w-md group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={localFilters.search ?? ''}
                                onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
                                placeholder={__('anketa.index.search_placeholder') ?? 'Search...'}
                                className="block w-full rounded-xl border border-white/10 bg-slate-900/50 pl-10 pr-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-900 transition-all shadow-sm"
                            />
                        </form>

                        {/* Filter Toggle */}
                        <div className="flex items-center gap-2">
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-slate-800 text-xs font-bold text-slate-300 active:bg-slate-700"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    Reset
                                </button>
                            )}
                            <button
                                onClick={() => setIsFilterModalOpen(true)}
                                className={`flex flex-1 sm:flex-none justify-center items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all shadow-lg active:scale-95 ${
                                    hasActiveFilters 
                                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300' 
                                    : 'border-white/10 bg-slate-800 text-white'
                                }`}
                            >
                                <Filter className="h-4 w-4" />
                                Filters
                                {hasActiveFilters && <span className="flex h-2 w-2 rounded-full bg-emerald-400 ml-1 animate-pulse" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Forms List (Card View) --- */}
                <div className="px-4 sm:px-0">
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {forms.map((form) => (
                            <div 
                                key={form.id} 
                                className="relative flex flex-col rounded-2xl border border-white/10 bg-slate-900/50 shadow-lg backdrop-blur-sm overflow-hidden"
                            >
                                {/* Card Body */}
                                <div className="p-5 flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <Calendar className="h-3.5 w-3.5 text-slate-500" />
                                            <span>{form.created_at ? new Date(form.created_at).toLocaleDateString() : 'N/A'}</span>
                                        </div>
                                        <span className="font-mono text-[10px] text-slate-500 border border-white/5 bg-black/20 px-2 py-0.5 rounded">
                                            #{form.id}
                                        </span>
                                    </div>

                                    <h2 className="text-lg font-bold text-white mb-1 line-clamp-2 leading-snug">
                                        {getFormTitle(form)}
                                    </h2>

                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                                            <Hash className="h-3 w-3" />
                                            {form.code}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer Actions - Always Visible on Mobile */}
                                <div className="grid grid-cols-3 border-t border-white/5 bg-black/20 divide-x divide-white/5">
                                    <a 
                                        href={`/admin/anketa/show/${form.id}`}
                                        className="flex items-center justify-center py-3 text-slate-400 hover:text-white active:bg-white/5 transition-colors"
                                        title={__('anketa.index.view')}
                                    >
                                        <Eye className="h-5 w-5" />
                                    </a>
                                    <a 
                                        href={`/admin/anketa/edit/${form.id}`}
                                        className="flex items-center justify-center py-3 text-blue-400 hover:text-blue-300 active:bg-blue-500/10 transition-colors"
                                        title={__('anketa.index.edit')}
                                    >
                                        <Edit className="h-5 w-5" />
                                    </a>
                                    <button 
                                        onClick={() => setDeleteTarget(form)}
                                        className="flex items-center justify-center py-3 text-rose-400 hover:text-rose-300 active:bg-rose-500/10 transition-colors"
                                        title={__('anketa.index.delete')}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {forms.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/30 p-12 text-center text-slate-400">
                            <FileText className="mx-auto h-12 w-12 opacity-20 mb-3" />
                            <p>{__('anketa.index.empty')}</p>
                            <button onClick={resetFilters} className="mt-2 text-emerald-400 hover:underline">Clear filters</button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- FAB (Floating Action Button) for Mobile Create --- */}
            <a
                href="/admin/anketa/create"
                className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-900 shadow-xl shadow-emerald-500/30 transition-transform active:scale-90 hover:scale-105 hover:bg-emerald-400"
                aria-label="Create New"
            >
                <Plus className="h-7 w-7" />
            </a>

            {/* --- Filter Modal --- */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
                        onClick={() => setIsFilterModalOpen(false)}
                    />
                    <div className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/10 bg-slate-900 shadow-2xl animate-in slide-in-from-bottom duration-300 sm:duration-200 sm:zoom-in-95">
                        
                        {/* Drag Handle for Mobile */}
                        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/20 sm:hidden" />

                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Filter className="h-5 w-5 text-emerald-400" />
                                Filters
                            </h3>
                            <button onClick={() => setIsFilterModalOpen(false)} className="text-slate-400 p-1">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={applyFilters} className="p-6 space-y-5 pb-safe">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Type</label>
                                    <select
                                        value={localFilters.type ?? ''}
                                        onChange={(e) => setLocalFilters(prev => ({ ...prev, type: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                                    >
                                        <option value="" className="bg-slate-900">Any Type</option>
                                        <option value="public" className="bg-slate-900">Public</option>
                                        <option value="private" className="bg-slate-900">Private</option>
                                    </select>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Code</label>
                                    <input
                                        type="text"
                                        value={localFilters.code ?? ''}
                                        onChange={(e) => setLocalFilters(prev => ({ ...prev, code: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Date inputs simplified for mobile */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">From</label>
                                    <input
                                        type="date"
                                        value={localFilters.from ?? ''}
                                        onChange={(e) => setLocalFilters(prev => ({ ...prev, from: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">To</label>
                                    <input
                                        type="date"
                                        value={localFilters.to ?? ''}
                                        onChange={(e) => setLocalFilters(prev => ({ ...prev, to: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-bold text-white active:bg-white/10"
                                >
                                    Clear
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-slate-900 shadow-lg active:bg-emerald-600"
                                >
                                    Apply
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- Delete Confirmation Modal --- */}
            {deleteTarget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
                        onClick={() => !isDeleting && setDeleteTarget(null)}
                    />
                    <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 text-center shadow-2xl animate-in zoom-in-95">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50">
                            <IconWarning />
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">Delete Form?</h3>
                        <p className="mb-6 text-sm text-slate-400">
                            Delete <span className="text-white font-medium">{getFormTitle(deleteTarget)}</span>?
                        </p>
                        <div className="flex gap-3">
                            <button
                                disabled={isDeleting}
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-semibold text-white active:bg-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className="flex-1 rounded-xl bg-rose-500 py-3 text-sm font-bold text-white shadow-lg active:bg-rose-600"
                            >
                                {isDeleting ? '...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

(FormsList as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="Anketas">{page}</AdminLayout>
);

export default FormsList;