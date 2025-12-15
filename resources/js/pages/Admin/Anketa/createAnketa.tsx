import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState, type ReactNode } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import {
    Plus,
    Trash2,
    Save,
    Settings,
    List,
    AlignLeft,
    BarChartHorizontal,
    AlertTriangle,
    X,
    ChevronDown,
    Globe,
    Eye,
    CheckCircle,
} from 'lucide-react';

// ---------- SAFE UUID HELPER ----------
const generateUUID = (): string => {
    if (typeof crypto !== 'undefined') {
        const anyCrypto = crypto as any;

        if (typeof anyCrypto.randomUUID === 'function') {
            return anyCrypto.randomUUID();
        }

        if (typeof anyCrypto.getRandomValues === 'function') {
            const bytes = new Uint8Array(16);
            anyCrypto.getRandomValues(bytes);

            // RFC4122 v4
            bytes[6] = (bytes[6] & 0x0f) | 0x40;
            bytes[8] = (bytes[8] & 0x3f) | 0x80;

            const hex: string[] = [];
            for (let i = 0; i < bytes.length; i++) {
                hex.push(bytes[i].toString(16).padStart(2, '0'));
            }

            return (
                hex.slice(0, 4).join('') +
                '-' +
                hex.slice(4, 6).join('') +
                '-' +
                hex.slice(6, 8).join('') +
                '-' +
                hex.slice(8, 10).join('') +
                '-' +
                hex.slice(10, 16).join('')
            );
        }
    }

    // Fallback (non-crypto) – okay for client-only IDs
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return template.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// --- Types ---
type FieldType = 'radio' | 'checkbox' | 'dropdown' | 'text' | 'scale';
type Visibility = 'public' | 'private';
type Lang = 'lv' | 'en';

type FieldBase = {
    id: string;
    label: { lv: string; en: string };
};

type OptionField = FieldBase & {
    type: 'radio' | 'checkbox' | 'dropdown';
    options: { lv: string[]; en: string[] };
};

type TextField = FieldBase & {
    type: 'text';
    placeholder: { lv: string; en: string };
};

type ScaleField = FieldBase & {
    type: 'scale';
    scale: {
        min: number;
        max: number;
        minLabel?: { lv?: string; en?: string };
        maxLabel?: { lv?: string; en?: string };
    };
};

type Field = OptionField | TextField | ScaleField;

type FieldErrors = {
    labelLv?: string;
    labelEn?: string;
    type?: string;
    optionsLv?: string;
    optionsEn?: string;
    placeholderLv?: string;
    placeholderEn?: string;
    scale?: string;
};

type ValidationErrors = {
    titleLv?: string;
    titleEn?: string;
    visibility?: string;
    fields?: string;
    fieldErrors: Record<string, FieldErrors>;
};

// --- Helper Icons for Fields ---
const FieldIcon = ({ type }: { type: FieldType }) => {
    switch (type) {
        case 'text':
            return <AlignLeft className="h-4 w-4 text-blue-400" />;
        case 'scale':
            return <BarChartHorizontal className="h-4 w-4 text-purple-400" />;
        case 'dropdown':
            return <ChevronDown className="h-4 w-4 text-amber-400" />;
        default:
            return <List className="h-4 w-4 text-emerald-400" />;
    }
};

export default function CreateAnketa() {
    const [title, setTitle] = useState<{ lv: string; en: string }>({ lv: '', en: '' });
    const [visibility, setVisibility] = useState<Visibility>('public');
    const [fields, setFields] = useState<Field[]>([]);
    const [errors, setErrors] = useState<ValidationErrors>({ fieldErrors: {} });
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    // Modal State
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        type: 'success' | 'error';
        title: string;
        message: string;
        onClose?: () => void;
    }>({ isOpen: false, type: 'success', title: '', message: '' });

    const trimStr = (s?: string) => (s ?? '').trim();

    const addField = () => {
        const newField: OptionField = {
            id: generateUUID(),
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

    const changeFieldType = (id: string, newType: FieldType) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== id) return f;
                const base = { id: f.id, label: f.label };
                switch (newType) {
                    case 'radio':
                    case 'checkbox':
                    case 'dropdown':
                        return {
                            ...base,
                            type: newType,
                            options: { lv: ['Opcija 1'], en: ['Option 1'] },
                        } as OptionField;
                    case 'text':
                        return {
                            ...base,
                            type: 'text',
                            placeholder: { lv: '', en: '' },
                        } as TextField;
                    case 'scale':
                        return {
                            ...base,
                            type: 'scale',
                            scale: {
                                min: 1,
                                max: 10,
                                minLabel: { lv: 'Mazāk', en: 'Less' },
                                maxLabel: { lv: 'Vairāk', en: 'More' },
                            },
                        } as ScaleField;
                    default:
                        return f;
                }
            }),
        );
    };

    const updateLabel = (fieldId: string, lang: Lang, value: string) => {
        setFields((prev) =>
            prev.map((f) => (f.id === fieldId ? { ...f, label: { ...f.label, [lang]: value } } : f)),
        );
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
                if (f.type === 'radio' || f.type === 'checkbox' || f.type === 'dropdown') {
                    const arr = [...f.options[lang]];
                    arr[index] = value;
                    return { ...f, options: { ...f.options, [lang]: arr } } as OptionField;
                }
                return f;
            }),
        );
    };

    const addOption = (fieldId: string) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== fieldId) return f;
                if (f.type === 'radio' || f.type === 'checkbox' || f.type === 'dropdown') {
                    const nextIndex = f.options.lv.length + 1;
                    return {
                        ...f,
                        options: {
                            lv: [...f.options.lv, `Opcija ${nextIndex}`],
                            en: [...f.options.en, `Option ${nextIndex}`],
                        },
                    } as OptionField;
                }
                return f;
            }),
        );
    };

    const removeOption = (fieldId: string, index: number) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== fieldId) return f;
                if (f.type === 'radio' || f.type === 'checkbox' || f.type === 'dropdown') {
                    const nv = {
                        lv: f.options.lv.filter((_, i) => i !== index),
                        en: f.options.en.filter((_, i) => i !== index),
                    };
                    return {
                        ...f,
                        options: {
                            lv: nv.lv.length ? nv.lv : ['Opcija 1'],
                            en: nv.en.length ? nv.en : ['Option 1'],
                        },
                    } as OptionField;
                }
                return f;
            }),
        );
    };

    const updatePlaceholder = (fieldId: string, lang: Lang, value: string) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== fieldId) return f;
                if (f.type === 'text') {
                    return {
                        ...f,
                        placeholder: { ...f.placeholder, [lang]: value },
                    } as TextField;
                }
                return f;
            }),
        );
    };

    const updateScaleValue = (
        fieldId: string,
        key: 'min' | 'max' | 'minLabel' | 'maxLabel',
        value: any,
        lang?: Lang,
    ) => {
        setFields((prev) =>
            prev.map((f) => {
                if (f.id !== fieldId) return f;
                if (f.type === 'scale') {
                    const s = { ...f.scale };

                    if (key === 'min' || key === 'max') {
                        let num = Number(value);
                        if (!Number.isFinite(num)) num = key === 'min' ? 1 : 10;
                        num = Math.round(num);
                        num = Math.max(1, Math.min(10, num));

                        s[key] = num;

                        if (s.min >= s.max) {
                            if (key === 'min') s.max = Math.min(10, s.min + 1);
                            else s.min = Math.max(1, s.max - 1);
                        }
                    } else if (key === 'minLabel') {
                        s.minLabel = { ...(s.minLabel || {}), [lang as Lang]: value };
                    } else if (key === 'maxLabel') {
                        s.maxLabel = { ...(s.maxLabel || {}), [lang as Lang]: value };
                    }

                    return { ...f, scale: s } as ScaleField;
                }
                return f;
            }),
        );
    };

    const validateField = (f: Field): FieldErrors => {
        const fe: FieldErrors = {};
        const labelLv = trimStr(f.label.lv);
        const labelEn = trimStr(f.label.en);

        if (!labelLv) fe.labelLv = 'Jautājums (LV) ir obligāts.';
        if (!labelEn) fe.labelEn = 'Question (EN) is required.';

        if (f.type === 'radio' || f.type === 'checkbox' || f.type === 'dropdown') {
            const optsLv = (f.options.lv || [])
                .map((o) => (o ?? '').trim())
                .filter(Boolean);
            const optsEn = (f.options.en || [])
                .map((o) => (o ?? '').trim())
                .filter(Boolean);

            if (optsLv.length === 0) fe.optionsLv = 'Jābūt vismaz vienai opcijai.';
            if (optsEn.length === 0) fe.optionsEn = 'Must have at least one option.';
        }

        if (f.type === 'scale') {
            const s = (f as ScaleField).scale;
            const min = Number(s.min ?? 1);
            const max = Number(s.max ?? 5);
            if (!Number.isInteger(min) || !Number.isInteger(max)) {
                fe.scale = 'Min/max must be integers.';
            } else if (min >= max) {
                fe.scale = 'Min must be less than max.';
            }
        }

        return fe;
    };

    const validateAll = (): ValidationErrors => {
        const ve: ValidationErrors = { fieldErrors: {} };
        const titleLv = trimStr(title.lv);
        const titleEn = trimStr(title.en);

        if (!titleLv) ve.titleLv = 'Nosaukums (LV) ir obligāts.';
        if (titleLv.length > 255) ve.titleLv = 'Pārāk garš nosaukums.';
        if (titleEn.length > 255) ve.titleEn = 'Title too long.';

        if (!Array.isArray(fields) || fields.length === 0) {
            ve.fields = 'Pievienojiet vismaz vienu jautājumu.';
        }

        for (const f of fields) {
            const fe = validateField(f);
            if (Object.keys(fe).length > 0) ve.fieldErrors[f.id] = fe;
        }

        return ve;
    };

    useEffect(() => {
        if (attemptedSubmit) {
            const next = validateAll();
            setErrors(next);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, visibility, fields]);

    const submitForm = async () => {
        setAttemptedSubmit(true);
        const next = validateAll();
        setErrors(next);

        if (Object.keys(next.fieldErrors).length > 0 || next.titleLv || next.fields || next.visibility) {
            const firstFail = fields.find((f) => next.fieldErrors[f.id]);
            if (firstFail) {
                const el = document.querySelector(`[data-field-id="${firstFail.id}"]`);
                if (el) {
                    (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            setModalState({
                isOpen: true,
                type: 'error',
                title: 'Validation Error',
                message: 'Lūdzu izlabojiet kļūdas pirms saglabāšanas.',
            });
            return;
        }

        // Build schema object
        const schema = {
            fields: fields.map((f) => {
                const base: any = {
                    id: f.id,
                    type: f.type,
                    label: { lv: f.label.lv.trim(), en: f.label.en.trim() },
                };

                if (f.type === 'text') {
                    base.placeholder = {
                        lv: (f as TextField).placeholder.lv.trim(),
                        en: (f as TextField).placeholder.en.trim(),
                    };
                } else if (f.type === 'scale') {
                    base.scale = { ...(f as ScaleField).scale };
                } else {
                    base.options = {
                        lv: (f as OptionField).options.lv.map((o) => o.trim()).filter(Boolean),
                        en: (f as OptionField).options.en.map((o) => o.trim()).filter(Boolean),
                    };
                }

                return base;
            }),
        };

        // ✅ Payload that matches Laravel validation:
        // title: array with lv & en
        const payload = {
            title: {
                lv: title.lv.trim(),
                en: title.en.trim(),
            },
            visibility,
            schema, // send as an object; backend can cast to json
        };

        try {
            const response = await axios.post('/admin/anketa/store', payload);

            if (response.status >= 200 && response.status < 300) {
                setModalState({
                    isOpen: true,
                    type: 'success',
                    title: 'Anketa Izveidota',
                    message: 'Jaunā anketa ir veiksmīgi saglabāta sistēmā.',
                    onClose: () => {
                        window.location.href = '/admin/anketa';
                    },
                });
            }
        } catch (err: any) {
            let msg = err?.message ?? 'Nezināma kļūda.';

            if (err?.response?.status === 422 && err.response.data) {
                const data = err.response.data;

                if (data.errors && typeof data.errors === 'object') {
                    const allMessages = (Object.values(data.errors) as any[])
                        .flat()
                        .filter(Boolean) as string[];

                    if (allMessages.length) {
                        msg = allMessages.join('\n');
                    }
                } else if (data.message && typeof data.message === 'string') {
                    msg = data.message;
                }
            }

            setModalState({
                isOpen: true,
                type: 'error',
                title: 'Saglabāšanas kļūda',
                message: `Neizdevās saglabāt: ${msg}`,
            });

            console.error('Anketa store error:', err?.response?.data ?? err);
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* --- Header --- */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="pointer-events-none absolute -mr-16 -mt-16 right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <Settings className="h-5 w-5 text-emerald-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                                    Anketu Studija
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Izveidot jaunu anketu
                            </h1>
                            <p className="mt-2 max-w-lg text-slate-400">
                                Konfigurējiet nosaukumus, redzamību un pievienojiet jautājumus.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/anketa"
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Atcelt
                            </Link>
                            <button
                                onClick={submitForm}
                                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition hover:scale-105 hover:bg-emerald-400"
                            >
                                <Save className="h-4 w-4" />
                                Saglabāt
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                    {/* LEFT COLUMN: CONTENT BUILDER */}
                    <div className="space-y-8">
                        {/* General Info Card */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                            <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                                <Globe className="h-5 w-5 text-blue-400" />
                                <h2 className="text-lg font-bold text-white">Pamatinformācija</h2>
                            </div>

                            <div className="grid gap-5">
                                {/* Titles */}
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Nosaukums (LV)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Piem., Klientu apmierinātība"
                                            value={title.lv}
                                            onChange={(e) => setTitle((t) => ({ ...t, lv: e.target.value }))}
                                            className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-white focus:outline-none focus:ring-1 ${
                                                errors.titleLv
                                                    ? 'border-rose-500 focus:border-rose-500'
                                                    : 'border-white/10 focus:border-emerald-500'
                                            }`}
                                        />
                                        {errors.titleLv && (
                                            <p className="text-xs text-rose-400">{errors.titleLv}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Title (EN)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Customer Satisfaction"
                                            value={title.en}
                                            onChange={(e) => setTitle((t) => ({ ...t, en: e.target.value }))}
                                            className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-white focus:outline-none focus:ring-1 ${
                                                errors.titleEn
                                                    ? 'border-rose-500 focus:border-rose-500'
                                                    : 'border-white/10 focus:border-emerald-500'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Questions Builder */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Jautājumi</h2>
                                <span className="rounded border border-white/5 bg-slate-900 px-2 py-1 text-xs font-mono text-slate-500">
                                    {fields.length} total
                                </span>
                            </div>

                            {errors.fields && attemptedSubmit && (
                                <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
                                    <AlertTriangle className="h-4 w-4" /> {errors.fields}
                                </div>
                            )}

                            {fields.length === 0 && (
                                <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                                    <List className="mb-3 mx-auto h-12 w-12 text-slate-600" />
                                    <p className="text-slate-400">
                                        Saraksts ir tukšs. Pievienojiet pirmo jautājumu.
                                    </p>
                                </div>
                            )}

                            <div className="space-y-4">
                                {fields.map((field, idx) => {
                                    const ferr = errors.fieldErrors?.[field.id] ?? {};
                                    const hasErr = Object.keys(ferr).length > 0;

                                    return (
                                        <div
                                            key={field.id}
                                            data-field-id={field.id}
                                            className={`group relative rounded-2xl border bg-slate-900/40 p-6 transition-all ${
                                                hasErr
                                                    ? 'border-rose-500/50 shadow-rose-500/10'
                                                    : 'border-white/10 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="mb-6 flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-slate-800 font-mono text-sm text-slate-400">
                                                        {idx + 1}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                            Type
                                                        </span>
                                                        <div className="flex items-center gap-2 text-sm font-medium text-white">
                                                            <FieldIcon type={field.type} />
                                                            <select
                                                                value={field.type}
                                                                onChange={(e) =>
                                                                    changeFieldType(
                                                                        field.id,
                                                                        e.target.value as FieldType,
                                                                    )
                                                                }
                                                                className="cursor-pointer bg-transparent outline-none transition-colors hover:text-emerald-400"
                                                            >
                                                                <option value="radio" className="bg-slate-900">
                                                                    Radio Choice
                                                                </option>
                                                                <option value="checkbox" className="bg-slate-900">
                                                                    Checkbox
                                                                </option>
                                                                <option value="dropdown" className="bg-slate-900">
                                                                    Dropdown
                                                                </option>
                                                                <option value="text" className="bg-slate-900">
                                                                    Text Input
                                                                </option>
                                                                <option value="scale" className="bg-slate-900">
                                                                    Scale 1-10
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeField(field.id)}
                                                    className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                                                    title="Delete Question"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="grid gap-6">
                                                {/* Question Labels */}
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="space-y-1.5">
                                                        <input
                                                            type="text"
                                                            placeholder="Jautājums (LV)"
                                                            value={field.label.lv}
                                                            onChange={(e) =>
                                                                updateLabel(field.id, 'lv', e.target.value)
                                                            }
                                                            className={`w-full rounded-xl border bg-black/20 px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:ring-1 ${
                                                                ferr.labelLv
                                                                    ? 'border-rose-500'
                                                                    : 'border-white/10 focus:border-emerald-500'
                                                            }`}
                                                        />
                                                        {ferr.labelLv && (
                                                            <p className="text-xs text-rose-400">{ferr.labelLv}</p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <input
                                                            type="text"
                                                            placeholder="Question (EN)"
                                                            value={field.label.en}
                                                            onChange={(e) =>
                                                                updateLabel(field.id, 'en', e.target.value)
                                                            }
                                                            className={`w-full rounded-xl border bg-black/20 px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:ring-1 ${
                                                                ferr.labelEn
                                                                    ? 'border-rose-500'
                                                                    : 'border-white/10 focus:border-emerald-500'
                                                            }`}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Dynamic Fields based on Type */}
                                                <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                                                    {/* OPTIONS EDITOR */}
                                                    {'options' in field && (
                                                        <div className="space-y-3">
                                                            {field.options.lv.map((_, optIdx) => (
                                                                <div
                                                                    key={optIdx}
                                                                    className="group/opt flex items-center gap-2"
                                                                >
                                                                    <div className="h-2 w-2 shrink-0 rounded-full bg-slate-600" />
                                                                    <input
                                                                        value={field.options.lv[optIdx]}
                                                                        onChange={(e) =>
                                                                            updateOption(
                                                                                field.id,
                                                                                'lv',
                                                                                optIdx,
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                        className="flex-1 border-b border-white/10 bg-transparent px-2 py-1 text-sm text-white outline-none focus:border-emerald-500"
                                                                        placeholder="Opcija (LV)"
                                                                    />
                                                                    <input
                                                                        value={field.options.en[optIdx]}
                                                                        onChange={(e) =>
                                                                            updateOption(
                                                                                field.id,
                                                                                'en',
                                                                                optIdx,
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                        className="flex-1 border-b border-white/10 bg-transparent px-2 py-1 text-sm text-white outline-none focus:border-emerald-500"
                                                                        placeholder="Option (EN)"
                                                                    />
                                                                    <button
                                                                        onClick={() =>
                                                                            removeOption(field.id, optIdx)
                                                                        }
                                                                        className="p-1 text-slate-500 opacity-0 transition-opacity hover:text-rose-400 group-hover/opt:opacity-100"
                                                                    >
                                                                        <X className="h-3.5 w-3.5" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <button
                                                                onClick={() => addOption(field.id)}
                                                                className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                                                            >
                                                                <Plus className="h-3 w-3" /> Add Option
                                                            </button>
                                                            {(ferr.optionsLv || ferr.optionsEn) && (
                                                                <p className="pt-1 text-xs text-rose-400">
                                                                    {ferr.optionsLv || ferr.optionsEn}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* TEXT PLACEHOLDER */}
                                                    {field.type === 'text' && (
                                                        <div className="grid gap-4 md:grid-cols-2">
                                                            <input
                                                                value={(field as TextField).placeholder.lv}
                                                                onChange={(e) =>
                                                                    updatePlaceholder(
                                                                        field.id,
                                                                        'lv',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                placeholder="Placeholder (LV)"
                                                                className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                                                            />
                                                            <input
                                                                value={(field as TextField).placeholder.en}
                                                                onChange={(e) =>
                                                                    updatePlaceholder(
                                                                        field.id,
                                                                        'en',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                placeholder="Placeholder (EN)"
                                                                className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                                                            />
                                                        </div>
                                                    )}

                                                    {/* SCALE CONFIG */}
                                                    {field.type === 'scale' && (
                                                        <div className="space-y-4">
                                                            <div className="flex gap-4">
                                                                <div className="flex-1">
                                                                    <label className="mb-1 block text-xs text-slate-500">
                                                                        Min Value
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        value={(field as ScaleField).scale.min}
                                                                        onChange={(e) =>
                                                                            updateScaleValue(
                                                                                field.id,
                                                                                'min',
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                        className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                                                                    />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <label className="mb-1 block text-xs text-slate-500">
                                                                        Max Value
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        value={(field as ScaleField).scale.max}
                                                                        onChange={(e) =>
                                                                            updateScaleValue(
                                                                                field.id,
                                                                                'max',
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                        className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="rounded-lg border border-white/5 bg-slate-900/50 p-3">
                                                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                                                    Preview
                                                                </p>
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <span className="text-xs text-slate-400">
                                                                        {(field as ScaleField).scale.minLabel?.lv ||
                                                                            'Min'}
                                                                    </span>
                                                                    <div className="flex flex-wrap justify-center gap-1">
                                                                        {Array.from({
                                                                            length:
                                                                                (field as ScaleField).scale.max -
                                                                                (field as ScaleField).scale.min +
                                                                                1,
                                                                        }).map((_, i) => (
                                                                            <div
                                                                                key={i}
                                                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/10 text-xs font-medium text-white"
                                                                            >
                                                                                {(field as ScaleField).scale.min + i}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <span className="text-xs text-slate-400">
                                                                        {(field as ScaleField).scale.maxLabel?.lv ||
                                                                            'Max'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={addField}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-emerald-500/20 bg-emerald-500/5 p-4 text-sm font-bold text-emerald-400 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10"
                            >
                                <Plus className="h-5 w-5" /> Pievienot Jautājumu
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: STICKY SETTINGS */}
                    <div className="space-y-6">
                        <div className="sticky top-6 space-y-6">
                            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                                    Iestatījumi
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold text-white/70">
                                            Redzamība
                                        </label>
                                        <div className="relative">
                                            <Eye className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                            <select
                                                value={visibility}
                                                onChange={(e) =>
                                                    setVisibility(e.target.value as Visibility)
                                                }
                                                className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-black/20 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-emerald-500"
                                            >
                                                <option value="public" className="bg-slate-900">
                                                    Publiska
                                                </option>
                                                <option value="private" className="bg-slate-900">
                                                    Privāta
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/5 pt-4">
                                        <div className="mb-2 flex justify-between text-sm">
                                            <span className="text-slate-400">Jautājumi</span>
                                            <span className="font-medium text-white">
                                                {fields.length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Statuss</span>
                                            <span className="font-medium text-emerald-400">
                                                Melnraksts
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={submitForm}
                                        className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/30"
                                    >
                                        Saglabāt Anketu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CUSTOM MODAL --- */}
            {modalState.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() =>
                            modalState.onClose
                                ? modalState.onClose()
                                : setModalState((p) => ({ ...p, isOpen: false }))
                        }
                    />
                    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
                        <div className="p-6 text-center">
                            <div
                                className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border ${
                                    modalState.type === 'success'
                                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                                        : 'border-rose-500/20 bg-rose-500/10 text-rose-500'
                                }`}
                            >
                                {modalState.type === 'success' ? (
                                    <CheckCircle className="h-8 w-8" />
                                ) : (
                                    <AlertTriangle className="h-8 w-8" />
                                )}
                            </div>

                            <h3 className="mb-2 text-xl font-bold text-white">
                                {modalState.title}
                            </h3>

                            <p className="mb-6 leading-relaxed text-sm text-slate-400">
                                {modalState.message}
                            </p>

                            <button
                                onClick={() =>
                                    modalState.onClose
                                        ? modalState.onClose()
                                        : setModalState((p) => ({ ...p, isOpen: false }))
                                }
                                className="w-full rounded-xl bg-slate-800 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700"
                            >
                                {modalState.type === 'success' ? 'Turpināt' : 'Aizvērt'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

CreateAnketa.layout = (page: ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;
