import { useLang } from '@/hooks/useLang';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { ClipboardEvent, FormEvent, KeyboardEvent, useMemo, useRef, useState } from 'react';

// --- ICONS ---
const Icons = {
    ShieldCheck: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
    ),
    Lock: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
    ),
    Unlock: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
    ),
    Alert: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
    ),
    Check: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    ),
    ArrowLeft: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
    )
};

const CODE_LENGTH = 12;
const CODE_GROUP_SIZE = 4;

type FieldType = 'radio' | 'checkbox' | 'dropdown' | 'text' | 'scale';
type Lang = 'lv' | 'en';

interface DynamicField {
    id: string;
    label: { lv?: string | null; en?: string | null };
    type: FieldType;
    options?: { lv?: string[] | null; en?: string[] | null };
    placeholder?: { lv?: string | null; en?: string | null };
    scale?: {
        min: number;
        max: number;
        minLabel?: { lv?: string | null; en?: string | null };
        maxLabel?: { lv?: string | null; en?: string | null };
    };
}

interface LoadedForm {
    id: number;
    title: any;
    fields: DynamicField[];
}

const highlightCards = [
    {
        title: 'Soli pa solim',
        accent: 'Dinamiski jautājumi',
        description: 'Jautājumi tiek ielādēti no anketas, kas piesaistīta jūsu kodam.',
    },
    {
        title: 'Datu drošība',
        accent: 'Šifrēta sūtīšana',
        description: 'Jūsu sensitīvie dati tiek apstrādāti droši un konfidenciāli.',
    },
    {
        title: 'Atbalsts',
        accent: 'Rūpes par pacientu',
        description: 'Mūsu komanda palīdz interpretēt atbildes un sniedz ieteikumus.',
    },
];

export default function Anketa() {
    const { locale } = useLang();
    const activeLang: Lang = locale === 'en' ? 'en' : 'lv';

    // State
    const [codeDigits, setCodeDigits] = useState<string[]>(() => Array(CODE_LENGTH).fill(''));
    const [codeError, setCodeError] = useState<string | null>(null);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [consentChoice, setConsentChoice] = useState<'pending' | 'accepted' | 'declined'>('pending');
    const [usedCode, setUsedCode] = useState<string | null>(null);
    const [loadedForm, setLoadedForm] = useState<LoadedForm | null>(null);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    
    // Slide Show State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Helpers
    const filledCode = useMemo(() => codeDigits.join('').replace(/[^0-9A-Z]/gi, ''), [codeDigits]);
    const charactersRemaining = CODE_LENGTH - filledCode.length;

    const focusInput = (index: number) => {
        const targetIndex = Math.max(0, Math.min(CODE_LENGTH - 1, index));
        const input = inputRefs.current[targetIndex];
        input?.focus();
        input?.select();
    };

    const handleDigitChange = (idx: number, value: string) => {
        const char = value.toUpperCase().replace(/[^0-9A-Z]/g, '').charAt(0) || '';
        setCodeDigits((prev) => {
            const next = [...prev];
            next[idx] = char;
            return next;
        });
        if (char && idx < CODE_LENGTH - 1) focusInput(idx + 1);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            if (codeDigits[idx]) {
                setCodeDigits((prev) => { const next = [...prev]; next[idx] = ''; return next; });
            } else if (idx > 0) {
                focusInput(idx - 1);
            }
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault(); focusInput(idx - 1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault(); focusInput(idx + 1);
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>, index: number) => {
        event.preventDefault();
        const pasted = event.clipboardData.getData('text').toUpperCase().replace(/[^A-Z0-9]/g, '');
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
        focusInput(Math.min(index + pasted.length, CODE_LENGTH - 1));
    };

    // ----- Code Verification -----
    const verifyCode = async () => {
        const normalized = filledCode.toUpperCase();
        if (normalized.length < CODE_LENGTH) {
            setCodeError('Kods satur 12 simbolus.');
            focusInput(normalized.length);
            return;
        }
        setVerifying(true);
        setCodeError(null);

        try {
            const resp = await axios.post('/form-codes/verify', { code: normalized });
            if (resp.data?.success) {
                setIsCodeVerified(true);
                setUsedCode(normalized);
                setConsentChoice('pending');
                const form = resp.data.form;
                if (form) {
                    setLoadedForm({ id: form.id, title: form.title, fields: form.fields || [] });
                } else {
                    setCodeError('Šim kodam nav piesaistīta anketa.');
                }
            } else {
                setCodeError(resp.data?.message ?? 'Kods nav derīgs.');
            }
        } catch (err: any) {
            setCodeError('Servera kļūda. Mēģiniet vēlāk.');
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
        setCurrentQuestionIndex(0);
        setTimeout(() => focusInput(0), 100);
    };

    // ----- Slideshow Navigation -----
    const handleNext = () => {
        if (!loadedForm) return;
        if (currentQuestionIndex < loadedForm.fields.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    // ----- Answer Handlers -----
    // Auto-advance logic: if user selects radio or scale, wait a bit then go next
    const autoAdvance = () => {
        if (currentQuestionIndex < (loadedForm?.fields.length || 0) - 1) {
            setTimeout(() => handleNext(), 350); 
        }
    };

    const handleRadioAnswer = (fieldId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [fieldId]: value }));
        autoAdvance();
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

    const handleTextAnswer = (fieldId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleScaleAnswer = (fieldId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [fieldId]: value }));
        autoAdvance();
    };

    const handleSubmitAnswers = async (event?: FormEvent) => {
        event?.preventDefault();
        setSubmitError(null);
        if (!loadedForm || !usedCode) return;

        try {
            await axios.post('/anketa/store-answers', { form_id: loadedForm.id, code: usedCode, answers });
            setSubmitted(true);
        } catch (err) {
            setSubmitError('Kļūda saglabājot atbildes.');
        }
    };

    // Render Helpers
    const showConsentModal = isCodeVerified && consentChoice === 'pending';
    const totalQuestions = loadedForm?.fields.length || 0;
    const currentField = loadedForm?.fields[currentQuestionIndex];
    const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

    return (
        <>
            <Head title="Anketa" />

            {/* CONSENT MODAL */}
            {showConsentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 animate-fade-in">
                    <div className="w-full max-w-lg rounded-3xl border border-white/40 bg-white/95 p-8 text-center shadow-2xl shadow-slate-900/20">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Icons.ShieldCheck className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Datu apstrādes piekrišana</h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            Anketa apkopo sensitīvu veselības informāciju, lai sagatavotu personalizētu terapijas piedāvājumu.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            <button onClick={() => setConsentChoice('declined')} className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                                Nepiekrītu
                            </button>
                            <button onClick={() => setConsentChoice('accepted')} className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition-all">
                                Piekrītu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 ${showConsentModal ? 'blur-sm grayscale-[0.5]' : ''}`}>
                
                {/* BACKGROUND */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-400 opacity-10 blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6">
                    
                    {/* Header */}
                    {!isCodeVerified && (
                        <header className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 backdrop-blur px-3 py-1 text-xs font-semibold text-emerald-700 mb-6">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                Drošais Pacientu Portāls
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Anketa Pacientiem</h1>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Ievadiet unikālo piekļuves kodu, lai ielādētu anketas jautājumus.
                            </p>
                        </header>
                    )}

                    {/* --- STEP 1: CODE ENTRY --- */}
                    {!isCodeVerified && (
                        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                            <div className="mb-8 text-center">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
                                    <Icons.Lock className="h-5 w-5 text-slate-400" />
                                    Ievadiet 12 zīmju kodu
                                </h3>
                            </div>

                            <div className="flex flex-col items-center gap-6" onClick={() => { const i = codeDigits.findIndex(d => !d); focusInput(i === -1 ? CODE_LENGTH - 1 : i); }}>
                                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                                    {codeDigits.map((digit, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                ref={(el) => { inputRefs.current[index] = el; }}
                                                type="text"
                                                inputMode="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                onPaste={(e) => handlePaste(e, index)}
                                                disabled={verifying}
                                                className={`h-12 w-10 sm:h-14 sm:w-12 rounded-xl border text-center text-xl font-bold tracking-widest transition-all outline-none ${digit ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10'}`}
                                            />
                                            {(index + 1) % CODE_GROUP_SIZE === 0 && index < CODE_LENGTH - 1 && <div className="w-2 sm:w-4 h-1 bg-slate-200 rounded mx-1"></div>}
                                        </div>
                                    ))}
                                </div>

                                {codeError && (
                                    <div className="flex items-center gap-2 text-sm font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-lg animate-fade-in">
                                        <Icons.Alert className="h-4 w-4" /> {codeError}
                                    </div>
                                )}

                                <div className="flex gap-4 mt-2">
                                    <button onClick={verifyCode} disabled={verifying || filledCode.length < CODE_LENGTH} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {verifying ? 'Pārbauda...' : <>Atbloķēt <Icons.Unlock className="h-4 w-4" /></>}
                                    </button>
                                    <button onClick={resetCode} className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                                        Notīrīt
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-12 grid gap-4 sm:grid-cols-3 pt-8 border-t border-slate-100">
                                {highlightCards.map((card) => (
                                    <div key={card.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">{card.accent}</p>
                                        <h4 className="font-semibold text-slate-900 text-sm mb-1">{card.title}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{card.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- STEP 2: DECLINED STATE --- */}
                    {isCodeVerified && consentChoice === 'declined' && (
                        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-12 text-center shadow-xl border border-slate-200 animate-fade-in">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <Icons.Lock className="h-8 w-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Piekļuve liegta</h2>
                            <p className="mt-2 text-slate-600">Jūs atteicāties no datu apstrādes. Anketa netika ielādēta.</p>
                            <button onClick={resetCode} className="mt-8 text-sm font-bold text-emerald-600 hover:underline">Sākt no jauna</button>
                        </div>
                    )}

                    {/* --- STEP 3: THE SLIDESHOW FORM --- */}
                    {isCodeVerified && consentChoice === 'accepted' && (
                        <>
                            {loadedForm && !submitted && currentField && (
                                <div className="mx-auto max-w-2xl">
                                    {/* Top Bar: Title & Progress */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-slate-900">
                                            {typeof loadedForm.title === 'object' ? (loadedForm.title[activeLang] ?? loadedForm.title.lv) : loadedForm.title}
                                        </h2>
                                        <button onClick={resetCode} className="text-xs font-semibold text-rose-500 hover:underline">Iziet</button>
                                    </div>

                                    {/* SLIDE CARD */}
                                    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden animate-fade-in">
                                        
                                        {/* Progress Bar */}
                                        <div className="h-1.5 w-full bg-slate-100">
                                            <div 
                                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out" 
                                                style={{ width: `${progress}%` }} 
                                            />
                                        </div>

                                        <div className="p-8 sm:p-10 min-h-[400px] flex flex-col justify-between">
                                            
                                            {/* Question Content */}
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                                        Jautājums {currentQuestionIndex + 1} no {totalQuestions}
                                                    </span>
                                                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                                                        {(currentField.label?.[activeLang] ?? currentField.label?.lv) || '...'}
                                                    </h3>
                                                </div>

                                                {/* INPUT RENDERER */}
                                                <div className="animate-fade-in-up">
                                                    
                                                    {(currentField.type === 'radio' || currentField.type === 'checkbox') && (
                                                        <div className="grid gap-3">
                                                            {(currentField.options?.[activeLang] ?? currentField.options?.lv ?? []).map((opt) => {
                                                                const answer = answers[currentField.id];
                                                                const isSelected = currentField.type === 'radio' 
                                                                    ? answer === opt 
                                                                    : Array.isArray(answer) && answer.includes(opt);
                                                                
                                                                return (
                                                                    <label key={opt} className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-white hover:border-emerald-200 hover:bg-slate-50'}`}>
                                                                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'}`}>
                                                                            {isSelected && <Icons.Check className="h-3 w-3 text-white" />}
                                                                        </div>
                                                                        <input 
                                                                            type={currentField.type} 
                                                                            className="sr-only" 
                                                                            checked={isSelected}
                                                                            onChange={() => currentField.type === 'radio' ? handleRadioAnswer(currentField.id, opt) : handleCheckboxAnswer(currentField.id, opt)}
                                                                        />
                                                                        <span className="text-base font-semibold">{opt}</span>
                                                                    </label>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    {currentField.type === 'text' && (
                                                        <textarea
                                                            rows={4}
                                                            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-0 outline-none transition-all"
                                                            placeholder={(currentField.placeholder?.[activeLang] ?? currentField.placeholder?.lv) || 'Rakstiet atbildi šeit...'}
                                                            value={(answers[currentField.id] as string) || ''}
                                                            onChange={(e) => handleTextAnswer(currentField.id, e.target.value)}
                                                        />
                                                    )}

                                                    {currentField.type === 'dropdown' && (
                                                        <div className="relative">
                                                            <select
                                                                className="w-full appearance-none rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg text-slate-900 outline-none focus:border-emerald-500 transition-all"
                                                                value={(answers[currentField.id] as string) || ''}
                                                                onChange={(e) => handleDropdownAnswer(currentField.id, e.target.value)}
                                                            >
                                                                <option value="">Izvēlieties...</option>
                                                                {(currentField.options?.[activeLang] ?? currentField.options?.lv ?? []).map(opt => (
                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                ))}
                                                            </select>
                                                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▼</div>
                                                        </div>
                                                    )}

                                                    {currentField.type === 'scale' && currentField.scale && (
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                                                                <span>{currentField.scale.minLabel?.[activeLang] ?? currentField.scale.min}</span>
                                                                <span>{currentField.scale.maxLabel?.[activeLang] ?? currentField.scale.max}</span>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                {Array.from({ length: currentField.scale.max - currentField.scale.min + 1 }, (_, i) => currentField.scale!.min + i).map((val) => {
                                                                    const isSelected = answers[currentField.id] === String(val);
                                                                    return (
                                                                        <button
                                                                            key={val}
                                                                            type="button"
                                                                            onClick={() => handleScaleAnswer(currentField.id, String(val))}
                                                                            className={`flex-1 rounded-xl py-4 text-lg font-bold transition-all duration-200 ${
                                                                                isSelected 
                                                                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105' 
                                                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                                                                            }`}
                                                                        >
                                                                            {val}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Navigation Buttons */}
                                            <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-100">
                                                {currentQuestionIndex > 0 ? (
                                                    <button onClick={handlePrev} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                                                        <Icons.ArrowLeft className="h-4 w-4" /> Atpakaļ
                                                    </button>
                                                ) : (
                                                    <div /> /* Spacer */
                                                )}

                                                {currentQuestionIndex < totalQuestions - 1 ? (
                                                    <button onClick={handleNext} className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-emerald-600 transition-all">
                                                        Tālāk <Icons.ArrowRight className="h-4 w-4" />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleSubmitAnswers()} className="flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-all">
                                                        Iesniegt <Icons.Check className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {submitError && (
                                        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-center text-sm font-medium text-rose-700">
                                            {submitError}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* SUCCESS STATE */}
                            {submitted && (
                                <div className="mx-auto max-w-2xl rounded-3xl bg-white p-12 text-center shadow-xl border border-emerald-100 animate-fade-in">
                                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-sm">
                                        <Icons.Check className="h-12 w-12" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Paldies!</h2>
                                    <p className="text-lg text-slate-600">Jūsu atbildes ir veiksmīgi saglabātas drošajā datu bāzē.</p>
                                    <button onClick={() => window.location.reload()} className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                                        Atgriezties sākumā
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            
            <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeInUp 0.4s ease-out forwards; }
                .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
            `}</style>
        </>
    );
}