import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';

// --- TYPES ---
type MultilingualTitle = { lv?: string; en?: string; [key: string]: string | undefined };

type Lecture = {
  id: number;
  title: string | MultilingualTitle;
  description?: string;
  duration?: string;
  level?: string;
  teacher?: string;
  tag?: string;
  thumbnail?: string;
  url?: string | null;
  starts_at?: string;
  ends_at?: string;
  rating_avg?: number;
  ratings_count?: number;
};

type VerifyResponse = {
  valid: boolean;
  message?: string;
  lectures?: Array<{ id: number }>;
};

// --- ICONS ---
const Icons = {
  Lock: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  Unlock: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  Play: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Star: ({ className, filled }: { className?: string; filled: boolean }) => (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.5"}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.77.77.349 1.132l-4.252 3.638a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.252-3.638c-.421-.362-.196-1.088.349-1.132l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  ),
  Rate: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.77.77.349 1.132l-4.252 3.638a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.252-3.638c-.421-.362-.196-1.088.349-1.132l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-2.25m0 0V3.75m0 2.25h-2.25m2.25 0h2.25" />
    </svg>
  )
};

// --- STAR RATING COMPONENT ---
const StarRating = ({ value, onChange, readOnly = false }: { value: number; onChange?: (v: number) => void; readOnly?: boolean }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex gap-1" onMouseLeave={() => !readOnly && setHover(null)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hover !== null ? star <= hover : star <= value;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            className={`group relative transition-transform ${readOnly ? 'cursor-default' : 'cursor-pointer active:scale-90 hover:scale-110'}`}
          >
            <Icons.Star
              filled={isFilled}
              className={`h-8 w-8 transition-colors duration-200 ${
                isFilled
                  ? 'text-amber-400 drop-shadow-sm'
                  : 'text-slate-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default function OnlineTraining({
  initialLectures = [] as Lecture[],
  unlockedLectures = [] as number[],
}: {
  initialLectures: Lecture[];
  unlockedLectures?: number[];
}) {
  const { __, locale } = useLang();
  const [lectures, setLectures] = useState<Lecture[]>(initialLectures);
  const [ratedLectureIds, setRatedLectureIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  }, []);

  useEffect(() => {
    setLectures(initialLectures);
  }, [initialLectures]);

  // --- STATE ---
  const [selectedLectureId, setSelectedLectureId] = useState<number | null>(null);
  const [activeLectureId, setActiveLectureId] = useState<number | null>(null);
  const [unlockedLectureIds, setUnlockedLectureIds] = useState<number[]>(
    Array.isArray(unlockedLectures) ? unlockedLectures.map((x) => Number(x)).filter(Number.isFinite) : [],
  );
  const unlockedSet = useMemo(() => new Set(unlockedLectureIds), [unlockedLectureIds]);

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [submittingCode, setSubmittingCode] = useState(false);
  const [submittingRating, setSubmittingRating] = useState<number | null>(null);

  const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({});
  const [showRating, setShowRating] = useState<{ [key: number]: boolean }>({});

  // --- HELPERS ---
  const renderTitle = (title: string | MultilingualTitle) =>
    typeof title === 'string' ? title : title[locale] || title.lv || title.en || Object.values(title)[0] || '';

  const validateCode = (c: string) => (c ?? '').trim().length >= 3;

  const formatDate = (iso?: string) => {
    if (!iso) return null;
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatDuration = (start?: string, end?: string, fallback?: string) => {
    if (fallback) return fallback;
    if (!start || !end) return null;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return null;
    const minutes = Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 60000));
    if (!minutes) return null;
    return minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  // --- SUBMIT CODE ---
  const handleSubmitCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (selectedLectureId === null) return;
    setError(null);
    setBanner(null);

    const cleaned = (code ?? '').trim();
    if (!validateCode(cleaned)) {
      setError(__('specialistiem.apmaciba.form.error_invalid'));
      return;
    }

    setSubmittingCode(true);
    try {
      const { data } = await axios.post<VerifyResponse>('/lecture-codes/verify', { code: cleaned });
      if (!data?.valid) {
        const msg = data?.message || __('specialistiem.apmaciba.form.error_invalid');
        setError(msg);
        setBanner({ type: 'error', text: msg });
        return;
      }

      const ids = Array.isArray(data.lectures)
        ? data.lectures.map((l) => Number(l.id)).filter(Number.isFinite)
        : [];
      if (ids.length === 0) ids.push(selectedLectureId);

      setUnlockedLectureIds((prev) => {
        const set = new Set(prev);
        ids.forEach((id) => set.add(id));
        return Array.from(set);
      });

      setBanner({ type: 'success', text: 'Training unlocked successfully.' });
      setSelectedLectureId(null);
      setCode('');
      // Auto show rating for the just unlocked item
      ids.forEach(id => setShowRating(prev => ({ ...prev, [id]: true })));
      setActiveLectureId(selectedLectureId);

    } catch (err: any) {
      const msg = err?.response?.data?.message || __('specialistiem.apmaciba.form.error_invalid');
      setError(msg);
      setBanner({ type: 'error', text: msg });
    } finally {
      setSubmittingCode(false);
    }
  };

  // --- SUBMIT RATING (FIXED) ---
  const handleSubmitRating = async (lectureId: number) => {
    const rating = userRatings[lectureId];
    if (!rating) return;
    
    setSubmittingRating(lectureId);
    try {
      // Sending both camelCase and snake_case to ensure backend compatibility
      await axios.post('/ratings', { 
        lectureId: lectureId, 
        lecture_id: lectureId, // Added this for Laravel compatibility
        rating: rating 
      });
      
      setRatedLectureIds((prev) => new Set(prev).add(lectureId));
      setLectures((prev) =>
        prev.map((lec) => {
          if (lec.id !== lectureId) return lec;
          const currentCount = lec.ratings_count ?? 0;
          const currentAvg = lec.rating_avg ?? 0;
          const newCount = currentCount + 1;
          const newAvg = Number(((currentAvg * currentCount + rating) / newCount).toFixed(1));
          return { ...lec, ratings_count: newCount, rating_avg: newAvg };
        }),
      );
      setBanner({ type: 'success', text: __('specialistiem.apmaciba.rating.submit') + ' saved.' });
    } catch (err: any) {
      console.error(err);
      if (err?.response?.status === 409) {
        setRatedLectureIds((prev) => new Set(prev).add(lectureId));
      }
      const msg = err?.response?.data?.message || 'Error saving rating. Try again.';
      setBanner({ type: 'error', text: msg });
    } finally {
      setSubmittingRating(null);
    }
  };

  // --- CARD COMPONENT ---
  const LectureCard = ({ lecture }: { lecture: Lecture }) => {
    const isSelected = selectedLectureId === lecture.id;
    const unlocked = unlockedSet.has(lecture.id);
    // Logic: If unlocked, user can manually toggle. If locked, hidden.
    const showLectureRating = unlocked ? (showRating[lecture.id] ?? true) : false;
    const isRatingLoading = submittingRating === lecture.id;
    const alreadyRated = ratedLectureIds.has(lecture.id);
    const durationLabel = formatDuration(lecture.starts_at, lecture.ends_at, lecture.duration);
    const startsLabel = formatDate(lecture.starts_at);
    const endsLabel = formatDate(lecture.ends_at);

    return (
      <div
        className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          isSelected
            ? 'border-emerald-500 ring-2 ring-emerald-500 ring-offset-2'
            : 'border-slate-100 hover:border-emerald-200'
        }`}
        role="button"
        tabIndex={0}
        onClick={() => setActiveLectureId(lecture.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setActiveLectureId(lecture.id);
          }
        }}
      >
        {/* Glow effect for unlocked */}
        {unlocked && (
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100/50 to-teal-50 blur-2xl transition-opacity group-hover:opacity-100" />
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2">
                 {unlocked ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      <Icons.Check className="h-3 w-3" /> Unlocked
                    </span>
                 ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <Icons.Lock className="h-3 w-3" /> Locked
                    </span>
                 )}
              </div>
              <h3 className="font-display text-lg font-bold leading-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                {renderTitle(lecture.title)}
              </h3>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-shrink-0 items-center gap-2">
               {unlocked ? (
                 <>
                   {/* RATE BUTTON (New) */}
                   <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRating((prev) => ({ ...prev, [lecture.id]: !prev[lecture.id] }));
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                       showLectureRating 
                        ? 'border-amber-400 bg-amber-50 text-amber-500' 
                        : 'border-slate-100 bg-white text-slate-400 hover:border-amber-200 hover:text-amber-500'
                    }`}
                    title="Rate this training"
                   >
                     <Icons.Star filled={showLectureRating} className="h-5 w-5" />
                   </button>

                   {/* PLAY BUTTON */}
                   {lecture.url ? (
                      <a
                        href={lecture.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-500/20 transition-transform hover:scale-110 active:scale-95"
                      >
                        <Icons.Play className="ml-1 h-6 w-6" />
                      </a>
                   ) : (
                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                       <Icons.Check className="h-6 w-6" />
                     </div>
                   )}
                 </>
               ) : (
                 // LOCKED BUTTON
                 <button
                   onClick={(e) => {
                     e.stopPropagation();
                     setSelectedLectureId(isSelected ? null : lecture.id);
                     setError(null);
                     setCode('');
                   }}
                   className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                     isSelected 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600'
                   }`}
                 >
                   {isSelected ? <Icons.Unlock className="h-5 w-5" /> : <Icons.Lock className="h-5 w-5" />}
                 </button>
               )}
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-2">
            {lecture.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {lecture.level && (
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                Level: {lecture.level}
              </span>
            )}
            {lecture.teacher && (
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                Teacher: {lecture.teacher}
              </span>
            )}
            {durationLabel && (
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                Duration: {durationLabel}
              </span>
            )}
            {startsLabel && (
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                Starts: {startsLabel}
              </span>
            )}
            {endsLabel && (
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                Ends: {endsLabel}
              </span>
            )}
            {lecture.tag && (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                {lecture.tag}
              </span>
            )}
          </div>
          
          {/* Rating Display (Read Only) */}
          {lecture.ratings_count && lecture.rating_avg !== undefined ? (
             <div className="mt-4 flex items-center gap-2 border-t border-slate-50 pt-3">
                <span className="text-lg font-bold text-slate-900">{lecture.rating_avg?.toFixed(1)}</span>
                <div className="flex text-amber-400">
                   {[1,2,3,4,5].map(i => (
                     <Icons.Star key={i} filled={i <= Math.round(lecture.rating_avg!)} className="h-4 w-4" />
                   ))}
                </div>
                <span className="text-xs text-slate-400">({lecture.ratings_count})</span>
             </div>
          ) : null}
        </div>

        <div className="relative z-10 space-y-4">
          
          {/* Code Input Form */}
          {isSelected && !unlocked && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <form onSubmit={handleSubmitCode} className="relative">
                <div className="relative flex items-center">
                    <input
                      autoFocus
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={__('specialistiem.apmaciba.form.placeholder')}
                      className={`w-full rounded-xl border-0 bg-slate-50 py-3.5 pl-4 pr-14 text-sm font-medium text-slate-900 shadow-inner ring-1 ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 ${error ? 'bg-red-50 ring-red-200' : ''}`}
                    />
                    <button
                      type="submit"
                      disabled={submittingCode}
                      className="absolute right-2 top-2 bottom-2 aspect-square rounded-lg bg-slate-900 text-white shadow-md transition-all hover:bg-emerald-600 disabled:opacity-70"
                    >
                      {submittingCode ? (
                        <div className="mx-auto h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 m-auto"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                      )}
                    </button>
                </div>
                {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
              </form>
            </div>
          )}

          {/* --- RATING FORM --- */}
          {showLectureRating && unlocked && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500 rounded-2xl bg-amber-50/50 p-5 ring-1 ring-amber-100 backdrop-blur-sm">
               <div className="mb-4 flex items-center justify-between">
                 <p className="text-xs font-bold uppercase tracking-wider text-amber-700/70">
                   Review
                 </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRating((p) => ({ ...p, [lecture.id]: false }));
                    }}
                    className="text-amber-400 hover:text-amber-600"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
               </div>
               
               <div className="flex flex-col items-center gap-4">
                  <StarRating
                    value={userRatings[lecture.id] || 0}
                    onChange={(v) => setUserRatings((prev) => ({ ...prev, [lecture.id]: v }))}
                    readOnly={alreadyRated}
                  />
                  
                  <button
                    onClick={() => handleSubmitRating(lecture.id)}
                    disabled={alreadyRated || isRatingLoading || !userRatings[lecture.id]}
                    className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-600 hover:shadow-emerald-500/20 active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                  >
                    {alreadyRated ? 'Rated' : isRatingLoading ? 'Saving...' : __('specialistiem.apmaciba.rating.submit')}
                  </button>
               </div>
            </div>
          )}

        </div>
      </div>
    );
  };

  return (
    <>
      <Head title={__('specialistiem.apmaciba.meta.title')} />
      <div className="min-h-screen bg-slate-50 selection:bg-emerald-200 selection:text-emerald-900">
        
        {/* Background Gradients */}
        <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-blue-200 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-emerald-200 blur-[120px]" />
        </div>

        <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {__('specialistiem.apmaciba.hero.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {__('specialistiem.apmaciba.hero.text')}
            </p>
          </div>

          {/* Banner */}
          {banner && (
            <div className={`fixed bottom-8 right-8 z-50 flex animate-in slide-in-from-bottom-5 max-w-sm items-center gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-md ${
                banner.type === 'success' ? 'border-emerald-200 bg-emerald-50/90 text-emerald-800' : 'border-red-200 bg-red-50/90 text-red-800'
            }`}>
               {banner.type === 'success' ? <Icons.Check className="h-5 w-5" /> : <Icons.Lock className="h-5 w-5" />}
               <span className="text-sm font-medium">{banner.text}</span>
            </div>
          )}

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {lectures.map((lec) => (
                <LectureCard key={lec.id} lecture={lec} />
              ))}
          </div>
        </section>

        {activeLectureId !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
            onClick={() => setActiveLectureId(null)}
          >
            <div
              className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const lecture = lectures.find((l) => l.id === activeLectureId);
                if (!lecture) return null;
                const unlocked = unlockedSet.has(lecture.id);
                const durationLabel = formatDuration(lecture.starts_at, lecture.ends_at, lecture.duration);
                const startsLabel = formatDate(lecture.starts_at);
                const endsLabel = formatDate(lecture.ends_at);
                const alreadyRated = ratedLectureIds.has(lecture.id);
                const showLectureRating = unlocked ? (showRating[lecture.id] ?? true) : false;
                const isRatingLoading = submittingRating === lecture.id;

                return (
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Masterclass</p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                          {renderTitle(lecture.title)}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveLectureId(null)}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Close"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {lecture.description && (
                      <p className="mt-4 text-sm leading-relaxed text-slate-600">{lecture.description}</p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {lecture.level && (
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                          Level: {lecture.level}
                        </span>
                      )}
                      {lecture.teacher && (
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                          Teacher: {lecture.teacher}
                        </span>
                      )}
                      {durationLabel && (
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                          Duration: {durationLabel}
                        </span>
                      )}
                      {startsLabel && (
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                          Starts: {startsLabel}
                        </span>
                      )}
                      {endsLabel && (
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
                          Ends: {endsLabel}
                        </span>
                      )}
                      {lecture.tag && (
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                          {lecture.tag}
                        </span>
                      )}
                    </div>

                    {lecture.ratings_count && lecture.rating_avg !== undefined ? (
                      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
                        <span className="text-lg font-bold text-slate-900">{lecture.rating_avg?.toFixed(1)}</span>
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Icons.Star
                              key={i}
                              filled={i <= Math.round(lecture.rating_avg!)}
                              className="h-4 w-4"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400">({lecture.ratings_count})</span>
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {unlocked && lecture.url ? (
                        <a
                          href={lecture.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100"
                        >
                          <Icons.Play className="h-4 w-4" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLectureId(lecture.id);
                            setError(null);
                            setCode('');
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300"
                        >
                          <Icons.Lock className="h-4 w-4" />
                          Unlock
                        </button>
                      )}

                      {unlocked && (
                        <button
                          type="button"
                          onClick={() => setShowRating((prev) => ({ ...prev, [lecture.id]: !showLectureRating }))}
                          className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-700 hover:border-amber-300"
                        >
                          <Icons.Star filled className="h-4 w-4" />
                          {showLectureRating ? 'Hide rating' : 'Rate'}
                        </button>
                      )}
                    </div>

                    {selectedLectureId === lecture.id && !unlocked && (
                      <div className="mt-6">
                        <form onSubmit={handleSubmitCode} className="relative">
                          <div className="relative flex items-center">
                            <input
                              autoFocus
                              type="text"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              placeholder={__('specialistiem.apmaciba.form.placeholder')}
                              className={`w-full rounded-xl border-0 bg-slate-50 py-3.5 pl-4 pr-14 text-sm font-medium text-slate-900 shadow-inner ring-1 ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 ${
                                error ? 'bg-red-50 ring-red-200' : ''
                              }`}
                            />
                            <button
                              type="submit"
                              disabled={submittingCode}
                              className="absolute right-2 top-2 bottom-2 aspect-square rounded-lg bg-slate-900 text-white shadow-md transition-all hover:bg-emerald-600 disabled:opacity-70"
                            >
                              {submittingCode ? (
                                <div className="mx-auto h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                              ) : (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="h-5 w-5 m-auto"
                                >
                                  <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                              )}
                            </button>
                          </div>
                          {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
                        </form>
                      </div>
                    )}

                    {showLectureRating && unlocked && (
                      <div className="mt-6 rounded-2xl bg-amber-50/50 p-5 ring-1 ring-amber-100">
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-xs font-bold uppercase tracking-wider text-amber-700/70">Review</p>
                          <button
                            onClick={() => setShowRating((p) => ({ ...p, [lecture.id]: false }))}
                            className="text-amber-400 hover:text-amber-600"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                          <StarRating
                            value={userRatings[lecture.id] || 0}
                            onChange={(v) => setUserRatings((prev) => ({ ...prev, [lecture.id]: v }))}
                            readOnly={alreadyRated}
                          />

                          <button
                            onClick={() => handleSubmitRating(lecture.id)}
                            disabled={alreadyRated || isRatingLoading || !userRatings[lecture.id]}
                            className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-600 hover:shadow-emerald-500/20 active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                          >
                            {alreadyRated ? 'Rated' : isRatingLoading ? 'Saving...' : __('specialistiem.apmaciba.rating.submit')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
