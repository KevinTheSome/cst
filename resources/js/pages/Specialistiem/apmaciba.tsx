import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type Lecture = {
  id: string;
  title: string;
  duration: string;
  shortDesc?: string;
};

const MOCK_LECTURES: Lecture[] = [
  { id: 'l1', title: 'Ievads ATMP un MSC šūnu terapijā', duration: '10:24', shortDesc: 'Kas ir ATMP un kas jāzina pacientam.' },
  { id: 'l2', title: 'Klīniskie pētījumi un drošība', duration: '18:12', shortDesc: 'Apskats par pierādījumiem un riskiem.' },
  { id: 'l3', title: 'Kas notiek procedūras laikā?', duration: '12:05', shortDesc: 'Soli pa solim - ko sagaidīt.' },
  { id: 'l4', title: 'Biežākie jautājumi un resursi', duration: '08:40', shortDesc: 'Praktiski padomi un saites.' },
];

export default function OnlineTraining() {
  const { __ } = useLang();

  // UI-only prototype states
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);

  // Simple client-side "validation" for prototype:
  // treat any non-empty code as valid; if you want specific codes, replace logic later
  const validateCode = (c: string) => (c ?? '').trim().length >= 3;

  const handleSubmitCode = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!validateCode(code)) {
      setError('Lūdzu ievadiet derīgu kodu (vismaz 3 rakstzīmes).');
      return;
    }

    setSubmitting(true);

    // simulate short async check (UI-only). Replace with API call later.
    setTimeout(() => {
      setSubmitting(false);
      setUnlocked(true);
      setError(null);
    }, 700);
  };

  const lectures = useMemo(() => MOCK_LECTURES, []);

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
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-emerald-500 shadow-sm shadow-emerald-100/60">
              Online
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Apmācība
            </span>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Online apmācība — ATMP & MSC</h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Piekļuve lekcijām ar pieejas kodu. Šī ir prototipa versija — reāla autorizācija tiks pievienota vēlāk.
            </p>
          </div>

          {/* Code entry + lectures panel */}
          <div className="mx-auto w-full max-w-4xl space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:p-7 lg:p-8">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Piekļuve lekcijām</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Ievadiet savu pieejas kodu, lai atbloķētu lekcijas. (UI-only prototips)
                  </p>
                </div>

                <div className="mt-2 sm:mt-0 w-full sm:w-auto">
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
                          submitting ? 'bg-slate-600 cursor-wait' : 'bg-emerald-500 hover:bg-emerald-400'
                        }`}
                        aria-label="Iesniegt kodu"
                      >
                        {submitting ? 'Pārbauda…' : 'Pārbaudīt kodu'}
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">Piekļuve piešķirta</div>
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
                            <h3 className="text-sm font-semibold text-white">{lec.title}</h3>
                            <p className="mt-2 text-xs text-slate-400">{lec.shortDesc}</p>
                          </div>

                          <div className="text-right">
                            <div className="text-xs text-slate-400">{lec.duration}</div>
                            <button
                              type="button"
                              onClick={() => setSelectedLecture(lec.id)}
                              className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-400"
                            >
                              Sākt lekciju
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
                        <p>Šī ir demonstrācijas lekcija. Reāla video/lekciju atskaņošana tiks pievienota vēlāk.</p>
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
            <p className="mt-6 text-center text-xs text-slate-400">
              Šī prototipa lapa ir paredzēta demonstrācijai — reāla autorizācija un lekciju atskaņošana tiks pievienota vēlāk.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}