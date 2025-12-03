import { Head } from '@inertiajs/react';
import { FormEvent, useMemo, useState } from 'react';

// --- ICONS ---
const Icons = {
    User: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
    ),
    Calendar: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
    ),
    Globe: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3s-4.5 3.97-4.5 9 2.015 9 4.5 9zM13.5 5.49L12.555 2.1a9.01 9.01 0 01-.865 0l-.945 3.39" /></svg>
    ),
    Activity: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
    ),
    Check: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
    ),
    Alert: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    ),
    ChevronLeft: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
    )
};

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
    'Asins slimības (piem., leikēmija)',
    'Autoimūnas slimības',
    'Neiroloģiskas slimības',
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
                description: 'Pamatinformācija interpretācijai.',
                content: (
                    <div className="space-y-8">
                        {/* Gender */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                                <Icons.User className="h-4 w-4" /> Dzimums
                            </label>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {genderOptions.map((option) => (
                                    <label
                                        key={option}
                                        className={`cursor-pointer relative flex items-center justify-center rounded-xl border p-4 text-sm font-semibold transition-all duration-200 ${
                                            formData.gender === option
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-500'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-slate-50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option}
                                            checked={formData.gender === option}
                                            onChange={() => setField('gender', option)}
                                            className="sr-only"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Age */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                                <Icons.Calendar className="h-4 w-4" /> Vecums
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {ageGroups.map((option) => (
                                    <label
                                        key={option}
                                        className={`cursor-pointer relative flex items-center justify-center rounded-xl border p-3 text-sm font-semibold transition-all duration-200 ${
                                            formData.ageGroup === option
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-500'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-slate-50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="ageGroup"
                                            value={option}
                                            checked={formData.ageGroup === option}
                                            onChange={() => setField('ageGroup', option)}
                                            className="sr-only"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Country */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                                <Icons.Globe className="h-4 w-4" /> Valsts
                            </label>
                            <div className="relative">
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
                                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                                >
                                    <option value="">Izvēlieties valsti...</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                </div>
                            </div>
                            
                            {formData.country === 'Cita' && (
                                <div className="animate-fade-in-up">
                                    <input
                                        type="text"
                                        value={formData.countryOther}
                                        onChange={(event) => setField('countryOther', event.target.value)}
                                        placeholder="Ierakstiet valsts nosaukumu"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ),
            },
            {
                title: 'Veselības profils',
                description: 'Atzīmējiet diagnosticētās slimības.',
                content: (
                    <div className="space-y-6">
                         <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                            <Icons.Activity className="h-4 w-4" /> Slimību vēsture
                        </label>
                        
                        <div className="grid gap-4 sm:grid-cols-2">
                            {diseaseOptions.map((option) => {
                                const isChecked = formData.diseases.includes(option);
                                return (
                                    <label
                                        key={option}
                                        className={`cursor-pointer relative flex items-center gap-4 rounded-xl border p-4 text-sm font-semibold transition-all duration-200 ${
                                            isChecked
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-500'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'}`}>
                                            {isChecked && <Icons.Check className="h-3.5 w-3.5 text-white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={isChecked}
                                            onChange={() => handleCheckboxChange(option)}
                                        />
                                        <span>{option}</span>
                                    </label>
                                );
                            })}
                        </div>
                        {formData.diseases.includes('Cita') && (
                            <div className="animate-fade-in-up">
                                <label className="block mb-2 text-xs font-semibold text-slate-500">Citas slimības apraksts</label>
                                <input
                                    type="text"
                                    value={formData.otherDisease}
                                    onChange={(event) => setField('otherDisease', event.target.value)}
                                    placeholder="Lūdzu precizējiet..."
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>
                        )}
                    </div>
                ),
            },
            {
                title: 'Terapijas statuss',
                description: 'Informācija par slimības gaitu un iepriekšējo ārstēšanu.',
                content: (
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-wider text-slate-500">
                                Smaguma pakāpe
                            </label>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {severityLevels.map((option) => (
                                    <label
                                        key={option}
                                        className={`cursor-pointer relative flex items-center justify-center rounded-xl border p-4 text-sm font-semibold transition-all duration-200 ${
                                            formData.severity === option
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-500'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="severity"
                                            value={option}
                                            checked={formData.severity === option}
                                            onChange={() => setField('severity', option)}
                                            className="sr-only"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-wider text-slate-500">
                                Vai iepriekš saņemta cilmes šūnu terapija?
                            </label>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {['Jā', 'Nē'].map((option) => (
                                    <label
                                        key={option}
                                        className={`cursor-pointer relative flex items-center justify-center rounded-xl border p-4 text-sm font-semibold transition-all duration-200 ${
                                            formData.therapy === option
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-500'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="therapy"
                                            value={option}
                                            checked={formData.therapy === option}
                                            onChange={() => setField('therapy', option)}
                                            className="sr-only"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
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
                setErrorMessage('Lūdzu, aizpildiet visus obligātos laukus.');
                return false;
            }
            if (formData.country === 'Cita' && !formData.countryOther.trim()) {
                setErrorMessage('Lūdzu, norādiet valsti.');
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
                setErrorMessage('Lūdzu, aizpildiet visus laukus.');
                return false;
            }
        }

        setErrorMessage(null);
        return true;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateStep(currentStep)) return;

        const payload = {
            code: 'anketa',
            title: 'Anketa pacientiem',
            answers: formData,
        };

        const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
        const csrf = tokenMeta?.content ?? '';

        try {
            const res = await fetch('/anketa/store-answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf,
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                setErrorMessage('Kļūda saglabājot atbildes. Mēģiniet vēlreiz.');
                return;
            }

            const json = await res.json();
            if (json?.ok) {
                setIsFinished(true);
            } else {
                setErrorMessage(json?.message ?? 'Nezināma kļūda.');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Savienojuma kļūda. Pārbaudiet internetu.');
        }
    };

    const nextStep = () => {
        if (!validateStep(currentStep)) return;
        setCurrentStep((prev) => Math.min(prev + 1, slides.length - 1));
    };

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
    const isLastStep = currentStep === slides.length - 1;
    const progress = ((currentStep + 1) / slides.length) * 100;

    return (
        <>
            <Head title="Anketa" />
            
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
                
                {/* BACKGROUND TECH GRID */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <section className="relative z-10 mx-auto min-h-screen max-w-3xl px-4 py-12 sm:px-6">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 backdrop-blur px-3 py-1 text-xs font-semibold text-emerald-700 mb-6">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Pacientu Portāls
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Veselības Anketa
                        </h1>
                    </div>

                    {!isFinished ? (
                        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                            
                            {/* Progress Bar */}
                            <div className="px-8 pt-8 pb-4">
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                    <span>Solis {currentStep + 1} / {slides.length}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out" 
                                        style={{ width: `${progress}%` }} 
                                    />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">
                                
                                {errorMessage && (
                                    <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                                        <Icons.Alert className="h-5 w-5 shrink-0" />
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{slides[currentStep].title}</h2>
                                    <p className="text-slate-500">{slides[currentStep].description}</p>
                                </div>

                                <div className="animate-fade-in">
                                    {slides[currentStep].content}
                                </div>

                                <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between border-t border-slate-100 pt-6">
                                    {currentStep > 0 ? (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                                        >
                                            <Icons.ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                            Atpakaļ
                                        </button>
                                    ) : (
                                        <div /> 
                                    )}

                                    {isLastStep ? (
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-emerald-600 hover:shadow-emerald-500/30"
                                        >
                                            Iesniegt datus <Icons.Check className="h-4 w-4" />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-emerald-600 hover:shadow-emerald-500/30"
                                        >
                                            Turpināt <Icons.ArrowRight className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-emerald-100 bg-white p-12 text-center shadow-xl shadow-emerald-100/50">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                                <Icons.Check className="h-10 w-10" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Paldies!</h2>
                            <p className="text-lg text-slate-600">
                                Jūsu atbildes ir veiksmīgi saglabātas. <br />
                                Mēs ar jums sazināsimies tuvākajā laikā.
                            </p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-8 text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                            >
                                Atgriezties sākumā
                            </button>
                        </div>
                    )}
                </section>
            </div>
            
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.3s ease-out forwards;
                }
            `}</style>
        </>
    );
}