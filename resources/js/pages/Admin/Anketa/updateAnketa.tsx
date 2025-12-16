import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    Plus, 
    Trash2, 
    Save, 
    Settings, 
    List, 
    AlignLeft, 
    BarChartHorizontal, 
    CheckCircle, 
    AlertTriangle, 
    X, 
    ChevronDown,
    Globe,
    Eye,
    ArrowLeft
} from 'lucide-react';

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

// UUID fallback
const uuid = () => {
  try {
    // @ts-ignore
    if (typeof crypto !== 'undefined' && (crypto as any).randomUUID) return (crypto as any).randomUUID();
  } catch {}
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
};

const trimStr = (s?: string) => (s ?? '').trim();
const findDuplicates = (arr: string[]) => {
  const counts: Record<string, number> = {};
  arr.forEach((a) => {
    counts[a] = (counts[a] || 0) + 1;
  });
  return Object.keys(counts).filter((k) => counts[k] > 1);
};

// --- Helper Icons ---
const FieldIcon = ({ type }: { type: FieldType }) => {
    switch (type) {
        case 'text': return <AlignLeft className="h-4 w-4 text-blue-400" />;
        case 'scale': return <BarChartHorizontal className="h-4 w-4 text-purple-400" />;
        case 'dropdown': return <ChevronDown className="h-4 w-4 text-amber-400" />;
        default: return <List className="h-4 w-4 text-emerald-400" />;
    }
};

export default function UpdateAnketa() {
  const { props } = usePage();

  // props.form may be undefined during SSR/hydration; provide safe defaults
  const rawForm = (props as any)?.form ?? null;

  const initialForm = useMemo(() => {
    if (!rawForm) {
      return {
        id: -1,
        code: 'public',
        title: { lv: '', en: '' },
        data: { title: { lv: '', en: '' }, fields: [] as Field[] },
      };
    }

    // normalize title: prefer top-level title, fallback to data.title
    const titleSource =
      typeof rawForm.title === 'object' && rawForm.title !== null
        ? rawForm.title
        : rawForm.title && typeof rawForm.title === 'string'
        ? { lv: rawForm.title, en: rawForm.title }
        : rawForm.data?.title ?? { lv: '', en: '' };

    const normalizedTitle = {
      lv: titleSource.lv ?? '',
      en: titleSource.en ?? '',
    };

    const schema = Array.isArray(rawForm.data?.fields) ? rawForm.data.fields : Array.isArray(rawForm.fields) ? rawForm.fields : [];

    const normalizedFields: Field[] = schema.map((f: any) => {
      const base: FieldBase = {
        id: f.id ?? uuid(),
        label: {
          lv: f.label?.lv ?? f.label ?? '',
          en: f.label?.en ?? f.label ?? '',
        },
      };

      if (f.type === 'text') {
        return {
          ...base,
          type: 'text',
          placeholder: { lv: f.placeholder?.lv ?? '', en: f.placeholder?.en ?? '' },
        } as TextField;
      }

      if (f.type === 'scale') {
        return {
          ...base,
          type: 'scale',
          scale: {
            min: typeof f.scale?.min === 'number' ? f.scale.min : 1,
            max: typeof f.scale?.max === 'number' ? f.scale.max : 10,
            minLabel: f.scale?.minLabel ?? { lv: '', en: '' },
            maxLabel: f.scale?.maxLabel ?? { lv: '', en: '' },
          },
        } as ScaleField;
      }

      // option types
      return {
        ...base,
        type: (f.type as FieldType) ?? 'radio',
        options: {
          lv: Array.isArray(f.options?.lv) ? f.options.lv : Array.isArray(f.options) ? (f.options as any) : [],
          en: Array.isArray(f.options?.en) ? f.options.en : Array.isArray(f.options) ? (f.options as any) : [],
        },
      } as OptionField;
    });

    return {
      id: rawForm.id ?? -1,
      code: rawForm.code ?? 'public',
      title: normalizedTitle,
      data: {
        title: normalizedTitle,
        fields: normalizedFields,
      },
    };
  }, [rawForm]);

  const [title, setTitle] = useState<{ lv: string; en: string }>({
    lv: initialForm.title.lv ?? '',
    en: initialForm.title.en ?? '',
  });
  const [visibility, setVisibility] = useState<Visibility>((initialForm.code as Visibility) ?? 'public');
  const [fields, setFields] = useState<Field[]>(Array.isArray(initialForm.data?.fields) ? initialForm.data.fields : []);
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

  // keep state in sync if server props update (e.g., navigation/hydration)
  useEffect(() => {
    setTitle({ lv: initialForm.title.lv ?? '', en: initialForm.title.en ?? '' });
    setVisibility((initialForm.code as Visibility) ?? 'public');
    setFields(Array.isArray(initialForm.data?.fields) ? initialForm.data.fields : []);
  }, [initialForm]);

  const addField = () => {
    const newField: OptionField = {
      id: uuid(),
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
            return { ...base, type: newType, options: (f as any).options ?? { lv: ['Opcija 1'], en: ['Option 1'] } } as OptionField;
          case 'text':
            return { ...base, type: 'text', placeholder: { lv: '', en: '' } } as TextField;
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
      })
    );
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
        if (f.type === 'radio' || f.type === 'checkbox' || f.type === 'dropdown') {
          const arr = Array.isArray((f as OptionField).options[lang]) ? [...(f as OptionField).options[lang]] : [];
          arr[index] = value;
          return { ...f, options: { ...(f as OptionField).options, [lang]: arr } } as OptionField;
        }
        return f;
      })
    );
  };

  const addOption = (fieldId: string) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId) return f;
        if (f.type === 'radio' || f.type === 'checkbox' || f.type === 'dropdown') {
          const nextIndex = Math.max(((f as OptionField).options.lv?.length ?? 0), ((f as OptionField).options.en?.length ?? 0)) + 1;
          return {
            ...f,
            options: {
              lv: [...((f as OptionField).options.lv ?? []), `Opcija ${nextIndex}`],
              en: [...((f as OptionField).options.en ?? []), `Option ${nextIndex}`],
            },
          } as OptionField;
        }
        return f;
      })
    );
  };

  const removeOption = (fieldId: string, index: number) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId) return f;
        if (f.type === 'radio' || f.type === 'checkbox' || f.type === 'dropdown') {
          const nv = {
            lv: (f as OptionField).options.lv.filter((_, i) => i !== index),
            en: (f as OptionField).options.en.filter((_, i) => i !== index),
          };
          return {
            ...f,
            options: { lv: nv.lv.length ? nv.lv : ['Opcija 1'], en: nv.en.length ? nv.en : ['Option 1'] },
          } as OptionField;
        }
        return f;
      })
    );
  };

  const updatePlaceholder = (fieldId: string, lang: Lang, value: string) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId) return f;
        if (f.type === 'text') {
          const currentPlaceholder = (f as TextField).placeholder || { lv: '', en: '' };
          return { ...f, placeholder: { ...currentPlaceholder, [lang]: value } } as TextField;
        }
        return f;
      })
    );
  };

  const updateScaleValue = (fieldId: string, key: 'min' | 'max' | 'minLabel' | 'maxLabel', value: any, lang?: Lang) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId) return f;
        if (f.type === 'scale') {
          const currentScale = (f as ScaleField).scale || { min: 1, max: 10, minLabel: { lv: '', en: '' }, maxLabel: { lv: '', en: '' } };
          const s = { ...currentScale };

          if (key === 'min' || key === 'max') {
            let num = Number(value);
            if (!Number.isFinite(num)) num = key === 'min' ? 1 : 10;
            num = Math.round(num);
            num = Math.max(1, Math.min(100, num));
            s[key] = num;
            if (s.min >= s.max) {
              if (key === 'min') s.max = Math.min(100, s.min + 1);
              else s.min = Math.max(1, s.max - 1);
            }
          } else if (key === 'minLabel') {
            s.minLabel = { ...(s.minLabel || { lv: '', en: '' }), [lang as Lang]: value };
          } else if (key === 'maxLabel') {
            s.maxLabel = { ...(s.maxLabel || { lv: '', en: '' }), [lang as Lang]: value };
          }

          return { ...f, scale: s } as ScaleField;
        }
        return f;
      })
    );
  };

  const validateField = (f: Field): FieldErrors => {
    const fe: FieldErrors = {};
    const labelLv = trimStr(f.label.lv);
    const labelEn = trimStr(f.label.en);

    if (!labelLv) fe.labelLv = 'Jautājums (LV) ir obligāts.';
    if (!labelEn) fe.labelEn = 'Question (EN) is required.';

    if ('options' in f) {
      const optsLv = (f as OptionField).options.lv.map((o) => (o ?? '').trim()).filter(Boolean);
      const optsEn = (f as OptionField).options.en.map((o) => (o ?? '').trim()).filter(Boolean);

      if (!optsLv.length) fe.optionsLv = 'Jābūt vismaz vienai opcijai (LV).';
      if (!optsEn.length) fe.optionsEn = 'Jābūt vismaz vienai opcijai (EN).';

      const dupLv = findDuplicates(optsLv);
      if (dupLv.length) fe.optionsLv = `Duplikātas opcijas LV: ${dupLv.join(', ')}.`;
      const dupEn = findDuplicates(optsEn);
      if (dupEn.length) fe.optionsEn = `Duplicate options EN: ${dupEn.join(', ')}.`;
    }

    if (f.type === 'scale') {
      const s = (f as ScaleField).scale;
      const min = Number(s.min ?? 1);
      const max = Number(s.max ?? 5);
      if (!Number.isInteger(min) || !Number.isInteger(max)) fe.scale = 'Min/max must be integers.';
      else if (min >= max) fe.scale = 'Min must be less than max.';
      else if (max - min > 50) fe.scale = 'Range too large (max 50 steps).';
    }

    return fe;
  };

  const validateAll = (): ValidationErrors => {
    const ve: ValidationErrors = { fieldErrors: {} };
    const titleLv = trimStr(title.lv);
    const titleEn = trimStr(title.en);

    if (!titleLv) ve.titleLv = 'Nosaukums (LV) ir obligāts.';
    if (titleLv.length > 255) ve.titleLv = 'Nosaukums pārāk garš.';
    if (titleEn.length > 255) ve.titleEn = 'Title too long.';
    if (!['public', 'private'].includes(visibility)) ve.visibility = 'Nederīga redzamība.';
    if (!Array.isArray(fields) || fields.length === 0) ve.fields = 'Pievienojiet vismaz vienu jautājumu.';

    for (const f of fields) {
      const fe = validateField(f);
      if (Object.keys(fe).length > 0) ve.fieldErrors[f.id] = fe;
    }

    return ve;
  };

  useEffect(() => {
    if (attemptedSubmit) {
      setErrors(validateAll());
    }
  }, [title, visibility, fields]);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* --- Header --- */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Anketu Studija</span>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Rediģēt anketu</h1>
              <p className="mt-2 text-slate-400 max-w-lg">
                Atjauniniet jautājumus, nosaukumus un redzamības iestatījumus.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/anketa"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Atpakaļ
              </Link>
             <Link
                  as="button"
                  method="post" // or "post" if your route uses POST
                  href={`/admin/anketa/update/${initialForm.id}`}
                  data={{
                      title: {
                          lv: title.lv.trim(),
                          en: title.en.trim(),
                      },
                      code: visibility,
                      data: {
                        _method: 'PUT',
                          fields: fields.map(f => {
                              const base: any = {
                                  id: f.id,
                                  type: f.type,
                                  label: {
                                      lv: f.label.lv.trim(),
                                      en: f.label.en.trim(),
                                  },
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
                                      lv: (f as OptionField).options.lv.map(o => o.trim()).filter(Boolean),
                                      en: (f as OptionField).options.en.map(o => o.trim()).filter(Boolean),
                                  };
                              }
                              return base;
                          }),
                      },
                  }}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 hover:scale-105"
              >
                  <Save className="h-4 w-4" />
                  Saglabāt
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          
          {/* --- LEFT COLUMN: CONTENT BUILDER --- */}
          <div className="space-y-8">
            
            {/* General Info Card */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <Globe className="h-5 w-5 text-blue-400" />
                    <h2 className="text-lg font-bold text-white">Pamatinformācija</h2>
                </div>
                
                <div className="grid gap-5">
                    {/* Titles */}
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nosaukums (LV)</label>
                            <input
                                type="text"
                                placeholder="Piem., Klientu apmierinātība"
                                value={title.lv}
                                onChange={(e) => setTitle(t => ({ ...t, lv: e.target.value }))}
                                className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-white focus:outline-none focus:ring-1 ${errors.titleLv ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-500'}`}
                            />
                            {errors.titleLv && <p className="text-xs text-rose-400">{errors.titleLv}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Title (EN)</label>
                            <input
                                type="text"
                                placeholder="e.g., Customer Satisfaction"
                                value={title.en}
                                onChange={(e) => setTitle(t => ({ ...t, en: e.target.value }))}
                                className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-white focus:outline-none focus:ring-1 ${errors.titleEn ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-500'}`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions Builder */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Jautājumi</h2>
                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-white/5">
                        {fields.length} total
                    </span>
                </div>

                {errors.fields && attemptedSubmit && (
                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" /> {errors.fields}
                    </div>
                )}

                {fields.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                        <List className="mx-auto h-12 w-12 text-slate-600 mb-3" />
                        <p className="text-slate-400">Saraksts ir tukšs. Pievienojiet pirmo jautājumu.</p>
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
                                    hasErr ? 'border-rose-500/50 shadow-rose-500/10' : 'border-white/10 hover:border-white/20'
                                }`}
                            >
                                <div className="mb-6 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 font-mono text-sm border border-white/5">
                                            {idx + 1}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Type</span>
                                            <div className="flex items-center gap-2 text-sm font-medium text-white">
                                                <FieldIcon type={field.type} />
                                                <select
                                                    value={field.type}
                                                    onChange={(e) => changeFieldType(field.id, e.target.value as FieldType)}
                                                    className="bg-transparent outline-none cursor-pointer hover:text-emerald-400 transition-colors"
                                                >
                                                    <option value="radio" className="bg-slate-900">Radio Choice</option>
                                                    <option value="checkbox" className="bg-slate-900">Checkbox</option>
                                                    <option value="dropdown" className="bg-slate-900">Dropdown</option>
                                                    <option value="text" className="bg-slate-900">Text Input</option>
                                                    <option value="scale" className="bg-slate-900">Scale 1-10</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeField(field.id)}
                                        className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
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
                                                onChange={(e) => updateLabel(field.id, 'lv', e.target.value)}
                                                className={`w-full rounded-xl border bg-black/20 px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:ring-1 ${ferr.labelLv ? 'border-rose-500' : 'border-white/10 focus:border-emerald-500'}`}
                                            />
                                            {ferr.labelLv && <p className="text-xs text-rose-400">{ferr.labelLv}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <input
                                                type="text"
                                                placeholder="Question (EN)"
                                                value={field.label.en}
                                                onChange={(e) => updateLabel(field.id, 'en', e.target.value)}
                                                className={`w-full rounded-xl border bg-black/20 px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:ring-1 ${ferr.labelEn ? 'border-rose-500' : 'border-white/10 focus:border-emerald-500'}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Dynamic Fields based on Type */}
                                    <div className="rounded-xl bg-black/20 p-4 border border-white/5">
                                        {/* OPTIONS EDITOR */}
                                        {'options' in field && (
                                            <div className="space-y-3">
                                                {Array.isArray(field.options.lv) && field.options.lv.map((_, optIdx) => (
                                                    <div key={optIdx} className="flex gap-2 items-center group/opt">
                                                        <div className="h-2 w-2 rounded-full bg-slate-600 shrink-0" />
                                                        <input 
                                                            value={field.options.lv[optIdx]}
                                                            onChange={(e) => updateOption(field.id, 'lv', optIdx, e.target.value)}
                                                            className="flex-1 bg-transparent border-b border-white/10 px-2 py-1 text-sm text-white focus:border-emerald-500 focus:outline-none"
                                                            placeholder="Opcija (LV)"
                                                        />
                                                        <input 
                                                            value={field.options.en[optIdx]}
                                                            onChange={(e) => updateOption(field.id, 'en', optIdx, e.target.value)}
                                                            className="flex-1 bg-transparent border-b border-white/10 px-2 py-1 text-sm text-white focus:border-emerald-500 focus:outline-none"
                                                            placeholder="Option (EN)"
                                                        />
                                                        <button 
                                                            onClick={() => removeOption(field.id, optIdx)}
                                                            className="opacity-0 group-hover/opt:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                                                        >
                                                            <X className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button 
                                                    onClick={() => addOption(field.id)}
                                                    className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                                                >
                                                    <Plus className="h-3 w-3" /> Add Option
                                                </button>
                                                {(ferr.optionsLv || ferr.optionsEn) && <p className="text-xs text-rose-400 pt-1">{ferr.optionsLv || ferr.optionsEn}</p>}
                                            </div>
                                        )}

                                        {/* TEXT PLACEHOLDER */}
                                        {field.type === 'text' && (
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <input 
                                                    value={(field as TextField).placeholder.lv}
                                                    onChange={(e) => updatePlaceholder(field.id, 'lv', e.target.value)}
                                                    placeholder="Placeholder (LV)"
                                                    className="w-full bg-slate-900/50 rounded-lg border border-white/10 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                                                />
                                                <input 
                                                    value={(field as TextField).placeholder.en}
                                                    onChange={(e) => updatePlaceholder(field.id, 'en', e.target.value)}
                                                    placeholder="Placeholder (EN)"
                                                    className="w-full bg-slate-900/50 rounded-lg border border-white/10 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                                                />
                                            </div>
                                        )}

                                        {/* SCALE CONFIG */}
                                        {field.type === 'scale' && (
                                            <div className="space-y-4">
                                                <div className="flex gap-4">
                                                    <div className="flex-1">
                                                        <label className="text-xs text-slate-500 block mb-1">Min Value</label>
                                                        <input 
                                                            type="number" 
                                                            value={(field as ScaleField).scale.min}
                                                            onChange={(e) => updateScaleValue(field.id, 'min', e.target.value)}
                                                            className="w-full bg-slate-900/50 rounded-lg border border-white/10 px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="text-xs text-slate-500 block mb-1">Max Value</label>
                                                        <input 
                                                            type="number" 
                                                            value={(field as ScaleField).scale.max}
                                                            onChange={(e) => updateScaleValue(field.id, 'max', e.target.value)}
                                                            className="w-full bg-slate-900/50 rounded-lg border border-white/10 px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="p-3 bg-slate-900/50 rounded-lg border border-white/5">
                                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Preview</p>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-xs text-slate-400">{(field as ScaleField).scale.minLabel?.lv || 'Min'}</span>
                                                        <div className="flex gap-1 flex-wrap justify-center">
                                                            {Array.from({ length: Math.min(10, (field as ScaleField).scale.max - (field as ScaleField).scale.min + 1) }).map((_, i) => (
                                                                <div key={i} className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white border border-white/5">
                                                                    {(field as ScaleField).scale.min + i}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-slate-400">{(field as ScaleField).scale.maxLabel?.lv || 'Max'}</span>
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
                    className="w-full rounded-2xl border-2 border-dashed border-emerald-500/20 bg-emerald-500/5 p-4 text-sm font-bold text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2"
                >
                    <Plus className="h-5 w-5" /> Pievienot Jautājumu
                </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: STICKY SETTINGS --- */}
          <div className="space-y-6">
            <div className="sticky top-6 space-y-6">
                <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Iestatījumi</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-white/70 block mb-2">Redzamība</label>
                            <div className="relative">
                                <Eye className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                <select 
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value as Visibility)}
                                    className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                                >
                                    <option value="public" className="bg-slate-900">Publiska</option>
                                    <option value="private" className="bg-slate-900">Privāta</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Jautājumi</span>
                                <span className="text-white font-medium">{fields.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Statuss</span>
                                <span className="text-emerald-400 font-medium">Aktīvs</span>
                            </div>
                        </div>

                        <Link
                            as="button"
                            method="put" // or "post" if your route uses POST
                            href={`/admin/anketa/update/${initialForm.id}`}
                            data={{
                                title: {
                                    lv: title.lv.trim(),
                                    en: title.en.trim(),
                                },
                                code: visibility,
                                data: {
                                    fields: fields.map(f => {
                                        const base: any = {
                                            id: f.id,
                                            type: f.type,
                                            label: {
                                                lv: f.label.lv.trim(),
                                                en: f.label.en.trim(),
                                            },
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
                                                lv: (f as OptionField).options.lv.map(o => o.trim()).filter(Boolean),
                                                en: (f as OptionField).options.en.map(o => o.trim()).filter(Boolean),
                                            };
                                        }
                                        return base;
                                    }),
                                },
                            }}
                            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 hover:scale-105"
                        >
                            <Save className="h-4 w-4" />
                            Saglabāt
                        </Link>

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
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
                  onClick={() => modalState.onClose ? modalState.onClose() : setModalState(p => ({...p, isOpen: false}))}
              />
              <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="p-6 text-center">
                      <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border ${
                          modalState.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' : 'border-rose-500/20 bg-rose-500/10 text-rose-500'
                      }`}>
                          {modalState.type === 'success' ? <CheckCircle className="h-8 w-8" /> : <AlertTriangle className="h-8 w-8" />}
                      </div>
                      
                      <h3 className="mb-2 text-xl font-bold text-white">
                          {modalState.title}
                      </h3>
                      
                      <p className="mb-6 text-sm text-slate-400 leading-relaxed">
                          {modalState.message}
                      </p>

                      <button
                          onClick={() => modalState.onClose ? modalState.onClose() : setModalState(p => ({...p, isOpen: false}))}
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

UpdateAnketa.layout = (page: ReactNode) => <AdminLayout title="Atjaunināt anketu">{page}</AdminLayout>;