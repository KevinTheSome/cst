import axios from 'axios';
import { Head, Link } from '@inertiajs/react';
import {
    ClipboardEvent,
    FormEvent,
    KeyboardEvent,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useLang } from '@/hooks/useLang';

const CODE_LENGTH = 12;
const CODE_GROUP_SIZE = 4;

type FieldType = 'radio' | 'checkbox' | 'dropdown';
type Lang = 'lv' | 'en';

interface DynamicField {
    id: string;
    label: {
        lv?: string | null;
        en?: string | null;
    };
    type: FieldType;
    options?: {
        lv?: string[] | null;
        en?: string[] | null;
    };
}

interface LoadedForm {
    id: number;
    title: any; // can be string or { lv, en }
    fields: DynamicField[];
}

const highlightCards = [
    {
        title: 'Soli pa solim',
        accent: 'Dinamiski jautājumi',
        description:
            'Jautājumi tiek ielādēti no anketas, kas piesaistīta jūsu kodam.',
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
    const { locale } = useLang();
    const activeLang: Lang = locale === 'en' ? 'en' : 'lv';

    // ----- code gate state -----
    const [codeDigits, setCodeDigits] = useState<string[]>(() =>
        Array(CODE_LENGTH).fill(''),
    );
    const [codeError, setCodeError] = useState<string | null>(null);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    // ----- consent modal -----
    const [consentChoice, setConsentChoice] = useState<
        'pending' | 'accepted' | 'declined'
    >('pending');

    // ----- dynamic anketa state -----
    const [usedCode, setUsedCode] = useState<string | null>(null);
    const [loadedForm, setLoadedForm] = useState<LoadedForm | null>(null);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    // join code digits & sanitize
    const filledCode = useMemo(
        () => codeDigits.join('').replace(/[^0-9A-Z]/gi, ''),
        [codeDigits],
    );
    const charactersRemaining = CODE_LENGTH - filledCode.length;

    const focusInput = (index: number) => {
        const targetIndex = Math.max(0, Math.min(CODE_LENGTH - 1, index));
        const input = inputRefs.current[targetIndex];
        if (input) {
            input.focus();
            input.select();
        }
    };

    const handleDigitChange = (idx: number, value: string) => {
        const char = value.toUpperCase().replace(/[^0-9A-Z]/g, '').charAt(0) || '';
        setCodeDigits((prev) => {
            const next = [...prev];
            next[idx] = char;
            return next;
        });

        if (char && idx < CODE_LENGTH - 1) {
            focusInput(idx + 1);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            if (codeDigits[idx]) {
                setCodeDigits((prev) => {
                    const next = [...prev];
                    next[idx] = '';
                    return next;
                });
            } else if (idx > 0) {
                focusInput(idx - 1);
            }
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            focusInput(idx - 1);
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            focusInput(idx + 1);
            return;
        }

        if (event.key === ' ') {
            event.preventDefault();
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>, index: number) => {
        event.preventDefault();
        const pasted = event.clipboardData
            .getData('text')
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');

        if (!pasted) return;

        setCodeDigits((prev) => {
            const next = [...prev];
            let cursor = index;
            for (const char of pasted) {
                if (cursor >= CODE_LENGTH) break;
                next[cursor] = char;
                cursor += 1;
            }
            return next;
        });

        const focusIndex = Math.min(index + pasted.length, CODE_LENGTH - 1);
        focusInput(focusIndex);
    };

    // ----- verify code & load form from backend -----
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
                setUsedCode(normalized);
                setConsentChoice('pending');

                const form = resp.data.form;
                if (form) {
                    setLoadedForm({
                        id: form.id,
                        title: form.title,
                        fields: Array.isArray(form.fields) ? form.fields : [],
                    });
                } else {
                    setCodeError('Šim kodam nav piesaistīta neviena anketa.');
                    return false;
                }

                return true;
            } else {
                setCodeError(resp.data?.message ?? 'Kods nav derīgs.');
                return false;
            }
        } catch (err: any) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                const data = err.response?.data;
                setCodeError(data?.message ?? 'Servera kļūda. Mēģiniet vēlāk.');
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
        setIsCodeVerified(false);
        setUsedCode(null);
        setLoadedForm(null);
        setAnswers({});
        setSubmitted(false);
        setSubmitError(null);
        setConsentChoice('pending');
        focusInput(0);
    };

    // ----- answer helpers -----
    const handleRadioAnswer = (fieldId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleCheckboxAnswer = (fieldId: string, value: string) => {
        setAnswers((prev) => {
            const current = Array.isArray(prev[fieldId]) ? (prev[fieldId] as string[]) : [];
            const exists = current.includes(value);
            const next = exists ? current.filter((v) => v !== value) : [...current, value];
            return { ...prev, [fieldId]: next };
        });
    };

    const handleDropdownAnswer = (fieldId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [fieldId]: value }));
    };

    // ----- submit answers -----
    const handleSubmitAnswers = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError(null);

        if (!loadedForm || !usedCode) {
            setSubmitError('Nav ielādēta anketa vai kods.');
            return;
        }

        try {
            await axios.post('/anketa/store-answers', {
                form_id: loadedForm.id,
                code: usedCode,
                answers,
            });

            setSubmitted(true);
        } catch (err: any) {
            console.error(err);
            setSubmitError('Kļūda saglabājot atbildes. Mēģiniet vēlreiz.');
        }
    };

    const showConsentModal = isCodeVerified && consentChoice === 'pending';

    return (
        <>
            <Head title="Anketa" />

            {/* CONSENT MODAL */}
            {showConsentModal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 px-4">
                    <div className="w-full max-w-xl rounded-3xl border border-white/30 bg-white p-8 text-center shadow-2xl shadow-slate-900/40">
                        <p className="text-xs uppercase tracking-[0.4em] text-emerald-500">
                            Datu izmantošana
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                            Vai piekrītat datu apstrādei?
                        </h2>
                        <p className="mt-3 text-sm text-slate-600">
                            Anketa apkopo veselības informāciju, lai sagatavotu
                            personalizētu cilmes šūnu terapijas piedāvājumu. Ja
                            nepiekrītat, anketa netiks atvērta.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => setConsentChoice('accepted')}
                                className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500"
                            >
                                Piekrītu
                            </button>
                            <button
                                type="button"
                                onClick={() => setConsentChoice('declined')}
                                className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                            >
                                Nepiekrītu
                            </button>
                        </div>
                        <p className="mt-4 text-xs text-slate-500">
                            Piekrišanu varat atsaukt jebkurā brīdī, rakstot mums.
                        </p>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT (dimmed when modal open) */}
            <div
                className={
                    showConsentModal
                        ? 'pointer-events-none opacity-30 transition'
                        : 'transition'
                }
            >
                <section className="bg-gradient-to-br from-[#f1f5f9] via-white to-[#e8f6ef] py-16 px-4 sm:px-6 lg:px-12">
                    <div className="mx-auto max-w-6xl space-y-10">
                        {/* HERO + HIGHLIGHT CARDS */}
                        <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-2xl shadow-emerald-100/80 backdrop-blur">
                            <div className="pointer-events-none absolute inset-0">
                                <div className="absolute -top-10 right-4 h-32 w-32 rounded-full bg-emerald-100/70 blur-3xl" />
                                <div className="absolute bottom-0 left-6 h-24 w-24 rounded-full bg-teal-100/60 blur-2xl" />
                            </div>
                            <header className="relative text-center">
                                <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">
                                    Pieteikuma forma
                                </p>
                                <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                                    Anketa pacientiem
                                </h1>
                                <p className="mt-4 text-lg text-slate-700">
                                    Aizpildiet anketu – jautājumi tiek ielādēti
                                    dinamiski no sistēmas, izmantojot jūsu kodu.
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
                                    Ievadiet to blokos ērtākai pārbaudei un
                                    spiediet pogu, lai sāktu aizpildīt anketu.
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
                                                        handleDigitChange(
                                                            index,
                                                            e.target.value,
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
                                                {(index + 1) %
                                                    CODE_GROUP_SIZE ===
                                                    0 &&
                                                    index <
                                                        CODE_LENGTH - 1 && (
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

                        {/* AFTER CODE VERIFIED */}
                        {isCodeVerified && consentChoice !== 'pending' && (
                            <>
                                {consentChoice === 'declined' ? (
                                    <div className="rounded-3xl bg-white p-12 text-center shadow-2xl shadow-emerald-100/60 ring-1 ring-emerald-100">
                                        <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">
                                            Piekrišana atteikta
                                        </p>
                                        <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                                            Anketa nav pieejama
                                        </h2>
                                        <p className="mt-3 text-sm text-slate-600">
                                            Datu apstrāde ir nepieciešama, lai
                                            sagatavotu personalizētu
                                            piedāvājumu.
                                        </p>
                                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                            <Link
                                                href="/"
                                                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-800"
                                            >
                                                Atpakaļ uz sākumlapu
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Dynamic anketa form */}
                                        {isCodeVerified &&
                                            loadedForm &&
                                            !submitted && (
                                                <form
                                                    onSubmit={handleSubmitAnswers}
                                                    className="space-y-8 rounded-3xl bg-white/95 p-8 shadow-2xl shadow-emerald-100/60 ring-1 ring-slate-100"
                                                >
                                                    <div className="space-y-2">
                                                        <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">
                                                            Anketa
                                                        </p>
                                                        <h2 className="text-2xl font-semibold text-slate-900">
                                                            {typeof loadedForm.title ===
                                                            'object'
                                                                ? loadedForm
                                                                      .title[
                                                                      activeLang
                                                                  ] ??
                                                                  loadedForm
                                                                      .title.lv ??
                                                                  'Anketa'
                                                                : loadedForm.title ||
                                                                  'Anketa'}
                                                        </h2>
                                                        <p className="text-sm text-slate-600">
                                                            Aizpildiet
                                                            jautājumus un
                                                            iesniedziet
                                                            atbildes.
                                                        </p>
                                                    </div>

                                                    {submitError && (
                                                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                                                            {submitError}
                                                        </div>
                                                    )}

                                                    <div className="space-y-6">
                                                        {loadedForm.fields
                                                            .length === 0 && (
                                                            <p className="text-sm italic text-slate-500">
                                                                Šai anketai nav
                                                                definētu
                                                                jautājumu.
                                                            </p>
                                                        )}

                                                        {loadedForm.fields.map(
                                                            (field, index) => {
                                                                const label =
                                                                    (field
                                                                        .label?.[activeLang] as string) ??
                                                                    (field
                                                                        .label
                                                                        ?.lv as string) ??
                                                                    '';

                                                                const options =
                                                                    (field
                                                                        .options?.[activeLang] as
                                                                        | string[]
                                                                        | undefined) ??
                                                                    (field
                                                                        .options
                                                                        ?.lv as
                                                                        | string[]
                                                                        | undefined) ??
                                                                    [];

                                                                const answer =
                                                                    answers[
                                                                        field.id
                                                                    ];

                                                                return (
                                                                    <div
                                                                        key={
                                                                            field.id ||
                                                                            index
                                                                        }
                                                                        className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
                                                                    >
                                                                        <h3 className="mb-3 text-lg font-semibold text-slate-900">
                                                                            {label ||
                                                                                `Jautājums ${
                                                                                    index +
                                                                                    1
                                                                                }`}
                                                                        </h3>

                                                                        {field.type ===
                                                                            'radio' && (
                                                                            <div className="grid gap-3 sm:grid-cols-2">
                                                                                {options.map(
                                                                                    (
                                                                                        opt,
                                                                                    ) => (
                                                                                        <label
                                                                                            key={
                                                                                                opt
                                                                                            }
                                                                                            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                                                                                                answer ===
                                                                                                opt
                                                                                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                                                                                    : 'border-slate-200 text-slate-700'
                                                                                            }`}
                                                                                        >
                                                                                            <input
                                                                                                type="radio"
                                                                                                name={
                                                                                                    field.id
                                                                                                }
                                                                                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                                                                                                checked={
                                                                                                    answer ===
                                                                                                    opt
                                                                                                }
                                                                                                onChange={() =>
                                                                                                    handleRadioAnswer(
                                                                                                        field.id,
                                                                                                        opt,
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                            <span>
                                                                                                {
                                                                                                    opt
                                                                                                }
                                                                                            </span>
                                                                                        </label>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        {field.type ===
                                                                            'checkbox' && (
                                                                            <div className="grid gap-3 sm:grid-cols-2">
                                                                                {options.map(
                                                                                    (
                                                                                        opt,
                                                                                    ) => {
                                                                                        const current =
                                                                                            Array.isArray(
                                                                                                answer,
                                                                                            )
                                                                                                ? (answer as string[])
                                                                                                : [];
                                                                                        const checked =
                                                                                            current.includes(
                                                                                                opt,
                                                                                            );

                                                                                        return (
                                                                                            <label
                                                                                                key={
                                                                                                    opt
                                                                                                }
                                                                                                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                                                                                                    checked
                                                                                                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                                                                                        : 'border-slate-200 text-slate-700'
                                                                                                }`}
                                                                                            >
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    className="h-4 w-4 rounded border-emerald-500 text-emerald-600 focus:ring-emerald-500"
                                                                                                    checked={
                                                                                                        checked
                                                                                                    }
                                                                                                    onChange={() =>
                                                                                                        handleCheckboxAnswer(
                                                                                                            field.id,
                                                                                                            opt,
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                                <span>
                                                                                                    {
                                                                                                        opt
                                                                                                    }
                                                                                                </span>
                                                                                            </label>
                                                                                        );
                                                                                    },
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        {field.type ===
                                                                            'dropdown' && (
                                                                            <select
                                                                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                                                                value={
                                                                                    typeof answer ===
                                                                                    'string'
                                                                                        ? answer
                                                                                        : ''
                                                                                }
                                                                                onChange={(
                                                                                    e,
                                                                                ) =>
                                                                                    handleDropdownAnswer(
                                                                                        field.id,
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <option value="">
                                                                                    Izvēlieties
                                                                                    atbildi
                                                                                </option>
                                                                                {options.map(
                                                                                    (
                                                                                        opt,
                                                                                    ) => (
                                                                                        <option
                                                                                            key={
                                                                                                opt
                                                                                            }
                                                                                            value={
                                                                                                opt
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                opt
                                                                                            }
                                                                                        </option>
                                                                                    ),
                                                                                )}
                                                                            </select>
                                                                        )}
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col items-center justify-end gap-3 sm:flex-row">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:from-emerald-700 hover:to-teal-600"
                                                        >
                                                            Saglabāt atbildes
                                                        </button>
                                                    </div>
                                                </form>
                                            )}

                                        {/* Thank-you after submit */}
                                        {isCodeVerified &&
                                            loadedForm &&
                                            submitted && (
                                                <div className="rounded-3xl bg-white p-12 text-center shadow-2xl shadow-emerald-100/60 ring-1 ring-emerald-100">
                                                    <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">
                                                        Paldies!
                                                    </p>
                                                    <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                                                        Jūsu atbildes ir
                                                        saglabātas
                                                    </h2>
                                                </div>
                                            )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
