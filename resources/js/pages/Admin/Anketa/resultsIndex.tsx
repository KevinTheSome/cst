import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

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

    const [localFilters, setLocalFilters] = useState<Filters>({
        type: serverFilters?.type ?? '',
        code: serverFilters?.code ?? '',
        from: serverFilters?.from ?? '',
        to: serverFilters?.to ?? '',
        search: serverFilters?.search ?? '',
        orderBy: serverFilters?.orderBy ?? 'created_at',
        orderDir: serverFilters?.orderDir ?? 'desc',
    });

    const applyFilters = (e: React.FormEvent) => {
        e.preventDefault();

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

        router.get(
            '/admin/anketa/results',
            {},
            {
                preserveState: false,
                replace: true,
            },
        );
    };

    return (
        <>
            <Head title={__('anketa.results.page_title') ?? 'Form answers'} />

            <div className="space-y-6 text-white">
                {/* Header */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/10 px-6 py-5 shadow-inner shadow-black/20">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs tracking-[0.3em] text-white/60 uppercase">
                                {__('anketa.results.label') ?? 'Form submissions'}
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold text-white">
                                {__('anketa.results.heading') ?? 'Answers'}
                            </h1>
                            <p className="mt-1 text-sm text-white/70">
                                {__('anketa.results.subheading') ??
                                    'Browse and filter submitted questionnaire answers.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                    <form
                        onSubmit={applyFilters}
                        className="grid gap-3 md:grid-cols-5 md:items-end"
                    >
                        {/* TYPE */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                Type
                            </label>
                            <input
                                type="text"
                                value={localFilters.type ?? ''}
                                onChange={(e) =>
                                    setLocalFilters((prev) => ({
                                        ...prev,
                                        type: e.target.value,
                                    }))
                                }
                                className="mt-1 w-full rounded-2xl border border-white/15 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                                placeholder="psoriasis / chronic..."
                            />
                        </div>

                        {/* CODE */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                Code
                            </label>
                            <input
                                type="text"
                                value={localFilters.code ?? ''}
                                onChange={(e) =>
                                    setLocalFilters((prev) => ({
                                        ...prev,
                                        code: e.target.value,
                                    }))
                                }
                                className="mt-1 w-full rounded-2xl border border-white/15 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                                placeholder="Access code"
                            />
                        </div>

                        {/* FROM */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                From
                            </label>
                            <input
                                type="date"
                                value={localFilters.from ?? ''}
                                onChange={(e) =>
                                    setLocalFilters((prev) => ({
                                        ...prev,
                                        from: e.target.value,
                                    }))
                                }
                                className="mt-1 w-full rounded-2xl border border-white/15 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                            />
                        </div>

                        {/* TO */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                To
                            </label>
                            <input
                                type="date"
                                value={localFilters.to ?? ''}
                                onChange={(e) =>
                                    setLocalFilters((prev) => ({
                                        ...prev,
                                        to: e.target.value,
                                    }))
                                }
                                className="mt-1 w-full rounded-2xl border border-white/15 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                            />
                        </div>

                        {/* SEARCH + ORDER */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                Search / Order
                            </label>
                            <div className="mt-1 flex flex-col gap-2">
                                <input
                                    type="text"
                                    value={localFilters.search ?? ''}
                                    onChange={(e) =>
                                        setLocalFilters((prev) => ({
                                            ...prev,
                                            search: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                                    placeholder={
                                        __('anketa.results.search_placeholder') ??
                                        'Search by title or code'
                                    }
                                />
                                <select
                                    value={localFilters.orderDir ?? 'desc'}
                                    onChange={(e) =>
                                        setLocalFilters((prev) => ({
                                            ...prev,
                                            orderBy: 'created_at',
                                            orderDir: e.target.value as 'asc' | 'desc',
                                        }))
                                    }
                                    className="rounded-2xl border border-white/15 bg-slate-900/80 px-2 py-1 text-xs text-white outline-none focus:border-sky-400"
                                >
                                    <option value="desc">
                                        {__('anketa.results.sort_newest') ?? 'Newest first'}
                                    </option>
                                    <option value="asc">
                                        {__('anketa.results.sort_oldest') ?? 'Oldest first'}
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="md:col-span-5 flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="rounded-2xl border border-white/20 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-white/80"
                            >
                                {__('anketa.results.reset_filters') ?? 'Reset'}
                            </button>
                            <button
                                type="submit"
                                className="rounded-2xl border border-sky-300/40 bg-sky-500/30 px-4 py-2 text-xs font-semibold text-sky-50 shadow shadow-sky-500/30 hover:bg-sky-500/40"
                            >
                                {__('anketa.results.apply_filters') ?? 'Apply'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-white/80">
                            <thead>
                                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em] text-white/50">
                                    <th className="px-3 py-2">ID</th>
                                    <th className="px-3 py-2">Type</th>
                                    <th className="px-3 py-2">Code</th>
                                    <th className="px-3 py-2">Submitted</th>
                                    <th className="px-3 py-2">Answers</th>
                                    <th className="px-3 py-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-3 py-6 text-center text-xs text-white/60"
                                        >
                                            {__('anketa.results.empty') ?? 'No submissions found.'}
                                        </td>
                                    </tr>
                                )}

                                {results.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="border-b border-white/5 last:border-0"
                                    >
                                        <td className="px-3 py-2 text-xs text-white/60">
                                            #{row.id}
                                        </td>
                                        <td className="px-3 py-2">
                                            {row.type ?? <span className="text-white/40">–</span>}
                                        </td>
                                        <td className="px-3 py-2">{row.code}</td>
                                        <td className="px-3 py-2 text-xs text-white/70">
                                            {row.submitted_at
                                                ? new Date(row.submitted_at).toLocaleString()
                                                : '–'}
                                        </td>
                                        <td className="px-3 py-2 text-xs text-white/70">
                                            {row.answers_count}
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            <a
                                                href={`/admin/anketa/results/${row.id}`}
                                                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
                                            >
                                                {__('anketa.results.view') ?? 'View'}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

(ResultsIndex as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="Form answers">{page}</AdminLayout>
);

export default ResultsIndex;
