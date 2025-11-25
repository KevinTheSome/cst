import { useLang } from '@/hooks/useLang';
import { Head, Link } from '@inertiajs/react';

const therapyCards = [
    {
        title: 'Lokālā terapija',
        body: 'Krēmi un želejas, kas samazina iekaisumu un nomierina ādu.',
    },
    {
        title: 'Sistemiskā terapija',
        body: 'Perorāli vai injekcijās lietojami medikamenti smagākos gadījumos.',
    },
    {
        title: 'Bioloģiskā terapija',
        body: 'Mērķtiecīgi preparāti, kas modulē imūnsistēmu un samazina plāksteru veidošanos.',
    },
];

const focusAreas = [
    {
        caption: 'Plāksteru samazināšana',
        description: 'Redzami uzlabojumi uz ādas pēc personalizētas terapijas cikla.',
    },
    {
        caption: 'Niezes mazināšana',
        description: 'Komforta uzlabošana pacientam un dzīves kvalitātes paaugstināšana.',
    },
    {
        caption: 'Imūnsistēmas regulācija',
        description: 'Ilgtermiņa remisijas panākšana ar stabilu imūnmodulāciju.',
    },
];

const stats = [
    { label: 'Pacienti ar uzlabojumiem', value: '85%' },
    { label: 'Vidējais terapijas ilgums', value: '12 nedēļas' },
    { label: 'Klīnikas partneri', value: '15' },
];

const therapySteps = [
    {
        title: '1. Konsultācija',
        text: 'Ārsts novērtē ādas stāvokli un izvēlas piemērotāko terapijas veidu.',
    },
    {
        title: '2. Personalizēts plāns',
        text: 'Izstrādā individuālu ārstēšanas shēmu atbilstoši plāksteru smagumam.',
    },
    {
        title: '3. Terapijas uzraudzība',
        text: 'Regulāras pārbaudes un nepieciešamības gadījumā pielāgošana, lai optimizētu rezultātu.',
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

export default function PsoriasisTherapy() {
    const { __ } = useLang();

    return (
        <>
            <Head title={__('Psoriāzes terapija')} />

            <div className="relative min-h-screen bg-gradient-to-b from-[#eef7ff] via-white to-[#ecf9f6] text-slate-900">
                {/* HERO */}
                <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center">
                    {/* LEFT */}
                    <div className="flex-1 space-y-7">
                        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                            Personalizēta psoriāzes terapija
                        </h1>

                        <p className="max-w-xl text-lg text-slate-600">
                            Mēs apvienojam klīnisko pieredzi un modernus terapijas veidus, lai samazinātu plāksterus, niezi un uzlabotu dzīves kvalitāti.
                        </p>

                        {/* CTA */}
                        <div className="flex w-full justify-start pt-3">
                            <Link
                                href="/psoriaze/anketa"
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
                                    Personalizēts terapijas plāns katram pacientam.
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-500" />
                                    Kombinēti lokālie un sistemiskie risinājumi.
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                                    Bioloģiskā terapija smagākos gadījumos.
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
