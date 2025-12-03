import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

type MultilingualTitle = {
    lv?: string;
    en?: string;
    [key: string]: string | undefined;
};

type Lecture = {
    id: string;
    title: string | MultilingualTitle;
    description?: string;
    url?: string;
    starts_at?: string;
    ends_at?: string;
};

export default function OnlineTraining() {
    const { __ } = useLang();

    // UI-only prototype states
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [unlocked, setUnlocked] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
    const [lectures, setLectures] = useState<Lecture[]>([]);

    // Real API validation
    const validateCode = (c: string) => (c ?? '').trim().length >= 1;

    const handleSubmitCode = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError(null);

        if (!validateCode(code)) {
            setError('Lūdzu ievadiet derīgu kodu.');
            return;
        }

        setSubmitting(true);

        try {
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
            const message = err?.response?.data?.message || 'Kļūda, pārbaudot kodu';
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Head title={__('Online apmācība')} />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-white to-[#e7f7f1]">
                {/* Soft background orbs & grid */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 left-[-40px] h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
                    <div className="absolute top-1/3 right-[-60px] h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
                    <div className="absolute bottom-[-80px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-100/40 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#0f172a0d_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
                </div>

                <section className="relative mx-auto min-h-screen max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    {/* Header */}
                    <div className="mx-auto mb-8 max-w-2xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.3em] text-emerald-500 uppercase shadow-sm shadow-emerald-100/60">
                            Online
                            <span className="h-1 w-1 rounded-full bg-emerald-400" />
                            Apmācība
                        </span>

                        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Online apmācība — ATMP & MSC</h1>
                        <p className="mt-3 text-sm text-slate-600 sm:text-base">Piekļuve lekcijām ar pieejas kodu.</p>
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
                                                placeholder="Ievadiet pieejas kodu"
                                                className="w-full min-w-[220px] rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                                aria-invalid={!!error}
                                            />
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${
                                                    submitting ? 'cursor-wait bg-slate-600' : 'bg-emerald-500 hover:bg-emerald-400'
                                                }`}
                                                aria-label="Iesniegt kodu"
                                            >
                                                {submitting ? 'Pārbauda…' : 'Pārbaudīt kodu'}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                                                Piekļuve piešķirta
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setUnlocked(false);
                                                    setCode('');
                                                    setSelectedLecture(null);
                                                }}
                                                className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white/80"
                                            >
                                                Atslēgt
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {error && <div className="mb-3 text-sm text-rose-400">{error}</div>}

                            {/* Lectures area */}
                            {unlocked ? (
                                <div className="space-y-4">
                                    <p className="text-sm text-slate-600">Atbloķētās lekcijas</p>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {lectures.map((lec) => (
                                            <div key={lec.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-white">
                                                            {typeof lec.title === 'string'
                                                                ? lec.title
                                                                : lec.title.lv || lec.title.en || 'Online Training'}
                                                        </h3>
                                                        <p className="mt-2 text-xs text-slate-400">{lec.description}</p>
                                                        {lec.starts_at && (
                                                            <p className="mt-1 text-xs text-slate-500">
                                                                Sākums: {new Date(lec.starts_at).toLocaleString('lv-LV')}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedLecture(lec.id)}
                                                            className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-400"
                                                        >
                                                            {lec.url ? 'Atvērt lekciju' : 'Sākt lekciju'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {selectedLecture && (
                                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-semibold">Atvērta lekcija</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedLecture(null)}
                                                    className="rounded-full border px-2 py-1 text-xs"
                                                >
                                                    Aizvērt
                                                </button>
                                            </div>
                                            <div className="mt-3 text-sm text-slate-600">
                                                {(() => {
                                                    const lecture = lectures.find((l) => l.id === selectedLecture);
                                                    if (!lecture) return <p>Lekcija nav atrasta.</p>;

                                                    if (lecture.url) {
                                                        return (
                                                            <div>
                                                                <p>Lekcija ir pieejama šeit:</p>
                                                                <a
                                                                    href={lecture.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-emerald-500 underline hover:text-emerald-400"
                                                                >
                                                                    Atvērt lekciju
                                                                </a>
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div>
                                                            <p>
                                                                Lekcija:{' '}
                                                                {typeof lecture.title === 'string'
                                                                    ? lecture.title
                                                                    : lecture.title.lv || lecture.title.en || 'Online Training'}
                                                            </p>
                                                            {lecture.description && <p className="mt-2">{lecture.description}</p>}
                                                            {lecture.starts_at && (
                                                                <p className="mt-2">Sākums: {new Date(lecture.starts_at).toLocaleString('lv-LV')}</p>
                                                            )}
                                                            {lecture.ends_at && <p>Beigas: {new Date(lecture.ends_at).toLocaleString('lv-LV')}</p>}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center">
                                    <p className="text-sm text-slate-500">Lai atbloķētu lekcijas, ievadiet pieejas kodu augstāk.</p>
                                </div>
                            )}
                        </div>

                        {/* Small footer note */}
                        <p className="mt-6 text-center text-xs text-slate-400">Ievadiet derīgu lekciju piekļuves kodu, lai sāktu apmācību.</p>
                    </div>
                </section>
            </div>
        </>
    );
}
