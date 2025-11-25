import axios from 'axios';
import { useState } from 'react';

interface Field {
    id: string;
    label: { lv: string; en: string };
    type: 'radio' | 'checkbox' | 'dropdown';
    options?: { lv: string[]; en: string[] };
}

interface FormData {
    id: number;
    code: string;
    title: string;
    results: {
        title: string;
        fields: Field[];
    };
    lang?: 'lv' | 'en';
}

export default function Anketa({ form }: { form: FormData | null }) {
    const lang = form?.lang ?? 'lv';
    const fields = form?.results?.fields ?? [];

    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getLabel = (label: { lv: string; en: string }) => label[lang] || label.lv;
    const getOptions = (options?: { lv: string[]; en: string[] }) => (options ? options[lang] || options.lv : []);

    const handleChange = (id: string, value: any) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const handleCheckboxChange = (id: string, option: string) => {
        const current: string[] = Array.isArray(answers[id]) ? answers[id] : [];
        if (current.includes(option)) {
            handleChange(
                id,
                current.filter((o) => o !== option),
            );
        } else {
            handleChange(id, [...current, option]);
        }
    };

    const handleSubmit = async () => {
        if (!form) return;
        setError(null);

        try {
            const response = await axios.post('/anketa/store-answers', {
                form_id: form.id,
                code: form.code,
                answers,
            });

            // Optional: check backend response status/message
            if (response.status === 200) {
                setSubmitted(true);
            } else {
                console.error('Unexpected server response:', response.data);
                setError('Neizdevās nosūtīt anketu.');
            }
        } catch (err: any) {
            console.error('Submission error:', err.response || err);
            const message = err.response?.data?.message || err.response?.data?.error || 'Neizdevās nosūtīt anketu.';
            setError(message);
        }
    };

    if (!form) {
        return <p className="text-red-400">Notikusi kļūda — anketa nav atrasta.</p>;
    }

    return (
        <div className="mx-auto max-w-3xl py-10 text-white">
            <h1 className="mb-6 text-3xl font-bold">{form.results.title}</h1>

            {submitted ? (
                <div className="rounded-2xl border border-emerald-400 bg-emerald-600/20 p-6">
                    <h2 className="text-xl font-semibold text-emerald-300">Paldies! Jūsu anketa ir saglabāta.</h2>
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                        {fields.map((field) => {
                            const options = getOptions(field.options);

                            return (
                                <div key={field.id} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                                    <h3 className="mb-4 text-lg font-semibold">{getLabel(field.label)}</h3>

                                    {/* RADIO */}
                                    {field.type === 'radio' && options.length > 0 && (
                                        <div className="space-y-3">
                                            {options.map((opt) => (
                                                <label key={opt} className="flex cursor-pointer items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name={`field_${field.id}`}
                                                        value={opt}
                                                        checked={answers[field.id] === opt}
                                                        onChange={() => handleChange(field.id, opt)}
                                                        className="h-5 w-5 text-emerald-500"
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {/* CHECKBOX */}
                                    {field.type === 'checkbox' && options.length > 0 && (
                                        <div className="space-y-3">
                                            {options.map((opt) => (
                                                <label key={opt} className="flex cursor-pointer items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={Array.isArray(answers[field.id]) && answers[field.id].includes(opt)}
                                                        onChange={() => handleCheckboxChange(field.id, opt)}
                                                        className="h-5 w-5 rounded text-emerald-500"
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {/* DROPDOWN */}
                                    {field.type === 'dropdown' && (
                                        <select
                                            className="w-full rounded-xl border border-white/20 bg-slate-800 p-3 text-white"
                                            value={answers[field.id] ?? ''}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                        >
                                            <option value="">Izvēlies…</option>
                                            {options.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {error && <div className="mt-6 rounded-xl border border-red-400 bg-red-600/30 p-4">{error}</div>}

                    <button
                        onClick={handleSubmit}
                        className="mt-8 w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold transition hover:bg-emerald-700"
                    >
                        Nosūtīt anketu
                    </button>
                </>
            )}
        </div>
    );
}
