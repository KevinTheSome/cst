import { Link } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

type Lang = 'lv' | 'en';

interface Field {
    label: string | { lv?: string; en?: string; eng?: string; lat?: string; LV?: string; EN?: string };
    type: 'radio' | 'checkbox' | 'dropdown';
    options?: string[] | { lv?: string[]; en?: string[]; eng?: string[]; lat?: string[] };
}

interface FormResult {
    id: number;
    code: string;
    title: string | { lv?: string; en?: string };
    results: {
        title: string | { lv?: string; en?: string; eng?: string; lat?: string };
        fields?: Field[];
    };
}

export default function ShowAnketa({ formResult }: { formResult: FormResult }) {
    const [lang, setLang] = useState<Lang>('lv');

    if (!formResult) return <p>Loading...</p>;

    const fields: Field[] = formResult.results?.fields ?? [];

    /** Robust translation helper - handles common key variations */
    const tr = (value: any): string => {
        if (!value) return '';
        if (typeof value === 'string') return value;

        // Direct match first
        if (value[lang]) {
            const v = value[lang];
            return typeof v === 'string' ? v : String(v);
        }

        // Normalize common variations
        const translations: Record<string, string | undefined> = {
            lv: value.lv || value.lat || value.LV || value.latvian || value.Latvian,
            en: value.en || value.eng || value.EN || value.english || value.English,
        };

        // Find first string value in the object as a fallback
        const firstString = Object.values(value).find((v) => typeof v === 'string') as string | undefined;

        return (translations[lang] ?? translations.en ?? translations.lv ?? firstString) || '';
    };

    /** Robust options translator */
    const trOptions = (options: any): string[] => {
        if (!options) return [];
        if (Array.isArray(options)) return options;

        // Same logic as tr() but for arrays
        const optionsMap: Record<string, string[]> = {
            lv: options.lv || options.lat || options.LV || [],
            en: options.en || options.eng || options.EN || [],
        };

        return optionsMap[lang] || optionsMap.en || optionsMap.lv || options.lv || options.en || [];
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900 py-12 text-white">
            <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
                <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/30 p-8 shadow-2xl shadow-black/40">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Anketu studija</p>
                            <h1 className="mt-2 text-3xl font-semibold text-white">{tr(formResult.results?.title) || 'Untitled Form'}</h1>
                            <p className="mt-3 max-w-2xl text-sm text-white/70">ID #{formResult.id} · {formResult.code.toUpperCase()}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">{lang.toUpperCase()}</div>
                            <button
                                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                                    lang === 'lv' ? 'border-emerald-300 bg-emerald-500/10 text-emerald-200' : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'
                                }`}
                                onClick={() => setLang('lv')}
                            >
                                🇱🇻 LV
                            </button>
                            <button
                                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                                    lang === 'en' ? 'border-emerald-300 bg-emerald-500/10 text-emerald-200' : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'
                                }`}
                                onClick={() => setLang('en')}
                            >
                                🇬🇧 EN
                            </button>
                            <Link
                                href="/admin/anketa"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/20"
                            >
                                ← Atpakaļ
                            </Link>
                        </div>
                    </div>
                </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
                    {fields.length === 0 && <p className="py-8 text-center text-white/60 italic">Šai anketai vēl nav jautājumu.</p>}

                    {fields.map((field, index) => {
                        const label = tr(field.label);
                        const options = trOptions(field.options);

                        return (
                            <div key={index} className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 shadow-inner shadow-black/20">
                                <div className="mb-4 flex items-center justify-between text-sm text-white/60">
                                    <p className="text-xs uppercase tracking-[0.3em]">{`Jautājums ${index + 1}`}</p>
                                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{field.type}</span>
                                </div>
                                <h3 className="mb-4 text-lg font-semibold text-white">{label || `Question ${index + 1}`}</h3>

                                {field.type === 'radio' && options.length > 0 && (
                                    <div className="space-y-3">
                                        {options.map((opt, i) => (
                                            <label key={i} className="flex items-center gap-3 text-sm text-white/80">
                                                <span className="h-3 w-3 rounded-full border border-white/30" />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {field.type === 'checkbox' && options.length > 0 && (
                                    <div className="space-y-3">
                                        {options.map((opt, i) => (
                                            <label key={i} className="flex items-center gap-3 text-sm text-white/80">
                                                <span className="h-3 w-3 rounded border border-white/30" />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {field.type === 'dropdown' && (
                                    <select className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none" disabled>
                                        {options.length === 0 ? <option>Nav opciju</option> : options.map((opt, i) => <option key={i}>{opt}</option>)}
                                    </select>
                                )}

                                {(field.type === 'radio' || field.type === 'checkbox') && options.length === 0 && (
                                    <p className="text-sm text-white/50 italic">Nav definētu opciju</p>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/30">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Meta</p>
                    <div className="space-y-4 text-sm text-white/70">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs text-white/60">Virsraksts ({lang.toUpperCase()})</p>
                            <p className="text-lg font-semibold text-white">{tr(formResult.results?.title) || tr(formResult.title)}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs text-white/60">Statuss</p>
                            <p className="text-lg font-semibold text-white">{formResult.code === 'private' ? 'Privāta' : 'Publiska'}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs text-white/60">Jautājumu skaits</p>
                            <p className="text-lg font-semibold text-white">{fields.length}</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
                        Teksts tiek rādīts valodā: {lang.toUpperCase()}. Lai pārbaudītu tulkojumu, izvēlieties citu valodu galvenē.
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

ShowAnketa.layout = (page: ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;
