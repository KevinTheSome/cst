interface Field {
    label: string;
    type: 'radio' | 'checkbox' | 'dropdown';
    options?: string[];
}

interface FormResult {
    id: number;
    code: string;
    title: string;
    results: {
        title: string;
        fields?: Field[];
    };
}

export default function ShowAnketa({ formResult }: { formResult: FormResult }) {
    if (!formResult) return <p>Loading...</p>;

    // Safely handle fields
    const fields: Field[] = formResult.results?.fields ?? [];
    console.log('Fields:', fields);

    return (
        <div className="mx-auto max-w-2xl p-6 text-black">
            <a href="/anketa" className="btn mb-6 btn-outline btn-sm">
                ← Back to Forms
            </a>

            <h1 className="mb-4 text-4xl font-bold">{formResult.results?.title || 'Untitled Form'}</h1>
            <p className="mb-6 text-sm opacity-70">Visibility: {formResult.code}</p>

            <div className="space-y-6">
                {fields.length === 0 && <p className="text-gray-500 italic">This form has no questions yet.</p>}

                {fields.map((field, index) => (
                    <div key={index} className="rounded-lg bg-base-200 p-4 shadow">
                        <h3 className="mb-2 text-lg font-semibold">{field.label || 'Untitled Question'}</h3>

                        {/* Radio */}
                        {field.type === 'radio' &&
                            (field.options ?? []).map((opt, i) => (
                                <label key={i} className="label cursor-pointer">
                                    <input type="radio" name={`field-${index}`} className="radio" disabled />
                                    <span className="label-text ml-2">{opt}</span>
                                </label>
                            ))}

                        {/* Checkbox */}
                        {field.type === 'checkbox' &&
                            (field.options ?? []).map((opt, i) => (
                                <label key={i} className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox" disabled />
                                    <span className="label-text ml-2">{opt}</span>
                                </label>
                            ))}

                        {/* Dropdown */}
                        {field.type === 'dropdown' && (
                            <select className="select-bordered select w-full" disabled>
                                {(field.options ?? []).length === 0 ? (
                                    <option>No options</option>
                                ) : (
                                    (field.options ?? []).map((opt, i) => <option key={i}>{opt}</option>)
                                )}
                            </select>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
