// resources/js/pages/Admin/Anketa/UpdateAnketa.tsx
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

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

export default function UpdateAnketa() {
  const { props } = usePage();
  const existingForm = props.form as {
    id: number;
    code: string;
    title: { lv: string; en: string };
    data: {
      title: { lv: string; en: string };
      fields: Field[];
    };
  };

  const [title, setTitle] = useState<{ lv: string; en: string }>(existingForm.data.title);
  const [visibility, setVisibility] = useState<Visibility>(existingForm.code as Visibility);
  const [fields, setFields] = useState<Field[]>(existingForm.data.fields || []);
  const [errors, setErrors] = useState<ValidationErrors>({ fieldErrors: {} });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const trimStr = (s?: string) => (s ?? '').trim();
  const findDuplicates = (arr: string[]) => {
    const counts: Record<string, number> = {};
    arr.forEach((a) => {
      counts[a] = (counts[a] || 0) + 1;
    });
    return Object.keys(counts).filter((k) => counts[k] > 1);
  };

  const addField = () => {
    const newField: OptionField = {
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

  const changeFieldType = (id: string, newType: FieldType) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const base = { id: f.id, label: f.label };
        switch (newType) {
          case 'radio':
          case 'checkbox':
          case 'dropdown':
            return { ...base, type: newType, options: { lv: ['Opcija 1'], en: ['Option 1'] } } as OptionField;
          case 'text':
            return { ...base, type: 'text', placeholder: { lv: '', en: '' } } as TextField;
          case 'scale':
            return {
              ...base,
              type: 'scale',
              scale: {
                min: 1,
                max: 10,
                minLabel: { lv: 'Līdz mazāk', en: 'Less' },
                maxLabel: { lv: 'Līdz vairāk', en: 'More' },
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
          const arr = [...f.options[lang]];
          arr[index] = value;
          return { ...f, options: { ...f.options, [lang]: arr } } as OptionField;
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
      })
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
          return { ...f, options: { lv: nv.lv.length ? nv.lv : ['Opcija 1'], en: nv.en.length ? nv.en : ['Option 1'] } } as OptionField;
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

  // --- Validation same as CreateAnketa ---
  const validateField = (f: Field): FieldErrors => {
    const fe: FieldErrors = {};
    const labelLv = trimStr(f.label.lv);
    const labelEn = trimStr(f.label.en);

    if (!labelLv) fe.labelLv = 'Jautājuma teksts (LV) ir obligāts.';
    if (!labelEn) fe.labelEn = 'Question text (EN) is required.';

    if ('options' in f) {
      const optsLv = (f.options.lv || []).map((o) => (o ?? '').trim()).filter(Boolean);
      const optsEn = (f.options.en || []).map((o) => (o ?? '').trim()).filter(Boolean);
      if (!optsLv.length) fe.optionsLv = 'Jābūt vismaz vienai opcijai (LV).';
      if (!optsEn.length) fe.optionsEn = 'Jābūt vismaz vienai opcijai (EN).';
      const dupLv = findDuplicates(optsLv);
      if (dupLv.length) fe.optionsLv = `Duplikātas opcijas LV: ${dupLv.join(', ')}.`;
      const dupEn = findDuplicates(optsEn);
      if (dupEn.length) fe.optionsEn = `Duplicate options EN: ${dupEn.join(', ')}.`;
    }

    if (f.type === 'text') {
      const plLv = trimStr((f as TextField).placeholder.lv);
      const plEn = trimStr((f as TextField).placeholder.en);
      if (plLv.length > 255) fe.placeholderLv = 'Pārāk garš palīgteikums (LV), maks. 255.';
      if (plEn.length > 255) fe.placeholderEn = 'Placeholder too long (EN), max 255.';
    }

    if (f.type === 'scale') {
      const s = (f as ScaleField).scale;
      const min = Number(s.min ?? 1);
      const max = Number(s.max ?? 5);
      if (!Number.isInteger(min) || !Number.isInteger(max)) fe.scale = 'Scale min/max must be integers.';
      else if (min >= max) fe.scale = 'Scale min must be less than max.';
      else if (max - min > 50) fe.scale = 'Scale range too large (max 50 steps).';
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
    setErrors(validateAll());
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

    if (Object.keys(next.fieldErrors).length > 0 || next.titleLv || next.fields || next.visibility) return;

    const payload = {
      code: visibility,
      data: {
        title,
        fields: fields.map((f) => {
          const base: any = {
            id: f.id,
            type: f.type,
            label: { lv: f.label.lv.trim(), en: f.label.en.trim() },
          };
          if (f.type === 'text') {
            base.placeholder = { lv: (f as TextField).placeholder.lv.trim(), en: (f as TextField).placeholder.en.trim() };
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
      },
    };

    try {
      const response = await axios.put(`/admin/anketa/update/${existingForm.id}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status >= 200 && response.status < 300) {
        alert('Anketa atjaunināta!');
        window.location.href = '/admin/anketa';
      } else alert('Serveris atbildēja ar kļūdu.');
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
              <h1 className="mt-2 text-3xl font-semibold text-white">Rediģēt anketu</h1>
              <p className="mt-3 max-w-2xl text-sm text-white/70">
                Rediģējiet nosaukumu, redzamību un jautājumus. Saglabājiet izmaiņas koplietošanai ar komandu.
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
            {/* MULTILINGUAL TITLE WITH ERRORS */}
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
                    className={`rounded-2xl border p-5 shadow-inner ${Object.keys(ferr).length ? 'border-rose-400 bg-rose-900/5' : 'border-white/10 bg-slate-950/50'}`}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Jautājums {idx + 1}</p>
                        <p className="text-sm text-white/70">{field.type === 'radio' ? 'Vienas atbildes izvēle' : field.type === 'checkbox' ? 'Vairākas atbildes' : field.type === 'dropdown' ? 'Izvēlne' : field.type === 'text' ? 'Teksts' : 'Skala'}</p>
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
                            className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${ferr.labelLv ? 'border-rose-400 bg-rose-50/5 text-white' : 'border-white/10 bg-slate-900/60 text-white'} focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200`}
                            value={field.label.lv}
                            onChange={(e) => updateLabel(field.id, 'lv', e.target.value)}
                          />
                          {ferr.labelLv && <p className="mt-1 text-xs text-rose-300">{ferr.labelLv}</p>}
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Question text (EN)"
                            className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${ferr.labelEn ? 'border-rose-400 bg-rose-50/5 text-white' : 'border-white/10 bg-slate-900/60 text-white'} focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200`}
                            value={field.label.en}
                            onChange={(e) => updateLabel(field.id, 'en', e.target.value)}
                          />
                          {ferr.labelEn && <p className="mt-1 text-xs text-rose-300">{ferr.labelEn}</p>}
                        </div>
                      </div>

                      <div>
                        <select
                          className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${ferr.type ? 'border-rose-400 bg-rose-50/5 text-white' : 'border-white/10 bg-slate-900/60 text-white'} focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200`}
                          value={field.type}
                          onChange={(e) => changeFieldType(field.id, e.target.value as FieldType)}
                        >
                          <option value="radio" className="text-black">Multiple Choice (Radio)</option>
                          <option value="checkbox" className="text-black">Select Multiple (Checkbox)</option>
                          <option value="dropdown" className="text-black">Dropdown</option>
                          <option value="text" className="text-black">Text input</option>
                          <option value="scale" className="text-black">Scale (numeric)</option>
                        </select>
                        {ferr.type && <p className="mt-1 text-xs text-rose-300">{ferr.type}</p>}
                      </div>

                      {/* Option fields only */}
                      {'options' in field && (field.type === 'radio' || field.type === 'checkbox' || field.type === 'dropdown') && (
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
                          {ferr.optionsLv && <p className="mt-1 text-xs text-rose-300">{ferr.optionsLv}</p>}
                          {ferr.optionsEn && <p className="mt-1 text-xs text-rose-300">{ferr.optionsEn}</p>}
                        </div>
                      )}

                      {/* Text field */}
                      {field.type === 'text' && (
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Placeholder (LV / EN)</p>
                          <input
                            type="text"
                            placeholder="Placeholder (LV)"
                            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                            value={(field as TextField).placeholder.lv}
                            onChange={(e) => updatePlaceholder(field.id, 'lv', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Placeholder (EN)"
                            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                            value={(field as TextField).placeholder.en}
                            onChange={(e) => updatePlaceholder(field.id, 'en', e.target.value)}
                          />
                          {ferr.placeholderLv && <p className="mt-1 text-xs text-rose-300">{ferr.placeholderLv}</p>}
                          {ferr.placeholderEn && <p className="mt-1 text-xs text-rose-300">{ferr.placeholderEn}</p>}
                        </div>
                      )}

                      {/* Scale field */}
                      {field.type === 'scale' && (
                        <div className="space-y-3">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Scale (numeric)</p>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <label className="text-xs text-white/60">Min</label>
                              <input
                                type="number"
                                min={0}
                                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                                value={(field as ScaleField).scale.min}
                                onChange={(e) => updateScaleValue(field.id, 'min', Number(e.target.value))}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs text-white/60">Max</label>
                              <input
                                type="number"
                                min={1}
                                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                                value={(field as ScaleField).scale.max}
                                onChange={(e) => updateScaleValue(field.id, 'max', Number(e.target.value))}
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs text-white/60">Min label (LV)</label>
                              <input
                                type="text"
                                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                                value={(field as ScaleField).scale.minLabel?.lv ?? ''}
                                onChange={(e) => updateScaleValue(field.id, 'minLabel', e.target.value, 'lv')}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-white/60">Max label (LV)</label>
                              <input
                                type="text"
                                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                                value={(field as ScaleField).scale.maxLabel?.lv ?? ''}
                                onChange={(e) => updateScaleValue(field.id, 'maxLabel', e.target.value, 'lv')}
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs text-white/60">Min label (EN)</label>
                              <input
                                type="text"
                                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                                value={(field as ScaleField).scale.minLabel?.en ?? ''}
                                onChange={(e) => updateScaleValue(field.id, 'minLabel', e.target.value, 'en')}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-white/60">Max label (EN)</label>
                              <input
                                type="text"
                                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                                value={(field as ScaleField).scale.maxLabel?.en ?? ''}
                                onChange={(e) => updateScaleValue(field.id, 'maxLabel', e.target.value, 'en')}
                              />
                            </div>
                          </div>

                          <div className="text-sm text-white/70">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Preview</p>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="text-xs text-white/60 mr-2">{(field as ScaleField).scale.minLabel?.lv}</div>
                              <div className="flex gap-2">
                                {Array.from(
                                  { length: (field as ScaleField).scale.max - (field as ScaleField).scale.min + 1 },
                                  (_, i) => (field as ScaleField).scale.min + i
                                ).map((n) => (
                                  <button key={n} type="button" className="rounded-full border px-3 py-1 bg-white/10 text-white text-sm">
                                    {n}
                                  </button>
                                ))}
                              </div>
                              <div className="text-xs text-white/60 ml-2">{(field as ScaleField).scale.maxLabel?.lv}</div>
                            </div>
                          </div>

                          {ferr.scale && <p className="mt-1 text-xs text-rose-300">{ferr.scale}</p>}
                        </div>
                      )}
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
              Saglabāt izmaiņas
            </button>

            <p className="text-xs text-white/60">
              Saglabāšana atjauninās esošo anketu ar piesaistītajiem jautājumiem. Vēlāk to varēs rediģēt sadaļā “Visas anketas”.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

UpdateAnketa.layout = (page: ReactNode) => <AdminLayout title="Atjaunināt anketu">{page}</AdminLayout>;
