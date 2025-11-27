import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router } from '@inertiajs/react';
import type React from 'react';
import { useState } from 'react';

interface Multilingual {
    lv: string;
    en: string;
}

interface Field {
    label: Multilingual;
    options: {
        lv: string[];
        en: string[];
    };
}

interface FormResultType {
    id: number;
    code: string;
    title: Multilingual;
    data: {
        title: Multilingual;
        fields: Field[];
    };
}

interface FormType {
    id: number;
    form_id: number;
    type: string;
}

interface SelectorAnketaProps {
    anketas: FormResultType[];
    formTypes: FormType[];
    locale: keyof Multilingual;
}

export default function SelectorAnketa({ anketas = [], formTypes = [], locale = 'lv' as keyof Multilingual }: SelectorAnketaProps) {
    const { __ } = useLang();

    // Pre-fill selected types from formTypes
    const initialSelections: Record<number, string> = {};
    formTypes.forEach((ft) => {
        initialSelections[ft.form_id] = ft.type;
    });

    const [selectedTypes, setSelectedTypes] = useState<Record<number, string>>(initialSelections);

    const handleTypeChange = (formId: number, type: string) => {
        setSelectedTypes((prev) => ({
            ...prev,
            [formId]: type,
        }));
    };

    const handleSave = (formId: number) => {
        const type = selectedTypes[formId];
        if (!type) {
            alert(__('anketa.selector.error_missing'));
            return;
        }

        router.post(
            '/admin/selector/add',
            {
                form_id: formId,
                type: type,
            },
            {
                onSuccess: () => alert(__('anketa.selector.success')),
                onError: (errors) => {
                    console.error(errors);
                    alert(__('anketa.selector.error'));
                },
            },
        );
    };

    return (
        <>
            <Head title={__('anketa.selector.page_title')} />

            <div className="space-y-6 text-white">
                {/* Header */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/10 px-6 py-5 shadow-inner shadow-black/20">
                    <h1 className="text-2xl font-semibold">{__('anketa.selector.heading')}</h1>
                    <p className="text-sm text-white/70">{__('anketa.selector.subheading')}</p>
                </div>

                {/* Forms List */}
                <div className="grid gap-4 md:grid-cols-2">
                    {anketas.map((form) => (
                        <div key={form.id} className="rounded-xl border border-white/10 bg-slate-950/40 px-4 py-4 shadow-sm shadow-black/20">
                            <h2 className="text-lg font-semibold">{form.data?.title?.[locale] || __('anketa.update.form_title_placeholder')}</h2>
                            <p className="text-xs text-white/60">
                                {__('anketa.selector.code')}: {form.code}
                            </p>

                            {/* Selector Dropdown */}
                            <select
                                value={selectedTypes[form.id] || ''}
                                onChange={(e) => handleTypeChange(form.id, e.target.value)}
                                className="mt-3 w-full rounded-xl border border-white/20 bg-slate-900/40 px-3 py-2 text-white"
                            >
                                <option value="">{__('anketa.selector.select_type')}</option>
                                <option value="specialists">{__('anketa.update.specialist')}</option>
                                <option value="psoriasis">{__('anketa.update.psoriasis')}</option>
                                <option value="chronic">{__('anketa.update.chronic')}</option>
                            </select>

                            {/* Save Button for this form */}
                            <div className="mt-3 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleSave(form.id)}
                                    disabled={!selectedTypes[form.id]}
                                    className={`rounded-xl px-4 py-2 text-white ${
                                        !selectedTypes[form.id] ? 'cursor-not-allowed bg-gray-500' : 'bg-emerald-500 hover:bg-emerald-600'
                                    }`}
                                >
                                    {__('anketa.selector.save')}
                                </button>
                            </div>
                        </div>
                    ))}

                    {anketas.length === 0 && <p className="col-span-full text-center text-white/60">{__('anketa.selector.no_results')}</p>}
                </div>
            </div>
        </>
    );
}

(SelectorAnketa as any).layout = (page: React.ReactNode) => <AdminLayout title="Selector">{page}</AdminLayout>;
