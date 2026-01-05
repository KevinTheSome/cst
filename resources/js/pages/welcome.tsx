import { useLang } from '@/hooks/useLang';
import { Head, Link, usePage } from '@inertiajs/react';

// --- Icons (Inline SVGs for performance/no dependencies) ---
const Icons = {
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
    ),
    User: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
        </svg>
    ),
    Clipboard: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
        </svg>
    ),
    Book: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
        </svg>
    ),
};

const copy = {
    lv: {
        metaTitle: 'Sākumlapa',
        cards: [
            {
                title: 'Pacientu aptaujas anketa',
                text: 'Meklēju risinājumu imunitātei, locītavām vai atlabšanai.',
                action: 'Aizpildīt anketu',
            },
            {
                title: 'Speciālistu/Ārstu aptajuas anketa',
                text: 'Vēlos sadarboties pētniecībā vai nosūtīt pacientus.',
                action: 'Ispaust savu viedokli',
            },
            {
                title: 'Mācību programmas ārstiem/speciālistiem',
                text: 'Programmas nav konkrētu ārstēšanas metožu vai medicīnisku pakalpojumu reklāma.',
                action: 'Uzzināt vairāk',
            },
        ],
        completedLabel: 'Izpildīto anketu skaits',
        finalTitle: 'Uzzināt vairāk?',
        finalFaq: 'Biežāk uzdotie jautājumi',
        finalContact: 'Sazināties ar mums',
    },
    en: {
        metaTitle: 'Home',
        cards: [
            {
                title: 'Patient survey form',
                text: 'I am looking for solutions for immunity, joints, or recovery.',
                action: 'Fill out the form',
            },
            {
                title: 'Specialist/doctor survey form',
                text: 'I want to collaborate in research or refer patients.',
                action: 'Share your opinion',
            },
            {
                title: 'Training programs for doctors/specialists',
                text: 'Programs are not advertising specific treatments or medical services.',
                action: 'Learn more',
            },
        ],
        completedLabel: 'Completed forms count',
        finalTitle: 'Learn more?',
        finalFaq: 'Frequently asked questions',
        finalContact: 'Contact us',
    },
} as const;

export default function Welcome() {
    const { locale } = useLang();
    const t = copy[locale === 'en' ? 'en' : 'lv'];
    const { props } = usePage<any>();
    const completedFormsCount = props.completedFormsCount || 0;

    return (
        <>
            <Head title={t.metaTitle} />

            {/* MAIN WRAPPER */}
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
                {/* BACKGROUND TECH GRID */}
                <div className="pointer-events-none fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* --- HERO --- */}
                    <main className="py-20 text-center lg:py-26">
                        {/* --- 3 CARDS SECTION --- */}
                        {/* Changed grid-cols-2 to md:grid-cols-3 and max-w-2xl to max-w-6xl for better 3-card layout */}
                        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                            {/* 1. Patient Card (Emerald) */}
                            <Link
                                href="/postdock-anketa?role=patients"
                                className="group relative flex h-full flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10"
                            >
                                <div>
                                    <div className="mb-5 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600">
                                        <Icons.User className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-slate-900">{t.cards[0].title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">{t.cards[0].text}</p>
                                </div>
                                <div className="mt-6 flex items-center text-sm font-bold text-emerald-600 transition-colors group-hover:text-emerald-700">
                                    {t.cards[0].action} <Icons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>

                            {/* 2. Doctor Card (Sky Blue) */}
                            <Link
                                href="/postdock-anketa?role=specialists"
                                className="group relative flex h-full flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/10"
                            >
                                <div>
                                    <div className="mb-5 inline-flex rounded-xl bg-sky-50 p-3 text-sky-600 ring-1 ring-sky-100 transition-colors group-hover:bg-sky-600 group-hover:text-white group-hover:ring-sky-600">
                                        <Icons.Clipboard className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-slate-900">{t.cards[1].title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">{t.cards[1].text}</p>
                                </div>
                                <div className="mt-6 flex items-center text-sm font-bold text-sky-600 transition-colors group-hover:text-sky-700">
                                    {t.cards[1].action} <Icons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>

                            {/* 3. Technology/Research Card (Violet) */}
                            {/* Updated styling to Violet to visually distinguish it from the Doctor card */}
                            <Link
                                href="/specialistiem/apmaciba"
                                className="group relative flex h-full flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-xl hover:shadow-violet-500/10"
                            >
                                <div>
                                    <div className="mb-5 inline-flex rounded-xl bg-violet-50 p-3 text-violet-600 ring-1 ring-violet-100 transition-colors group-hover:bg-violet-600 group-hover:text-white group-hover:ring-violet-600">
                                        <Icons.Book className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-slate-900">{t.cards[2].title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">{t.cards[2].text}</p>
                                </div>
                                <div className="mt-6 flex items-center text-sm font-bold text-violet-600 transition-colors group-hover:text-violet-700">
                                    {t.cards[2].action} <Icons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        </div>
                    </main>

                    {/* --- COMPLETED FORMS COUNT --- */}
                    <div className="py-8 text-center">
                        <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-1 text-sm font-medium text-slate-600">{t.completedLabel}</div>
                            <div className="text-3xl font-bold text-emerald-600">{completedFormsCount.toLocaleString()}</div>
                        </div>
                    </div>

                    {/* --- FINAL CTA --- */}
                    <div className="py-12 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">{t.finalTitle}</h2>
                        <div className="mt-6 flex justify-center gap-4">
                            <Link
                                href="/pacientiem/faq"
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                            >
                                {t.finalFaq}
                            </Link>
                            <a
                                href="/ParMums/contacts"
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                            >
                                {t.finalContact}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
