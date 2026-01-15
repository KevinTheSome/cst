import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';

// --- TYPES ---
type MultilingualTitle = { lv?: string; en?: string; [key: string]: string | undefined };

type Lecture = {
  id: number; // ✅ make this number (matches Laravel default)
  title: string | MultilingualTitle;
  description?: string;
  duration?: string;
  url?: string;
  starts_at?: string;
  ends_at?: string;
  rating_avg?: number;
  ratings_count?: number;
};

type Training = {
  id: number;
  title: string | MultilingualTitle;
  description?: string | null;
  url?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  ratings_avg?: number | null;
  ratings_count?: number | null;
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

type VerifyResponse =
  | { valid: true; lectureId?: number; message?: string }
  | { valid: false; lectureId?: number; message?: string };

export default function OnlineTraining({
  initialLectures = [] as Lecture[],
  trainings = [] as Training[],
}: {
  initialLectures?: Lecture[];
  trainings?: Training[];
}) {
  const { __, locale } = useLang();
  const normalizedLectures = useMemo<Lecture[]>(
    () =>
      initialLectures.length
        ? initialLectures
        : trainings.map((t) => ({
            id: t.id,
            title: t.title,
            description: t.description ?? undefined,
            url: t.url ?? undefined,
            starts_at: t.starts_at ?? undefined,
            ends_at: t.ends_at ?? undefined,
            rating_avg: typeof t.ratings_avg === 'number' ? t.ratings_avg : undefined,
            ratings_count: typeof t.ratings_count === 'number' ? t.ratings_count : undefined,
          })),
    [initialLectures, trainings]
  );

  // ✅ Ensure axios CSRF header exists (helps if your page is outside the inertia axios bootstrap)
  useEffect(() => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  }, []);

  const [selectedLectureId, setSelectedLectureId] = useState<number | null>(null);
  const [unlockedLectureIds, setUnlockedLectureIds] = useState<number[]>([]);
  const unlockedSet = useMemo(() => new Set(unlockedLectureIds), [unlockedLectureIds]);

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({});
  const [showRating, setShowRating] = useState<{ [key: number]: boolean }>({});

  const renderTitle = (title: string | MultilingualTitle) =>
    typeof title === 'string' ? title : title[locale] || title['lv'] || title['en'] || Object.values(title)[0] || '';

  const validateCode = (c: string) => (c ?? '').trim().length >= 3;

  const handleSubmitCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (selectedLectureId == null) return;

    setError(null);

    const cleaned = (code ?? '').trim();
    if (!validateCode(cleaned)) {
      setError(__('specialistiem.apmaciba.form.error_invalid'));
      return;
    }

    setSubmitting(true);
    try {
      // ✅ Send lectureId too (very commonly required)
      const { data } = await axios.post<VerifyResponse>('/lecture-codes/verify', {
        code: cleaned, // (optionally: cleaned.toUpperCase())
        lectureId: selectedLectureId,
      });

      if (data?.valid) {
        const unlockId = typeof data.lectureId === 'number' ? data.lectureId : selectedLectureId;

        setUnlockedLectureIds((prev) => (prev.includes(unlockId) ? prev : [...prev, unlockId]));
        setSelectedLectureId(null);
        setError(null);
      } else {
        setError(data?.message || __('specialistiem.apmaciba.form.error_invalid'));
      }
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 419) {
        setError(__('specialistiem.apmaciba.form.error_invalid') + ' (CSRF 419)');
      } else if (status === 401 || status === 403) {
        setError(__('specialistiem.apmaciba.form.error_invalid') + ' (AUTH)');
      } else {
        setError(err?.response?.data?.message || __('specialistiem.apmaciba.form.error_invalid'));
      }
    } finally {
      setSubmitting(false);
      setCode('');
    }
  };

  const handleSubmitRating = async (lectureId: number) => {
    const lecture = normalizedLectures.find((l) => l.id === lectureId);
    const rating = userRatings[lectureId];
    if (!lecture || !rating) return;

    try {
      await axios.post('/ratings', { lectureId: lecture.id, rating });
      alert(__('specialistiem.apmaciba.rating.submit') + ' ' + __('specialistiem.apmaciba.form.submit') + '!');
    } catch {
      alert(__('specialistiem.apmaciba.rating.submit') + ' ' + 'Kļūda');
    }
  };

  const LectureCard = ({ lecture }: { lecture: Lecture }) => {
    const isSelected = selectedLectureId === lecture.id;
    const unlocked = unlockedSet.has(lecture.id);
    const showLectureRating = showRating[lecture.id] || false;

    return (
      <div
        className={`group relative rounded-2xl border p-5 transition-all ${
          isSelected
            ? 'border-emerald-400/60 bg-emerald-500/10 ring-1 ring-emerald-500/30'
            : 'border-white/10 bg-slate-900/60 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`mb-1 text-base font-bold ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
              {renderTitle(lecture.title)}
            </h3>
            <p className="line-clamp-2 text-xs text-slate-400">{lecture.description}</p>

            {lecture.rating_avg !== undefined && (
              <div className="mt-2 flex items-center gap-2 text-xs text-amber-400">
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
                <span className="ml-1">
                  ({lecture.rating_avg?.toFixed(1)} / {lecture.ratings_count})
                </span>
              </div>
            )}
          </div>

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
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white"
                onClick={() => {
                  setError(null);
                  setCode('');
                  setSelectedLectureId(lecture.id);
                }}
              >
                <Icons.Lock className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {isSelected && !unlocked && (
          <form className="mt-4" onSubmit={handleSubmitCode}>
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={__('specialistiem.apmaciba.form.placeholder')}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-sm outline-none placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
              />
              <button
                type="submit"
                disabled={submitting}
                className={`rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition ${
                  submitting ? 'cursor-wait bg-slate-700' : 'bg-emerald-500 hover:bg-emerald-400'
                }`}
              >
                {submitting ? '...' : __('specialistiem.apmaciba.form.submit')}
              </button>
            </div>

            {error && <div className="mt-2 text-sm text-rose-400">{error}</div>}
          </form>
        )}

        {showLectureRating && unlocked && (
          <div className="mt-4">
            <StarRating value={userRatings[lecture.id] || 0} onChange={(v) => setUserRatings((prev) => ({ ...prev, [lecture.id]: v }))} />
            <button
              type="button"
              onClick={() => handleSubmitRating(lecture.id)}
              className="mt-2 rounded-2xl bg-slate-800 px-6 py-3 text-white hover:bg-emerald-500"
            >
              {__('specialistiem.apmaciba.rating.submit')}
            </button>
          </div>
        )}
      </div>
    );
  };

    return (
        <>
            <Head title={__('admin.nav.trainings.label')} />
            <div className="min-h-screen pb-24 sm:px-6 lg:px-8">
                <section className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
                    <div className="relative overflow-hidden border-b border-white/10 bg-slate-900 px-4 py-6 sm:rounded-3xl sm:border sm:p-8 sm:shadow-2xl">
                        <div className="relative z-10">
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                {__('specialistiem.apmaciba.hero.title')}
                            </h1>
                            <p className="mt-2 text-sm text-slate-400 sm:text-base">
                                {__('specialistiem.apmaciba.hero.text')}
                            </p>
                        </div>
                    </div>

                    {normalizedLectures.length === 0 ? (
                        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-10 text-center shadow-xl">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-slate-400">
                                <Icons.Lock className="h-8 w-8" />
                            </div>
                            <h2 className="mt-4 text-lg font-semibold text-white">
                                {__('specialistiem.apmaciba.lock.title')}
                            </h2>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {normalizedLectures.map((lec) => (
                                <LectureCard key={lec.id} lecture={lec} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
    </>
  );
}

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { __ } = useLang();
  return <AdminLayout title={__('admin.nav.trainings.label')}>{children}</AdminLayout>;
};

(OnlineTraining as any).layout = (page: React.ReactNode) => <LayoutWrapper>{page}</LayoutWrapper>;
