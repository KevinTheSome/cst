// resources/js/Pages/Admin/Anketa/indexAnketa.tsx

import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import type React from 'react';
import { useEffect, useState } from 'react';

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

/**
 * Inline language switcher (LV / EN) using /locale route
 * (šobrīd netiek lietots, atstāju kā bija)
 */
function LanguageSwitcher() {
    const { props } = usePage();
    const currentLocale = (props as any).locale || 'lv';

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;

        try {
            await axios.post('/locale', { locale });
            router.reload({ only: ['lang', 'locale'] });
        } catch (error) {
            console.error('Language switch failed:', error);
            alert('Failed to switch language. Please try again.');
        }
    };

    return null;
}

function FormsList() {
    const { formData, filters: serverFilters } = usePage<PageProps>().props;
    const [forms, setForms] = useState<FormResultType[]>([]);
    const { __, lang } = useLang();

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

    const handleDeleteClick = (form: FormResultType) => {
        const displayTitle = form.data?.title?.[lang] || form.title?.[lang] || '';

        if (!confirm(__('anketa.index.confirm_delete', { title: displayTitle }))) {
            return;
        }

        router.delete(`/admin/anketa/destroy/${form.id}`, {
            onSuccess: () => {
                setForms((prev) => prev.filter((f) => f.id !== form.id));
                alert(__('anketa.index.deleted_success'));
            },
            onError: (errors) => {
                console.error('Delete error:', errors);
                alert(__('anketa.index.deleted_error'));
            },
        });
    };

    const applyFilters = (e: React.FormEvent) => {
        e.preventDefault();

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
            '/admin/anketa',
            {},
            {
                preserveState: false,
                replace: true,
            },
        );
    };

    return (
        <>
            <Head title={__('anketa.index.page_title')} />

            <div className="space-y-6 text-white">
                {/* Header */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/10 px-6 py-5 shadow-inner shadow-black/20">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs tracking-[0.3em] text-white/60 uppercase">
                                {__('anketa.index.label')}
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold text-white">
                                {__('anketa.index.heading')}
                            </h1>
                            <p className="mt-1 text-sm text-white/70">
                                {__('anketa.index.subheading')}
                            </p>
                        </div>

                        <a
                            href="/admin/anketa/create"
                            className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-50 shadow-sm shadow-emerald-500/20 hover:bg-emerald-400/25"
                        >
                            {__('anketa.index.create_button')}
                        </a>
                    </div>
                </div>

                {/* FILTER / SEARCH BAR */}
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
                            <select
                                value={localFilters.type ?? ''}
                                onChange={(e) =>
                                    setLocalFilters((prev) => ({
                                        ...prev,
                                        type: e.target.value,
                                    }))
                                }
                                className="mt-1 w-full rounded-2xl border border-white/15 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                            >
                                <option value="">{__('anketa.index.filter_any') ?? 'Any'}</option>
                                {/* Ja tev ir citi type varianti – pieliec te */}
                                <option value="public">public</option>
                                <option value="private">private</option>
                            </select>
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
                                placeholder="ABC123"
                            />
                        </div>

                        {/* DATE FROM */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                From (date)
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

                        {/* DATE TO */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                To (date)
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

                        {/* SEARCH + SORT */}
                        <div className="md:col-span-1">
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
                                    placeholder={__('anketa.index.search_placeholder') ?? 'Search title or code'}
                                />
                                <div className="flex gap-2">
                                    <select
                                        value={localFilters.orderDir ?? 'desc'}
                                        onChange={(e) =>
                                            setLocalFilters((prev) => ({
                                                ...prev,
                                                orderBy: 'created_at',
                                                orderDir: e.target.value as 'asc' | 'desc',
                                            }))
                                        }
                                        className="flex-1 rounded-2xl border border-white/15 bg-slate-900/80 px-2 py-1 text-xs text-white outline-none focus:border-sky-400"
                                    >
                                        <option value="desc">
                                            {__('anketa.index.sort_newest') ?? 'Newest first'}
                                        </option>
                                        <option value="asc">
                                            {__('anketa.index.sort_oldest') ?? 'Oldest first'}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="md:col-span-5 flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="rounded-2xl border border-white/20 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-white/80"
                            >
                                {__('anketa.index.reset_filters') ?? 'Reset'}
                            </button>
                            <button
                                type="submit"
                                className="rounded-2xl border border-sky-300/40 bg-sky-500/30 px-4 py-2 text-xs font-semibold text-sky-50 shadow shadow-sky-500/30 hover:bg-sky-500/40"
                            >
                                {__('anketa.index.apply_filters') ?? 'Apply'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {forms.map((form) => (
                            <div
                                key={form.id}
                                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 shadow-sm shadow-black/20"
                            >
                                <div>
                                    <p className="text-xs text-white/40">
                                        {__('anketa.index.id_label')}: {form.id}
                                    </p>

                                    <h2 className="mt-1 text-lg font-semibold text-white">
                                        {form.data?.title?.[lang] ??
                                            form.data?.title?.lv ??
                                            form.data?.title ??
                                            ''}
                                    </h2>

                                    <p className="text-xs text-white/60">
                                        {__('anketa.index.code_label')}: {form.code}
                                    </p>

                                    {form.created_at && (
                                        <p className="text-xs text-white/50">
                                            {__('anketa.index.created_at') ?? 'Created'}:{' '}
                                            {new Date(form.created_at).toLocaleString()}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                    <a
                                        href={`/admin/anketa/show/${form.id}`}
                                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 hover:bg-white/10"
                                    >
                                        {__('anketa.index.view')}
                                    </a>
                                    <a
                                        href={`/admin/anketa/edit/${form.id}`}
                                        className="rounded-full border border-sky-300/40 bg-sky-400/15 px-3 py-1 text-sky-50 hover:bg-sky-400/25"
                                    >
                                        {__('anketa.index.edit')}
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteClick(form)}
                                        className="rounded-full border border-rose-300/40 bg-rose-500/15 px-3 py-1 text-rose-50 hover:bg-rose-500/25"
                                    >
                                        {__('anketa.index.delete')}
                                    </button>
                                </div>
                            </div>
                        ))}

                        {forms.length === 0 && (
                            <p className="col-span-full py-8 text-center text-xs text-white/60">
                                {__('anketa.index.empty')}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

(FormsList as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="Anketas">{page}</AdminLayout>
);

export default FormsList;
