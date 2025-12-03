import { Head, Link } from '@inertiajs/react';

// --- ICONS ---
const Icons = {
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    ),
    Check: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    Activity: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
    ),
    Shield: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
    ),
    Heart: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
    )
};

export default function ChronTherapy() {
    return (
        <>
            <Head title="Hroniskas Nieru Slimības" />

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
                            Nieru Veselības Centrs
                        </div>
                        
                        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
                            Hroniskas nieru slimības <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
                                Personalizēta Terapija
                            </span>
                        </h1>
                        
                        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed mb-10">
                            Mēs apvienojam medicīnisko pieredzi un modernus terapijas veidus, lai saglabātu nieru funkciju, kontrolētu simptomus un uzlabotu dzīves kvalitāti.
                        </p>

                        {/* CTA Button */}
                        <div className="flex justify-center mb-16">
                            <Link href="/anketa?role=pacients" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/30">
                                Aizpildīt anketu
                                <Icons.ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </main>

                    {/* --- BENTO GRID FEATURES --- */}
                    <section className="py-16 border-t border-slate-200/60">
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-slate-900">Terapijas Pieeja</h2>
                            <p className="mt-2 text-slate-600">Kā mēs palīdzam saglabāt nieru funkciju ilgtermiņā.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Big Card - Therapy Types */}
                            <div className="md:col-span-2 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1 text-xs text-emerald-700 mb-4">
                                        Risinājumi
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Trīs pīlāru stratēģija</h3>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                                        {[
                                            { t: 'Medikamentozā terapija', d: 'Precīzi dozēti medikamenti nieru atbalstam.' },
                                            { t: 'Dzīvesveida pielāgojumi', d: 'Diēta un aktivitātes nieru stabilizēšanai.' },
                                            { t: 'Dialīze & Transplantācija', d: 'Sagatavošanās un plānošana smagos gadījumos.' }
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
                                            { title: '1. Diagnostika', text: 'Analīzes, nieru funkcijas testi un risku novērtējums.' },
                                            { title: '2. Plāns', text: 'Individuāla stratēģija ar medikamentiem un diētu.' },
                                            { title: '3. Uzraudzība', text: 'Regulāras pārbaudes un terapijas korekcijas.' }
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
                                            Nieru funkcijas saglabāšana
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Small Card 1 - Blood Pressure */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                                    <Icons.Activity className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900">Asinsspiediena kontrole</h4>
                                <p className="text-sm text-slate-600 mt-2">Samazina komplikāciju risku un tieši atbalsta nieru veselību.</p>
                            </div>

                            {/* Small Card 2 - Quality of Life */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-sky-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                                    <Icons.Heart className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900">Dzīves kvalitāte</h4>
                                <p className="text-sm text-slate-600 mt-2">Personalizēts plāns, kas mazina simptomus un ikdienas stresu.</p>
                            </div>

                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}