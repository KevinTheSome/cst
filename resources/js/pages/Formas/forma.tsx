import axios from 'axios';
import { useState } from 'react';

interface LocalizedString {
lv?: string;
en?: string;
}

interface Field {
id: string;
label: LocalizedString;
type: 'radio' | 'checkbox' | 'dropdown';
options?: { lv: string[]; en: string[] };
}

interface FormData {
id: number;
code: string;
title: LocalizedString;
data: {
title: LocalizedString;
fields: Field[];
};
lang?: 'lv' | 'en';
}

export default function Anketa({ form }: { form: FormData | null }) {
const lang = form?.lang ?? 'lv';
const fields = form?.data?.fields ?? [];

const [answers, setAnswers] = useState<Record<string, any>>({});
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState<string | null>(null);
const [currentSlide, setCurrentSlide] = useState(0);
const batchSize = 3;
const totalSlides = Math.ceil(fields.length / batchSize);
const progressPercent = totalSlides === 0 ? 0 : Math.round(((currentSlide + 1) / totalSlides) * 100);

// Helper to safely extract string from localized object
const tr = (value: string | LocalizedString | undefined) =>
    typeof value === 'string' ? value : value?.[lang] ?? value?.lv ?? value?.en ?? '';

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
            answers: JSON.stringify(answers), // <-- serialize here
        });

        if (response.status === 200) {
            setSubmitted(true);
        } else {
            setError('Neizdevās nosūtīt anketu.');
        }
    } catch (err: any) {
        const message = err.response?.data?.message || err.response?.data?.error || 'Neizdevās nosūtīt anketu.';
        setError(message);
    }
};

if (!form) {
    return (
        <div className="mx-auto h-screen max-w-3xl py-10">
            <div className="rounded-2xl border border-yellow-400 bg-yellow-600/20 p-6 text-yellow-200">
                <h2 className="text-xl font-semibold">Pašlaik anketa nav pieejama.</h2>
                <p className="mt-2 text-yellow-300">Lūdzu, mēģiniet vēlāk.</p>
            </div>
        </div>
    );
}

return (
    <>
        <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-[#ecfbf3] px-4 py-16 text-slate-900 sm:px-8">
            <div className="mx-auto w-full max-w-3xl space-y-8">
                {/* Header */}
                <div className="rounded-[32px] border border-white/70 bg-white/90 p-8 text-center shadow-2xl shadow-slate-200/80">
                    <p className="text-xs uppercase tracking-[0.4em] text-emerald-500">PostDock anketa</p>
                    <h1 className="mt-4 text-3xl font-semibold text-slate-900">{tr(form.data.title)}</h1>
                    <p className="mt-3 text-sm text-slate-600">Aizpildiet soļus — jautājumiem nav pareizo vai nepareizo atbilžu.</p>
                </div>

                {submitted ? (
                    <div className="rounded-2xl border border-emerald-400 bg-emerald-600/20 p-6">
                        <h2 className="text-xl font-semibold text-emerald-300">Paldies! Jūsu anketa ir saglabāta.</h2>
                    </div>
                ) : (
                    <>
                        {/* Progress */}
                        <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-slate-200/70 backdrop-blur">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                                <span>Progress</span>
                                <span>{progressPercent}%</span>
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-slate-200">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="space-y-6">
                            {fields.slice(currentSlide * batchSize, currentSlide * batchSize + batchSize).map((field) => {
                                const options = getOptions(field.options);

                                return (
                                    <div key={field.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-md">
                                        <h3 className="mb-4 text-lg font-semibold text-slate-900">{tr(field.label)}</h3>

                                        {/* RADIO */}
                                        {field.type === 'radio' && options.length > 0 && (
                                            <div className="space-y-3">
                                                {options.map((opt) => (
                                                    <label key={opt} className="flex cursor-pointer items-center gap-3 text-slate-700">
                                                        <input
                                                            type="radio"
                                                            name={`field_${field.id}`}
                                                            value={opt}
                                                            checked={answers[field.id] === opt}
                                                            onChange={() => handleChange(field.id, opt)}
                                                            className="h-5 w-5 text-emerald-500 focus:ring-emerald-500"
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
                                                    <label key={opt} className="flex cursor-pointer items-center gap-3 text-slate-700">
                                                        <input
                                                            type="checkbox"
                                                            checked={Array.isArray(answers[field.id]) && answers[field.id].includes(opt)}
                                                            onChange={() => handleCheckboxChange(field.id, opt)}
                                                            className="h-5 w-5 rounded text-emerald-500 focus:ring-emerald-500"
                                                        />
                                                        <span>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* DROPDOWN */}
                                        {field.type === 'dropdown' && (
                                            <select
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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

                        {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

                        {/* Navigation */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-sm text-slate-500">
                                {totalSlides > 0 ? `Solis ${currentSlide + 1} no ${totalSlides}` : null}
                            </div>
                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                {currentSlide > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
                                        className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                                    >
                                        ← Atpakaļ
                                    </button>
                                )}
                                {currentSlide < totalSlides - 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))}
                                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-sky-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5"
                                    >
                                        Turpināt →
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-sky-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5"
                                    >
                                        Nosūtīt anketu
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
);

}