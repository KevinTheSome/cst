// resources/js/pages/Admin/Anketa/showAnketa.tsx
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

type FieldType = 'radio' | 'checkbox' | 'dropdown' | 'text' | 'scale';
type Lang = 'lv' | 'en';

type FieldBase = {
  id: string;
  label: { lv: string; en: string };
  type: FieldType;
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

type Anketa = {
  title: { lv: string; en: string };
  visibility: 'public' | 'private';
  fields: Field[];
};

type Props = {
  anketa: Anketa;
  lang: Lang;
};

export default function ShowAnketa({ anketa, lang }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Anketu studija</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{anketa.title[lang]}</h1>
            <p className="mt-2 text-sm text-white/70">
              Redzamība: {anketa.visibility === 'public' ? 'Publiska' : 'Privāta'}
            </p>
          </div>
          <Link
            href="/admin/anketa"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/20"
          >
            ← Atpakaļ
          </Link>
        </div>

        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
          {anketa.fields.length === 0 && (
            <p className="text-sm text-white/60">Šajā anketā nav jautājumu.</p>
          )}

          {anketa.fields.map((field, idx) => (
            <div
              key={field.id}
              className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 shadow-inner"
            >
              <div className="mb-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Jautājums {idx + 1}
                </p>
                <p className="text-sm text-white/70">{field.label[lang]}</p>
              </div>

              {/* OPTIONS */}
              {'options' in field && field.type !== 'text' && field.type !== 'scale' && (
                <div className="flex flex-col gap-2">
                  {field.options[lang].map((opt, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white text-sm"
                    >
                      {opt}
                    </div>
                  ))}
                  {field.options[lang].length === 0 && (
                    <p className="text-xs text-white/50 mt-1">Nav opciju</p>
                  )}
                </div>
              )}

              {/* TEXT FIELD */}
              {field.type === 'text' && (
                <div className="mt-2">
                  <p className="text-sm text-white/70">
                    { (field as TextField).placeholder[lang] || '—' }
                  </p>
                </div>
              )}

              {/* SCALE FIELD */}
              {field.type === 'scale' && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/60 mr-2">
                      {(field as ScaleField).scale.minLabel?.[lang] || ''}
                    </span>
                    <div className="flex gap-2">
                      {Array.from(
                        {
                          length:
                            (field as ScaleField).scale.max - (field as ScaleField).scale.min + 1,
                        },
                        (_, i) => (field as ScaleField).scale.min + i
                      ).map((n) => (
                        <span
                          key={n}
                          className="inline-block rounded-full border px-3 py-1 text-sm bg-white/10"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-white/60 ml-2">
                      {(field as ScaleField).scale.maxLabel?.[lang] || ''}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ShowAnketa.layout = (page: ReactNode) => <AdminLayout title="Anketa">{page}</AdminLayout>;
