import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';
import { useState, type ReactNode } from 'react';
import {
    ArrowLeft,
    Hash,
    Globe,
    List,
    AlignLeft,
    BarChartHorizontal,
    CheckSquare,
    ChevronDown,
    Type,
    CircleDot,
} from 'lucide-react';

type Lang = 'lv' | 'en';

interface Scale {
    min?: number;
    max?: number;
    minLabel?: { lv?: string; en?: string } | string;
    maxLabel?: { lv?: string; en?: string } | string;
}

interface Field {
    id?: string | number;
    label?: { lv?: string; en?: string } | string;
    type?: string;
    options?: { lv?: string[]; en?: string[] } | string[] | Record<string, string[]>;
    placeholder?: { lv?: string; en?: string } | string;
    rows?: number;
    scale?: Scale | null;
}

interface FormData {
    id: number;
    code: string;
    title?: { lv?: string; en?: string } | string;
    data?: any;
    fields?: Field[];
    created_at?: string;
}

type RenderType = 'radio' | 'checkbox' | 'dropdown' | 'text' | 'textarea' | 'scale';

/* ---------------- Icons ---------------- */

const getFieldIcon = (type: RenderType) => {
    switch (type) {
        case 'text':
        case 'textarea':
            return <AlignLeft className="h-4 w-4 text-blue-400" />;
        case 'scale':
            return <BarChartHorizontal className="h-4 w-4 text-purple-400" />;
        case 'dropdown':
            return <ChevronDown className="h-4 w-4 text-amber-400" />;
        case 'checkbox':
            return <CheckSquare className="h-4 w-4 text-emerald-400" />;
        case 'radio':
        default:
            return <CircleDot className="h-4 w-4 text-rose-400" />;
    }
};

/* ---------------- Component ---------------- */

function ShowAnketa({ formResult }: { formResult: FormData }) {
    const { __, lang } = useLang();
    const [localLang, setLocalLang] = useState<Lang>(lang as Lang);

    if (!formResult) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
                {__('common.loading')}
            </div>
        );
    }

    /* -------- Parse data safely -------- */

    let parsedData: any = formResult.data ?? {};
    if (typeof parsedData === 'string') {
        try {
            parsedData = JSON.parse(parsedData);
        } catch {
            parsedData = {};
        }
    }

    const fields: Field[] = Array.isArray(parsedData?.fields)
        ? parsedData.fields
        : Array.isArray(formResult.fields)
          ? formResult.fields
          : [];

    /* -------- Translation helpers -------- */

    const tr = (value: any): string => {
        if (!value) return '';
        if (typeof value === 'string') return value;
        return value[localLang] || value.lv || value.en || '';
    };

    const trOptions = (value: any): string[] => {
        if (!value) return [];
        if (Array.isArray(value)) return value.map(String);

        if (typeof value === 'object') {
            const arr = value[localLang] || value.lv || value.en;
            if (Array.isArray(arr)) return arr.map(String);
            const fallback = Object.values(value).find((v) => Array.isArray(v));
            return Array.isArray(fallback) ? fallback.map(String) : [];
        }

        return [];
    };

    const resolveTitle = (): string => {
        const t1 = parsedData?.title;
        const t2 = formResult.title;

        return tr(t1) || tr(t2) || __('anketa.misc.untitled_form');
    };

    const inferType = (f: Field): RenderType => {
        const raw = (f?.type || '').toLowerCase().trim();

        // Explicit mapping first
        if (raw === 'checkbox') return 'checkbox';
        if (raw === 'dropdown' || raw === 'select') return 'dropdown';
        if (raw === 'textarea') return 'textarea';
        if (raw === 'text') return 'text';
        if (raw === 'scale' || raw === 'rating') return 'scale';
        if (raw === 'radio') return 'radio';

        // Heuristics if type missing/unknown
        if (f.scale) return 'scale';
        if (f.rows && f.rows > 1) return 'textarea';
        if (f.placeholder) return 'text';

        // Default
        return 'radio';
    };

    const isOptionBased = (t: RenderType) => t === 'radio' || t === 'checkbox' || t === 'dropdown';

    /* ---------------- JSX ---------------- */

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* Header */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <Type className="h-5 w-5 text-blue-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                                    {__('anketa.show.preview')}
                                </span>
                            </div>

                            <h1 className="max-w-2xl text-3xl font-bold text-white">{resolveTitle()}</h1>

                            <div className="mt-3 flex items-center gap-4 text-sm text-slate-400">
                                <span className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-slate-800/50 px-2 py-1">
                                    <Hash className="h-3.5 w-3.5" />
                                    {__('common.id')}: {formResult.id}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <Globe className="h-3.5 w-3.5" />
                                    {__(formResult.code === 'private' ? 'anketa.show.private' : 'anketa.show.public')}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="flex rounded-xl border border-white/10 bg-slate-800 p-1">
                                {(['lv', 'en'] as Lang[]).map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLocalLang(l)}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-lg ${
                                            localLang === l ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {l.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <Link
                                href="/admin/anketa"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                {__('common.back')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
                    <div className="space-y-6">
                        {fields.length === 0 && (
                            <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                                <List className="mx-auto mb-3 h-12 w-12 text-slate-600" />
                                <p className="text-slate-400">{__('anketa.show.no_questions')}</p>
                            </div>
                        )}

                        {fields.map((f, i) => {
                            const label = tr(f.label);
                            const placeholder = tr(f.placeholder);
                            const opts = trOptions(f.options);
                            const type = inferType(f);

                            const scaleMin = f.scale?.min ?? 1;
                            const scaleMax = f.scale?.max ?? 10;
                            const scaleMinLabel = tr((f.scale as any)?.minLabel);
                            const scaleMaxLabel = tr((f.scale as any)?.maxLabel);

                            return (
                                <div key={f.id ?? i} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                                    <div className="mb-4 flex gap-4">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-sm font-bold text-slate-400">
                                            {i + 1}
                                        </span>

                                        <div>
                                            <h3 className="text-lg font-medium text-white">
                                                {label || (
                                                    <span className="italic text-slate-600">{__('anketa.misc.untitled_question')}</span>
                                                )}
                                            </h3>

                                            <div className="mt-1 flex items-center gap-2">
                                                {getFieldIcon(type)}
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                    {__(`anketa.field.${type}`)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preview renderer */}
                                    <div className="mt-4">
                                        {type === 'text' && (
                                            <input
                                                disabled
                                                value=""
                                                placeholder={placeholder || __('anketa.field.placeholder')}
                                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-slate-600"
                                            />
                                        )}

                                        {type === 'textarea' && (
                                            <textarea
                                                disabled
                                                value=""
                                                rows={f.rows ?? 5}
                                                placeholder={placeholder || __('anketa.field.placeholder')}
                                                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-slate-600"
                                            />
                                        )}

                                        {type === 'dropdown' && (
                                            <select
                                                disabled
                                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"
                                            >
                                                <option value="" className="bg-slate-900">
                                                    {__('anketa.field.select')}
                                                </option>
                                                {opts.map((o, idx) => (
                                                    <option key={idx} value={o} className="bg-slate-900">
                                                        {o}
                                                    </option>
                                                ))}
                                            </select>
                                        )}

                                        {type === 'radio' && (
                                            <ul className="space-y-2">
                                                {opts.map((o, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                                                        <span className="h-4 w-4 rounded-full border border-white/20 bg-white/5" />
                                                        <span>{o}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {type === 'checkbox' && (
                                            <ul className="space-y-2">
                                                {opts.map((o, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                                                        <span className="h-4 w-4 rounded border border-white/20 bg-white/5" />
                                                        <span>{o}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {type === 'scale' && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs text-slate-400">
                                                    <span>
                                                        {scaleMinLabel ? `${scaleMin} — ${scaleMinLabel}` : `${scaleMin}`}
                                                    </span>
                                                    <span>
                                                        {scaleMaxLabel ? `${scaleMax} — ${scaleMaxLabel}` : `${scaleMax}`}
                                                    </span>
                                                </div>
                                                <input
                                                    type="range"
                                                    disabled
                                                    min={scaleMin}
                                                    max={scaleMax}
                                                    value={Math.round((scaleMin + scaleMax) / 2)}
                                                    className="w-full"
                                                />
                                            </div>
                                        )}

                                        {/* No options message only for option-based types */}
                                        {isOptionBased(type) && opts.length === 0 && (
                                            <p className="text-xs italic text-slate-500">{__('anketa.field.no_options')}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right column reserved */}
                    <div className="hidden lg:block" />
                </div>
            </div>
        </div>
    );
}

ShowAnketa.layout = (page: ReactNode) => {
    const t =
        (page as any)?.props?.lang?.anketa?.show?.page_title ||
        (page as any)?.props?.lang?.anketa?.show?.preview ||
        'Anketa';

    return <AdminLayout title={t}>{page}</AdminLayout>;
};

export default ShowAnketa;
