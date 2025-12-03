import { useLang } from '@/hooks/useLang';
import { Head, Link } from '@inertiajs/react';

// --- Icons (Inline SVGs for performance/no dependencies) ---
const Icons = {
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    ),
    Check: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    User: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
    ),
    Doctor: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
    ),
};

const valueCards = [
    {
        title: 'Cilmes šūnu terapija',
        body: 'Atjaunojam audus ar hematopoētisko un mezenhimālo šūnu palīdzību.',
    },
    {
        title: 'Biočipu precizitāte',
        body: 'Mikrofluidika ļauj testēt tūkstošiem scenāriju vienā skrējienā.',
    },
    {
        title: 'Drošas telpas',
        body: 'ISO klase + ārstu partneri nozīmē uzticamus protokolus.',
    },
];

const focusAreas = [
    {
        caption: 'Asinsrade',
        description: 'Atbalsts pacientiem pēc ķīmijterapijas vai ilgstošām infekcijām.',
    },
    {
        caption: 'Autoimunitāte',
        description: 'Šūnu terapijas multiplās sklerozes un artrīta gadījumos.',
    },
    {
        caption: 'Ortopēdija',
        description: 'Skrimšļu un saišu “salabošana” ar cilmes šūnām.',
    },
];

const stats = [
    { label: 'Analizētie paraugi', value: '10k+' },
    { label: 'Šūnu parametri vienā skrējienā', value: '1k+' },
    { label: 'Partneru klīnikas', value: '12' },
];

const ecosystemSteps = [
    {
        title: '1. Analīze',
        text: 'Mikrofluidika uztaisa šūnu karti dažu minūšu laikā.',
    },
    {
        title: '2. Treniņš',
        text: 'Šūnas tiek “trenētas” ar biomateriāliem, lai aktivizētu dziedināšanu.',
    },
    {
        title: '3. Terapija',
        text: 'Drošs protokols nonāk pie ārsta un pie pacienta.',
    },
];

function ArrowIcon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
            <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.69l-3.22-3.22a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default function Welcome() {
    const { __ } = useLang();

    return (
        <>
            <Head title={__('Sākumlapa')} />

            {/* MAIN WRAPPER (styles taken from the FIRST file) */}
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">

                {/* BACKGROUND TECH GRID (from FIRST file) */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                   
                    {/* --- HERO (layout/content from SECOND file, but styling from FIRST) --- */}
                    <main className="py-12 lg:py-20 text-center">
                        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
                            Cilmes šūnu diagnostika un terapija vienā platformā
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed mb-10">
                            RTU Biočipu laboratorija apvieno zinātni un inženieriju, lai cilmes šūnu terapijas kļūtu drošākas un pieejamākas.
                        </p>

                        {/* SPLIT CTA - use FIRST file card styles but SECOND file links/content */}
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Patient Card (content from second) */}
                            <Link href="/anketa?role=pacients" className="group relative flex flex-col items-start p-6 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300">
                                <div className="mb-4 rounded-full bg-emerald-50 p-3 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <Icons.User className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Esmu Pacients</h3>
                                <p className="mt-1 text-sm text-slate-500 text-left">Meklēju risinājumu imunitātei, locītavām vai atlabšanai.</p>
                                <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600 group-hover:underline">
                                    Aizpildīt anketu <Icons.ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </Link>

                            {/* Doctor Card (content from second) */}
                            <Link href="/postdock-anketa?role=specialists" className="group relative flex flex-col items-start p-6 rounded-2xl border border-slate-200 bg-white hover:border-sky-400 hover:shadow-lg hover:shadow-sky-100 transition-all duration-300">
                                <div className="mb-4 rounded-full bg-sky-50 p-3 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                    <Icons.Doctor className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Esmu Speciālists</h3>
                                <p className="mt-1 text-sm text-slate-500 text-left">Vēlos sadarboties pētniecībā vai nosūtīt pacientus.</p>
                                <div className="mt-4 flex items-center text-sm font-semibold text-sky-600 group-hover:underline">
                                    Speciālista reģistrācija <Icons.ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </Link>
                        </div>

                        {/* Trust Badges / Stats (styling from FIRST) */}
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                            {stats.map((s, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-2xl font-bold text-slate-800">{s.value}</span>
                                    <span className="text-xs uppercase tracking-wider">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </main>

                    {/* --- BENTO GRID FEATURES (use SECOND content but style from FIRST) --- */}
                    <section className="py-16">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">Tehnoloģija & Fokus</h2>
                                <p className="mt-2 text-slate-600">Kāpēc mūsu metode ir pārāka par tradicionālo pieeju.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Big Card - Core Tech (SECOND content) */}
                            <div className="md:col-span-2 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1 text-xs text-emerald-700 mb-4">
                                        Core Technology
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Biočipu precizitāte</h3>
                                    <p className="text-slate-600 max-w-md leading-relaxed">
                                        Atšķirībā no parastām mēģenēm, mikrofluidika ļauj testēt tūkstošiem scenāriju vienā skrējienā ar minimālu parauga daudzumu. Mēs redzam to, ko citi palaiž garām.
                                    </p>
                                    <ul className="mt-6 space-y-2">
                                        {['Ātrāka analīze', 'Mazāks biomateriāla patēriņš', 'Augstāka šūnu izdzīvotība'].map(item => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                                <Icons.Check className="h-4 w-4 text-emerald-500" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Tall Card - Process (SECOND content) - changed to WHITE background to match page style */}
                            <div className="md:row-span-2 rounded-3xl bg-white p-8 text-slate-900 relative overflow-hidden">
                                <div className="relative z-10 h-full flex flex-col">
                                    <h3 className="text-xl font-bold mb-6">Terapijas soļi</h3>

                                    <div className="space-y-8 flex-1">
                                        {ecosystemSteps.map((step, i) => (
                                            <div key={i} className="flex gap-4 group">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs shadow-sm">
                                                        {i + 1}
                                                    </div>
                                                    {i !== ecosystemSteps.length - 1 && <div className="h-full w-0.5 bg-slate-200 my-2 group-hover:bg-emerald-200 transition-colors"></div>}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">{step.title}</h4>
                                                    <p className="text-sm text-slate-600 mt-1">{step.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <p className="text-xs text-slate-500">ISO Klase + Ārstu uzraudzība</p>
                                    </div>
                                </div>
                            </div>

                            {/* Small Cards (SECOND content) */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                </div>
                                <h4 className="font-bold text-slate-900">Autoimunitāte</h4>
                                <p className="text-sm text-slate-600 mt-2">Šūnu terapijas multiplās sklerozes un artrīta gadījumos.</p>
                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </div>
                                <h4 className="font-bold text-slate-900">Asinsrade & Atjaunošana</h4>
                                <p className="text-sm text-slate-600 mt-2">Atbalsts pacientiem pēc ķīmijterapijas vai ilgstošām infekcijām.</p>
                            </div>

                        </div>
                    </section>

                    {/* --- FINAL CTA (FIRST styling, SECOND links) --- */}
                    <div className="py-20 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">Gatavs uzzināt vairāk?</h2>
                        <div className="mt-6 flex justify-center gap-4">
                             <Link href="/anketa" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                                Sākt anketēšanu
                             </Link>
                             <a href="/ParMums/pievienojies-mums" className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors">
                                Sazināties ar mums
                             </a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
