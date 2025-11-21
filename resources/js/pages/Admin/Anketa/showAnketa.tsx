import { useState } from 'react';

type Lang = 'lv' | 'en';

interface Field {
    label: string | { lv?: string; en?: string; eng?: string; lat?: string; LV?: string; EN?: string };
    type: 'radio' | 'checkbox' | 'dropdown';
    options?: string[] | { lv?: string[]; en?: string[]; eng?: string[]; lat?: string[] };
}

interface FormResult {
    id: number;
    code: string;
    title: string | { lv?: string; en?: string };
    results: {
        title: string | { lv?: string; en?: string; eng?: string; lat?: string };
        fields?: Field[];
    };
}

export default function ShowAnketa({ formResult }: { formResult: FormResult }) {
    const [lang, setLang] = useState<Lang>('lv');

    if (!formResult) return <p>Loading...</p>;

    const fields: Field[] = formResult.results?.fields ?? [];

    /** Robust translation helper - handles common key variations */
    const tr = (value: any): string => {
        if (!value) return '';
        if (typeof value === 'string') return value;

        // Direct match first
        if (value[lang]) {
            const v = value[lang];
            return typeof v === 'string' ? v : String(v);
        }

        // Normalize common variations
        const translations: Record<string, string | undefined> = {
            lv: value.lv || value.lat || value.LV || value.latvian || value.Latvian,
            en: value.en || value.eng || value.EN || value.english || value.English,
        };

        // Find first string value in the object as a fallback
        const firstString = Object.values(value).find((v) => typeof v === 'string') as string | undefined;

        return (translations[lang] ?? translations.en ?? translations.lv ?? firstString) || '';
    };

    /** Robust options translator */
    const trOptions = (options: any): string[] => {
        if (!options) return [];
        if (Array.isArray(options)) return options;

        // Same logic as tr() but for arrays
        const optionsMap: Record<string, string[]> = {
            lv: options.lv || options.lat || options.LV || [],
            en: options.en || options.eng || options.EN || [],
        };

        return optionsMap[lang] || optionsMap.en || optionsMap.lv || options.lv || options.en || [];
    };

    return (
        <div className="mx-auto max-w-2xl bg-gray-500 p-6 text-black">
            <a href="/anketa" className="btn mb-6 btn-outline btn-sm">
                Back to Forms
            </a>

            {/* Language Switch */}
            <div className="mb-6 flex gap-3">
                <button className={`btn btn-sm ${lang === 'lv' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setLang('lv')}>
                    LV
                </button>
                <button className={`btn btn-sm ${lang === 'en' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setLang('en')}>
                    EN
                </button>
                {/* Optional: show current lang for debugging */}
                {/* <span className="text-xs self-center opacity-60 ml-2">(Current: {lang})</span> */}
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold">{tr(formResult.results?.title) || 'Untitled Form'}</h1>
            <p className="mb-8 text-sm opacity-70">Code: {formResult.code}</p>

            <div className="space-y-6">
                {fields.length === 0 && <p className="py-8 text-center text-gray-500 italic">This form has no questions yet.</p>}

                {fields.map((field, index) => {
                    const label = tr(field.label);
                    const options = trOptions(field.options);

                    return (
                        <div key={index} className="rounded-lg bg-base-200 p-6 shadow-md">
                            <h3 className="mb-4 text-lg font-semibold">{label || `Question ${index + 1}`}</h3>

                            {/* Radio Buttons */}
                            {field.type === 'radio' && options.length > 0 && (
                                <div className="space-y-3">
                                    {options.map((opt, i) => (
                                        <label key={i} className="label cursor-pointer justify-start gap-3">
                                            <input type="radio" name={`field-${index}`} className="radio radio-sm" disabled />
                                            <span className="label-text">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* Checkboxes */}
                            {field.type === 'checkbox' && options.length > 0 && (
                                <div className="space-y-3">
                                    {options.map((opt, i) => (
                                        <label key={i} className="label cursor-pointer justify-start gap-3">
                                            <input type="checkbox" className="checkbox checkbox-sm" disabled />
                                            <span className="label-text">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* Dropdown */}
                            {field.type === 'dropdown' && (
                                <select className="select-bordered select w-full" disabled>
                                    {options.length === 0 ? (
                                        <option>No options available</option>
                                    ) : (
                                        options.map((opt, i) => (
                                            <option key={i} value={opt}>
                                                {opt}
                                            </option>
                                        ))
                                    )}
                                </select>
                            )}

                            {/* Fallback if no options */}
                            {(field.type === 'radio' || field.type === 'checkbox') && options.length === 0 && (
                                <p className="text-sm text-gray-500 italic">No options defined</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
