import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

// --- TYPES ---
type MultilingualTitle = { lv?: string; en?: string; [key: string]: string | undefined };
type Lecture = {
    id: string;
    title: string | MultilingualTitle;
    description?: string;
    duration?: string;
    url?: string;
    starts_at?: string;
    ends_at?: string;
    rating_avg?: number;
    ratings_count?: number;
};

// --- ICONS ---
const Icons = {
    Lock: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
    ),
    Play: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        </svg>
    ),
};

// --- STAR RATING ---
const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
    <div className="flex gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
            <svg
                key={star}
                onClick={() => onChange(star)}
                className={`h-6 w-6 cursor-pointer ${star <= value ? 'fill-amber-400 text-amber-400' : 'fill-none text-slate-400'}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ))}
    </div>
);

export default function OnlineTraining({ initialLectures = [] as Lecture[] }) {
    const { __, locale } = useLang();

    const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
    const [unlockedLectures, setUnlockedLectures] = useState<string[]>([]);
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({});
    const [showRating, setShowRating] = useState<{ [key: string]: boolean }>({}); // to show rating only after clicking play

    const renderTitle = (title: string | MultilingualTitle) =>
        typeof title === 'string' ? title : title[locale] || title['lv'] || title['en'] || Object.values(title)[0] || '';

    const validateCode = (c: string) => (c ?? '').trim().length >= 3;

    const handleSubmitCode = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!selectedLecture) return;

        setError(null);
        if (!validateCode(code)) {
            setError('Lūdzu ievadiet derīgu kodu.');
            return;
        }

        setSubmitting(true);
        try {
            const { data } = await axios.post('/lecture-codes/verify', { code: code.trim() });
            if (data.valid) {
                setUnlockedLectures((prev) => [...prev, selectedLecture]);
                setError(null);
            } else setError(data.message || 'Nederīgs kods');
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Kļūda pārbaudē.');
        } finally {
            setSubmitting(false);
            setCode('');
        }
    };

    const handleSubmitRating = async (lectureId: string) => {
        const lecture = initialLectures.find((l) => l.id === lectureId);
        const rating = userRatings[lectureId];
        if (!lecture || !rating) return;

        try {
            await axios.post('/ratings', { lectureId: lecture.id, rating });
            alert('Vērtējums veiksmīgi nosūtīts!');
        } catch {
            alert('Kļūda nosūtot vērtējumu');
        }
    };

    const LectureCard = ({ lecture }: { lecture: Lecture }) => {
        const isSelected = selectedLecture === lecture.id;
        const unlocked = unlockedLectures.includes(lecture.id);
        const showLectureRating = showRating[lecture.id] || false;

        return (
            <div
                className={`group relative rounded-2xl border p-5 transition-all ${
                    isSelected ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg'
                }`}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className={`mb-1 text-base font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-900'}`}>
                            {renderTitle(lecture.title)}
                        </h3>
                        <p className="line-clamp-2 text-xs text-slate-500">{lecture.description}</p>

                        {/* Avg Rating */}
                        {lecture.rating_avg !== undefined && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-amber-600">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg
                                        key={i}
                                        className={`h-3 w-3 ${i <= Math.round(lecture.rating_avg!) ? 'fill-amber-400' : 'fill-transparent stroke-amber-400'}`}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                                <span className="ml-1">({lecture.rating_avg?.toFixed(1)} / {lecture.ratings_count})</span>
                            </div>
                        )}
                    </div>

                    {/* Play / Lock button */}
                    <div className="flex flex-col items-center gap-2">
                        {unlocked && lecture.url ? (
                            <a
                                href={lecture.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setShowRating((prev) => ({ ...prev, [lecture.id]: true }))}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition hover:scale-105"
                            >
                                <Icons.Play className="ml-0.5 h-5 w-5" />
                            </a>
                        ) : (
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white cursor-pointer"
                                onClick={() => setSelectedLecture(lecture.id)}
                            >
                                <Icons.Lock className="h-5 w-5" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Unlock code input or rating */}
                {isSelected && !unlocked && (
                    <form className="mt-4 flex gap-2" onSubmit={handleSubmitCode}>
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Ievadiet kodu"
                            className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition ${
                                submitting ? 'cursor-wait bg-slate-400' : 'bg-slate-900 hover:bg-emerald-600'
                            }`}
                        >
                            {submitting ? '...' : 'Atbloķēt'}
                        </button>
                        {error && <div className="text-sm text-rose-600 mt-2">{error}</div>}
                    </form>
                )}

                {showLectureRating && unlocked && (
                    <div className="mt-4">
                        <StarRating
                            value={userRatings[lecture.id] || 0}
                            onChange={(v) => setUserRatings((prev) => ({ ...prev, [lecture.id]: v }))}
                        />
                        <button
                            onClick={() => handleSubmitRating(lecture.id)}
                            className="mt-2 rounded-2xl bg-slate-900 px-6 py-3 text-white hover:bg-emerald-600"
                        >
                            Iesniegt Vērtējumu
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <Head title={__('Online apmācība')} />
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-white to-[#e7f7f1]">
                <section className="relative z-10 mx-auto min-h-screen max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mx-auto mb-8 max-w-2xl text-center">
                        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            Mācību programma ārstiem un citiem veselības aprūpes speciālistiem
                        </h1>
                        <p className="mt-3 text-sm text-slate-600 sm:text-base">
                            Jaunieviestās terapijas zālēm (ATMP), arī mezenhimālo stromālo šūnu (MSC) lietošanu izņēmuma gadījumos.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {initialLectures.map((lec) => (
                            <LectureCard key={lec.id} lecture={lec} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
