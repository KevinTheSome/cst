// resources/js/Pages/Admin/Anketa/updateAnketa.tsx

import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState, type ReactNode } from 'react';

type FieldType = 'radio' | 'checkbox' | 'dropdown';
type Visibility = 'public' | 'private';

interface Field {
    id: string;
    label: { lv: string; en: string };
    type: FieldType;
    options: { lv: string[]; en: string[] };
}

export default function UpdateAnketa({ formResult }: any) {
    const { __ } = useLang();
    const [saving, setSaving] = useState(false);

    // NEW TITLE SHAPE
    const [title, setTitle] = useState<{ lv: string; en: string }>({ lv: '', en: '' });

    const [visibility, setVisibility] = useState<Visibility>('public');

    const [fields, setFields] = useState<Field[]>([]);

    useEffect(() => {
        if (!formResult) return;

        const rawTitle = formResult.results?.title ?? formResult.title;

        // normalize title
        if (typeof rawTitle === 'string') {
            setTitle({ lv: rawTitle, en: rawTitle });
        } else {
            setTitle({
                lv: rawTitle?.lv ?? '',
                en: rawTitle?.en ?? '',
            });
        }

        const initialVis = formResult.code === 'private' ? 'private' : 'public';
        setVisibility(initialVis);

        const incoming = formResult.results?.fields ?? formResult.fields ?? [];

        // normalize fields structure
        const normalized: Field[] = incoming.map((f: any) => ({
            id: f.id,
            label: {
                lv: f.label?.lv ?? '',
                en: f.label?.en ?? '',
            },
            type: f.type,
            options: {
                lv: f.options?.lv ?? [],
                en: f.options?.en ?? [],
            },
        }));

        setFields(normalized);
    }, [formResult]);

    const updateFieldLabel = (id: string, lang: 'lv' | 'en', value: string) => {
        setFields((prev) => prev.map((f) => (f.id === id ? { ...f, label: { ...f.label, [lang]: value } } : f)));
    };

    const updateOption = (id: string, lang: 'lv' | 'en', idx: number, value: string) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== id) return f;
                const updated = [...f.options[lang]];
                updated[idx] = value;
                return { ...f, options: { ...f.options, [lang]: updated } };
            }),
        );
    };

    const addOption = (id: string, lang: 'lv' | 'en') => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== id) return f;
                const count = f.options[lang].length + 1;
                return {
                    ...f,
                    options: {
                        ...f.options,
                        [lang]: [...f.options[lang], lang === 'lv' ? `Opcija ${count}` : `Option ${count}`],
                    },
                };
            }),
        );
    };

    const removeOption = (id: string, lang: 'lv' | 'en', idx: number) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== id) return f;
                const updated = f.options[lang].filter((_, i) => i !== idx);
                return { ...f, options: { ...f.options, [lang]: updated } };
            }),
        );
    };

    const removeField = (id: string) => {
        setFields((prev) => prev.filter((f) => f.id !== id));
    };

    const addField = () => {
        setFields((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                type: 'radio',
                label: { lv: '', en: '' },
                options: { lv: ['Opcija 1'], en: ['Option 1'] },
            },
        ]);
    };

    const handleSave = () => {
        setSaving(true);

        const payload = {
            title,
            visibility,
            schema: {
                title,
                fields,
            },
        };

        router.put(`/admin/anketa/update/${formResult.id}`, payload, {
            onSuccess: () => {
                alert(__('success'));
                setSaving(false);
            },
            onError: () => {
                alert(__('error'));
                setSaving(false);
            },
        });
    };

    console.log(title);

    return (
        <div className="min-h-screen bg-slate-950 py-12 text-white">
            <div className="mx-auto max-w-6xl space-y-8 px-6">
                <div className="rounded-[32px] border border-white/10 bg-slate-900/60 p-8 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs tracking-[0.4em] text-emerald-300 uppercase">Anketu studija</p>
                            <h1 className="mt-2 text-3xl font-semibold">{__('title')}</h1>
                        </div>

                        <Link href="/admin/anketa" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                            ← {__('back')}
                        </Link>
                    </div>
                </div>

                {/* TITLE LV + EN */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <label className="text-sm font-semibold">{__('title')}</label>

                    <div className="mt-3 grid gap-4 md:grid-cols-2">
                        <input
                            className="rounded-2xl border border-white/20 bg-slate-900 p-3"
                            value={title.lv}
                            placeholder="Nosaukums LV"
                            onChange={(e) => setTitle({ ...title, lv: e.target.value })}
                        />
                        <input
                            className="rounded-2xl border border-white/20 bg-slate-900 p-3"
                            value={title.en}
                            placeholder="Title EN"
                            onChange={(e) => setTitle({ ...title, en: e.target.value })}
                        />
                    </div>
                </div>

                {/* QUESTIONS */}
                <button className="w-full rounded-2xl border border-dashed border-emerald-400 bg-emerald-600/10 p-3" onClick={addField}>
                    {__('add question')}
                </button>

                {fields.map((field, i) => (
                    <div key={field.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                        <div className="mb-4 flex justify-between">
                            <p className="text-xs tracking-widest text-white/60 uppercase">
                                {__('label')} #{i + 1}
                            </p>
                            <button onClick={() => removeField(field.id)} className="rounded-full border px-3 py-1 text-xs">
                                {__('remove')}
                            </button>
                        </div>

                        {/* LV + EN label */}
                        <div className="grid gap-3 md:grid-cols-2">
                            <input
                                value={field.label.lv}
                                placeholder="Teksts LV"
                                onChange={(e) => updateFieldLabel(field.id, 'lv', e.target.value)}
                                className="rounded-xl border bg-slate-800 p-3"
                            />

                            <input
                                value={field.label.en}
                                placeholder="Text EN"
                                onChange={(e) => updateFieldLabel(field.id, 'en', e.target.value)}
                                className="rounded-xl border bg-slate-800 p-3"
                            />
                        </div>

                        {/* OPTIONS BLOCK */}
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {(['lv', 'en'] as const).map((lang) => (
                                <div key={lang}>
                                    <p className="text-xs text-white/50 uppercase">{lang === 'lv' ? 'Opcijas (LV)' : 'Options (EN)'}</p>

                                    {field.options[lang].map((opt, idx) => (
                                        <div key={idx} className="my-2 flex gap-2">
                                            <input
                                                value={opt}
                                                className="flex-1 rounded-xl border bg-slate-800 p-3"
                                                onChange={(e) => updateOption(field.id, lang, idx, e.target.value)}
                                            />
                                            <button onClick={() => removeOption(field.id, lang, idx)} className="rounded-xl border px-3">
                                                x
                                            </button>
                                        </div>
                                    ))}

                                    <button onClick={() => addOption(field.id, lang)} className="rounded-xl border px-3 py-1 text-xs">
                                        + add
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button onClick={handleSave} disabled={saving} className="w-full rounded-full bg-emerald-500 py-3 font-semibold text-black">
                    {saving ? 'Saving…' : 'Save'}
                </button>
            </div>
        </div>
    );
}

UpdateAnketa.layout = (page: ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;
