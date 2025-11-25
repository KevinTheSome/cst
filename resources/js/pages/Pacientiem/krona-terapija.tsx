import { useLang } from '@/hooks/useLang';
import { Head, Link } from '@inertiajs/react';

const therapyCards = [
    {
        title: 'Medikamentozā terapija',
        body: 'Precīzi dozēti medikamenti nieru funkcijas atbalstam un slimības progresijas kavēšanai.',
    },
    {
        title: 'Dzīvesveida pielāgojumi',
        body: 'Diēta, šķidruma uzņemšana un fiziskā aktivitāte, kas palīdz stabilizēt nieru darbību.',
    },
    {
        title: 'Dialīze un transplantācija',
        body: 'Smagos gadījumos nodrošinām dialīzes plānu vai sagatavojam pacientu transplantācijai.',
    },
];

const focusAreas = [
    {
        caption: 'Nieru funkcijas saglabāšana',
        description: 'Optimizējam terapiju, lai ilgāk saglabātu dabīgo nieru darbību.',
    },
    {
        caption: 'Asinsspiediena kontrole',
        description: 'Samazina komplikāciju risku un atbalsta nieru veselību.',
    },
    {
        caption: 'Pacienta dzīves kvalitāte',
        description: 'Regulāra uzraudzība un personalizēts plāns mazina simptomus un stresu.',
    },
];

const stats = [
    { label: 'Pacienti ar stabilu nieru funkciju', value: '78%' },
    { label: 'Vidējais terapijas ilgums', value: '18 mēneši' },
    { label: 'Klīnikas partneri', value: '10' },
];

const therapySteps = [
    {
        title: '1. Diagnostika',
        text: 'Asins un urīna analīzes, nieru funkcijas testēšana, risku novērtējums.',
    },
    {
        title: '2. Personalizēts terapijas plāns',
        text: 'Izstrādā individuālu ārstēšanas stratēģiju, iekļaujot medikamentus un dzīvesveida ieteikumus.',
    },
    {
        title: '3. Uzraudzība un pielāgošana',
        text: 'Regulāras pārbaudes, terapijas korekcijas, komplikāciju novēršana.',
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

export default function ChronTherapy() {
    const { __ } = useLang();

    return (
        <>
            <Head title={__('Hroniskas nieru slimības terapija')} />

            <div className="relative min-h-screen bg-gradient-to-b from-[#eef7ff] via-white to-[#ecf9f6] text-slate-900">
                {/* HERO */}
                <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center">
                    {/* LEFT */}
                    <div className="flex-1 space-y-7">
                        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                            Personalizēta hroniskas nieru slimības terapija
                        </h1>

                        <p className="max-w-xl text-lg text-slate-600">
                            Mēs apvienojam medicīnisko pieredzi un modernus terapijas veidus, lai saglabātu nieru funkciju, kontrolētu simptomus un uzlabotu pacienta dzīves kvalitāti.
                        </p>

                        {/* CTA */}
                        <div className="flex w-full justify-start pt-3">
                            <Link
                                href="/chron/anketa"
                                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-sky-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:shadow-emerald-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:text-lg"
                            >
                                Aizpildīt anketu
                                <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1">
                        <div className="rounded-2xl border border-emerald-200/70 bg-white/90 p-7 shadow-lg backdrop-blur">
                            <h2 className="text-xl font-semibold text-slate-900">Kāpēc izvēlēties mūsu pieeju?</h2>
                            <ul className="mt-4 space-y-2 text-sm text-slate-600">
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                                    Terapija pielāgota katram pacienta nieru funkcijas stāvoklim.
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-500" />
                                    Integrēta medikamentozā un dzīvesveida pieeja.
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                                    Dialīzes un transplantācijas plānošana nepieciešamības gadījumā.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* THERAPY CARDS */}
                <section className="mx-auto max-w-6xl px-4 sm:px-8 pb-16">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-6">Terapijas veidi</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                        {therapyCards.map((card, i) => (
                            <div key={card.title} className="rounded-2xl border border-emerald-200/70 bg-white p-6 shadow-sm hover:shadow-md transition hover:-translate-y-1">
                                <h4 className="text-lg font-semibold text-slate-900">{card.title}</h4>
                                <p className="mt-2 text-sm text-slate-600">{card.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FOCUS AREAS */}
                <section className="mx-auto max-w-6xl px-4 sm:px-8 pb-16">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-6">Galvenie terapijas mērķi</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                        {focusAreas.map((area) => (
                            <div key={area.caption} className="rounded-2xl border border-emerald-200/70 bg-white p-6 shadow-sm hover:shadow-lg transition hover:-translate-y-1">
                                <p className="font-semibold text-emerald-700 mb-2">{area.caption}</p>
                                <p className="text-sm text-slate-600">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* THERAPY STEPS */}
                <section className="mx-auto max-w-6xl px-4 sm:px-8 pb-16">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-6">Terapijas gaita</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                        {therapySteps.map((step, index) => (
                            <div key={step.title} className="relative rounded-2xl border border-emerald-200/70 bg-white p-6 shadow-sm">
                                <span className="absolute -top-3 -left-3 text-3xl font-bold text-emerald-200">{index + 1}</span>
                                <p className="font-semibold text-slate-900">{step.title}</p>
                                <p className="mt-2 text-sm text-slate-600">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* STATS */}
                <section className="mx-auto max-w-6xl px-4 sm:px-8 pb-16">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-6">Rezultāti</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm border border-emerald-200/70 text-center">
                                <p className="text-3xl font-bold text-emerald-600">{stat.value}</p>
                                <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
