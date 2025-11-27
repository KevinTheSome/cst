import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';

type Lang = 'lv' | 'en';

interface Field {
    id?: string;
    label: { lv?: string; en?: string } | string;
    type?: 'radio' | 'checkbox' | 'dropdown' | string;
    options?: { lv?: string[]; en?: string[] } | string[] | Record<string, string[]>;
    placeholder?: { lv?: string; en?: string } | string;
    rows?: number;
}

interface FormData {
    id: number;
    code: string;
    title?: { lv?: string; en?: string } | string;
    // data may be a JSON string or parsed object
    data?: any;
    fields?: Field[]; // legacy/top-level fields
}

export default function ShowAnketa({ formResult }: { formResult: FormData }) {
    const [lang, setLang] = useState<Lang>('lv');

    if (!formResult) return <p>Loading...</p>;

    // Safely parse data if it's a JSON string
    let parsedData: any = formResult.data ?? {};
    if (typeof parsedData === 'string') {
        try {
            parsedData = JSON.parse(parsedData);
        } catch (e) {
            // if parsing fails, treat as empty
            parsedData = {};
        }
    }

    // Resolve fields: prefer data.fields, fallback to top-level formResult.fields
    const fields: Field[] = Array.isArray(parsedData?.fields)
        ? parsedData.fields
        : Array.isArray(formResult.fields)
        ? formResult.fields
        : [];

    // Helper to get string from title (data.title or top-level title)
    const resolveTitleString = (): string => {
        const rTitle = parsedData?.title;
        const topTitle = formResult.title;

        // If data.title is a string, return it
        if (typeof rTitle === 'string' && rTitle.trim().length > 0) return rTitle;

        // If data.title is object with lang keys
        if (rTitle && typeof rTitle === 'object') {
            return (rTitle[lang] ?? rTitle.lv ?? rTitle.en ?? '').toString();
        }

        // If top-level title is string
        if (typeof topTitle === 'string' && topTitle.trim().length > 0) return topTitle;

        // If top-level title is object
        if (topTitle && typeof topTitle === 'object') {
            return (topTitle[lang] ?? topTitle.lv ?? topTitle.en ?? '').toString();
        }

        return 'Untitled';
    };

    const resolvedTitle = resolveTitleString();

    // Translate helper for label/help text etc.
    const tr = (value: any): string =>
        typeof value === 'string' ? value : (value?.[lang] ?? value?.lv ?? value?.en ?? '') ?? '';

    // Translate helper for options — always return an array of strings
    const trOptions = (value: any): string[] => {
        if (!value) return [];

        // if already array of strings
        if (Array.isArray(value)) return value.map(String);

        // If it's an object {lv: [...], en: [...]}
        if (typeof value === 'object') {
            const arr = value[lang] ?? value.lv ?? value.en;
            if (Array.isArray(arr)) return arr.map(String);
            // fallback: if object contains numeric keys, collect them
            const maybeArr = Object.values(value).find((v) => Array.isArray(v));
            if (Array.isArray(maybeArr)) return maybeArr.map(String);
            return [];
        }

        // else can't parse -> return empty
        return [];
    };

    // Attempt to infer a type when missing (safe fallback)
    const inferType = (f: Field): 'radio' | 'checkbox' | 'dropdown' => {
        if (f.type === 'checkbox') return 'checkbox';
        if (f.type === 'dropdown') return 'dropdown';
        // default radio
        return 'radio';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900 py-12 text-white">
            <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
                {/* HEADER */}
                <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs tracking-[0.4em] text-emerald-300 uppercase">Anketu studija</p>

                            <h1 className="mt-2 text-3xl font-semibold">{resolvedTitle}</h1>
                            <p className="mt-2 text-sm text-white/60">
                                ID #{formResult.id} · {formResult.code?.toUpperCase?.() ?? formResult.code}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                className={`rounded-full border px-4 py-2 text-xs ${
                                    lang === 'lv' ? 'border-emerald-300 bg-emerald-500/10 text-emerald-200' : 'border-white/20 bg-white/5'
                                }`}
                                onClick={() => setLang('lv')}
                            >
                                LV
                            </button>
                            <button
                                className={`rounded-full border px-4 py-2 text-xs ${
                                    lang === 'en' ? 'border-emerald-300 bg-emerald-500/10 text-emerald-200' : 'border-white/20 bg-white/5'
                                }`}
                                onClick={() => setLang('en')}
                            >
                                EN
                            </button>

                            <Link href="/admin/anketa" className="rounded-full border bg-white/10 px-4 py-2 text-sm">
                                ← Back
                            </Link>
                        </div>
                    </div>
                </div>

                
                {/* FIELDS */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                        {fields.map((f: Field, i: number) => {
                            const label = tr(f.label);
                            const opts = trOptions(f.options);
                            const type = (f.type ? (f.type as 'radio' | 'checkbox' | 'dropdown') : inferType(f)) ?? 'radio';

                            return (
                                <div key={f.id ?? i} className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                                    <p className="text-xs text-white/60 uppercase">Jautājums {i + 1}</p>

                                    <h3 className="mt-1 text-lg font-semibold">{label}</h3>

                                    {type === 'radio' &&
                                        opts.map((o, j) => (
                                            <div key={j} className="flex items-center gap-3 py-1">
                                                <span className="h-3 w-3 rounded-full border" />
                                                <span className="text-sm">{o}</span>
                                            </div>
                                        ))}

                                    {type === 'checkbox' &&
                                        opts.map((o, j) => (
                                            <div key={j} className="flex items-center gap-3 py-1">
                                                <span className="h-3 w-3 rounded border" />
                                                <span className="text-sm">{o}</span>
                                            </div>
                                        ))}

                                    {type === 'dropdown' && (
                                        <select disabled className="w-full rounded-xl bg-slate-900 p-3">
                                            {opts.map((o, j) => (
                                                <option key={j}>{o}</option>
                                            ))}
                                        </select>
                                    )}

                                    {opts.length === 0 && <p className="text-sm text-white/50 mt-2">Nav opciju</p>}
                                </div>
                            );
                        })}

                        {fields.length === 0 && <p className="text-center text-white/50">Šai anketai vēl nav jautājumu.</p>}
                    </div>

                    <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
                        <p className="text-xs text-white/60 uppercase">META</p>

                        <div className="rounded-xl border border-white/10 p-4">
                            <p className="text-xs">Virsraksts</p>
                            <p className="text-lg font-semibold">{resolvedTitle}</p>
                        </div>

                        <div className="rounded-xl border border-white/10 p-4">
                            <p className="text-xs">Statuss</p>
                            <p className="text-lg font-semibold">{formResult.code === 'private' ? 'Privāta' : 'Publiska'}</p>
                        </div>

                        <div className="rounded-xl border border-white/10 p-4">
                            <p className="text-xs">Jautājumu skaits</p>
                            <p className="text-lg font-semibold">{fields.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ShowAnketa.layout = (page: ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;