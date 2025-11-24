
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import type React from 'react';

interface FormResultType {
    id: number;
    code: string;
    title: string;
    results: {
        title: string;
        fields: any[];
    };
}

interface SelectorAnketaProps {
    anketas: FormResultType[];
}

export default function SelectorAnketa({ anketas = [] }: SelectorAnketaProps) {
    const { __ } = useLang();
    const [selectors, setSelectors] = useState<Record<string, string>>({}); // { formCode: selectedType }

    const handleTypeChange = (formCode: string, type: string) => {
        setSelectors((prev) => ({
            ...prev,
            [formCode]: type,
        }));
    };

    const handleSave = () => {
        if (Object.keys(selectors).length === 0) {
            alert(__('anketa.selector.error_no_selection'));
            return;
        }

        router.post('/selector/add', {
            selections: selectors, // { code: type }
        }, {
            onSuccess: () => alert(__('anketa.selector.success')),
            onError: (errors) => {
                console.error(errors);
                alert(__('anketa.selector.error'));
            },
        });
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
                        <div
                            key={form.id}
                            className="rounded-xl border border-white/10 bg-slate-950/40 px-4 py-4 shadow-sm shadow-black/20"
                        >
                            <h2 className="text-lg font-semibold">
                                {form.title || form.results?.title || __('anketa.update.form_title_placeholder')}
                            </h2>
                            <p className="text-xs text-white/60">
                                {__('anketa.selector.code')}: {form.code}
                            </p>

                            {/* Selector Dropdown */}
                            <select
                                value={selectors[form.code] || ''}
                                onChange={(e) => handleTypeChange(form.code, e.target.value)}
                                className="mt-3 w-full rounded-xl border border-white/20 bg-slate-900/40 px-3 py-2 text-white"
                            >
                                <option value=""></option>
                                <option value="type_a"></option>
                                <option value="type_b"></option>
                                <option value="type_c"></option>
                            </select>
                        </div>
                    ))}

                    {anketas.length === 0 && (
                        <p className="col-span-full text-center text-white/60">
                            {__('anketa.selector.no_results')}
                        </p>
                    )}
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-xl bg-emerald-500 px-6 py-3 text-white hover:bg-emerald-600"
                    >
                        {__('anketa.selector.save')}
                    </button>
                </div>
            </div>
        </>
    );
}

(SelectorAnketa as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="Selector">{page}</AdminLayout>
);
