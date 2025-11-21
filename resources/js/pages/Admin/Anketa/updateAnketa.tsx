// resources/js/Pages/Admin/Anketa/updateAnketa.tsx

import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState, type ReactNode } from 'react';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';

type FieldType = 'radio' | 'checkbox' | 'dropdown';
type Visibility = 'public' | 'private';

interface Field {
    id: string;
    label: string;
    type: FieldType;
    options: string[];
}

interface FormResult {
    id: number;
    code: string; // "public" / "private"
    title: string;
    results: {
        title: string;
        fields?: Field[];
    };
}

/**
 * Inline language switcher (LV / EN) using /locale route
 */
function LanguageSwitcher() {
    const { props } = usePage();
    const currentLocale = (props as any).locale || 'lv';

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;

        try {
            await axios.post('/locale', { locale });
            // reload just lang + locale from Inertia shared props
            router.reload({ only: ['lang', 'locale'] });
        } catch (error) {
            console.error('Language switch failed:', error);
            alert('Failed to switch language. Please try again.');
        }
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => switchLanguage('lv')}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition disabled:opacity-50 ${
                    currentLocale === 'lv' ? 'border-emerald-300 bg-emerald-500/10 text-emerald-200' : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'
                }`}
            >
                🇱🇻 Latviešu
            </button>
            <button
                onClick={() => switchLanguage('en')}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition disabled:opacity-50 ${
                    currentLocale === 'en' ? 'border-emerald-300 bg-emerald-500/10 text-emerald-200' : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'
                }`}
            >
                🇬🇧 English
            </button>
        </div>
    );
}

export default function UpdateAnketa({ formResult }: { formResult: FormResult }) {
    const [title, setTitle] = useState('');
    const [visibility, setVisibility] = useState<Visibility>('public');
    const [fields, setFields] = useState<Field[]>([]);
    const [saving, setSaving] = useState(false);
    const { __ } = useLang();

    useEffect(() => {
        if (!formResult) return;

        setTitle(formResult.results?.title || formResult.title || '');

        const initialVis = (formResult.code === 'private' ? 'private' : 'public') as Visibility;
        setVisibility(initialVis);
        setFields(formResult.results?.fields ?? []);
    }, [formResult]);

    const addField = () => {
        const newField: Field = {
            id: crypto.randomUUID(),
            label: '',
            type: 'radio',
            options: ['Option 1'],
        };

        setFields((prev) => [...prev, newField]);
    };

    const updateField = (id: string, key: keyof Field, value: any) => {
        setFields((prev) => prev.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
    };

    const handleSave = () => {
        setSaving(true);

        const payload = {
            title,
            visibility,
            schema: {
                fields,
            },
        };

        router.put(`/admin/anketa/update/${formResult.id}`, payload as any, {
            onSuccess: () => {
                alert(__('success'));
                setSaving(false);
            },
            onError: (errors) => {
                console.error('Update error:', errors);
                alert(__('error'));
                setSaving(false);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900 py-12 text-white">
            <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
                <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/30 p-8 shadow-2xl shadow-black/40">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Anketu studija</p>
                            <h1 className="mt-2 text-3xl font-semibold text-white">{__('title')}</h1>
                            <p className="mt-3 max-w-2xl text-sm text-white/70">
                                {__('description', 'Rediģējiet lauku tekstus un redzamību pirms publicēšanas.')}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <LanguageSwitcher />
                            <Link
                                href="/admin/anketa"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/20"
                            >
                                ← {__('back')}
                            </Link>
                            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/70 shadow-inner shadow-black/30">
                                {fields.length} jautājumi
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-white/80">{__('title')}</label>
                            <input
                                type="text"
                                placeholder={__('placeholder')}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-white/80">{__('visibility')}</label>
                            <select
                                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value as Visibility)}
                            >
                                <option value="public" className="text-black">
                                    {__('public')}
                                </option>
                                <option value="private" className="text-black">
                                    {__('private')}
                                </option>
                            </select>
                        </div>

                        <button
                            className="inline-flex w-full items-center justify-center rounded-2xl border border-dashed border-emerald-400/60 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:border-emerald-500 hover:bg-emerald-500/20"
                            type="button"
                            onClick={addField}
                        >
                            {__('add question')}
                        </button>

                        <div className="space-y-4">
                            {fields.length === 0 && <p className="text-sm text-white/60">{__('questions')}</p>}
                            {fields.map((field, idx) => (
                                <div key={field.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 shadow-inner shadow-black/20">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                                                {__('label')} {idx + 1}
                                            </p>
                                            <p className="text-sm text-white/70">
                                                {field.type === 'radio'
                                                    ? __('single')
                                                    : field.type === 'checkbox'
                                                      ? __('multi')
                                                      : __('dropdown')}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFields((prev) => prev.filter((f) => f.id !== field.id))}
                                            className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/70 transition hover:border-rose-300/40 hover:bg-rose-500/10 hover:text-white"
                                        >
                                            {__('remove')}
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder={__('placeholder')}
                                            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                            value={field.label}
                                            onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                        />

                                        <select
                                            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                            value={field.type}
                                            onChange={(e) => updateField(field.id, 'type', e.target.value as FieldType)}
                                        >
                                            <option value="radio" className="text-black">
                                                {__('single')}
                                            </option>
                                            <option value="checkbox" className="text-black">
                                                {__('multi')}
                                            </option>
                                            <option value="dropdown" className="text-black">
                                                {__('dropdown')}
                                            </option>
                                        </select>

                                        <div className="space-y-2">
                                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{__('label')}</p>
                                            {field.options.map((opt, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <input
                                                        className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                                        value={opt}
                                                        onChange={(e) => {
                                                            const newOptions = [...field.options];
                                                            newOptions[idx] = e.target.value;
                                                            updateField(field.id, 'options', newOptions);
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newOptions = field.options.filter((_, optionIndex) => optionIndex !== idx);
                                                            updateField(field.id, 'options', newOptions);
                                                        }}
                                                        className="rounded-2xl border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:border-rose-300/40 hover:bg-rose-500/10"
                                                    >
                                                        {__('delete')}
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                className="mt-2 inline-flex items-center rounded-full border border-dashed border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/40"
                                                type="button"
                                                onClick={() =>
                                                    updateField(field.id, 'options', [
                                                        ...field.options,
                                                        `Option ${field.options.length + 1}`,
                                                    ])
                                                }
                                            >
                                                {__('option')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/30">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Rezumējums</p>
                        <div className="space-y-4 text-sm text-white/70">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs text-white/60">{__('anketa.update.form_title')}</p>
                                <p className="text-lg font-semibold text-white">{title || '—'}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs text-white/60">{__('anketa.update.visibility')}</p>
                                <p className="text-lg font-semibold text-white">
                                    {visibility === 'public'
                                        ? __('public')
                                        : __('private')}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs text-white/60">{__('count')}</p>
                                <p className="text-lg font-semibold text-white">{fields.length}</p>
                            </div>
                        </div>
                        <button
                            className="mt-4 w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:opacity-60"
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? __('saving') : __('save')}
                        </button>
                        <p className="text-xs text-white/60">{__( 'Izmaiņas stājas spēkā uzreiz pēc saglabāšanas.')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

UpdateAnketa.layout = (page: ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;
