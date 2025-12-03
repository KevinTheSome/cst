import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

// --- ICONS ---
const Icons = {
    Lock: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
    ),
    Unlock: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
    ),
    Play: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>
    ),
    Monitor: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>
    ),
    Close: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
    )
};

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
  
  // UI-only prototype states
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);

  const validateCode = (c: string) => (c ?? '').trim().length >= 3;

  const handleSubmitCode = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!validateCode(code)) {
      setError('Lūdzu ievadiet derīgu kodu (vismaz 3 rakstzīmes).');
      return;
    }

    setSubmitting(true);

    // simulate short async check
    setTimeout(() => {
      setSubmitting(false);
      setUnlocked(true);
      setError(null);
    }, 700);
  };

  const lectures = useMemo(() => MOCK_LECTURES, []);

  return (
    <>
      <Head title="Online apmācība" />

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        
        {/* BACKGROUND TECH GRID */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
            <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          
          {/* Header */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 backdrop-blur px-3 py-1 text-xs font-semibold text-emerald-700 mb-6">
                <Icons.Monitor className="h-4 w-4" />
                E-Learning Platform
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                Tiešsaistes Apmācība & <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
                    Resursu Centrs
                </span>
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Piekļuve sertificētiem ATMP & MSC terapijas materiāliem. <br />
              Lūdzu, autorizējieties ar jums piešķirto kodu.
            </p>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="mx-auto w-full max-w-4xl">
            
            {/* LOCKED STATE: Access Card */}
            {!unlocked && (
                <div className="max-w-md mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-10 -mt-10"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                                <Icons.Lock className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Droša Piekļuve</h3>
                                <p className="text-xs text-slate-500">Ievadiet unikālo ID</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmitCode} className="space-y-4">
                            <div>
                                <label htmlFor="access-code" className="sr-only">Pieejas kods</label>
                                <input
                                    id="access-code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Ievadiet pieejas kodu (piem. 123)"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                                />
                                {error && <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">⚠️ {error}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full rounded-xl py-3 px-4 text-sm font-bold text-white shadow-lg transition-all ${
                                    submitting 
                                    ? 'bg-slate-400 cursor-wait' 
                                    : 'bg-slate-900 hover:bg-emerald-600 hover:shadow-emerald-500/20'
                                }`}
                            >
                                {submitting ? 'Autorizējas...' : 'Atbloķēt Saturu'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* UNLOCKED STATE: Dashboard */}
            {unlocked && (
                <div className="space-y-8 animate-fade-in-up">
                    
                    {/* Toolbar */}
                    <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <Icons.Unlock className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">Piekļuve Piešķirta</p>
                                <p className="text-xs text-slate-500">Sesija aktīva</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setUnlocked(false); setCode(''); setSelectedLecture(null); }}
                            className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            Beigt Darbu
                        </button>
                    </div>

                    {/* Active Lecture Player (Mock) */}
                    {selectedLecture && (
                        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-lg">
                            <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
                                <div className="text-center">
                                    <div className="h-16 w-16 mx-auto rounded-full bg-white/10 backdrop-blur flex items-center justify-center mb-4">
                                        <Icons.Play className="h-8 w-8 text-white ml-1" />
                                    </div>
                                    <p className="text-white font-medium">Video Atskaņotājs (Demo)</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            {lectures.find(l => l.id === selectedLecture)?.title}
                                        </h2>
                                        <p className="text-slate-500 mt-1">
                                            {lectures.find(l => l.id === selectedLecture)?.shortDesc}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedLecture(null)}
                                        className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <Icons.Close className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lecture Grid */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 px-2">Pieejamās Lekcijas</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {lectures.map((lec) => (
                                <div 
                                    key={lec.id} 
                                    className={`group relative rounded-2xl border p-5 transition-all cursor-pointer ${
                                        selectedLecture === lec.id 
                                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' 
                                        : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                                    }`}
                                    onClick={() => setSelectedLecture(lec.id)}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                                    Video
                                                </span>
                                                <span className="text-xs font-medium text-emerald-600">
                                                    {lec.duration} min
                                                </span>
                                            </div>
                                            <h4 className={`text-base font-bold mb-1 ${
                                                selectedLecture === lec.id ? 'text-emerald-900' : 'text-slate-900'
                                            }`}>
                                                {lec.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 line-clamp-2">
                                                {lec.shortDesc}
                                            </p>
                                        </div>
                                        
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                                            selectedLecture === lec.id 
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                                            : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white'
                                        }`}>
                                            <Icons.Play className="h-5 w-5 ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}

            {/* Footer Disclaimer */}
            <div className="mt-16 border-t border-slate-200 pt-8 text-center">
                <p className="text-xs text-slate-400">
                    Sistēma darbojas testa režīmā. Dati netiek saglabāti. <br />
                    &copy; BioChip Labs Education Portal.
                </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}