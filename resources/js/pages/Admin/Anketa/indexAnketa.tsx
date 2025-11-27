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
    data: {
        title: any;
        fields: any[];
    };
}

interface FormsListProps {
    formData: FormResultType[];
}

/**
 * Inline language switcher (LV / EN) using /locale route
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
}

function FormsList({ formData }: FormsListProps) {
    const [forms, setForms] = useState<FormResultType[]>([]);
    const { __, lang } = useLang();

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

    console.log(forms);
    return (
        <>
            <Head title={__('anketa.index.page_title')} />

            <div className="space-y-6 text-white">
                {/* Header */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/10 px-6 py-5 shadow-inner shadow-black/20">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs tracking-[0.3em] text-white/60 uppercase">{__('anketa.index.label')}</p>
                            <h1 className="mt-1 text-2xl font-semibold text-white">{__('anketa.index.heading')}</h1>
                            <p className="mt-1 text-sm text-white/70">{__('anketa.index.subheading')}</p>
                        </div>

                        <a
                            href="/admin/anketa/create"
                            className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-50 shadow-sm shadow-emerald-500/20 hover:bg-emerald-400/25"
                        >
                            {__('anketa.index.create_button')}
                        </a>
                    </div>
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

                                    <h2 className="mt-1 text-lg font-semibold text-white">{form.data?.title?.lv}</h2>

                                    <p className="text-xs text-white/60">
                                        {__('anketa.index.code_label')}: {form.code}
                                    </p>
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

                        {forms.length === 0 && <p className="col-span-full py-8 text-center text-xs text-white/60">{__('anketa.index.empty')}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

(FormsList as any).layout = (page: React.ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;

export default FormsList;
