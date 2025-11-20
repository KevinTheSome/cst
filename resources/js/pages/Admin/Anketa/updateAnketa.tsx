// resources/js/Pages/Admin/Anketa/updateAnketa.tsx

import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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

export default function UpdateAnketa({ formResult }: { formResult: FormResult }) {
    const [title, setTitle] = useState('');
    const [visibility, setVisibility] = useState<Visibility>('public');
    const [fields, setFields] = useState<Field[]>([]);
    const [saving, setSaving] = useState(false);

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

        console.log('Update payload:', payload);

        router.put(`/admin/anketa/update/${formResult.id}`, payload, {
            onSuccess: () => {
                alert('Anketa atjaunināta!');
                setSaving(false);
                // Inertia already redirected via controller -> admin.anketa
            },
            onError: (errors) => {
                console.error('Update error:', errors);
                alert('Kļūda saglabājot izmaiņas.');
                setSaving(false);
            },
        });
    };

    return (
        <div className="mx-auto max-w-3xl p-6 text-black">
            <a href="/admin/anketa" className="btn mb-6 btn-outline btn-sm">
                ← Back to list
            </a>

            <h1 className="mb-4 text-3xl font-bold">Edit Form</h1>

            {/* Title */}
            <input
                type="text"
                placeholder="Form title"
                className="input-bordered input mb-4 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* Visibility Dropdown */}
            <select className="select-bordered select mb-4 w-full" value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)}>
                <option value="public">Public — anyone with the link can answer</option>
                <option value="private">Private — restricted access</option>
            </select>

            {/* Add field button */}
            <button className="btn mb-6 btn-primary" type="button" onClick={addField}>
                Add Question
            </button>

            {/* Fields list */}
            {fields.map((field) => (
                <div key={field.id} className="mb-4 rounded-lg bg-base-200 p-4 shadow">
                    {/* Label */}
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
                        <h3 className="mb-2 font-medium">Options:</h3>

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
                            onClick={() => updateField(field.id, 'options', [...field.options, `Option ${field.options.length + 1}`])}
                        >
                            Add Option
                        </button>
                    </div>
                </div>
            ))}

            <button className={`btn w-full btn-success ${saving ? 'btn-disabled' : ''}`} type="button" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save changes'}
            </button>
        </div>
    );
}

(UpdateAnketa as any).layout = (page: React.ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;
