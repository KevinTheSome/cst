// resources/js/Pages/Admin/Anketa/updateAnketa.tsx

import { useLang } from '@/hooks/useLang';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type FieldType = 'radio' | 'checkbox' | 'dropdown';
type Visibility = 'public' | 'private';

interface Field {
    id: string;
    label: { lv: string; en: string };
    type: FieldType;
    options: { lv: string[]; en: string[] };
}

// ...keep your imports
export default function UpdateAnketa({ formData }: any) {
    const { __ } = useLang();
    const [saving, setSaving] = useState(false);

    // NEW TITLE SHAPE
    const [title, setTitle] = useState<{ lv: string; en: string }>({ lv: '', en: '' });

    const [visibility, setVisibility] = useState<Visibility>('public');
    const [fields, setFields] = useState<Field[]>([]);

    // UUID fallback
    const getUUID = () => {
        try {
            if (typeof crypto !== 'undefined' && (crypto as any).randomUUID) return (crypto as any).randomUUID();
        } catch {}
        return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    };

    useEffect(() => {
        if (!formData) return;

        const rawTitle = formData.title ?? formData.data?.title;

        // normalize title
        if (typeof rawTitle === 'string') {
            setTitle({ lv: rawTitle, en: rawTitle });
        } else {
            setTitle({
                lv: rawTitle?.lv ?? '',
                en: rawTitle?.en ?? '',
            });
        }

        const initialVis = formData.code === 'private' ? 'private' : 'public';
        setVisibility(initialVis);

        const incomingCandidate = formData.data?.fields ?? formData.fields ?? [];
        const incoming = Array.isArray(incomingCandidate) ? incomingCandidate : [];

        // normalize fields structure
        const normalized: Field[] = incoming.map((f: any) => ({
            id: f.id ?? getUUID(),
            label: {
                lv: f.label?.lv ?? '',
                en: f.label?.en ?? '',
            },
            type: (f.type as FieldType) ?? 'radio',
            options: {
                lv: Array.isArray(f.options?.lv) ? f.options.lv : [],
                en: Array.isArray(f.options?.en) ? f.options.en : [],
            },
        }));

        setFields(normalized);
    }, [formData]);

    const updateFieldType = (id: string, type: FieldType) => {
        setFields((prev) => prev.map((f) => (f.id === id ? { ...f, type } : f)));
    };

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

    const addOption = (id: string) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== id) return f;
                const count = Math.max(f.options.lv.length, f.options.en.length) + 1;
                return {
                    ...f,
                    options: {
                        lv: [...f.options.lv, `Opcija ${count}`],
                        en: [...f.options.en, `Option ${count}`],
                    },
                };
            }),
        );
    };

    const removeOption = (id: string, idx: number) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== id) return f;
                return {
                    ...f,
                    options: {
                        lv: f.options.lv.filter((_, i) => i !== idx),
                        en: f.options.en.filter((_, i) => i !== idx),
                    },
                };
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
                id: getUUID(),
                type: 'radio',
                label: { lv: '', en: '' },
                options: { lv: ['Opcija 1'], en: ['Option 1'] },
            },
        ]);
    };

    const handleSave = () => {
        if (!formData?.id) {
            alert(__('error'));
            return;
        }

        setSaving(true);

        const payload = {
            title,
            visibility,
            schema: {
                fields: fields.map((f) => ({
                    id: f.id,
                    label: f.label,
                    type: f.type,
                    options: f.options,
                })),
            },
        };

        router.put(`/admin/anketa/update/${formData.id}`, payload, {
            onSuccess: () => {
                alert(__('success'));
            },
            onError: () => {
                alert(__('error'));
            },
            onFinish: () => {
                setSaving(false);
            },
        });
    };

    // ...

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

                {/* CODE */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <label className="text-sm font-semibold">Code</label>

                    <div className="mt-3">
                        <select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value as Visibility)}
                            className="w-full rounded-2xl border border-white/20 bg-slate-900 p-3 text-white"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </div>

                {/* QUESTIONS */}
                <button type="button" className="w-full rounded-2xl border border-dashed border-emerald-400 bg-emerald-600/10 p-3" onClick={addField}>
                    {__('add question')}
                </button>

                {fields.map((field, i) => (
                    <div key={field.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-xs tracking-widest text-white/60 uppercase">
                                {__('label')} #{i + 1}
                            </p>
                            <div className="flex items-center gap-2">
                                <select
                                    value={field.type}
                                    onChange={(e) => updateFieldType(field.id, e.target.value as FieldType)}
                                    className="rounded-full border border-white/20 bg-slate-800 px-3 py-1 text-xs text-white"
                                >
                                    <option value="radio">Radio</option>
                                    <option value="checkbox">Checkbox</option>
                                    <option value="dropdown">Dropdown</option>
                                </select>
                                <button type="button" onClick={() => removeField(field.id)} className="rounded-full border px-3 py-1 text-xs">
                                    {__('remove')}
                                </button>
                            </div>
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
                        <div className="mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                {(['lv', 'en'] as const).map((lang) => (
                                    <div key={lang}>
                                        <p className="text-xs text-white/50 uppercase">{lang === 'lv' ? 'Opcijas (LV)' : 'Options (EN)'}</p>

                                        {field.options[lang].map((opt, idx) => (
                                            <div key={`${field.id}-${lang}-${idx}`} className="my-2 flex gap-2">
                                                <input
                                                    value={opt}
                                                    className="flex-1 rounded-xl border bg-slate-800 p-3"
                                                    onChange={(e) => updateOption(field.id, lang, idx, e.target.value)}
                                                />
                                                {lang === 'en' && field.options[lang].length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeOption(field.id, idx)}
                                                        className="rounded-xl border px-3"
                                                    >
                                                        x
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 flex justify-center">
                                <button type="button" onClick={() => addOption(field.id)} className="rounded-xl border px-4 py-2 text-xs">
                                    + Add Option
                                </button>
                            </div>
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
