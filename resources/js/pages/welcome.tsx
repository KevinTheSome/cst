import { useLang } from '@/hooks/useLang';
import { Head, Link } from '@inertiajs/react';



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
            <Head title={__('Sākumlapa')} />

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
                            SIA cilmes šunu tehnoloģijas
                        </div>

                        <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                            Cilmes šūnu diagnostika un terapija vienā platformā
                        </h1>

                        <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                            RTU Biočipu laboratorija apvieno zinātni un inženieriju, lai cilmes šūnu terapijas kļūtu drošākas un pieejamākas.
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

                        {/* Specialist vs patient buttons */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            {[
                                { label: 'Speciālisti', href: '/postdock-anketa?role=specialists' },
                                { label: 'Pacienti', href: '/anketa?role=pacients' },
                            ].map((cta) => (
                                <Link key={cta.label} href={cta.href} className="cta-pill group">
                                    <span className="cta-pill__accent">
                                        <svg viewBox="0 0 1024 1024" height="24" width="24" aria-hidden>
                                            <path
                                                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                                fill="#0f172a"
                                            />
                                            <path
                                                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                                fill="#0f172a"
                                            />
                                        </svg>
                                    </span>
                                    <span className="cta-pill__label">{cta.label}</span>
                                </Link>
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

                            <h2 className="text-xl font-semibold text-slate-900">Kāpēc cilmes šūnas?</h2>

                            {/* ✅ Short, easy-scan lead */}
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                Īsumā: tās palīdz atjaunot audus un imunitāti, balstoties uz pacienta bioloģiju.
                            </p>

                            {/* ✅ Replace long paragraphs with bullets */}
                            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    Var kļūt par dažādu audu šūnām, tāpēc der slimībām bez efektīviem medikamentiem.
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                                    Biočips ļauj droši “trenēt” šūnas ar ļoti mazu materiāla daudzumu.
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    Rezultāts ir personalizēts protokols, nevis vidēji statistiska pieeja.
                                </li>
                            </ul>

                            {/* Key benefits box stays, but tighter */}
                            <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4">
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    <p className="text-sm text-slate-700">Personalizēti šūnu profili katram pacientam</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                                    <p className="text-sm text-slate-700">Mikrofluidika ar minimālu parauga apjomu</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    <p className="text-sm text-slate-700">Klīniski pierādāmi protokoli ar ārstu iesaisti</p>
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
                                <h3 className="mt-3 text-3xl font-semibold text-slate-900">Trīs soļi līdz personalizētai terapijai</h3>
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
                                <h3 className="mt-3 text-2xl font-semibold text-slate-900">Kā top personalizētā terapija</h3>
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

            <style>
                {`
                .cta-pill {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    width: 11.5rem;
                    height: 3.5rem;
                    border-radius: 1.5rem;
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid rgba(15, 23, 42, 0.12);
                    color: #0f172a;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    overflow: hidden;
                    transition: box-shadow 0.3s ease;
                }
                .cta-pill__accent {
                    position: absolute;
                    left: 6px;
                    top: 6px;
                    height: calc(100% - 12px);
                    width: 3.4rem;
                    border-radius: 1.25rem;
                    background: linear-gradient(135deg, #34d399, #22d3ee);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: width 0.45s ease;
                    box-shadow: 0 10px 25px rgba(45, 212, 191, 0.35);
                    z-index: 1;
                }
                .cta-pill__label {
                    position: relative;
                    z-index: 2;
                    transform: translateX(15px);
                    transition: transform 0.45s ease;
                }
                .cta-pill:hover .cta-pill__accent {
                    width: calc(100% - 12px);
                }
                .cta-pill:hover .cta-pill__label {
                    transform: translateX(8px);
                    z-index: 0;
                }
                .cta-pill:hover {
                    box-shadow: 0 15px 35px rgba(15, 23, 42, 0.1);
                }
                `}
            </style>
        </>
    );
}
