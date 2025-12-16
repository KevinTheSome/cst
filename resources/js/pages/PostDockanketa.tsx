import { Head, Link, usePage } from '@inertiajs/react';

// --- ICONS ---
const Icons = {
    User: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
        </svg>
    ),
    Activity: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
        </svg>
    ),
    FileText: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
        </svg>
    ),
    Code: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
    ),
    Stethoscope: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" className={className}>
            <path
                d="M5.5,7C4.1193,7,3,5.8807,3,4.5l0,0v-2C3,2.2239,3.2239,2,3.5,2H4c0.2761,0,0.5-0.2239,0.5-0.5S4.2761,1,4,1H3.5&#xA;&#x9;C2.6716,1,2,1.6716,2,2.5v2c0.0013,1.1466,0.5658,2.2195,1.51,2.87l0,0C4.4131,8.1662,4.9514,9.297,5,10.5C5,12.433,6.567,14,8.5,14&#xA;&#x9;s3.5-1.567,3.5-3.5V9.93c1.0695-0.2761,1.7126-1.367,1.4365-2.4365C13.1603,6.424,12.0695,5.7809,11,6.057&#xA;&#x9;C9.9305,6.3332,9.2874,7.424,9.5635,8.4935C9.7454,9.198,10.2955,9.7481,11,9.93v0.57c0,1.3807-1.1193,2.5-2.5,2.5S6,11.8807,6,10.5&#xA;&#x9;c0.0511-1.2045,0.5932-2.3356,1.5-3.13l0,0C8.4404,6.7172,9.001,5.6448,9,4.5v-2C9,1.6716,8.3284,1,7.5,1H7&#xA;&#x9;C6.7239,1,6.5,1.2239,6.5,1.5S6.7239,2,7,2h0.5C7.7761,2,8,2.2239,8,2.5v2l0,0C8,5.8807,6.8807,7,5.5,7 M11.5,9&#xA;&#x9;c-0.5523,0-1-0.4477-1-1s0.4477-1,1-1s1,0.4477,1,1S12.0523,9,11.5,9z"
            />
        </svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
    ),
};

const clientButtons = [
    {
        label: 'Psoriāze',
        href: '/anketa-psoriāze',
        icon: Icons.User,
        colorClass: 'group-hover:border-emerald-400 group-hover:shadow-emerald-100',
        iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
        label: 'Krona slimības',
        href: '/anketa-hroniskas',
        icon: Icons.Activity,
        colorClass: 'group-hover:border-emerald-400 group-hover:shadow-emerald-100',
        iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
        label: 'Koda formas',
        href: '/anketa-kods',
        icon: Icons.Code,
        colorClass: 'group-hover:border-violet-400 group-hover:shadow-violet-100',
        iconBg: 'bg-violet-50 text-violet-600',
    },
];

const specialistButtons = [
    {
        label: 'Speciālistiem',
        href: '/anketa-specialiste',
        icon: Icons.Stethoscope,
        colorClass: 'group-hover:border-sky-400 group-hover:shadow-sky-100',
        iconBg: 'bg-sky-50 text-sky-600',
    },
];

export default function PostDockanketa() {
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1] ?? '');
    const role = searchParams.get('role');
    const isSpecialistOnly = role === 'specialists';
    const isPatientOnly = role === 'patients';
    const showPatientSection = !isSpecialistOnly;
    const showSpecialistSection = !isPatientOnly;

    return (
        <>
            <Head title="PostDock anketa" />

            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
                {/* BACKGROUND TECH GRID */}
                <div className="pointer-events-none fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
                    {/* INTRO BLOCK */}
                    <div className="mb-16 text-center">
                        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Izvēlieties atbilstošo <br />
                            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">Anketu</span>
                        </h1>
                        <p className="mx-auto max-w-4xl text-lg text-slate-600">
                            Šī anketēšana tiek veikta promocijas darba ietvarā Biznesa augstskolā Turība, doktorantūras programmā uzņēmējdarbības
                            vadībā.
                        </p>
                    </div>

                    {/* MAIN CONTENT GRID */}
                    <div className="grid gap-12">
                        {/* SECTION: CLIENTS */}
                        {showPatientSection && (
                            <div>
                                <div className="mb-6 flex items-center gap-3">
                                    <h2 className="text-xl font-bold text-slate-900">Pacientiem</h2>
                                    <div className="h-px flex-1 bg-slate-200"></div>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    {clientButtons.map((btn) => (
                                        <Link
                                            key={btn.label}
                                            href={btn.href}
                                            className={`group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${btn.colorClass}`}
                                        >
                                            <div className="mb-4 flex items-start justify-between">
                                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${btn.iconBg}`}>
                                                    <btn.icon className="h-6 w-6" />
                                                </div>
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                                                    <Icons.ArrowRight className="h-4 w-4" />
                                                </div>
                                            </div>

                                            <h3 className="mb-2 text-xl font-bold text-slate-900">{btn.label}</h3>
                                            <p className="text-sm leading-relaxed text-slate-500">{btn.subtitle}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SECTION: SPECIALISTS */}
                        {showSpecialistSection && (
                            <div>
                                <div className="mb-6 flex items-center gap-3">
                                    <h2 className="text-xl font-bold text-slate-900">Speciālistiem</h2>
                                    <div className="h-px flex-1 bg-slate-200"></div>
                                </div>

                                <div className="grid gap-6">
                                    {specialistButtons.map((btn) => (
                                        <Link
                                            key={btn.label}
                                            href={btn.href}
                                            className={`group relative flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center ${btn.colorClass}`}
                                        >
                                            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${btn.iconBg}`}>
                                                <btn.icon className="h-7 w-7" />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className={`text-xl font-bold text-slate-900 ${btn.subtitle ? 'mb-1' : 'mb-0'}`}>{btn.label}</h3>
                                                {btn.subtitle && <p className="text-sm text-slate-500">{btn.subtitle}</p>}
                                            </div>

                                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 group-hover:text-sky-700 sm:mt-0">
                                                Atvērt paneli <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
