import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';

type Lang = 'lv' | 'en';

interface Field {
    label: { lv: string; en: string };
    type: 'radio' | 'checkbox' | 'dropdown';
    options: { lv: string[]; en: string[] };
}

interface FormResult {
    id: number;
    code: string;
    title: { lv?: string; en?: string } | string;
    results: {
        title?: { lv?: string; en?: string } | string;
        fields?: Field[];
    };
}

export default function ShowAnketa({ formResult }: { formResult: FormResult }) {
    const [lang, setLang] = useState<Lang>('lv');

    if (!formResult) return <p>Loading...</p>;

    /** always pick the correct title */
    const resolvedTitle =
        typeof formResult.results?.title === 'string'
            ? formResult.results.title
            : (formResult.results?.title?.[lang] ?? formResult.title?.[lang] ?? formResult.title ?? 'Untitled');

    const fields = formResult.results?.fields ?? [];

    const tr = (value: any) => (typeof value === 'string' ? value : value?.[lang] || value?.lv || value?.en || '');

    const trOptions = (value: any): string[] => {
        if (Array.isArray(value)) return value;
        if (!value) return [];
        return value?.[lang] || value?.lv || value?.en || [];
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
                                ID #{formResult.id} · {formResult.code.toUpperCase()}
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
                        {fields.map((f, i) => {
                            const label = tr(f.label);
                            const opts = trOptions(f.options);

                            return (
                                <div key={i} className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                                    <p className="text-xs text-white/60 uppercase">Jautājums {i + 1}</p>

                                    <h3 className="mt-1 text-lg font-semibold">{label}</h3>

                                    {f.type === 'radio' &&
                                        opts.map((o, j) => (
                                            <div key={j} className="flex items-center gap-3">
                                                <span className="h-3 w-3 rounded-full border"></span>
                                                {o}
                                            </div>
                                        ))}

                                    {f.type === 'checkbox' &&
                                        opts.map((o, j) => (
                                            <div key={j} className="flex items-center gap-3">
                                                <span className="h-3 w-3 rounded border"></span>
                                                {o}
                                            </div>
                                        ))}

                                    {f.type === 'dropdown' && (
                                        <select disabled className="w-full rounded-xl bg-slate-900 p-3">
                                            {opts.map((o, j) => (
                                                <option key={j}>{o}</option>
                                            ))}
                                        </select>
                                    )}
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
