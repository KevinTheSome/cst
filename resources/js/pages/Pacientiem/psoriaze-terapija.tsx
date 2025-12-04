import { Head, Link } from '@inertiajs/react';

// --- ICONS ---
const Icons = {
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    ),
    Check: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    Drop: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3s-4.5 3.97-4.5 9 2.015 9 4.5 9z" /></svg>
    ),
    Shield: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
    ),
    Sun: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
    )
};

export default function PsoriasisTherapy() {
    return (
        <>
            <Head title="Psoriāzes Terapija" />

            {/* MAIN WRAPPER */}
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
                
                {/* BACKGROUND TECH GRID */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* --- HERO SECTION --- */}
                    <main className="py-16 lg:py-24 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 backdrop-blur px-3 py-1 text-xs font-semibold text-emerald-700 mb-6">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Dermatoloģijas Risinājumi
                        </div>
                        
                        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
                            Personalizēta <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
                                Psoriāzes Terapija
                            </span>
                        </h1>
                        
                        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed mb-10">
                            Mēs apvienojam klīnisko pieredzi un modernus medikamentus, lai samazinātu plāksterus, niezi un uzlabotu dzīves kvalitāti ilgtermiņā.
                        </p>

                        {/* CTA Button */}
                        <div className="flex justify-center mb-16">
                            <Link href="/anketa?role=pacients" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/30">
                                Aizpildīt anketu
                                <Icons.ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Stats Bar */}
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-slate-500">
                             <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-slate-900">85%</span>
                                <span className="text-sm font-medium">Pacienti ar uzlabojumiem</span>
                             </div>
                             <div className="h-12 w-px bg-slate-200 hidden sm:block"></div>
                             <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-slate-900">12</span>
                                <span className="text-sm font-medium">Nedēļas vidējais kurss</span>
                             </div>
                             <div className="h-12 w-px bg-slate-200 hidden sm:block"></div>
                             <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-slate-900">15</span>
                                <span className="text-sm font-medium">Partneru klīnikas</span>
                             </div>
                        </div>
                    </main>

                    {/* --- BENTO GRID FEATURES --- */}
                    <section className="py-16 border-t border-slate-200/60">
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-slate-900">Terapijas Pieeja</h2>
                            <p className="mt-2 text-slate-600">Kā mēs sasniedzam remisiju un ādas komfortu.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Big Card - Therapy Types */}
                            <div className="md:col-span-2 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1 text-xs text-emerald-700 mb-4">
                                        Metodes
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Trīs līmeņu risinājumi</h3>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                                        {[
                                            { t: 'Lokālā terapija', d: 'Krēmi un želejas iekaisuma mazināšanai.' },
                                            { t: 'Sistemiskā terapija', d: 'Perorāli medikamenti smagākos gadījumos.' },
                                            { t: 'Bioloģiskā terapija', d: 'Imūnmodulējoši preparāti injekcijās.' }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 hover:border-emerald-200 transition-colors">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500 mb-2"></div>
                                                <h4 className="font-semibold text-slate-900 text-sm">{item.t}</h4>
                                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.d}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tall Card - Process Steps (Light Theme) */}
                            <div className="md:row-span-2 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/50 pointer-events-none"></div>

                                <div className="relative z-10 h-full flex flex-col">
                                    <h3 className="text-xl font-bold mb-6 text-slate-900">Terapijas Gaita</h3>
                                    
                                    <div className="space-y-8 flex-1">
                                        {[
                                            { title: '1. Konsultācija', text: 'Ārsts novērtē ādas stāvokli.' },
                                            { title: '2. Plāns', text: 'Individuāla shēma atbilstoši smagumam.' },
                                            { title: '3. Uzraudzība', text: 'Regulāras pārbaudes optimālam rezultātam.' }
                                        ].map((step, i) => (
                                            <div key={i} className="flex gap-4 group">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs shadow-sm">
                                                        {i + 1}
                                                    </div>
                                                    {i !== 2 && <div className="h-full w-0.5 bg-slate-200 my-2 group-hover:bg-emerald-300 transition-colors"></div>}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">{step.title}</h4>
                                                    <p className="text-sm text-slate-600 mt-1">{step.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <p className="text-xs font-semibold text-emerald-700 flex items-center gap-2">
                                            <Icons.Check className="h-4 w-4" />
                                            Klīniski pierādīta efektivitāte
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Small Card 1 - Comfort */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                                    <Icons.Drop className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900">Niezes mazināšana</h4>
                                <p className="text-sm text-slate-600 mt-2">Komforta uzlabošana un dzīves kvalitātes atjaunošana.</p>
                            </div>

                            {/* Small Card 2 - Immunity */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-sky-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                                    <Icons.Shield className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900">Imūnregulācija</h4>
                                <p className="text-sm text-slate-600 mt-2">Ilgtermiņa remisijas panākšana ar stabilu imūnmodulāciju.</p>
                            </div>

                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}