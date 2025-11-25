import { useLang } from '@/hooks/useLang';
import { Head, Link } from '@inertiajs/react';

const audienceInfoCards = [
    { label: 'Speciālistiem', subtitle: 'ATMP protokoli, validācija un sadarbība' },
    { label: 'Pacientiem', subtitle: 'Pieteikšanās personalizētai ATMP konsultācijai' },
];

const valueCards = [
    {
        title: 'ATMP šūnu terapija',
        body: 'Strādājam ar šūnu bāzes terapijām, tostarp MSC un hematopoētiskām šūnām.',
    },
    {
        title: 'Biočipu precizitāte ATMP procesiem',
        body: 'Mikrofluidika ļauj analizēt un kondicionēt šūnas ar regulatīviem parametriem.',
    },
    {
        title: 'Drošas, ATMP saderīgas telpas',
        body: 'ISO klase un validēti procesi nodrošina atbilstību ATMP prasībām.',
    },
];

const focusAreas = [
    {
        caption: 'Regenerācija',
        description: 'ATMP pieeja audu atjaunošanai pēc traumas vai hroniskas pārslodzes.',
    },
    {
        caption: 'Imūnmodulācija',
        description: 'Šūnu terapijas, kas regulē imūnsistēmu autoimūnos procesos.',
    },
    {
        caption: 'Ortopēdiskās ATMP terapijas',
        description: 'MSC ATMP lietojums saišu, cīpslu un skrimšļu atjaunošanā.',
    },
];

const stats = [
    { label: 'ATMP šūnu profili', value: '10k+' },
    { label: 'Regulatīvie parametri vienā skrējienā', value: '1k+' },
    { label: 'Sadarbības klīnikas ATMP jomā', value: '12' },
];

const ecosystemSteps = [
    {
        title: '1. Analīze',
        text: 'Biočips sagatavo ATMP saderīgu šūnu profilu un kritiskos kvalitātes parametrus.',
    },
    {
        title: '2. Kondicionēšana',
        text: 'Šūnas tiek aktivizētas, trenētas vai modificētas saskaņā ar ATMP prasībām.',
    },
    {
        title: '3. Terapija',
        text: 'Validēts ATMP protokols tiek nodots ārstam personalizētai pielietošanai.',
    },
];

function ArrowIcon({ className = '' }) {
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
            <Head title={__('ATMP')} />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eef7ff] via-white to-[#ecf9f6] text-slate-900">
                {/* soft blobs + grid */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
                    <div className="absolute top-52 right-[-40px] h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#0f172a12_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
                </div>

                {/* HERO */}
                <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center">
                    {/* LEFT */}
                    <div className="flex-1 space-y-7">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.35em] text-emerald-700 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                            ATMP Biočipu centrs
                        </div>

                        <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                            ATMP šūnu terapijas un diagnostika vienā platformā
                        </h1>

                        <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                            RTU Biočipu laboratorija apvieno mikrofluidiku un šūnu inženieriju, lai ATMP (Advanced Therapy Medicinal Products) kļūtu precīzāki, drošāki un personalizēti.
                        </p>

                        {/* BIG CENTER CTA */}
                        <div className="flex w-full justify-center pt-1">
                            <Link
                                href="/anketa"
                                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-sky-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:shadow-emerald-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:text-lg"
                            >
                                Atvērt anketu
                                <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Audience info cards */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            {audienceInfoCards.map((card) => (
                                <div
                                    key={card.label}
                                    className="rounded-2xl border border-emerald-200/70 bg-white p-5 shadow-lg shadow-emerald-900/5"
                                >
                                    <p className="text-xs uppercase tracking-[0.35em] text-emerald-700">{card.label}</p>
                                    <p className="mt-2 text-base font-semibold text-slate-900">{card.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1">
                        <div className="relative overflow-hidden rounded-[40px] border border-white/70 bg-white/85 p-7 shadow-2xl shadow-slate-200 backdrop-blur">
                            {/* soft circular glows */}
                            <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-sky-200/60 blur-3xl" />
                            <div className="pointer-events-none absolute -left-16 -bottom-16 h-44 w-44 rounded-full bg-emerald-200/60 blur-3xl" />
                            <div className="pointer-events-none absolute right-6 top-6 h-16 w-16 rounded-full border border-sky-200/60" />
                            <div className="pointer-events-none absolute left-8 bottom-8 h-12 w-12 rounded-full border border-emerald-200/60" />

                            <h2 className="text-xl font-semibold text-slate-900">Kāpēc ATMP?</h2>

                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                Īsumā: ATMP palīdz atjaunot audus un imunitāti, balstoties uz pacienta bioloģiju.
                            </p>

                            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    ATMP šūnas var tikt izmantotas audu reģenerācijai, imūnterapijai un bioloģiskai atjaunošanai.
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                                    Biočips ļauj sagatavot ATMP saderīgu šūnu kvalitātes profilu ar minimālu materiāla apjomu.
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    Rezultāts — personalizēts ATMP protokols konkrētajam pacientam.
                                </li>
                            </ul>

                            <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4">
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    <p className="text-sm text-slate-700">ATMP saderīgi šūnu kvalitātes parametri</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                                    <p className="text-sm text-slate-700">Mikrofluidika ar validējamu reproducējamību</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    <p className="text-sm text-slate-700">Protokoli izstrādāti kopā ar klīnicistiem</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* VALUE / PROCESS */}
                <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 sm:px-8">
                    {/* Value cards */}
                    <div className="rounded-[32px] border border-white/70 bg-white p-8 shadow-xl shadow-slate-200/80">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">Kas notiek laboratorijā</p>
                                <h3 className="mt-3 text-3xl font-semibold text-slate-900">Trīs soļi līdz personalizētai ATMP terapijai</h3>
                            </div>
                            <div className="text-sm text-slate-500">No parauga līdz protokolam</div>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {valueCards.map((card, i) => (
                                <div
                                    key={card.title}
                                    className="group relative rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="absolute -top-3 left-6 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow">
                                        0{i + 1}
                                    </div>
                                    <h4 className="mt-3 text-lg font-semibold text-slate-900">{card.title}</h4>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
                                    <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 opacity-70 transition group-hover:w-20" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Focus areas */}
                    <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-8 shadow-xl shadow-slate-200">
                        <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full bg-white/60 blur-xl sm:block" />
                        <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">Galvenie virzieni</p>
                        <h3 className="mt-3 text-2xl font-semibold text-slate-900">Kur mēs fokusējamies</h3>

                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {focusAreas.map((area) => (
                                <div
                                    key={area.caption}
                                    className="group rounded-2xl border border-white/80 bg-white/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        {area.caption}
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-600">{area.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ecosystem */}
                    <div className="rounded-[32px] border border-white/70 bg-white p-8 shadow-xl shadow-slate-200">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">Ekosistēma</p>
                                <h3 className="mt-3 text-2xl font-semibold text-slate-900">Kā top personalizētā ATMP terapija</h3>
                            </div>
                            <div className="text-sm text-slate-500">Datu plūsma · laboratorija · klīnika</div>
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {ecosystemSteps.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm"
                                >
                                    <span className="absolute -right-3 top-3 text-5xl font-bold text-slate-100">{index + 1}</span>
                                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
