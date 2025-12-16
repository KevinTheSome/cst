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

export default function Welcome() {
    const { __ } = useLang();
    const { props } = usePage<any>();
    const completedFormsCount = props.completedFormsCount || 0;

    return (
        <>
            <Head title={__('Sākumlapa')} />

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
                                    <h3 className="mb-2 text-xl font-bold text-slate-900">Pacientu aptaujas anketa</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">Meklēju risinājumu imunitātei, locītavām vai atlabšanai.</p>
                                </div>
                                <div className="mt-6 flex items-center text-sm font-bold text-emerald-600 transition-colors group-hover:text-emerald-700">
                                    Aizpildīt anketu <Icons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                                    <h3 className="mb-2 text-xl font-bold text-slate-900">Speciālistu/Ārstu aptajuas anketa</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">Vēlos sadarboties pētniecībā vai nosūtīt pacientus.</p>
                                </div>
                                <div className="mt-6 flex items-center text-sm font-bold text-sky-600 transition-colors group-hover:text-sky-700">
                                    Ispaust savu viedokli <Icons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                                    <h3 className="mb-2 text-xl font-bold text-slate-900">Mācību programmas ārstiem/speciālistiem</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">
                                        Programmas nav konkrētu ārstēšanas metožu vai medicīnisku pakalpojumu reklāma.
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center text-sm font-bold text-violet-600 transition-colors group-hover:text-violet-700">
                                    Uzzināt vairāk <Icons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        </div>
                    </main>

                    {/* --- COMPLETED FORMS COUNT --- */}
                    <div className="py-8 text-center">
                        <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-1 text-sm font-medium text-slate-600">Izpildīto anketu skaits</div>
                            <div className="text-3xl font-bold text-emerald-600">{completedFormsCount.toLocaleString()}</div>
                        </div>
                    </div>

                    {/* --- FINAL CTA --- */}
                    <div className="py-12 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">Uzzināt vairāk?</h2>
                        <div className="mt-6 flex justify-center gap-4">
                            <Link
                                href="/pacientiem/faq"
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                            >
                                Lidz biežāk jautātie jautājumi
                            </Link>
                            <a
                                href="/ParMums/contacts"
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                            >
                                Sazināties ar mums
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
