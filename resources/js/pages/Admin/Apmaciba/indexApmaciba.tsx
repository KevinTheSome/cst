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

export default function OnlineTraining({ initialLectures = [] as Lecture[] }) {
  const { __, locale } = useLang();

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
    const lecture = initialLectures.find((l) => l.id === lectureId);
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
          isSelected ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`mb-1 text-base font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-900'}`}>
              {renderTitle(lecture.title)}
            </h3>
            <p className="line-clamp-2 text-xs text-slate-500">{lecture.description}</p>

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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white"
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
                className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
              <button
                type="submit"
                disabled={submitting}
                className={`rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition ${
                  submitting ? 'cursor-wait bg-slate-400' : 'bg-slate-900 hover:bg-emerald-600'
                }`}
              >
                {submitting ? '...' : __('specialistiem.apmaciba.form.submit')}
              </button>
            </div>

            {error && <div className="mt-2 text-sm text-rose-600">{error}</div>}
          </form>
        )}

        {showLectureRating && unlocked && (
          <div className="mt-4">
            <StarRating value={userRatings[lecture.id] || 0} onChange={(v) => setUserRatings((prev) => ({ ...prev, [lecture.id]: v }))} />
            <button
              type="button"
              onClick={() => handleSubmitRating(lecture.id)}
              className="mt-2 rounded-2xl bg-slate-900 px-6 py-3 text-white hover:bg-emerald-600"
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
      <Head title={__('specialistiem.apmaciba.meta.title')} />
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-white to-[#e7f7f1]">
        <section className="relative z-10 mx-auto min-h-screen max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {__('specialistiem.apmaciba.hero.title')}
            </h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">{__('specialistiem.apmaciba.hero.text')}</p>
          </div>

          {initialLectures.length === 0 ? (
            <div className="mt-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Icons.Lock className="h-8 w-8" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{__('specialistiem.apmaciba.lock.title')}</h2>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {initialLectures.map((lec) => (
                <LectureCard key={lec.id} lecture={lec} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
