import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
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
    Download,
} from 'lucide-react';

type ResultRow = {
    id: number;
    code: string;
    title: any; // can be string OR { lv: "...", en: "..." }
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
    const { __, lang } = useLang();

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

    const hasActiveFilters =
        !!localFilters.type ||
        !!localFilters.code ||
        !!localFilters.from ||
        !!localFilters.to ||
        localFilters.orderBy !== 'created_at' ||
        localFilters.orderDir !== 'desc' ||
        !!localFilters.search;

    const applyFilters = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsFilterModalOpen(false);

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
            { preserveState: true, replace: true }
        );
    };

    // Download helper — uses server endpoint that returns a .json attachment.
    const downloadResult = (id: number) => {
        // navigate to the download route — server responds with attachment/JSON
        window.location.href = `results/${id}/download`;
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

        router.get('/admin/anketa/results', {}, { preserveState: false, replace: true });
    };

    const resolveTitle = (val: any) => {
        if (!val) return null;
        if (typeof val === 'string') return val;
        return val[lang] || val.lv || val.en || Object.values(val)[0] || null;
    };

    const typeLabel = (t: string | null) => t || __('anketa.results.misc.standard');

    const getTypeColor = (type: string | null) => {
        switch (type) {
            case 'psoriasis':
                return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
            case 'chronic':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'specialists':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default:
                return 'bg-slate-700/30 text-slate-400 border-slate-600/30';
        }
    };

    const totalLabel = __('anketa.results.total_answers');

    const emptyHint = __('anketa.results.empty_hint');
    const dash = __('anketa.results.misc.dash') || '—';

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <Head title={__('anketa.results.page_title')} />

            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="pointer-events-none absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

                    <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-blue-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                                    {__('anketa.results.label')}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                {__('anketa.results.heading')}
                            </h1>

                            <p className="mt-2 max-w-lg text-slate-400">
                                {__('anketa.results.subheading')}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="min-w-[140px] rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                                <p className="text-xs uppercase tracking-wider text-slate-400">
                                    {totalLabel}
                                </p>
                                <p className="mt-1 text-2xl font-bold text-white">{results.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="group relative w-full sm:max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-slate-500 transition-colors group-focus-within:text-blue-400" />
                        </div>
                        <input
                            type="text"
                            value={localFilters.search ?? ''}
                            onChange={(e) => setLocalFilters((prev) => ({ ...prev, search: e.target.value }))}
                            placeholder={__('anketa.results.search_placeholder')}
                            className="block w-full rounded-2xl border border-white/10 bg-slate-900/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 shadow-sm transition-all focus:border-blue-500 focus:bg-slate-900 focus:ring-1 focus:ring-blue-500"
                        />
                    </form>

                    {/* Buttons */}
                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                {__('anketa.results.actions.reset')}
                            </button>
                        )}

                        <button
                            onClick={() => setIsFilterModalOpen(true)}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold transition-all shadow-lg sm:flex-none ${
                                hasActiveFilters
                                    ? 'border-blue-500/50 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 shadow-blue-500/10'
                                    : 'border-white/10 bg-slate-800 text-white hover:bg-slate-700'
                            }`}
                        >
                            <Filter className="h-4 w-4" />
                            {__('anketa.results.actions.filters')}
                            {hasActiveFilters && (
                                <span className="ml-1 flex h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <th className="px-6 py-4">{__('anketa.results.table.id_code')}</th>
                                    <th className="px-6 py-4">{__('anketa.results.table.type')}</th>
                                    <th className="px-6 py-4">{__('anketa.results.table.submitted')}</th>
                                    <th className="px-6 py-4 text-center">{__('anketa.results.table.answers')}</th>
                                    <th className="px-6 py-4 text-right">{__('anketa.results.table.action')}</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-white/5">
                                {results.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-500">
                                                <div className="mb-3 rounded-full bg-slate-800/50 p-4">
                                                    <Search className="h-8 w-8 opacity-50" />
                                                </div>
                                                <p className="text-lg font-medium text-white">
                                                    {__('anketa.results.empty')}
                                                </p>
                                                <p className="text-sm">{emptyHint}</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    results.map((row) => {
                                        const rowTitle =
                                            resolveTitle(row.title) || __('anketa.index.misc.untitled');

                                        return (
                                            <tr key={row.id} className="group transition-colors hover:bg-white/[0.02]">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-slate-800 font-mono text-xs text-slate-400">
                                                            #{row.id}
                                                        </div>

                                                        <div>
                                                            <div className="flex items-center gap-1.5 font-mono font-medium text-blue-400">
                                                                <Hash className="h-3 w-3" />
                                                                {row.code}
                                                            </div>
                                                            <div
                                                                className="max-w-[150px] truncate text-xs text-slate-500"
                                                                title={rowTitle}
                                                            >
                                                                {rowTitle}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getTypeColor(
                                                            row.type
                                                        )}`}
                                                    >
                                                        {typeLabel(row.type)}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-300">
                                                        <Calendar className="h-4 w-4 text-slate-500" />
                                                        {row.submitted_at
                                                            ? new Date(row.submitted_at).toLocaleDateString()
                                                            : dash}
                                                    </div>
                                                    {row.submitted_at && (
                                                        <div className="mt-0.5 pl-6 text-xs text-slate-500">
                                                            {new Date(row.submitted_at).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-slate-800 px-3 py-1.5 text-xs font-bold text-white">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                                        {row.answers_count}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <a
                                                        href={`/admin/anketa/results/${row.id}`}
                                                        className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-slate-800 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:border-blue-500/50 hover:bg-blue-600 hover:shadow-blue-500/20"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                        {__('anketa.results.actions.view')}
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => downloadResult(row.id)}
                                                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                                                    >
                                                        <Download className="h-3.5 w-3.5" />
                                                        {__('anketa.results.actions.download')}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 animate-in fade-in bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsFilterModalOpen(false)}
                    />

                    <div className="relative w-full max-w-lg animate-in zoom-in-95 overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-6 py-5">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                                <Filter className="h-5 w-5 text-blue-400" />
                                {__('anketa.results.actions.filters')}
                            </h3>
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={applyFilters} className="space-y-6 p-6">
                            {/* (filter form unchanged) */}
                            {/* Type + Code */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {__('anketa.results.filters.type')}
                                    </label>
                                    <input
                                        type="text"
                                        value={localFilters.type ?? ''}
                                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, type: e.target.value }))}
                                        placeholder="e.g. psoriasis"
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {__('anketa.results.filters.code')}
                                    </label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                        <input
                                            type="text"
                                            value={localFilters.code ?? ''}
                                            onChange={(e) => setLocalFilters((prev) => ({ ...prev, code: e.target.value }))}
                                            placeholder={__('anketa.results.filters.code_placeholder')}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {__('anketa.results.filters.date_range')}
                                </label>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-xs text-slate-500">{__('anketa.results.filters.from')}</span>
                                        </div>
                                        <input
                                            type="date"
                                            value={localFilters.from ?? ''}
                                            onChange={(e) => setLocalFilters((prev) => ({ ...prev, from: e.target.value }))}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-12 pr-4 text-sm text-white focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-xs text-slate-500">{__('anketa.results.filters.to')}</span>
                                        </div>
                                        <input
                                            type="date"
                                            value={localFilters.to ?? ''}
                                            onChange={(e) => setLocalFilters((prev) => ({ ...prev, to: e.target.value }))}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-8 pr-4 text-sm text-white focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sorting */}
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {__('anketa.results.filters.sort')}
                                </label>

                                <div className="relative">
                                    <ArrowUpDown className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                    <select
                                        value={localFilters.orderDir ?? 'desc'}
                                        onChange={(e) =>
                                            setLocalFilters((prev) => ({
                                                ...prev,
                                                orderBy: 'created_at',
                                                orderDir: e.target.value as 'asc' | 'desc',
                                            }))
                                        }
                                        className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-10 text-sm text-white focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="desc" className="bg-slate-900">
                                            {__('anketa.results.filters.newest')}
                                        </option>
                                        <option value="asc" className="bg-slate-900">
                                            {__('anketa.results.filters.oldest')}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                                >
                                    {__('anketa.results.actions.clear')}
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-blue-500 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-600"
                                >
                                    {__('anketa.results.actions.apply')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// ✅ translated layout title without hooks
(ResultsIndex as any).layout = (page: any) => {
    const t =
        page?.props?.lang?.anketa?.results?.layout_title ||
        page?.props?.lang?.anketa?.results?.page_title ||
        'Form answers';

    return <AdminLayout title={t}>{page}</AdminLayout>;
};

export default ResultsIndex;
