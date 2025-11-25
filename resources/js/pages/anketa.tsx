import { Head } from '@inertiajs/react';
import { FormEvent, useMemo, useState } from 'react';

type Questionnaire = {
    gender: string;
    ageGroup: string;
    country: string;
    countryOther: string;
    diseases: string[];
    otherDisease: string;
    severity: string;
    therapy: string;
};

const genderOptions = ['Vīrietis', 'Sieviete', 'Citi / Nevēlos norādīt'];
const ageGroups = ['0–18', '19–35', '36–50', '51+'];
const countries = ['Latvija', 'Lietuva', 'Igaunija', 'Somija', 'Zviedrija', 'Norvēģija', 'Vācija', 'Polija', 'Cita'];
const diseaseOptions = [
    'Asins slimības (piem., leikēmija, anēmija)',
    'Autoimūnas slimības',
    'Neiroloģiskas slimības (piem., Parkinsona, MS)',
    'Diabēts',
    'Sirds slimības',
    'Cita',
];
const severityLevels = ['Viegls', 'Vidējs', 'Smags'];

export default function Anketa() {
    const [formData, setFormData] = useState<Questionnaire>({
        gender: '',
        ageGroup: '',
        country: '',
        countryOther: '',
        diseases: [],
        otherDisease: '',
        severity: '',
        therapy: '',
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const setField = (field: keyof Questionnaire, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (value: string) => {
        setFormData((prev) => {
            const exists = prev.diseases.includes(value);
            return {
                ...prev,
                diseases: exists ? prev.diseases.filter((item) => item !== value) : [...prev.diseases, value],
            };
        });
    };

    const slides = useMemo(
        () => [
            {
                title: 'Demogrāfiskie dati',
                description: 'Pastāstiet mums par sevi, lai varam pareizi interpretēt jūsu atbildes.',
                content: (
                    <>
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-slate-900">Dzimums</legend>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {genderOptions.map((option) => (
                                    <label
                                        key={option}
                                        className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition ${
                                            formData.gender === option
                                                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                                : 'border-slate-200 text-slate-700'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option}
                                            checked={formData.gender === option}
                                            onChange={() => setField('gender', option)}
                                            className="hidden"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-slate-900">Vecuma grupa</legend>
                            <div className="grid gap-3 sm:grid-cols-4">
                                {ageGroups.map((option) => (
                                    <label
                                        key={option}
                                        className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition ${
                                            formData.ageGroup === option
                                                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                                : 'border-slate-200 text-slate-700'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="ageGroup"
                                            value={option}
                                            checked={formData.ageGroup === option}
                                            onChange={() => setField('ageGroup', option)}
                                            className="hidden"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <div className="space-y-2">
                            <label htmlFor="country" className="text-xl font-semibold text-slate-900">
                                Valsts
                            </label>
                            <select
                                id="country"
                                value={formData.country}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setField('country', value);
                                    if (value !== 'Cita') {
                                        setField('countryOther', '');
                                    }
                                }}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            >
                                <option value="">Izvēlieties valsti</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                            {formData.country === 'Cita' && (
                                <input
                                    type="text"
                                    value={formData.countryOther}
                                    onChange={(event) => setField('countryOther', event.target.value)}
                                    placeholder="Norādiet valsti"
                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                />
                            )}
                        </div>
                    </>
                ),
            },
            {
                title: 'Veselības profils',
                description: 'Atzīmējiet slimības, par kurām vēlaties mūs informēt.',
                content: (
                    <>
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-slate-900">
                                Vai jums ir kāda no šīm slimībām?{' '}
                                <span className="text-base font-normal text-slate-600">(Atzīmējiet)</span>
                            </legend>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {diseaseOptions.map((option) => (
                                    <label
                                        key={option}
                                        className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                                            formData.diseases.includes(option)
                                                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                                : 'border-slate-200 text-slate-700'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="mt-1 h-4 w-4 rounded border-emerald-500 text-emerald-600 focus:ring-emerald-500"
                                            checked={formData.diseases.includes(option)}
                                            onChange={() => handleCheckboxChange(option)}
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                            {formData.diseases.includes('Cita') && (
                                <input
                                    type="text"
                                    value={formData.otherDisease}
                                    onChange={(event) => setField('otherDisease', event.target.value)}
                                    placeholder="Aprakstiet citu slimību"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                />
                            )}
                        </fieldset>
                    </>
                ),
            },
            {
                title: 'Slimības smagums un terapija',
                description: 'Pastāstiet, kā jūtaties un vai jums jau ir pieredze ar cilmes šūnu terapiju.',
                content: (
                    <>
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-slate-900">Slimības smaguma pakāpe</legend>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {severityLevels.map((option) => (
                                    <label
                                        key={option}
                                        className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition ${
                                            formData.severity === option
                                                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                                : 'border-slate-200 text-slate-700'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="severity"
                                            value={option}
                                            checked={formData.severity === option}
                                            onChange={() => setField('severity', option)}
                                            className="hidden"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-slate-900">
                                Vai iepriekš esat saņēmis cilmes šūnu terapiju?
                            </legend>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {['Jā', 'Nē'].map((option) => (
                                    <label
                                        key={option}
                                        className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition ${
                                            formData.therapy === option
                                                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                                : 'border-slate-200 text-slate-700'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="therapy"
                                            value={option}
                                            checked={formData.therapy === option}
                                            onChange={() => setField('therapy', option)}
                                            className="hidden"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </>
                ),
            },
        ],
        [
            formData.gender,
            formData.ageGroup,
            formData.country,
            formData.countryOther,
            formData.diseases,
            formData.otherDisease,
            formData.severity,
            formData.therapy,
        ],
    );

    const validateStep = (step: number): boolean => {
        if (step === 0) {
            if (!formData.gender || !formData.ageGroup || !formData.country) {
                setErrorMessage('Lūdzu, aizpildiet dzimumu, vecuma grupu un valsti.');
                return false;
            }
            if (formData.country === 'Cita' && !formData.countryOther.trim()) {
                setErrorMessage('Lūdzu, norādiet valsti laukā "Cita".');
                return false;
            }
        } else if (step === 1) {
            if (formData.diseases.length === 0) {
                setErrorMessage('Lūdzu, atzīmējiet vismaz vienu slimību.');
                return false;
            }
            if (formData.diseases.includes('Cita') && !formData.otherDisease.trim()) {
                setErrorMessage('Lūdzu, aprakstiet citu slimību.');
                return false;
            }
        } else if (step === 2) {
            if (!formData.severity || !formData.therapy) {
                setErrorMessage('Lūdzu, norādiet slimības smagumu un terapijas pieredzi.');
                return false;
            }
        }

        setErrorMessage(null);
        return true;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateStep(currentStep)) {
            return;
        }

        // prepare payload
        const payload = {
            // if you have a real form id, set it here; otherwise omit or set null
            // form_id: <number>|null,
            code: 'anketa', // adjust if you want a different code per form
            title: 'Anketa pacientiem',
            answers: formData,
        };

        // read CSRF token from meta tag that Laravel renders
        const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
        const csrf = tokenMeta?.content ?? '';

        try {
            const res = await fetch('/anketa/answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf,
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error('Server returned non-OK response while saving answers:', text);
                setErrorMessage('Kļūda saglabājot atbildes. Mēģiniet vēlreiz.');
                return;
            }

            const json = await res.json();

            if (json?.ok) {
                setIsFinished(true);
            } else {
                setErrorMessage(json?.message ?? 'Nezināma kļūda saglabājot atbildes.');
            }
        } catch (err) {
            console.error('Failed to submit answers', err);
            setErrorMessage('Savienojuma kļūda. Pārbaudiet interneta savienojumu un mēģiniet vēlreiz.');
        }
    };

    const nextStep = () => {
        if (!validateStep(currentStep)) {
            return;
        }
        setCurrentStep((prev) => Math.min(prev + 1, slides.length - 1));
    };
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
    const isLastStep = currentStep === slides.length - 1;
    const progress = ((currentStep + 1) / slides.length) * 100;

    return (
        <>
            <Head title="Anketa" />
            <section className="bg-gradient-to-br from-[#f1f5f9] via-white to-[#e8f6ef] py-16 px-4 sm:px-6 lg:px-12">
                <div className="mx-auto max-w-5xl">
                    <header className="text-center mb-12">
                        <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Pieteikuma forma</p>
                        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">Anketa pacientiem</h1>
                        <p className="mt-4 text-lg text-slate-700">
                            Aizpildiet anketu pa soļiem — katrs slaids uzdod konkrētus jautājumus, lai mēs varētu sagatavot personalizētu
                            piedāvājumu.
                        </p>
                    </header>

                    <div className="mb-6">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-slate-500">
                            <span>{`Solis ${currentStep + 1} no ${slides.length}`}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-200">
                            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                    </div>

                    {!isFinished ? (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-10 overflow-hidden rounded-3xl bg-white/95 p-8 shadow-2xl shadow-emerald-100/60 ring-1 ring-slate-100"
                        >
                            {errorMessage && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-900">{errorMessage}</div>
                            )}

                            <div className="space-y-3">
                                <h2 className="text-2xl font-semibold text-slate-900">{slides[currentStep].title}</h2>
                                <p className="text-base text-slate-600">{slides[currentStep].description}</p>
                            </div>

                            <div className="animate-fade-in space-y-8 text-slate-800">{slides[currentStep].content}</div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-slate-500">Forma ir informatīva. Pēc oficiālās iesniegšanas mēs sazināsimies personīgi.</p>
                                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                    {currentStep > 0 && (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                                        >
                                            ← Atpakaļ
                                        </button>
                                    )}
                                    {isLastStep ? (
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:from-emerald-700 hover:to-teal-600"
                                        >
                                            Saglabāt atbildes
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:from-emerald-700 hover:to-teal-600"
                                        >
                                            Turpināt →
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="rounded-3xl bg-white p-12 text-center shadow-2xl shadow-emerald-100/60 ring-1 ring-emerald-100">
                            <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">Paldies!</p>
                            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Jūsu atbildes ir saņemtas</h2>
                        </div>
                    )}
                </div>
            </section>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease;
                }
            `}</style>
        </>
    );
}
