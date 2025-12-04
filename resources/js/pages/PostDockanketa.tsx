import { Head, Link } from '@inertiajs/react';

// --- ICONS ---
const Icons = {
    User: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
    ),
    Activity: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
    ),
    FileText: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    )
};

const clientButtons = [
    {
        label: 'Psoriāze',
        subtitle: 'Simptomu novērtējums un terapijas plānošana',
        href: '/anketa-psoriāze',
        icon: Icons.User,
        colorClass: 'group-hover:border-emerald-400 group-hover:shadow-emerald-100',
        iconBg: 'bg-emerald-50 text-emerald-600'
    },
    {
        label: 'Hroniskas slimības',
        subtitle: 'Ilgtermiņa uzraudzība un veselības monitorings',
        href: '/anketa-hroniskas',
        icon: Icons.Activity,
        colorClass: 'group-hover:border-emerald-400 group-hover:shadow-emerald-100',
        iconBg: 'bg-emerald-50 text-emerald-600'
    },
];

const specialistButtons = [
    {
        label: 'Speciālistiem',
        subtitle: 'Dalieties pieredzē, piekļūstiet protokoliem un pētījumu datiem',
        href: '/anketa-specialiste',
        icon: Icons.FileText,
        colorClass: 'group-hover:border-sky-400 group-hover:shadow-sky-100',
        iconBg: 'bg-sky-50 text-sky-600'
    },
];

export default function PostDockanketa() {
    return (
        <>
            <Head title="PostDock anketa" />

            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
                
                {/* BACKGROUND TECH GRID */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto min-h-screen flex flex-col justify-center max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                    
                    {/* INTRO BLOCK */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-600 mb-6">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            PostDock Platforma
                        </div>

                        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                            Izvēlieties atbilstošo <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
                                Anketēšanas Moduli
                            </span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
                            Mēs nodrošinām pielāgotus risinājumus gan pacientu aprūpei, gan speciālistu pētniecībai.
                        </p>
                    </div>

                    {/* MAIN CONTENT GRID */}
                    <div className="grid gap-12">
                        
                        {/* SECTION: CLIENTS */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
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
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${btn.iconBg}`}>
                                                <btn.icon className="w-6 h-6" />
                                            </div>
                                            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                <Icons.ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{btn.label}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{btn.subtitle}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* SECTION: SPECIALISTS */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Speciālistiem</h2>
                                <div className="h-px flex-1 bg-slate-200"></div>
                            </div>

                            <div className="grid gap-6">
                                {specialistButtons.map((btn) => (
                                    <Link
                                        key={btn.label}
                                        href={btn.href}
                                        className={`group relative flex flex-col sm:flex-row sm:items-center gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${btn.colorClass}`}
                                    >
                                        <div className={`h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center ${btn.iconBg}`}>
                                            <btn.icon className="w-7 h-7" />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{btn.label}</h3>
                                            <p className="text-sm text-slate-500">{btn.subtitle}</p>
                                        </div>

                                        <div className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 group-hover:text-sky-700">
                                            Atvērt paneli <Icons.ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}