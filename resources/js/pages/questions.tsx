
import axios from 'axios';
import { Head } from '@inertiajs/react';
import {
    ClipboardEvent,
    FormEvent,
    KeyboardEvent,
    useMemo,
    useRef,
    useState,
} from 'react';

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
const countries = [
    'Latvija',
    'Lietuva',
    'Igaunija',
    'Somija',
    'Zviedrija',
    'Norvēģija',
    'Vācija',
    'Polija',
    'Cita',
];
const diseaseOptions = [
    'Asins slimības (piem., leikēmija, anēmija)',
    'Autoimūnas slimības',
    'Neiroloģiskas slimības (piem., Parkinsona, MS)',
    'Diabēts',
    'Sirds slimības',
    'Cita',
];
const severityLevels = ['Viegls', 'Vidējs', 'Smags'];

const CODE_LENGTH = 12;
const CODE_GROUP_SIZE = 4;

const highlightCards = [
    {
        title: 'Soli pa solim',
        accent: '3 tematiskas sadaļas',
        description:
            'Koncentrējieties uz vienu tēmu vienlaikus, redzot precīzu progresu.',
    },
    {
        title: 'Datu drošība',
        accent: 'Šifrēta sūtīšana',
        description: 'Jūsu sensitīvie dati tiek apstrādāti droši un konfidenciāli.',
    },
    {
        title: 'Atbalsts',
        accent: 'Rūpes par pacientu',
        description:
            'Mūsu komanda palīdz interpretēt atbildes un sniedz personalizētus ieteikumus.',
    },
];

export default function Anketa() {
    // ----- questionnaire state -----
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

    // ----- code gate state -----
    const [codeDigits, setCodeDigits] = useState<string[]>(() =>
        Array(CODE_LENGTH).fill(''),
    );
    const [codeError, setCodeError] = useState<string | null>(null);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const [unlockedFormId, setUnlockedFormId] = useState<number | null>(null);

    const setField = (field: keyof Questionnaire, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (value: string) => {
        setFormData((prev) => {
            const exists = prev.diseases.includes(value);
            return {
                ...prev,
                diseases: exists
                    ? prev.diseases.filter((item) => item !== value)
                    : [...prev.diseases, value],
            };
        });
    };

    // ---- slides ----
    const slides = useMemo(
        () => [
            {
                title: 'Demogrāfiskie dati',
                description:
                    'Pastāstiet mums par sevi, lai varam pareizi interpretēt jūsu atbildes.',
                content: (
                    <>
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-slate-900">
                                Dzimums
                            </legend>
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
                                            onChange={() =>
                                                setField('gender', option)
                                            }
                                            className="hidden"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-slate-900">
                                Vecuma grupa
                            </legend>
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
                                            onChange={() =>
                                                setField('ageGroup', option)
                                            }
                                            className="hidden"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <div className="space-y-2">
                            <label
                                htmlFor="country"
                                className="text-xl font-semibold text-slate-900"
                            >
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
                                    onChange={(event) =>
                                        setField(
                                            'countryOther',
                                            event.target.value,
                                        )
                                    }
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
                description:
                    'Atzīmējiet slimības, par kurām vēlaties mūs informēt.',
                content: (
                    <>
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-slate-900">
                                Vai jums ir kāda no šīm slimībām?{' '}
                                <span className="text-base font-normal text-slate-600">
                                    (Atzīmējiet)
                                </span>
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
                                            checked={formData.diseases.includes(
                                                option,
                                            )}
                                            onChange={() =>
                                                handleCheckboxChange(option)
                                            }
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                            {formData.diseases.includes('Cita') && (
                                <input
                                    type="text"
                                    value={formData.otherDisease}
                                    onChange={(event) =>
                                        setField(
                                            'otherDisease',
                                            event.target.value,
                                        )
                                    }
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
                description:
                    'Pastāstiet, kā jūtaties un vai jums jau ir pieredze ar cilmes šūnu terapiju.',
                content: (
                    <>
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-slate-900">
                                Slimības smaguma pakāpe
                            </legend>
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
                                            onChange={() =>
                                                setField('severity', option)
                                            }
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
                                            onChange={() =>
                                                setField('therapy', option)
                                            }
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

    // ----- validation -----
    const validateStep = (step: number): boolean => {
        if (step === 0) {
            if (!formData.gender || !formData.ageGroup || !formData.country) {
                setErrorMessage(
                    'Lūdzu, aizpildiet dzimumu, vecuma grupu un valsti.',
                );
                return false;
            }
            if (
                formData.country === 'Cita' &&
                !formData.countryOther.trim()
            ) {
                setErrorMessage('Lūdzu, norādiet valsti laukā "Cita".');
                return false;
            }
        } else if (step === 1) {
            if (formData.diseases.length === 0) {
                setErrorMessage('Lūdzu, atzīmējiet vismaz vienu slimību.');
                return false;
            }
            if (
                formData.diseases.includes('Cita') &&
                !formData.otherDisease.trim()
            ) {
                setErrorMessage('Lūdzu, aprakstiet citu slimību.');
                return false;
            }
        } else if (step === 2) {
            if (!formData.severity || !formData.therapy) {
                setErrorMessage(
                    'Lūdzu, norādiet slimības smagumu un terapijas pieredzi.',
                );
                return false;
            }
        }

        setErrorMessage(null);
        return true;
    };

    const focusInput = (index: number) => {
        const clamped = Math.min(Math.max(index, 0), CODE_LENGTH - 1);
        const input = inputRefs.current[clamped];
        input?.focus();
        input?.select();
    };

    const handleCodeChange = (value: string, index: number) => {
        const char = value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .slice(0, 1);
        setCodeDigits((prev) => {
            const next = [...prev];
            next[index] = char;
            return next;
        });

        if (char && index < CODE_LENGTH - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (
        event: KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            if (codeDigits[index]) {
                setCodeDigits((prev) => {
                    const next = [...prev];
                    next[index] = '';
                    return next;
                });
            } else if (index > 0) {
                focusInput(index - 1);
                setCodeDigits((prev) => {
                    const next = [...prev];
                    next[index - 1] = '';
                    return next;
                });
            }
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            focusInput(index - 1);
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            focusInput(index + 1);
            return;
        }

        if (event.key === ' ') {
            event.preventDefault();
        }
    };

    const handlePaste = (
        event: ClipboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        event.preventDefault();
        const pasted = event.clipboardData
            .getData('text')
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
        if (!pasted) {
            return;
        }

        setCodeDigits((prev) => {
            const next = [...prev];
            let cursor = index;
            for (const char of pasted) {
                if (cursor >= CODE_LENGTH) {
                    break;
                }
                next[cursor] = char;
                cursor += 1;
            }
            return next;
        });

        const focusIndex = Math.min(index + pasted.length, CODE_LENGTH - 1);
        focusInput(focusIndex);
    };

    const filledCode = codeDigits.join('');
    const charactersRemaining = CODE_LENGTH - filledCode.length;

    const verifyCode = async () => {
        const normalized = filledCode.toUpperCase();
        if (normalized.length < CODE_LENGTH) {
            setCodeError(
                'Pilnais kods satur 12 simbolus (cipari un lielie burti).',
            );
            focusInput(normalized.length);
            return false;
        }

        setVerifying(true);
        setCodeError(null);

        try {
            const resp = await axios.post('/form-codes/verify', {
                code: normalized,
            });

            if (resp.data?.success) {
                setIsCodeVerified(true);
                setUnlockedFormId(resp.data.form_id ?? null);
                setCodeError(null);
                return true;
            } else {
                setCodeError(resp.data?.message ?? 'Kods nav derīgs.');
                return false;
            }
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                const data = err.response?.data;
                if (status === 422 && data?.message) {
                    setCodeError(data.message);
                } else if (data?.message) {
                    setCodeError(data.message);
                } else {
                    setCodeError('Servera kļūda. Mēģiniet vēlāk.');
                }
            } else {
                setCodeError('Neparedzēta kļūda.');
            }
            return false;
        } finally {
            setVerifying(false);
        }
    };

    const resetCode = () => {
        setCodeDigits(Array(CODE_LENGTH).fill(''));
        setCodeError(null);
        focusInput(0);
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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateStep(currentStep)) {
            return;
        }

        try {
            await axios.post('/anketa/answers', {
                form_id: unlockedFormId,
                code: filledCode,
                answers: formData,
            });

            setIsFinished(true);
        } catch (err) {
            console.error(err);
            setErrorMessage('Kļūda saglabājot atbildes. Mēģiniet vēlreiz.');
        }
    };

    return (
        <>
            <Head title="Anketa" />

            <section className="bg-gradient-to-br from-[#f1f5f9] via-white to-[#e8f6ef] py-16 px-4 sm:px-6 lg:px-12">
                <div className="mx-auto max-w-6xl space-y-10">
                    <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-2xl shadow-emerald-100/80 backdrop-blur">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -top-10 right-4 h-32 w-32 rounded-full bg-emerald-100/70 blur-3xl" />
                            <div className="absolute bottom-0 left-6 h-24 w-24 rounded-full bg-teal-100/60 blur-2xl" />
                        </div>
                        <header className="relative text-center">
                            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">
                                Pieteikuma forma
                            </p>
                            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
                                Anketa pacientiem
                            </h1>
                            <p className="mt-4 text-lg text-slate-700">
                                Aizpildiet anketu pa soļiem — katra sadaļa
                                palīdz mums sagatavot personalizētu piedāvājumu
                                un saprast jūsu vajadzības.
                            </p>
                        </header>

                        <div className="relative mt-10 grid gap-4 md:grid-cols-3">
                            {highlightCards.map((card) => (
                                <div
                                    key={card.title}
                                    className="rounded-2xl border border-emerald-100 bg-emerald-50/30 px-4 py-5 text-left shadow-sm shadow-emerald-50"
                                >
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">
                                        {card.accent}
                                    </p>
                                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                                        {card.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-600">
                                        {card.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CODE GATE */}
                    {!isCodeVerified && (
                        <div className="mx-auto max-w-4xl rounded-[28px] border border-emerald-100/80 bg-white/90 p-8 text-center shadow-xl shadow-emerald-100">
                            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-500">
                                Droša piekļuve
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                                Atbloķējiet anketu ar 12 simbolu kodu
                            </h2>
                            <p className="mt-3 text-base text-slate-600">
                                Kodā ir iekļauti 12 cipari vai lielie burti.
                                Ievadiet to blokos ērtākai pārbaudei un spiediet
                                pogu, lai sāktu aizpildīt anketu.
                            </p>

                            <div
                                className="mt-8 flex flex-col items-center gap-5"
                                onClick={() => {
                                    const emptyIndex = codeDigits.findIndex(
                                        (digit) => !digit,
                                    );
                                    focusInput(
                                        emptyIndex === -1
                                            ? CODE_LENGTH - 1
                                            : emptyIndex,
                                    );
                                }}
                            >
                                <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                                    {codeDigits.map((digit, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <input
                                                ref={(el) => {
                                                    inputRefs.current[index] =
                                                        el;
                                                }}
                                                type="text"
                                                inputMode="text"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                spellCheck={false}
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) =>
                                                    handleCodeChange(
                                                        e.target.value,
                                                        index,
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    handleKeyDown(e, index)
                                                }
                                                onPaste={(e) =>
                                                    handlePaste(e, index)
                                                }
                                                disabled={verifying}
                                                className="h-14 w-12 rounded-xl border border-slate-300 bg-white text-center text-xl font-semibold tracking-widest text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                                aria-label={`code-digit-${
                                                    index + 1
                                                }`}
                                            />
                                            {(index + 1) % CODE_GROUP_SIZE ===
                                                0 &&
                                                index < CODE_LENGTH - 1 && (
                                                    <span className="mx-2 text-lg font-bold text-slate-400">
                                                        -
                                                    </span>
                                                )}
                                        </div>
                                    ))}
                                </div>

                                <p className="text-sm text-slate-500">
                                    {charactersRemaining > 0
                                        ? `Atlikuši ${charactersRemaining} simboli`
                                        : 'Kods gatavs iesniegšanai'}
                                </p>

                                <div className="flex flex-wrap justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={verifyCode}
                                        disabled={verifying}
                                        className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:opacity-60"
                                    >
                                        {verifying ? (
                                            <>
                                                <svg
                                                    className="mr-2 h-4 w-4 animate-spin"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                </svg>
                                                Verificē kodu...
                                            </>
                                        ) : (
                                            'Atbloķēt anketu'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetCode}
                                        disabled={verifying}
                                        className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                                    >
                                        Notīrīt laukus
                                    </button>
                                </div>

                                {codeError && (
                                    <p className="text-sm text-red-600">
                                        {codeError}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* QUESTIONNAIRE */}
                    {isCodeVerified && (
                        <>
                            <div className="mb-6">
                                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-slate-500">
                                    <span>{`Solis ${
                                        currentStep + 1
                                    } no ${slides.length}`}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="mt-2 h-2 rounded-full bg-slate-200">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {!isFinished ? (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-10 overflow-hidden rounded-3xl bg-white/95 p-8 shadow-2xl shadow-emerald-100/60 ring-1 ring-slate-100"
                                >
                                    {errorMessage && (
                                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-900">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-semibold text-slate-900">
                                            {slides[currentStep].title}
                                        </h2>
                                        <p className="text-base text-slate-600">
                                            {
                                                slides[currentStep]
                                                    .description
                                            }
                                        </p>
                                    </div>

                                    <div className="animate-fade-in space-y-8 text-slate-800">
                                        {slides[currentStep].content}
                                    </div>

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm text-slate-500">
                                            Forma ir informatīva. Pēc oficiālās
                                            iesniegšanas mēs sazināsimies
                                            personīgi.
                                        </p>
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
                                    <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">
                                        Paldies!
                                    </p>
                                    <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                                        Jūsu atbildes ir saņemtas
                                    </h2>
                                </div>
                            )}
                        </>
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
