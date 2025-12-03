import { Head } from '@inertiajs/react';

// --- ICONS (With TypeScript definitions fixed) ---
const Icons = {
    Phone: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
    ),
    Mail: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
    ),
    MapPin: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
    ),
    External: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
    ),
};

export default function Contacts() {
    return (
        <>
            <Head title="Kontakti" />
            
            <section className="min-h-screen relative bg-slate-50 text-slate-900 font-sans overflow-hidden">
                
                {/* --- BACKGROUND TECH GRID --- */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-400 opacity-10 blur-[120px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                    
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 border border-emerald-100 mb-4">
                            SAZINIES AR MUMS
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            Laboratorijas kontakti
                        </h1>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                            Mēs atrodamies RTU zinātniskajā kompleksā Ķīpsalā. <br className="hidden sm:block" />
                            Sazinies ar mums par sadarbības iespējām vai vizīti.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* LEFT COLUMN: Info */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            
                            {/* Phone */}
                            <div className="group rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:border-emerald-400 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <Icons.Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tālrunis</p>
                                        <p className="text-lg font-semibold text-slate-900">+371 29252975</p>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <a href="mailto:uldis.berzins.4@rtu.lv" className="group rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:border-sky-400 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                        <Icons.Mail className="h-6 w-6" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">E-pasts</p>
                                        <p className="text-lg font-semibold text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                                            uldis.berzins.4@rtu.lv
                                        </p>
                                    </div>
                                </div>
                            </a>

                            {/* Address */}
                            <div className="flex-1 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white mb-4">
                                        <Icons.MapPin className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Adrese</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Rīgas Tehniskā universitāte<br />
                                        Materiālzinātnes un lietišķās ķīmijas fakultāte<br />
                                        <strong>Ķīpsalas iela 6B – 316. kab.</strong><br />
                                        Rīga, LV-1064, Latvija
                                    </p>
                                    
                                    <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Atvērts darba dienās 9:00 - 17:00
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: The Map */}
                        <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[400px]">
                            <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative bg-slate-200 group">
                                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-white/50 text-xs font-semibold text-slate-700 pointer-events-none">
                                    RTU Ķīpsalas komplekss
                                </div>
                                <a 
                                    href="https://www.google.com/maps/search/?api=1&query=Ķīpsalas+iela+6B+Rīga" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="absolute bottom-4 right-4 z-10 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
                                >
                                    Atvērt Google Maps <Icons.External className="w-3 h-3" />
                                </a>

                                {/* MAP FIX EXPLAINED:
                                    1. We use standard maps.google.com embed URL.
                                    2. 'q' parameter is the query: "Ķīpsalas iela 6B, Rīga".
                                    3. 'z' is zoom level (15 is good for streets).
                                */}
                                <iframe 
                                    src="https://maps.google.com/maps?q=%C4%B6%C4%ABpsalas%20iela%206B%2C%20R%C4%ABga&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={true}
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                    title="Map Location"
                                ></iframe>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}