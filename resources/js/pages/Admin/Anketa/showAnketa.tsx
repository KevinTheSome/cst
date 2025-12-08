import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';
import { 
    ArrowLeft, 
    Calendar, 
    Hash, 
    Globe, 
    List, 
    AlignLeft, 
    BarChartHorizontal, 
    CheckSquare, 
    ChevronDown, 
    Type,
    CircleDot
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
  fields?: Field[]; // legacy/top-level fields
  created_at?: string;
}

// --- Icons Helper ---
const getFieldIcon = (type: string) => {
    switch (type) {
        case 'text': return <AlignLeft className="h-4 w-4 text-blue-400" />;
        case 'scale': return <BarChartHorizontal className="h-4 w-4 text-purple-400" />;
        case 'dropdown': return <ChevronDown className="h-4 w-4 text-amber-400" />;
        case 'checkbox': return <CheckSquare className="h-4 w-4 text-emerald-400" />;
        default: return <CircleDot className="h-4 w-4 text-rose-400" />; // Radio default
    }
};

const getFieldLabel = (type: string) => {
    switch (type) {
        case 'text': return 'Text Input';
        case 'scale': return 'Linear Scale';
        case 'dropdown': return 'Dropdown';
        case 'checkbox': return 'Checkboxes';
        default: return 'Multiple Choice';
    }
};

export default function ShowAnketa({ formResult }: { formResult: FormData }) {
  const [lang, setLang] = useState<Lang>('lv');

  if (!formResult) return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400">Loading form data...</div>
  );

  // Safely parse data if it's a JSON string
  let parsedData: any = formResult.data ?? {};
  if (typeof parsedData === 'string') {
    try {
      parsedData = JSON.parse(parsedData);
    } catch (e) {
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

    if (typeof rTitle === 'string' && rTitle.trim().length > 0) return rTitle;

    if (rTitle && typeof rTitle === 'object') {
      return (rTitle[lang] ?? rTitle.lv ?? rTitle.en ?? '').toString();
    }

    if (typeof topTitle === 'string' && topTitle.trim().length > 0) return topTitle;

    if (topTitle && typeof topTitle === 'object') {
      return (topTitle[lang] ?? topTitle.lv ?? topTitle.en ?? '').toString();
    }

    return 'Untitled Form';
  };

  const resolvedTitle = resolveTitleString();

  // Translate helper for label/help text etc.
  const tr = (value: any): string =>
    typeof value === 'string' ? value : (value?.[lang] ?? value?.lv ?? value?.en ?? '') ?? '';

  // Translate helper for options — always return an array of strings
  const trOptions = (value: any): string[] => {
    if (!value) return [];

    if (Array.isArray(value)) return value.map(String);

    if (typeof value === 'object') {
      const arr = value[lang] ?? value.lv ?? value.en;
      if (Array.isArray(arr)) return arr.map(String);
      const maybeArr = Object.values(value).find((v) => Array.isArray(v));
      if (Array.isArray(maybeArr)) return maybeArr.map(String);
      return [];
    }

    return [];
  };

  // Attempt to infer a type when missing (safe fallback)
  const inferType = (f: Field): 'radio' | 'checkbox' | 'dropdown' | 'text' | 'scale' => {
    if (!f || !f.type) {
      if (f?.scale) return 'scale';
      if (f?.placeholder || f?.rows) return 'text';
      return 'radio';
    }

    const t = f.type.toString().toLowerCase();
    if (t === 'checkbox') return 'checkbox';
    if (t === 'dropdown' || t === 'select') return 'dropdown';
    if (t === 'text' || t === 'textarea') return 'text';
    if (t === 'scale' || t === 'rating') return 'scale';
    return 'radio';
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* --- Header Card --- */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Type className="h-5 w-5 text-blue-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                            Priekšskatījums
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight leading-snug max-w-2xl">
                        {resolvedTitle}
                    </h1>
                    <div className="mt-3 flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded-lg border border-white/5">
                            <Hash className="h-3.5 w-3.5" /> ID: {formResult.id}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5" /> {formResult.code === 'private' ? 'Privāta' : 'Publiska'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Language Toggle */}
                    <div className="flex rounded-xl bg-slate-800 p-1 border border-white/10">
                        <button
                            onClick={() => setLang('lv')}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                lang === 'lv' 
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            LV
                        </button>
                        <button
                            onClick={() => setLang('en')}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                lang === 'en' 
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            EN
                        </button>
                    </div>

                    <Link
                        href="/admin/anketa"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Atpakaļ
                    </Link>
                </div>
            </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
            
            {/* --- Left Column: Form Content --- */}
            <div className="space-y-6">
                {fields.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                        <List className="mx-auto h-12 w-12 text-slate-600 mb-3" />
                        <p className="text-slate-400">Šai anketai nav pievienoti jautājumi.</p>
                    </div>
                )}

                {fields.map((f: Field, i: number) => {
                    const label = tr(f?.label);
                    const opts = trOptions(f?.options);
                    const type = (f.type ? (f.type as string) : undefined) ? inferType(f) : inferType(f);
                    const safeType = (type as 'radio' | 'checkbox' | 'dropdown' | 'text' | 'scale') ?? 'radio';

                    return (
                        <div key={f.id ?? i} className="group relative rounded-2xl border border-white/10 bg-slate-900/40 p-6 transition-all hover:bg-slate-900/60 hover:border-white/20">
                            {/* Question Header */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex gap-4">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm font-bold text-slate-400 border border-white/5">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-medium text-white leading-snug">{label || <span className="italic text-slate-600">Bez nosaukuma</span>}</h3>
                                        <div className="mt-1 flex items-center gap-2">
                                            {getFieldIcon(safeType)}
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                {getFieldLabel(safeType)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Render Input Type (Disabled Preview) */}
                            <div className="pl-12">
                                {/* RADIO */}
                                {safeType === 'radio' && (
                                    <div className="space-y-2">
                                        {opts.map((o, j) => (
                                            <div key={j} className="flex items-center gap-3 opacity-70">
                                                <div className="h-4 w-4 rounded-full border-2 border-slate-600" />
                                                <span className="text-sm text-slate-300">{o}</span>
                                            </div>
                                        ))}
                                        {opts.length === 0 && <p className="text-xs text-slate-500 italic">No options defined</p>}
                                    </div>
                                )}

                                {/* CHECKBOX */}
                                {safeType === 'checkbox' && (
                                    <div className="space-y-2">
                                        {opts.map((o, j) => (
                                            <div key={j} className="flex items-center gap-3 opacity-70">
                                                <div className="h-4 w-4 rounded border-2 border-slate-600" />
                                                <span className="text-sm text-slate-300">{o}</span>
                                            </div>
                                        ))}
                                        {opts.length === 0 && <p className="text-xs text-slate-500 italic">No options defined</p>}
                                    </div>
                                )}

                                {/* DROPDOWN */}
                                {safeType === 'dropdown' && (
                                    <div className="relative max-w-sm opacity-80">
                                        <div className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-2.5 text-sm text-slate-400 flex justify-between items-center">
                                            <span>{opts[0] || 'Select an option...'}</span>
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                )}

                                {/* TEXT FIELD */}
                                {safeType === 'text' && (
                                    <div className="opacity-80">
                                        <div className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-sm text-slate-500 italic">
                                            {tr(f.placeholder) || 'Text answer placeholder...'}
                                        </div>
                                    </div>
                                )}

                                {/* SCALE FIELD */}
                                {safeType === 'scale' && (
                                    <div className="mt-2">
                                        {f.scale ? (() => {
                                            const sRaw = f.scale as Scale;
                                            const min = Number(sRaw.min ?? 1);
                                            const max = Number(sRaw.max ?? Math.max(5, min + 4));
                                            const minLabel = tr(sRaw.minLabel ?? '');
                                            const maxLabel = tr(sRaw.maxLabel ?? '');
                                            const length = Math.min(12, max - min + 1); // Cap rendering

                                            return (
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between gap-4 text-xs text-slate-400 max-w-md px-1">
                                                        <span>{minLabel}</span>
                                                        <span>{maxLabel}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {Array.from({ length }, (_, idx) => min + idx).map((n) => (
                                                            <div key={n} className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 border border-white/5 text-sm font-medium text-slate-300">
                                                                {n}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })() : (
                                            <p className="text-sm text-rose-400">Invalid scale configuration</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- Right Column: Metadata Sidebar --- */}
            <div className="space-y-6">
                <div className="sticky top-6">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Informācija</h3>
                        
                        <div className="space-y-6">
                            {/* Meta Item */}
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <List className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Jautājumi</p>
                                    <p className="text-lg font-bold text-white">{fields.length}</p>
                                </div>
                            </div>

                            {/* Meta Item */}
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <Globe className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tips</p>
                                    <p className="text-lg font-bold text-white capitalize">{formResult.code}</p>
                                </div>
                            </div>

                            {/* Meta Item */}
                            {formResult.created_at && (
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Izveidots</p>
                                        <p className="text-sm font-bold text-white mt-0.5">
                                            {new Date(formResult.created_at).toLocaleDateString('lv-LV')}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <Link 
                                href={`/admin/anketa/edit/${formResult.id}`}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-bold text-white transition-all hover:bg-slate-700 hover:scale-[1.02]"
                            >
                                Rediģēt saturu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

ShowAnketa.layout = (page: ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;