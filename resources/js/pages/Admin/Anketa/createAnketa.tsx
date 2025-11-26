import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
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

type FieldErrors = {
    labelLv?: string;
    labelEn?: string;
    type?: string;
    optionsLv?: string;
    optionsEn?: string;
};

type ValidationErrors = {
    titleLv?: string;
    titleEn?: string;
    visibility?: string;
    fields?: string;
    fieldErrors: Record<string, FieldErrors>;
};

export default function CreateAnketa() {
    const [title, setTitle] = useState<{ lv: string; en: string }>({ lv: '', en: '' });
    const [visibility, setVisibility] = useState<Visibility>('public');
    const [fields, setFields] = useState<Field[]>([]);
    const [errors, setErrors] = useState<ValidationErrors>({ fieldErrors: {} });
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const allowedTypes: FieldType[] = ['radio', 'checkbox', 'dropdown'];

    
    const trimStr = (s?: string) => (s ?? '').trim();
    const findDuplicates = (arr: string[]) => {
        const counts: Record<string, number> = {};
        arr.forEach((a) => {
            counts[a] = (counts[a] || 0) + 1;
        });
        return Object.keys(counts).filter((k) => counts[k] > 1);
    };


    const addField = () => {
        const newField: Field = {
            id: crypto.randomUUID(),
            label: { lv: '', en: '' },
            type: 'radio',
            options: { lv: ['Opcija 1'], en: ['Option 1'] },
        };
        setFields((prev) => [...prev, newField]);
    };

    const removeField = (id: string) => {
        setFields((prev) => prev.filter((f) => f.id !== id));
        setErrors((prev) => {
            const next = { ...prev, fieldErrors: { ...prev.fieldErrors } };
            delete next.fieldErrors[id];
            return next;
        });
    };

    const updateFieldValue = <K extends keyof Field>(id: string, key: K, value: Field[K]) => {
        setFields((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
    };

    const updateLabel = (fieldId: string, lang: Lang, value: string) => {
        setFields((prev) => prev.map((f) => (f.id === fieldId ? { ...f, label: { ...f.label, [lang]: value } } : f)));
        setErrors((prev) => {
            const fe = { ...prev.fieldErrors };
            if (fe[fieldId]) {
                delete fe[fieldId].labelLv;
                delete fe[fieldId].labelEn;
            }
            return { ...prev, fieldErrors: fe };
        });
    };

    const updateOption = (fieldId: string, lang: Lang, index: number, value: string) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== fieldId) return f;
                const arr = [...(lang === 'lv' ? f.options.lv : f.options.en)];
                arr[index] = value;
                return { ...f, options: { ...f.options, [lang]: arr } };
            }),
        );
        setErrors((prev) => {
            const fe = { ...prev.fieldErrors };
            if (fe[fieldId]) {
                delete fe[fieldId].optionsLv;
                delete fe[fieldId].optionsEn;
            }
            return { ...prev, fieldErrors: fe };
        });
    };

    const addOption = (fieldId: string) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== fieldId) return f;
                const nextIndex = f.options.lv.length + 1;
                return { ...f, options: { lv: [...f.options.lv, `Opcija ${nextIndex}`], en: [...f.options.en, `Option ${nextIndex}`] } };
            }),
        );
    };

    const removeOption = (fieldId: string, index: number) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== fieldId) return f;
                const nv = { lv: f.options.lv.filter((_, i) => i !== index), en: f.options.en.filter((_, i) => i !== index) };
                return { ...f, options: { lv: nv.lv.length ? nv.lv : ['Opcija 1'], en: nv.en.length ? nv.en : ['Option 1'] } };
            }),
        );
    };

    const validateField = (f: Field): FieldErrors => {
        const fe: FieldErrors = {};
        const labelLv = trimStr(f.label.lv);
        const labelEn = trimStr(f.label.en);

        if (!labelLv) fe.labelLv = 'Jautājuma teksts (LV) ir obligāts.';
      
        if (!allowedTypes.includes(f.type)) fe.type = 'Nederīgs lauka tips.';

        const optsLv = (f.options.lv || []).map((o) => (o ?? '').trim()).filter(Boolean);
        const optsEn = (f.options.en || []).map((o) => (o ?? '').trim()).filter(Boolean);

        if (optsLv.length === 0) fe.optionsLv = 'Jābūt vismaz vienai opcijai (LV).';
        else {
            const duplicates = findDuplicates(optsLv);
            if (duplicates.length) fe.optionsLv = `Duplikātas opcijas LV: ${duplicates.join(', ')}.`;
        }

        if (optsEn.length === 0) fe.optionsEn = 'Jābūt vismaz vienai opcijai (EN).';
        else {
            const duplicates = findDuplicates(optsEn);
            if (duplicates.length) fe.optionsEn = `Duplicate options EN: ${duplicates.join(', ')}.`;
        }

        return fe;
    };

    const validateAll = (): ValidationErrors => {
        const ve: ValidationErrors = { fieldErrors: {} };
        const titleLv = trimStr(title.lv);
        const titleEn = trimStr(title.en);

        if (!titleLv) ve.titleLv = 'Nosaukums (LV) ir obligāts.';
        if (titleLv.length > 255) ve.titleLv = 'Nosaukumam (LV) ir pārāk garš (maks. 255).';
        if (titleEn.length > 255) ve.titleEn = 'Title (EN) ir pārāk garš (maks. 255).';

        if (!['public', 'private'].includes(visibility)) ve.visibility = 'Nederīga redzamība.';

        if (!Array.isArray(fields) || fields.length === 0) ve.fields = 'Pievienojiet vismaz vienu jautājumu.';

        for (const f of fields) {
            const fe = validateField(f);
            if (Object.keys(fe).length > 0) ve.fieldErrors[f.id] = fe;
        }

        return ve;
    };


    useEffect(() => {
        const next = validateAll();
        setErrors(next);
       
    }, [title, visibility, fields]);

    const hasErrors = useMemo(() => {
        const e = errors;
        if (!e) return false;
        if (e.titleLv || e.titleEn || e.visibility || e.fields) return true;
        if (e.fieldErrors && Object.keys(e.fieldErrors).length > 0) return true;
        return false;
    }, [errors]);

   
    const submitForm = async () => {
        setAttemptedSubmit(true);
        const next = validateAll();
        setErrors(next);

        if (Object.keys(next.fieldErrors).length > 0 || next.titleLv || next.fields || next.visibility) {
           
            const firstFail = fields.find((f) => next.fieldErrors[f.id]);
            if (firstFail) {
                const el = document.querySelector(`[data-field-id="${firstFail.id}"]`);
                if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const payload = {
            title,
            visibility,
            schema: {
                title,
                fields: fields.map((f) => ({
                    id: f.id,
                    type: f.type,
                    label: { lv: f.label.lv.trim(), en: f.label.en.trim() },
                    options: { lv: f.options.lv.map((o) => o.trim()).filter(Boolean), en: f.options.en.map((o) => o.trim()).filter(Boolean) },
                })),
            },
        };

        try {
            const response = await axios.post('/admin/anketa/store', payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status >= 200 && response.status < 300) {
                alert('Anketa izveidota!');
                window.location.href = '/admin/anketa';
            } else {
                alert('Serveris atbildēja ar kļūdu.');
            }
        } catch (err: any) {
            const serverMsg = err?.response?.data?.message ?? err?.message ?? 'Nezināma kļūda.';
            alert(`Neizdevās saglabāt: ${serverMsg}`);
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
                        {/* MULTILINGUAL TITLE WITH ERRORS (shows immediately if missing) */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80">Anketas nosaukums (LV)</label>
                                <input
                                    type="text"
                                    placeholder="Piem., Pacientu simptomi 2024"
                                    className={`w-full rounded-2xl border px-4 py-3 text-white outline-none transition ${
                                        errors.titleLv ? 'border-rose-400 bg-rose-50/5' : 'border-white/10 bg-slate-950/40'
                                    } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200`}
                                    value={title.lv}
                                    onChange={(e) => {
                                        setTitle((t) => ({ ...t, lv: e.target.value }));
                                        setErrors((prev) => ({ ...prev, titleLv: '' }));
                                    }}
                                />
                                {/* show title LV error immediately whenever it exists */}
                                {errors.titleLv && <p className="mt-1 text-xs text-rose-300">{errors.titleLv}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80">Form title (EN)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Patient Symptoms 2024"
                                    className={`w-full rounded-2xl border px-4 py-3 text-white outline-none transition ${
                                        errors.titleEn && (attemptedSubmit || title.en) ? 'border-rose-400 bg-rose-50/5' : 'border-white/10 bg-slate-950/40'
                                    } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200`}
                                    value={title.en}
                                    onChange={(e) => {
                                        setTitle((t) => ({ ...t, en: e.target.value }));
                                        setErrors((prev) => ({ ...prev, titleEn: '' }));
                                    }}
                                />
                                {errors.titleEn && (attemptedSubmit || title.en) && <p className="mt-1 text-xs text-rose-300">{errors.titleEn}</p>}
                            </div>
                        </div>

                        {/* VISIBILITY */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-white/80">Redzamība</label>
                            <select
                                className={`w-full rounded-2xl border px-4 py-3 text-white outline-none transition ${
                                    errors.visibility && attemptedSubmit ? 'border-rose-400 bg-rose-50/5' : 'border-white/10 bg-slate-950/40'
                                } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200`}
                                value={visibility}
                                onChange={(e) => {
                                    setVisibility(e.target.value as Visibility);
                                    setErrors((prev) => ({ ...prev, visibility: '' }));
                                }}
                            >
                                <option value="public" className="text-black">
                                    Publiska — ikviens ar saiti var atbildēt
                                </option>
                                <option value="private" className="text-black">
                                    Privāta — tikai ar kodu vai uzaicinājumu
                                </option>
                            </select>
                            {errors.visibility && attemptedSubmit && <p className="mt-1 text-xs text-rose-300">{errors.visibility}</p>}
                        </div>

                        {/* FIELDS */}
                        <div className="space-y-4">
                            {errors.fields && attemptedSubmit && (
                                <div className="rounded-2xl border border-rose-400 bg-rose-900/10 p-3 text-sm text-rose-200">{errors.fields}</div>
                            )}

                            {fields.length === 0 && <p className="text-sm text-white/60">Pagaidām nav jautājumu. Pievienojiet vismaz vienu, lai sāktu.</p>}

                            {fields.map((field, idx) => {
                                const ferr = errors.fieldErrors?.[field.id] ?? {};
                                return (
                                    <div
                                        key={field.id}
                                        data-field-id={field.id}
                                        className={`rounded-2xl border p-5 shadow-inner ${
                                            Object.keys(ferr).length ? 'border-rose-400 bg-rose-900/5' : 'border-white/10 bg-slate-950/50'
                                        }`}
                                    >
                                        <div className="mb-4 flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Jautājums {idx + 1}</p>
                                                <p className="text-sm text-white/70">
                                                    {field.type === 'radio' ? 'Vienas atbildes izvēle' : field.type === 'checkbox' ? 'Vairākas atbildes' : 'Izvēlne'}
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
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Jautājuma teksts (LV)"
                                                        className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                                                            ferr.labelLv ? 'border-rose-400 bg-rose-50/5 text-white' : 'border-white/10 bg-slate-900/60 text-white'
                                                        } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200`}
                                                        value={field.label.lv}
                                                        onChange={(e) => updateLabel(field.id, 'lv', e.target.value)}
                                                    />
                                                    {ferr.labelLv && <p className="mt-1 text-xs text-rose-300">{ferr.labelLv}</p>}
                                                </div>

                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Question text (EN)"
                                                        className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                                                            ferr.labelEn ? 'border-rose-400 bg-rose-50/5 text-white' : 'border-white/10 bg-slate-900/60 text-white'
                                                        } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200`}
                                                        value={field.label.en}
                                                        onChange={(e) => updateLabel(field.id, 'en', e.target.value)}
                                                    />
                                                    {ferr.labelEn && <p className="mt-1 text-xs text-rose-300">{ferr.labelEn}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <select
                                                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
                                                        ferr.type ? 'border-rose-400 bg-rose-50/5 text-white' : 'border-white/10 bg-slate-900/60 text-white'
                                                    } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200`}
                                                    value={field.type}
                                                    onChange={(e) => updateFieldValue(field.id, 'type', e.target.value as FieldType)}
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
                                                {ferr.type && <p className="mt-1 text-xs text-rose-300">{ferr.type}</p>}
                                            </div>

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

                                                {ferr.optionsLv && attemptedSubmit && <p className="mt-1 text-xs text-rose-300">{ferr.optionsLv}</p>}
                                                {ferr.optionsEn && attemptedSubmit && <p className="mt-1 text-xs text-rose-300">{ferr.optionsEn}</p>}

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
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={addField}
                            className="inline-flex w-full items-center justify-center rounded-2xl border border-dashed border-emerald-400/60 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:border-emerald-500 hover:bg-emerald-500/20"
                        >
                            + Pievienot jautājumu
                        </button>
                    </div>

                    {/* RIGHT: Summary + Save */}
                    <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/30">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Rezumējums</p>

                        {/* PROMINENT TITLE ERROR BANNER (shows while title LV missing) */}
                        {errors.titleLv && (
                            <div className="rounded-2xl border border-rose-400 bg-rose-900/10 p-3 text-sm text-rose-200">
                                <strong>Obligāts:</strong> Anketas nosaukums (LV) ir nepieciešams. Lūdzu aizpildiet.
                            </div>
                        )}

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
                            disabled={hasErrors}
                            className={`mt-4 w-full rounded-full px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition ${
                                hasErrors ? 'bg-slate-600 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-400'
                            }`}
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
