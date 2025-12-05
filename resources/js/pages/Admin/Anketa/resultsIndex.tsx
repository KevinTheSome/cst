import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    X, 
    Calendar, 
    ArrowUpDown, 
    Eye, 
    FileText, 
    Hash,
    RotateCcw,
    CheckCircle2,
    Clock
} from 'lucide-react';

type ResultRow = {
    id: number;
    code: string;
    title: string;
    type: string | null;
    submitted_at: string | null;
    answers_count: number;
};

type Filters = {
    type?: string;
    code?: string;
    from?: string;
    to?: string;
    search?: string;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
};

interface PageProps {
    results: ResultRow[];
    filters?: Filters;
}

const ResultsIndex: React.FC = () => {
    const { results, filters: serverFilters } = usePage<PageProps>().props;
    const { __ } = useLang();

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    
    const [localFilters, setLocalFilters] = useState<Filters>({
        type: serverFilters?.type ?? '',
        code: serverFilters?.code ?? '',
        from: serverFilters?.from ?? '',
        to: serverFilters?.to ?? '',
        search: serverFilters?.search ?? '',
        orderBy: serverFilters?.orderBy ?? 'created_at',
        orderDir: serverFilters?.orderDir ?? 'desc',
    });

    // Check if any filter (except default sort) is active
    const hasActiveFilters = 
        localFilters.type || 
        localFilters.code || 
        localFilters.from || 
        localFilters.to || 
        (localFilters.orderBy !== 'created_at') || 
        (localFilters.orderDir !== 'desc');

    const applyFilters = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        setIsFilterModalOpen(false); // Close modal on apply

        router.get(
            '/admin/anketa/results',
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
            search: '', // Keep search? Usually reset clears everything, let's clear it.
            orderBy: 'created_at',
            orderDir: 'desc',
        });
        setIsFilterModalOpen(false);

        router.get(
            '/admin/anketa/results',
            {},
            {
                preserveState: false,
                replace: true,
            },
        );
    };

    // Helper for badges
    const getTypeColor = (type: string | null) => {
        switch (type) {
            case 'psoriasis': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
            case 'chronic': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'specialists': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-slate-700/30 text-slate-400 border-slate-600/30';
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <Head title={__('anketa.results.page_title') ?? 'Form answers'} />

            <div className="mx-auto max-w-7xl space-y-6">
                
                {/* --- Header Card --- */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-5 w-5 text-blue-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                                    {__('anketa.results.label') ?? 'Submissions'}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                {__('anketa.results.heading') ?? 'Form Answers'}
                            </h1>
                            <p className="mt-2 text-slate-400 max-w-lg">
                                {__('anketa.results.subheading') ?? 'Browse and analyze submitted questionnaire answers.'}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-4 min-w-[140px]">
                                <p className="text-xs text-slate-400 uppercase tracking-wider">Total Answers</p>
                                <p className="text-2xl font-bold text-white mt-1">{results.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Toolbar --- */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative w-full sm:max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={localFilters.search ?? ''}
                            onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
                            placeholder={__('anketa.results.search_placeholder') ?? 'Search by code or title...'}
                            className="block w-full rounded-2xl border border-white/10 bg-slate-900/50 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-slate-900 transition-all shadow-sm"
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
                                ? 'border-blue-500/50 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 shadow-blue-500/10' 
                                : 'border-white/10 bg-slate-800 text-white hover:bg-slate-700'
                            }`}
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                            {hasActiveFilters && <span className="flex h-2 w-2 rounded-full bg-blue-400 ml-1 animate-pulse" />}
                        </button>
                    </div>
                </div>

                {/* --- Results Table --- */}
                <div className="rounded-3xl border border-white/10 bg-slate-900/50 overflow-hidden shadow-2xl backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <th className="px-6 py-4">ID / Code</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Submitted</th>
                                    <th className="px-6 py-4 text-center">Answers</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {results.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-500">
                                                <div className="rounded-full bg-slate-800/50 p-4 mb-3">
                                                    <Search className="h-8 w-8 opacity-50" />
                                                </div>
                                                <p className="text-lg font-medium text-white">{__('anketa.results.empty') ?? 'No results found'}</p>
                                                <p className="text-sm">Try adjusting your filters or search query.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    results.map((row) => (
                                        <tr key={row.id} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 font-mono text-xs text-slate-400 border border-white/5">
                                                        #{row.id}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1.5 font-mono font-medium text-blue-400">
                                                            <Hash className="h-3 w-3" />
                                                            {row.code}
                                                        </div>
                                                        <div className="text-xs text-slate-500 truncate max-w-[150px]" title={row.title}>
                                                            {row.title || 'Untitled Form'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(row.type)}`}>
                                                    {row.type || 'Standard'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Calendar className="h-4 w-4 text-slate-500" />
                                                    {row.submitted_at ? new Date(row.submitted_at).toLocaleDateString() : '—'}
                                                </div>
                                                {row.submitted_at && (
                                                    <div className="text-xs text-slate-500 mt-0.5 pl-6">
                                                        {new Date(row.submitted_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-white border border-white/5">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                                    {row.answers_count}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a
                                                    href={`/admin/anketa/results/${row.id}`}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-blue-500/20 border border-white/5 hover:border-blue-500/50"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    {__('anketa.results.view') ?? 'View'}
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* --- FILTER POPUP (Modal) --- */}
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
                                <Filter className="h-5 w-5 text-blue-400" />
                                Filter Results
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
                                    <input
                                        type="text"
                                        value={localFilters.type ?? ''}
                                        onChange={(e) => setLocalFilters(prev => ({ ...prev, type: e.target.value }))}
                                        placeholder="e.g. psoriasis"
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Code */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Access Code</label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                        <input
                                            type="text"
                                            value={localFilters.code ?? ''}
                                            onChange={(e) => setLocalFilters(prev => ({ ...prev, code: e.target.value }))}
                                            placeholder="Code..."
                                            className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Submission Date Range</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-xs text-slate-500">From</span>
                                        </div>
                                        <input
                                            type="date"
                                            value={localFilters.from ?? ''}
                                            onChange={(e) => setLocalFilters(prev => ({ ...prev, from: e.target.value }))}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
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
                                            className="w-full rounded-xl border border-white/10 bg-black/20 pl-8 pr-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
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
                                        className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 pl-10 pr-10 py-3 text-sm text-white focus:border-blue-500 focus:outline-none cursor-pointer"
                                    >
                                        <option value="desc" className="bg-slate-900">Newest First</option>
                                        <option value="asc" className="bg-slate-900">Oldest First</option>
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
                                    className="flex-1 rounded-xl bg-blue-500 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

(ResultsIndex as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="Form answers">{page}</AdminLayout>
);

export default ResultsIndex;