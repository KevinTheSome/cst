import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

// --- TYPES ---

type MultilingualTitle = {
    lv?: string;
    en?: string;
    [key: string]: string | undefined;
};

type Lecture = {
    id: string;
    title: string | MultilingualTitle;
    description?: string; // Unified description
    duration?: string; // Optional duration
    url?: string; // Optional external URL
    starts_at?: string; // Optional timestamp
    ends_at?: string; // Optional timestamp
    rating?: number; // Rating out of 5
};

// --- ICONS ---
const Icons = {
    Lock: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
        </svg>
    ),
    Unlock: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
        </svg>
    ),
    Play: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
        </svg>
    ),
    Monitor: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
            />
        </svg>
    ),
    Close: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    Book: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
};

// --- MOCK DATA (Fallback) ---
const MOCK_LECTURES: Lecture[] = [
    { id: 'l1', title: 'Ievads ATMP un MSC šūnu terapijā', duration: '10:24', description: 'Kas ir ATMP un kas jāzina pacientam.', rating: 4 },
    { id: 'l2', title: 'Klīniskie pētījumi un drošība', duration: '18:12', description: 'Apskats par pierādījumiem un riskiem.', rating: 5 },
    { id: 'l3', title: 'Kas notiek procedūras laikā?', duration: '12:05', description: 'Soli pa solim - ko sagaidīt.', rating: 3.5 },
    { id: 'l4', title: 'Biežākie jautājumi un resursi', duration: '08:40', description: 'Praktiski padomi un saites.', rating: 4.5 },
];


export default function OnlineTraining() {
    const { __, locale } = useLang();

    // UI states
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [unlocked, setUnlocked] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
    const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({});
    // We initialize with empty, but if API fails or for demo, we can use MOCK_LECTURES
    const [lectures, setLectures] = useState<Lecture[]>([]);

    const validateCode = (c: string) => (c ?? '').trim().length >= 3;

    const handleSubmitCode = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError(null);

        if (!validateCode(code)) {
            setError('Lūdzu ievadiet derīgu kodu.');
            return;
        }

        setSubmitting(true);

        try {
            // Attempt API call
            const response = await axios.post('/lecture-codes/verify', {
                code: code.trim(),
            });

            if (response.data.valid) {
                setLectures(response.data.lectures);
                setUnlocked(true);
                setError(null);
            } else {
                setError(response.data.message || 'Nederīgs kods');
            }
        } catch (err: any) {
            // FALLBACK FOR DEMO/PROTOTYPING if API fails (404/500)
            console.warn('API Verification failed, using mock data for demo.');
            if (code === '123') {
                // Simple demo bypass
                setLectures(MOCK_LECTURES);
                setUnlocked(true);
                setError(null);
            } else {
                const message = err?.response?.data?.message || 'Kļūda, pārbaudot kodu (mēģiniet "123" demo versijai)';
                setError(message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    // Helper to render title safely
    const renderTitle = (title: string | MultilingualTitle) => {
        if (typeof title === 'string') return title;
        // Try current locale, then 'lv', then 'en', then first available key
        return title[locale] || title['lv'] || title['en'] || Object.values(title)[0] || '';
    };
    const StarRating = ({
        value,
        onChange,
    }: {
        value: number;
        onChange: (v: number) => void;
    }) => {
        return (
            <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                   <svg
                    key={star}
                    onClick={() => onChange(star)}
                    className={`h-6 w-6 cursor-pointer transition ${star <= value ? 'fill-amber-400 text-amber-400' : 'fill-none text-slate-400'}`}
                    viewBox="0 0 24 24"                        
                    stroke="currentColor"                        
                    strokeWidth="2"
                   >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                   </svg>     
                ))}
            </div>
        )
    }
    const handleSubmitRating = async () => {
        if (!selectedLecture || userRatings[selectedLecture] === undefined) return;

        setSubmitting(true);
        try {
            await fetch('/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
            },
            body: JSON.stringify({
                lectureId: selectedLecture,
                rating: userRatings[selectedLecture],
            }),
            });

            alert('Vērtējums veiksmīgi nosūtīts!');
        } catch (err) {
            console.error('error submitting rating:', err);
            alert('Kļūda nosūtot vērtējumu');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Head title={__('Online apmācība')} />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-white to-[#e7f7f1]">
                {/* Background Tech Grid */}
                <div className="pointer-events-none fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <section className="relative z-10 mx-auto min-h-screen max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    {/* Header */}
                    <div className="mx-auto mb-8 max-w-2xl text-center">
                        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            Mācību programma ārstiem un citiem veselības aprūpes speciālistiem
                        </h1>
                        <p className="mt-3 text-sm text-slate-600 sm:text-base">
                            Jaunieviestās terapijas zālēm (ATMP), arī mezenhimālo stromālo šūnu (MSC) lietošanu izņēmuma gadījumos (hospital
                            exemption).{' '}
                        </p>
                    </div>

                    {/* Code entry + lectures panel */}
                    <div className="mx-auto w-full max-w-4xl space-y-6">
                        <div className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:p-7 lg:p-8">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">Piekļuve lekcijām</p>
                                    <p className="mt-1 text-sm text-slate-500">Ievadiet savu pieejas kodu, lai atbloķētu lekcijas.</p>
                                </div>

                                <div className="mt-2 w-full sm:mt-0 sm:w-auto">
                                    {!unlocked ? (
                                        <form className="flex gap-2" onSubmit={handleSubmitCode}>
                                            <label htmlFor="access-code" className="sr-only">
                                                Pieejas kods
                                            </label>
                                            <input
                                                id="access-code"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                placeholder="Kods"
                                                className="w-full min-w-[140px] rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                                aria-invalid={!!error}
                                            />
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className={`rounded-2xl px-6 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-lg transition ${
                                                    submitting ? 'cursor-wait bg-slate-400' : 'bg-slate-900 shadow-slate-900/20 hover:bg-emerald-600'
                                                }`}
                                                aria-label="Iesniegt kodu"
                                            >
                                                {submitting ? '...' : 'Pārbaudīt'}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold tracking-wider text-emerald-700 uppercase">
                                                <Icons.Unlock className="h-3 w-3" />
                                                Aktīvs
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setUnlocked(false);
                                                    setCode('');
                                                    setSelectedLecture(null);
                                                }}
                                                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 transition-colors hover:border-rose-200 hover:text-rose-500"
                                            >
                                                Iziet
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {error && <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-600">{error}</div>}

                            {/* Example Lessons - Always Visible */}
                            <div className="mt-8 animate-fade-in-up space-y-6">
                                <div className="h-px w-full bg-slate-100"></div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-600 mb-4">Piemēru lekcijas (vienmēr pieejamas)</p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {MOCK_LECTURES.map((lec) => (
                                            <div
                                                key={lec.id}
                                                className={`group relative cursor-pointer rounded-2xl border p-5 transition-all ${
                                                    selectedLecture === lec.id
                                                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                                                        : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg'
                                                }`}
                                                onClick={() => setSelectedLecture(lec.id)}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <h3
                                                            className={`mb-1 text-base font-bold ${selectedLecture === lec.id ? 'text-emerald-900' : 'text-slate-900'}`}
                                                        >
                                                            {renderTitle(lec.title)}
                                                        </h3>
                                                        <p className="line-clamp-2 text-xs text-slate-500">{lec.description}</p>

                                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                                            {lec.duration && (
                                                                <div className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase">
                                                                    {lec.duration} min
                                                                </div>
                                                            )}
                                                            
                                                            {lec.rating && (
                                                                <div className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
                                                                    <div className="flex items-center">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <svg
                                                                                key={i}
                                                                                className={`h-3 w-3 ${i < Math.floor(lec.rating || 0) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-amber-400'}`}
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                            >
                                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                            </svg>
                                                                        ))}
                                                                        <span className="ml-1 text-xs">{lec.rating.toFixed(1)}</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {lec.starts_at && (
                                                            <p className="mt-2 text-xs font-medium text-emerald-600">
                                                                Sākums: {new Date(lec.starts_at).toLocaleString('lv-LV')}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                            <Icons.Book className="h-4 w-4" />
                                                        </div>
                                                        <div
                                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                                                                selectedLecture === lec.id
                                                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                                                    : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white'
                                                            }`}
                                                        >
                                                            <Icons.Play className="ml-0.5 h-5 w-5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                            </div>

                            {/* Lectures area - Only when unlocked */}
                            {unlocked && (
                                <div className="animate-fade-in-up space-y-6">
                                    <div className="h-px w-full bg-slate-100"></div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-slate-600 mb-4">Jūsu pieejamās lekcijas</p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {lectures.map((lec) => (
                                            <div
                                                key={lec.id}
                                                className={`group relative cursor-pointer rounded-2xl border p-5 transition-all ${
                                                    selectedLecture === lec.id
                                                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                                                        : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg'
                                                }`}
                                                onClick={() => setSelectedLecture(lec.id)}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <h3
                                                            className={`mb-1 text-base font-bold ${selectedLecture === lec.id ? 'text-emerald-900' : 'text-slate-900'}`}
                                                        >
                                                            {renderTitle(lec.title)}
                                                        </h3>
                                                        <p className="line-clamp-2 text-xs text-slate-500">{lec.description}</p>

                                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                                            {lec.duration && (
                                                                <div className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase">
                                                                    {lec.duration} min
                                                                </div>
                                                            )}
                                                            
                                                            {lec.rating && (
                                                                <div className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
                                                                    <div className="flex items-center">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <svg
                                                                                key={i}
                                                                                className={`h-3 w-3 ${i < Math.floor(lec.rating || 0) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-amber-400'}`}
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                            >
                                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                            </svg>
                                                                        ))}
                                                                        <span className="ml-1 text-xs">{lec.rating.toFixed(1)}</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {lec.starts_at && (
                                                            <p className="mt-2 text-xs font-medium text-emerald-600">
                                                                Sākums: {new Date(lec.starts_at).toLocaleString('lv-LV')}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                            <Icons.Book className="h-4 w-4" />
                                                        </div>
                                                        <div
                                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                                                                selectedLecture === lec.id
                                                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                                                    : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white'
                                                            }`}
                                                        >
                                                            <Icons.Play className="ml-0.5 h-5 w-5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Selected Lecture Details / Player Placeholder */}
                            {selectedLecture && (
                                <div className="animate-fade-in-up mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-4">
                                        <div className="flex items-center gap-2">
                                            <Icons.Monitor className="h-5 w-5 text-emerald-600" />
                                            <h4 className="text-sm font-bold text-slate-900">Lekcijas saturs</h4>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedLecture(null)}
                                            className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-200"
                                        >
                                            <Icons.Close className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="p-6 sm:p-8">
                                        {(() => {
                                            const lecture = lectures.find((l) => l.id === selectedLecture);
                                            if (!lecture) return <p>Lekcija nav atrasta.</p>;

                                            return (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h2 className="mb-2 text-2xl font-bold text-slate-900">
                                                            {renderTitle(lecture.title)}
                                                        </h2>
                                                        <p className="leading-relaxed text-slate-600">{lecture.description}</p>
                                                    </div>

                                                    {lecture.url ? (
                                                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
                                                            <p className="mb-4 text-sm font-medium text-emerald-800">
                                                                Šī lekcija ir pieejama ārējā resursā:
                                                            </p>
                                                            <a
                                                                href={lecture.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-700"
                                                            >
                                                                Atvērt Lekciju <Icons.Play className="h-4 w-4" />
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <div className="group relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-900 text-white">
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 to-transparent"></div>
                                                            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-transform group-hover:scale-110">
                                                                <Icons.Play className="ml-1 h-8 w-8" />
                                                            </div>
                                                            <p className="relative z-10 font-medium">Video atskaņotājs (Demo)</p>
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                                                        {lecture.starts_at && (
                                                            <div>
                                                                <p className="text-xs font-bold text-slate-400 uppercase">Sākums</p>
                                                                <p className="text-sm font-medium text-slate-700">
                                                                    {new Date(lecture.starts_at).toLocaleString('lv-LV')}
                                                                </p>
                                                            </div>
                                                        )}
                                                        {lecture.ends_at && (
                                                            <div>
                                                                <p className="text-xs font-bold text-slate-400 uppercase">Beigas</p>
                                                                <p className="text-sm font-medium text-slate-700">
                                                                    {new Date(lecture.ends_at).toLocaleString('lv-LV')}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                    {selectedLecture && (
                                        <div className="mt-6 p-5 border rounded-2xl bg-white shadow-md">
                                            <h2 className="text-lg font-bold text-slate-900 mb-2">
                                                {renderTitle(lectures.find(l => l.id === selectedLecture)?.title || '')}
                                            </h2>

                                            <p className="text-sm text-slate-600 mb-4">
                                                {lectures.find(l => l.id === selectedLecture)?.description}
                                            </p>

                                            <StarRating
                                                value={userRatings[selectedLecture] || 0}
                                                onChange={(v) =>
                                                    setUserRatings((prev) => ({
                                                        ...prev,
                                                        [selectedLecture]: v,
                                                    }))
                                                }
                                            />
                                            <button
                                                onClick={handleSubmitRating}
                                                disabled={submitting}
                                                className={`mt-4 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition 
                                                ${
                                                    submitting ? 'bg-slate-400' : 'bg-slate-900 hover:bg-emerald-600'
                                                }`}
                                            >
                                                {submitting ? 'Nosūtot...' : 'Iesniegt Vērtējumu'}
                                            </button>

                                            <p className="text-xs mt-2 text-slate-500">
                                                Jūsu vērtējums: {userRatings[selectedLecture] || 'nav'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {!unlocked && (
                                <div className="mt-8 text-center">
                                    <div className="inline-block rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-6">
                                        <p className="text-sm font-medium text-emerald-800">Nav koda?</p>
                                        <p className="mt-1 text-xs text-slate-500">Sazinieties ar savu projekta vadītāju lai saņemtu piekļuvi.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
            `}</style>
        </>
    );
}
