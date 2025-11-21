import axios from 'axios';
import { useState } from 'react';

type FieldType = 'radio' | 'checkbox' | 'dropdown';
type Visibility = 'public' | 'private';

interface Field {
    id: string;
    label: {
        lv: string;
        en: string;
    };
    type: FieldType;
    options: {
        lv: string[];
        en: string[];
    };
}

export default function CreateAnketa() {
    const [title, setTitle] = useState({ lv: '', en: '' });
    const [visibility, setVisibility] = useState<Visibility>('public');
    const [fields, setFields] = useState<Field[]>([]);

    const addField = () => {
        const newField: Field = {
            id: crypto.randomUUID(),
            label: { lv: '', en: '' },
            type: 'radio',
            options: {
                lv: ['Opcija 1'],
                en: ['Option 1'],
            },
        };

        setFields((prev) => [...prev, newField]);
    };

    const updateField = (id: string, key: keyof Field, value: any) => {
        setFields((prev) => prev.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
    };

    const updateOption = (id: string, lang: 'lv' | 'en', index: number, newValue: string) => {
        setFields((prev) =>
            prev.map((field) => {
                if (field.id !== id) return field;

                const updated = { ...field };
                updated.options[lang][index] = newValue;
                return updated;
            }),
        );
    };

    const addOption = (id: string) => {
        setFields((prev) =>
            prev.map((field) => {
                if (field.id !== id) return field;

                return {
                    ...field,
                    options: {
                        lv: [...field.options.lv, `Opcija ${field.options.lv.length + 1}`],
                        en: [...field.options.en, `Option ${field.options.en.length + 1}`],
                    },
                };
            }),
        );
    };

    const submitForm = async () => {
        const payload = {
            visibility,
            schema: {
                title,
                fields,
            },
        };

        console.log('Submitting payload:', payload);

        try {
            await axios.post('/admin/anketa/store', payload, {
                headers: { 'Content-Type': 'application/json' },
            });
            alert('Form created!');
        } catch (err) {
            alert('Error creating form.');
            console.error(err);
        }
    };

    return (
        <div className="mx-auto max-w-3xl p-6 text-black">
            <h1 className="mb-4 text-3xl font-bold">Create New Form</h1>

            {/* MULTILINGUAL TITLE */}
            <input
                type="text"
                placeholder="Form Title (Latvian)"
                className="input-bordered input mb-2 w-full"
                value={title.lv}
                onChange={(e) => setTitle({ ...title, lv: e.target.value })}
            />

            <input
                type="text"
                placeholder="Form Title (English)"
                className="input-bordered input mb-4 w-full"
                value={title.en}
                onChange={(e) => setTitle({ ...title, en: e.target.value })}
            />

            {/* VISIBILITY */}
            <select className="select-bordered select mb-4 w-full" value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)}>
                <option value="public">Public — anyone with the link can answer</option>
                <option value="private">Private — restricted access</option>
            </select>

            <button className="btn mb-6 btn-primary" onClick={addField}>
                Add Question
            </button>

            {/* FIELDS */}
            {fields.map((field) => (
                <div key={field.id} className="mb-4 rounded-lg bg-base-200 p-4 shadow">
                    {/* LABELS */}
                    <h3 className="font-bold">Label</h3>

                    <input
                        type="text"
                        placeholder="Label (LV)"
                        className="input-bordered input mb-2 w-full"
                        value={field.label.lv}
                        onChange={(e) => {
                            const updated = { ...field.label, lv: e.target.value };
                            updateField(field.id, 'label', updated);
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Label (EN)"
                        className="input-bordered input mb-3 w-full"
                        value={field.label.en}
                        onChange={(e) => {
                            const updated = { ...field.label, en: e.target.value };
                            updateField(field.id, 'label', updated);
                        }}
                    />

                    {/* TYPE */}
                    <select
                        className="select-bordered select mb-3 w-full"
                        value={field.type}
                        onChange={(e) => updateField(field.id, 'type', e.target.value as FieldType)}
                    >
                        <option value="radio">Multiple Choice (Radio)</option>
                        <option value="checkbox">Select Multiple (Checkbox)</option>
                        <option value="dropdown">Dropdown</option>
                    </select>

                    {/* OPTIONS */}
                    <h3 className="mb-2 font-bold">Options</h3>

                    {field.options.lv.map((_, idx) => (
                        <div key={idx} className="mb-2 grid grid-cols-2 gap-2">
                            <input
                                className="input-bordered input w-full"
                                placeholder="Option (LV)"
                                value={field.options.lv[idx]}
                                onChange={(e) => updateOption(field.id, 'lv', idx, e.target.value)}
                            />
                            <input
                                className="input-bordered input w-full"
                                placeholder="Option (EN)"
                                value={field.options.en[idx]}
                                onChange={(e) => updateOption(field.id, 'en', idx, e.target.value)}
                            />
                        </div>
                    ))}

                    <button className="btn btn-sm btn-secondary" onClick={() => addOption(field.id)}>
                        Add Option LV/EN
                    </button>
                </div>
            ))}

            <button className="btn w-full btn-success" onClick={submitForm}>
                Save Form
            </button>
        </div>
    );
}
