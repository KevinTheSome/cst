import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useState, type ReactNode } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

type FieldType = 'radio' | 'checkbox' | 'dropdown';
type Visibility = 'public' | 'private';
type Lang = 'lv' | 'en';

interface Field {
    id: string;
    label: {
        lv: string;
        en: string;
    };
    type: FieldType;
    options: {
        lv: string[];
        en: string[];
    };
}

export default function CreateAnketa() {
    const [title, setTitle] = useState<{ lv: string; en: string }>({ lv: '', en: '' });
    const [visibility, setVisibility] = useState<Visibility>('public');
    const [fields, setFields] = useState<Field[]>([]);

    const addField = () => {
        const newField: Field = {
            id: crypto.randomUUID(),
            label: { lv: '', en: '' },
            type: 'radio',
            options: {
                lv: ['Opcija 1'],
                en: ['Option 1'],
            },
        };

        setFields((prev) => [...prev, newField]);
    };

    const updateField = (id: string, key: keyof Field, value: any) => {
        setFields((prev) => prev.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
    };

    const removeField = (id: string) => {
        setFields((prev) => prev.filter((field) => field.id !== id));
    };

    const updateLabel = (fieldId: string, lang: Lang, value: string) => {
        setFields((prev) =>
            prev.map((field) => {
                if (field.id !== fieldId) return field;
                return { ...field, label: { ...field.label, [lang]: value } };
            }),
        );
    };

    const updateOption = (fieldId: string, lang: Lang, index: number, value: string) => {
        setFields((prev) =>
            prev.map((field) => {
                if (field.id !== fieldId) return field;

                const nextLv = [...field.options.lv];
                const nextEn = [...field.options.en];

                if (lang === 'lv') nextLv[index] = value;
                else nextEn[index] = value;

                return { ...field, options: { lv: nextLv, en: nextEn } };
            }),
        );
    };

    const addOption = (fieldId: string) => {
        setFields((prev) =>
            prev.map((field) => {
                if (field.id !== fieldId) return field;

                const nextIndex = field.options.lv.length + 1;

                return {
                    ...field,
                    options: {
                        lv: [...field.options.lv, `Opcija ${nextIndex}`],
                        en: [...field.options.en, `Option ${nextIndex}`],
                    },
                };
            }),
        );
    };

    const removeOption = (fieldId: string, index: number) => {
        setFields((prev) =>
            prev.map((field) => {
                if (field.id !== fieldId) return field;

                const nextLv = field.options.lv.filter((_, i) => i !== index);
                const nextEn = field.options.en.filter((_, i) => i !== index);

                // Ensure at least one option remains
                if (nextLv.length === 0 || nextEn.length === 0) {
                    return {
                        ...field,
                        options: { lv: ['Opcija 1'], en: ['Option 1'] },
                    };
                }

                return { ...field, options: { lv: nextLv, en: nextEn } };
            }),
        );
    };

    const submitForm = async () => {
        // Keep backend compatibility: title at top-level AND inside schema (harmless if ignored)
        const payload = {
            title,
            visibility,
            schema: {
                title,
                fields,
            },
        };

        console.log('Submitting payload:', payload);

        let res: { ok: boolean; status: number; data?: any };
        try {
            const response = await axios.post('/admin/anketa/store', payload, {
                headers: { 'Content-Type': 'application/json' },
            });
            res = { ok: response.status >= 200 && response.status < 300, status: response.status, data: response.data };
        } catch (err: any) {
            console.error(err);
            res = { ok: false, status: err?.response?.status ?? 0, data: err?.response?.data ?? null };
        }

        if (res.ok) {
            alert('Form created!');
        } else {
            alert('Error creating form.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900 py-12 text-white">
            <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
                <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/30 p-8 shadow-2xl shadow-black/40">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Anketu studija</p>
                            <h1 className="mt-2 text-3xl font-semibold text-white">Izveidot jaunu anketu</h1>
                            <p className="mt-3 max-w-2xl text-sm text-white/70">
                                Nosakiet virsrakstu (LV/EN), pamaniet redzamību un pievienojiet jautājumus ar dažādiem inputiem. Saglabājiet koplietošanai ar komandu.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href="/admin/anketa"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/20"
                            >
                                ← Atpakaļ
                            </Link>
                            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/70 shadow-inner shadow-black/30">
                                {fields.length} jautājumi
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                    {/* LEFT: Builder */}
                    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
                        {/* MULTILINGUAL TITLE */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80">Anketas nosaukums (LV)</label>
                                <input
                                    type="text"
                                    placeholder="Piem., Pacientu simptomi 2024"
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                    value={title.lv}
                                    onChange={(e) => setTitle((t) => ({ ...t, lv: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80">Form title (EN)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Patient Symptoms 2024"
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                    value={title.en}
                                    onChange={(e) => setTitle((t) => ({ ...t, en: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* VISIBILITY */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-white/80">Redzamība</label>
                            <select
                                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value as Visibility)}
                            >
                                <option value="public" className="text-black">
                                    Publiska — ikviens ar saiti var atbildēt
                                </option>
                                <option value="private" className="text-black">
                                    Privāta — tikai ar kodu vai uzaicinājumu
                                </option>
                            </select>
                        </div>

                        {/* ADD FIELD */}
                       

                        {/* FIELDS */}
                        <div className="space-y-4">
                            {fields.length === 0 && (
                                <p className="text-sm text-white/60">Pagaidām nav jautājumu. Pievienojiet vismaz vienu, lai sāktu.</p>
                            )}

                            {fields.map((field, idx) => (
                                <div key={field.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 shadow-inner shadow-black/20">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Jautājums {idx + 1}</p>
                                            <p className="text-sm text-white/70">
                                                {field.type === 'radio'
                                                    ? 'Vienas atbildes izvēle'
                                                    : field.type === 'checkbox'
                                                    ? 'Vairākas atbildes'
                                                    : 'Izvēlne'}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeField(field.id)}
                                            className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/70 transition hover:border-rose-300/40 hover:bg-rose-500/10 hover:text-white"
                                        >
                                            Dzēst
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* LABEL LV/EN */}
                                        <div className="grid gap-3 md:grid-cols-2">
                                            <input
                                                type="text"
                                                placeholder="Jautājuma teksts (LV)"
                                                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                                value={field.label.lv}
                                                onChange={(e) => updateLabel(field.id, 'lv', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Question text (EN)"
                                                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                                value={field.label.en}
                                                onChange={(e) => updateLabel(field.id, 'en', e.target.value)}
                                            />
                                        </div>

                                        {/* TYPE */}
                                        <select
                                            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                            value={field.type}
                                            onChange={(e) => updateField(field.id, 'type', e.target.value as FieldType)}
                                        >
                                            <option value="radio" className="text-black">
                                                Multiple Choice (Radio)
                                            </option>
                                            <option value="checkbox" className="text-black">
                                                Select Multiple (Checkbox)
                                            </option>
                                            <option value="dropdown" className="text-black">
                                                Dropdown
                                            </option>
                                        </select>

                                        {/* OPTIONS LV/EN */}
                                        <div className="space-y-2">
                                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Opcijas (LV / EN)</p>

                                            {field.options.lv.map((_, optionIndex) => (
                                                <div key={optionIndex} className="grid gap-2 md:grid-cols-[1fr,1fr,auto]">
                                                    <input
                                                        type="text"
                                                        className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                                        placeholder="Opcija (LV)"
                                                        value={field.options.lv[optionIndex]}
                                                        onChange={(e) => updateOption(field.id, 'lv', optionIndex, e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                                        placeholder="Option (EN)"
                                                        value={field.options.en[optionIndex]}
                                                        onChange={(e) => updateOption(field.id, 'en', optionIndex, e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeOption(field.id, optionIndex)}
                                                        className="rounded-2xl border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:border-rose-300/40 hover:bg-rose-500/10"
                                                    >
                                                        Noņemt
                                                    </button>
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => addOption(field.id)}
                                                className="mt-2 inline-flex items-center rounded-full border border-dashed border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/40"
                                            >
                                                + Pievienot opciju (LV/EN)
                                            </button>
                                        </div> 
                        
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addField}
                            className="inline-flex w-full items-center justify-center rounded-2xl border border-dashed border-emerald-400/60 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:border-emerald-500 hover:bg-emerald-500/20"
                        >
                            + Pievienot jautājumu
                        </button>
                    </div>
                
               
                    <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/30">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Rezumējums</p>

                        <div className="space-y-4 text-sm text-white/70">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs text-white/60">Nosaukums (LV)</p>
                                <p className="text-lg font-semibold text-white">{title.lv || '—'}</p>
                                <p className="mt-2 text-xs text-white/60">Title (EN)</p>
                                <p className="text-lg font-semibold text-white">{title.en || '—'}</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs text-white/60">Redzamība</p>
                                <p className="text-lg font-semibold text-white">{visibility === 'public' ? 'Publiska' : 'Privāta'}</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs text-white/60">Jautājumu skaits</p>
                                <p className="text-lg font-semibold text-white">{fields.length}</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={submitForm}
                            className="mt-4 w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                        >
                            Saglabāt anketu
                        </button>

                        <p className="text-xs text-white/60">
                            Saglabāšana izveidos jaunu struktūru ar piesaistītajiem jautājumiem. Vēlāk to varēsiet rediģēt sadaļā “Visas anketas”.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

CreateAnketa.layout = (page: ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;