// resources/js/Pages/Admin/Anketa/updateAnketa.tsx

import { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import type React from 'react';

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
        <div className="mb-2 flex gap-2">
            <button
                onClick={() => switchLanguage('lv')}
                className={`rounded px-4 py-2 text-xs font-semibold transition disabled:opacity-50 ${
                    currentLocale === 'lv'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-green-200'
                }`}
            >
                🇱🇻 Latviešu
            </button>
            <button
                onClick={() => switchLanguage('en')}
                className={`rounded px-4 py-2 text-xs font-semibold transition disabled:opacity-50 ${
                    currentLocale === 'en'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-green-200'
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

        router.put(`/admin/anketa/update/${formResult.id}`, payload, {
            onSuccess: () => {
                alert(__('anketa.update.success'));
                setSaving(false);
            },
            onError: (errors) => {
                console.error('Update error:', errors);
                alert(__('anketa.update.error'));
                setSaving(false);
            },
        });
    };

    return (
        <div className="mx-auto max-w-3xl p-6 text-black">
            {/* Language switcher */}
            <div className="flex justify-end">
                <LanguageSwitcher />
            </div>

            <a href="/admin/anketa" className="btn mb-6 btn-outline btn-sm">
                {__('anketa.update.back')}
            </a>

            <h1 className="mb-4 text-3xl font-bold">{__('anketa.update.title')}</h1>

            {/* Form title */}
            <input
                type="text"
                placeholder={__('anketa.update.form_title_placeholder')}
                className="input-bordered input mb-4 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* Visibility Dropdown */}
            <select
                className="select-bordered select mb-4 w-full"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
            >
                <option value="public">{__('anketa.update.visibility_public')}</option>
                <option value="private">{__('anketa.update.visibility_private')}</option>
            </select>

            {/* Add field button */}
            <button className="btn mb-6 btn-primary" type="button" onClick={addField}>
                {__('anketa.update.add_question')}
            </button>

            {/* Fields list */}
            {fields.map((field) => (
                <div key={field.id} className="mb-4 rounded-lg bg-base-200 p-4 shadow">
                    {/* Question label */}
                    <input
                        type="text"
                        placeholder="Question label"
                        className="input-bordered input mb-3 w-full"
                        value={field.label}
                        onChange={(e) => updateField(field.id, 'label', e.target.value)}
                    />

                    {/* Type */}
                    <select
                        className="select-bordered select mb-3 w-full"
                        value={field.type}
                        onChange={(e) => updateField(field.id, 'type', e.target.value as FieldType)}
                    >
                        <option value="radio">Multiple Choice (Radio)</option>
                        <option value="checkbox">Select Multiple (Checkbox)</option>
                        <option value="dropdown">Dropdown</option>
                    </select>

                    {/* Options */}
                    <div>
                        <h3 className="mb-2 font-medium">{__('anketa.update.options_label')}</h3>

                        {field.options.map((opt, idx) => (
                            <input
                                key={idx}
                                className="input-bordered input mb-2 w-full"
                                value={opt}
                                onChange={(e) => {
                                    const newOptions = [...field.options];
                                    newOptions[idx] = e.target.value;
                                    updateField(field.id, 'options', newOptions);
                                }}
                            />
                        ))}

                        <button
                            className="btn btn-sm btn-secondary"
                            type="button"
                            onClick={() =>
                                updateField(field.id, 'options', [
                                    ...field.options,
                                    `Option ${field.options.length + 1}`,
                                ])
                            }
                        >
                            {__('anketa.update.add_option')}
                        </button>
                    </div>
                </div>
            ))}

            <button
                className={`btn w-full btn-success ${saving ? 'btn-disabled' : ''}`}
                type="button"
                onClick={handleSave}
                disabled={saving}
            >
                {saving ? __('anketa.update.saving') : __('anketa.update.save')}
            </button>
        </div>
    );
}

(UpdateAnketa as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="Anketas">{page}</AdminLayout>
);
