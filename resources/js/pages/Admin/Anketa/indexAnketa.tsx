import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, Link, router, usePage } from '@inertiajs/react';
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
} from 'lucide-react';

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

    useEffect(() => {
        setForms(formData || []);
    }, [formData]);

    const hasActiveFilters =
        !!localFilters.type ||
        !!localFilters.code ||
        !!localFilters.from ||
        !!localFilters.to ||
        localFilters.orderBy !== 'created_at' ||
        localFilters.orderDir !== 'desc';

    const applyFilters = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsFilterModalOpen(false);

        router.get('/admin/anketa', { ...localFilters } as any, {
            preserveState: true,
            replace: true,
        });
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

        return resolve(form.data?.title) || resolve(form.title) || __('anketa.index.misc.untitled');
    };

    return (
        <div className="min-h-screen pb-24 sm:px-6 lg:px-8">
            <Head title={__('anketa.index.page_title')} />

            <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="relative overflow-hidden border-b border-white/10 bg-slate-900 px-4 py-6 sm:rounded-3xl sm:border sm:p-8 sm:shadow-2xl">
                    <div className="relative z-10 flex flex-col gap-4">
                        <div>
                            <div className="mb-1 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-emerald-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                                    {__('anketa.index.label')}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                {__('anketa.index.heading')}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="px-4 sm:px-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="group relative w-full sm:max-w-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-4 w-4 text-slate-500 transition-colors group-focus-within:text-emerald-400" />
                            </div>
                            <input
                                type="text"
                                value={localFilters.search ?? ''}
                                onChange={(e) => setLocalFilters((prev) => ({ ...prev, search: e.target.value }))}
                                placeholder={__('anketa.index.search_placeholder')}
                                className="block w-full rounded-xl border border-white/10 bg-slate-900/50 py-3 pl-10 pr-4 text-base text-white shadow-sm transition-all placeholder-slate-500 focus:bg-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                            />
                        </form>

                        {/* Buttons */}
                        <div className="flex items-center gap-2">
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-xs font-bold text-slate-300 active:bg-slate-700"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    {__('anketa.index.actions.reset')}
                                </button>
                            )}

                            <button
                                onClick={() => setIsFilterModalOpen(true)}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold shadow-lg transition-all active:scale-95 sm:flex-none ${
                                    hasActiveFilters
                                        ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                                        : 'border-white/10 bg-slate-800 text-white'
                                }`}
                            >
                                <Filter className="h-4 w-4" />
                                {__('anketa.index.actions.filters')}
                                {hasActiveFilters && <span className="ml-1 flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Forms List */}
                <div className="px-4 sm:px-0">
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {forms.map((form) => {
                            const title = getFormTitle(form);

                            return (
                                <div
                                    key={form.id}
                                    className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-lg backdrop-blur-sm"
                                >
                                    <div className="flex-1 p-5">
                                        <div className="mb-3 flex items-start justify-between">
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                                                <span>
                                                    {form.created_at
                                                        ? new Date(form.created_at).toLocaleDateString()
                                                        : __('anketa.index.na')}
                                                </span>
                                            </div>
                                            <span className="rounded border border-white/5 bg-black/20 px-2 py-0.5 font-mono text-[10px] text-slate-500">
                                                #{form.id}
                                            </span>
                                        </div>

                                        <h2 className="mb-1 line-clamp-2 text-lg font-bold leading-snug text-white">
                                            {title}
                                        </h2>

                                        <div className="mt-3 flex items-center gap-2">
                                            <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                                                <Hash className="h-3 w-3" />
                                                {form.code}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5 bg-black/20">
                                        <a
                                            href={`/admin/anketa/show/${form.id}`}
                                            className="flex items-center justify-center py-3 text-slate-400 transition-colors hover:text-white active:bg-white/5"
                                            title={__('anketa.index.view')}
                                        >
                                            <Eye className="h-5 w-5" />
                                        </a>

                                        <a
                                            href={`/admin/anketa/edit/${form.id}`}
                                            className="flex items-center justify-center py-3 text-blue-400 transition-colors hover:text-blue-300 active:bg-blue-500/10"
                                            title={__('anketa.index.edit')}
                                        >
                                            <Edit className="h-5 w-5" />
                                        </a>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                const tmpl = __('anketa.index.confirm_delete') || 'Are you sure you want to delete "{title}"?';
                                                const msg = String(tmpl).replace('{title}', title);

                                                if (!window.confirm(msg)) return;

                                                router.post(`/admin/anketa/delete/${form.id}`, {
                                                    preserveScroll: true,
                                                });
                                            }}
                                            className="flex items-center justify-center py-3 text-rose-400 transition-colors hover:text-rose-300 active:bg-rose-500/10"
                                            title={__('anketa.index.delete')}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {forms.length === 0 && (
                        <div className="p-12 text-center text-slate-400 rounded-2xl border border-dashed border-white/10 bg-slate-900/30">
                            <FileText className="mx-auto mb-3 h-12 w-12 opacity-20" />
                            <p>{__('anketa.index.empty')}</p>
                            <button onClick={resetFilters} className="mt-2 text-emerald-400 hover:underline">
                                {__('anketa.index.actions.clear_filters')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Create FAB */}
            <Link
                href="/admin/anketa/create"
                className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-900 shadow-xl shadow-emerald-500/30 transition-transform hover:scale-105 hover:bg-emerald-400 active:scale-90"
                aria-label={__('anketa.index.actions.create_new_aria')}
            >
                <Plus className="h-7 w-7" />
            </Link>

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsFilterModalOpen(false)}
                    />
                    <div className="relative w-full animate-in slide-in-from-bottom duration-300 sm:duration-200 sm:zoom-in-95 sm:max-w-lg rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/10 bg-slate-900 shadow-2xl">
                        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/20 sm:hidden" />

                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                                <Filter className="h-5 w-5 text-emerald-400" />
                                {__('anketa.index.filters.title')}
                            </h3>
                            <button onClick={() => setIsFilterModalOpen(false)} className="p-1 text-slate-400" aria-label={__('anketa.index.actions.close')}>
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={applyFilters} className="space-y-5 p-6 pb-safe">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-2 block text-xs font-bold uppercase text-slate-400">
                                        {__('anketa.index.filters.type')}
                                    </label>
                                    <select
                                        value={localFilters.type ?? ''}
                                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, type: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
                                    >
                                        <option value="" className="bg-slate-900">
                                            {__('anketa.index.filters.any_type')}
                                        </option>
                                        <option value="public" className="bg-slate-900">
                                            {__('anketa.index.filters.public')}
                                        </option>
                                        <option value="private" className="bg-slate-900">
                                            {__('anketa.index.filters.private')}
                                        </option>
                                    </select>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-2 block text-xs font-bold uppercase text-slate-400">
                                        {__('anketa.index.filters.code')}
                                    </label>
                                    <input
                                        type="text"
                                        value={localFilters.code ?? ''}
                                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, code: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase text-slate-400">
                                        {__('anketa.index.filters.from')}
                                    </label>
                                    <input
                                        type="date"
                                        value={localFilters.from ?? ''}
                                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, from: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-slate-900/20 px-3 py-3 text-sm text-white outline-none focus:border-emerald-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase text-slate-400">
                                        {__('anketa.index.filters.to')}
                                    </label>
                                    <input
                                        type="date"
                                        value={localFilters.to ?? ''}
                                        onChange={(e) => setLocalFilters((prev) => ({ ...prev, to: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-slate-900/20 px-3 py-3 text-sm text-white outline-none focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-bold text-white active:bg-white/10"
                                >
                                    {__('anketa.index.actions.clear')}
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-slate-900 shadow-lg active:bg-emerald-600"
                                >
                                    {__('anketa.index.actions.apply')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Layout title without hooks: take translated title from Inertia props
(FormsList as any).layout = (page: any) => {
    const t =
        page?.props?.lang?.anketa?.index?.page_title ||
        page?.props?.lang?.anketa?.index?.heading ||
        'Anketas';

    return <AdminLayout title={t}>{page}</AdminLayout>;
};

export default FormsList;
