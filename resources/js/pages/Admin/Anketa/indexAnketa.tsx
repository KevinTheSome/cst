import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import type React from 'react';
import { useEffect, useState } from 'react';
import { 
    Search, 
    Filter, 
    Plus, 
    FileText, 
    MoreVertical, 
    Calendar, 
    Trash2, 
    Edit, 
    Eye, 
    Hash, 
    X, 
    RotateCcw,
    ArrowUpDown,
    AlertTriangle
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

        router.delete(`/admin/anketa/destroy/${deleteTarget.id}`, {
            onSuccess: () => {
                setForms((prev) => prev.filter((f) => f.id !== deleteTarget.id));
                setDeleteTarget(null);
                setIsDeleting(false);
            },
            onError: (errors) => {
                console.error('Delete error:', errors);
                setIsDeleting(false);
                // Optionally show error toast here
            },
        });
    };

    const applyFilters = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsFilterModalOpen(false);

        router.get(
            '/admin/anketa',
            {
                type: localFilters.type || undefined,
                code: localFilters.code || undefined,
                from: localFilters.from || undefined,
                to: localFilters.to || undefined,
                search: localFilters.search || undefined,
                orderBy: localFilters.orderBy || 'created_at',
                orderDir: localFilters.orderDir || 'desc',
            },
            {
                preserveState: true,
                replace: true,
            },
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

        router.get(
            '/admin/anketa',
            {},
            {
                preserveState: false,
                replace: true,
            },
        );
    };

    const getFormTitle = (form: FormResultType) => {
        const resolve = (val: any) => {
            if (!val) return null;
            if (typeof val === 'string') return val;
            // Try current lang, then standard fallbacks, then any available key
            return val[lang] || val['lv'] || val['en'] || Object.values(val)[0] || null;
        };

        return resolve(form.data?.title) || resolve(form.title) || 'Untitled Form';
    };

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <Head title={__('anketa.index.page_title')} />

            <div className="mx-auto max-w-7xl space-y-8">
                
                {/* --- Header Card --- */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-5 w-5 text-emerald-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                                    {__('anketa.index.label')}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                {__('anketa.index.heading')}
                            </h1>
                            <p className="mt-2 text-slate-400 max-w-lg">
                                {__('anketa.index.subheading')}
                            </p>
                        </div>

                        <a
                            href="/admin/anketa/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:scale-105"
                        >
                            <Plus className="h-5 w-5" />
                            {__('anketa.index.create_button')}
                        </a>
                    </div>
                </div>

                {/* --- Toolbar --- */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative w-full sm:max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={localFilters.search ?? ''}
                            onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
                            placeholder={__('anketa.index.search_placeholder') ?? 'Search title or code...'}
                            className="block w-full rounded-2xl border border-white/10 bg-slate-900/50 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-900 transition-all shadow-sm"
                        />
                    </form>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Reset
                            </button>
                        )}
                        <button
                            onClick={() => setIsFilterModalOpen(true)}
                            className={`flex flex-1 sm:flex-none justify-center items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all shadow-lg ${
                                hasActiveFilters 
                                ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 shadow-emerald-500/10' 
                                : 'border-white/10 bg-slate-800 text-white hover:bg-slate-700'
                            }`}
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                            {hasActiveFilters && <span className="flex h-2 w-2 rounded-full bg-emerald-400 ml-1 animate-pulse" />}
                        </button>
                    </div>
                </div>

                {/* --- Forms Grid --- */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {forms.map((form) => (
                        <div 
                            key={form.id} 
                            className="group relative flex flex-col rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:bg-slate-900 hover:border-emerald-500/30 hover:shadow-emerald-500/5"
                        >
                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-white/5 text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-colors">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs text-slate-500 border border-white/5 bg-black/20 px-2 py-1 rounded-lg">
                                        ID: {form.id}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-white mb-2 truncate" title={getFormTitle(form)}>
                                    {getFormTitle(form)}
                                </h2>
                                
                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Hash className="h-3.5 w-3.5 text-slate-500" />
                                        <span>Code: <span className="text-emerald-400 font-mono">{form.code}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Calendar className="h-3.5 w-3.5 text-slate-500" />
                                        <span>{form.created_at ? new Date(form.created_at).toLocaleDateString() : 'Unknown date'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Actions */}
                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                <a 
                                    href={`/admin/anketa/show/${form.id}`}
                                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                                    title={__('anketa.index.view')}
                                >
                                    <Eye className="h-4 w-4" />
                                </a>
                                <a 
                                    href={`/admin/anketa/edit/${form.id}`}
                                    className="p-2 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
                                    title={__('anketa.index.edit')}
                                >
                                    <Edit className="h-4 w-4" />
                                </a>
                                <button 
                                    onClick={() => setDeleteTarget(form)}
                                    className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                                    title={__('anketa.index.delete')}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {forms.length === 0 && (
                        <div className="col-span-full rounded-3xl border border-dashed border-white/10 bg-slate-900/30 p-12 text-center text-slate-400">
                            <FileText className="mx-auto h-12 w-12 opacity-20 mb-3" />
                            <p>{__('anketa.index.empty')}</p>
                            <button onClick={resetFilters} className="mt-2 text-emerald-400 hover:underline">Clear filters</button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Filter Modal --- */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
                        onClick={() => setIsFilterModalOpen(false)}
                    />
                    <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-slate-900">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Filter className="h-5 w-5 text-emerald-400" />
                                Filter Forms
                            </h3>
                            <button 
                                onClick={() => setIsFilterModalOpen(false)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={applyFilters} className="p-6 space-y-6">
                            
                            <div className="grid grid-cols-2 gap-4">
                                {/* Type */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Form Type</label>
                                    <select
                                        value={localFilters.type ?? ''}
                                        onChange={(e) => setLocalFilters(prev => ({ ...prev, type: e.target.value }))}
                                        className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                                    >
                                        <option value="" className="bg-slate-900">{__('anketa.index.filter_any') ?? 'Any Type'}</option>
                                        <option value="public" className="bg-slate-900">Public</option>
                                        <option value="private" className="bg-slate-900">Private</option>
                                    </select>
                                </div>
                                {/* Code */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Code</label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                        <input
                                            type="text"
                                            value={localFilters.code ?? ''}
                                            onChange={(e) => setLocalFilters(prev => ({ ...prev, code: e.target.value }))}
                                            placeholder="e.g. ABC123"
                                            className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Date Range</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-xs text-slate-500">From</span>
                                        </div>
                                        <input
                                            type="date"
                                            value={localFilters.from ?? ''}
                                            onChange={(e) => setLocalFilters(prev => ({ ...prev, from: e.target.value }))}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-xs text-slate-500">To</span>
                                        </div>
                                        <input
                                            type="date"
                                            value={localFilters.to ?? ''}
                                            onChange={(e) => setLocalFilters(prev => ({ ...prev, to: e.target.value }))}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 pl-8 pr-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sorting */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sort Order</label>
                                <div className="relative">
                                    <ArrowUpDown className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                    <select
                                        value={localFilters.orderDir ?? 'desc'}
                                        onChange={(e) => setLocalFilters(prev => ({ ...prev, orderBy: 'created_at', orderDir: e.target.value as 'asc'|'desc' }))}
                                        className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 pl-10 pr-10 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                                    >
                                        <option value="desc" className="bg-slate-900">{__('anketa.index.sort_newest') ?? 'Newest First'}</option>
                                        <option value="asc" className="bg-slate-900">{__('anketa.index.sort_oldest') ?? 'Oldest First'}</option>
                                    </select>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                                >
                                    Clear All
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors"
                                >
                                    Apply Filters
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
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
                        onClick={() => !isDeleting && setDeleteTarget(null)}
                    />
                    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/50">
                                <IconWarning />
                            </div>
                            
                            <h3 className="mb-2 text-xl font-bold text-white">
                                Delete Form?
                            </h3>
                            
                            <p className="mb-6 text-sm text-slate-400 leading-relaxed">
                                Are you sure you want to delete <span className="text-white font-medium">{getFormTitle(deleteTarget)}</span>? This action cannot be undone.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    disabled={isDeleting}
                                    onClick={() => setDeleteTarget(null)}
                                    className="flex-1 rounded-xl border border-white/10 bg-transparent py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isDeleting}
                                    onClick={handleDelete}
                                    className="flex-1 rounded-xl bg-rose-500 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:bg-rose-600"
                                >
                                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
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