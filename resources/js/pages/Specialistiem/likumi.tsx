import { Head } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';

// --- ICONS ---
const Icons = {
    Scale: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
    ),
    FileText: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
    ),
    Globe: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3s-4.5 3.97-4.5 9 2.015 9 4.5 9zM13.5 5.49L12.555 2.1a9.01 9.01 0 01-.865 0l-.945 3.39" /></svg>
    ),
    ShieldCheck: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
    )
};

const euRegulas = [
    {
        title: 'Directive 2004/23/EC',
        text: 'ES pamatdirektīva par cilvēku audu un šūnu kvalitāti, drošību, ziedošanu, testēšanu, apstrādi un izplatīšanu.',
    },
    {
        title: 'Commission Directive 2006/17/EC',
        text: 'Detalizētās prasības audu un šūnu ziedošanai, pārbaudēm un apstrādei.',
    },
    {
        title: 'Commission Directive 2006/86/EC',
        text: 'Prasības trasējamībai, uzskaites sistēmām, nopietnu blakņu un incidentu ziņošanai.',
    },
    {
        title: 'Directive 98/44/EC',
        text: 'Biotehnoloģisko izgudrojumu aizsardzība – ierobežojumi un izņēmumi patentēšanā.',
    },
    {
        title: 'Regulation (EU) 2021/695',
        text: 'Horizon Europe finansējuma regulējums; aizliedz finansēt embriju radīšanu pētniecībai.',
    },
];

const lvLikumi = [
    {
        title: 'Cilvēka audu un orgāniem likums',
        text: 'Nosaka audu un šūnu izmantošanu, donoru piekrišanu, audu banku darbību un aizliegumus komerciālai tirdzniecībai.',
    },
    {
        title: 'ZVA prasības audu bankām',
        text: 'Cilmes šūnu bankām nepieciešama sertifikācija, atbilstība kvalitātes un drošības standartiem.',
    },
    {
        title: 'Zinātniskās darbības likums',
        text: 'Nosaka pētījumu ētikas un organizatoriskos rāmjus Latvijas Republikā.',
    },
    {
        title: 'Biobanku regulējums',
        text: 'Notiekošās diskusijas par cilvēka bioloģisko paraugu glabāšanu un izmantošanu pētniecībā.',
    },
];

export default function Likumi() {
    const { __ } = useLang();

    return (
        <>
            <Head title={__('Likumi un regulas')} />

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
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-600 mb-6">
                            <Icons.Scale className="h-4 w-4 text-emerald-600" />
                            Normatīvais Regulējums
                        </div>
                        
                        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                            ES regulas un Latvijas likumi par cilmes šūnu tehnoloģijām
                        </h1>
                        
                        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed mb-10">
                            Apkopoti galvenie normatīvie akti, kas regulē cilmes šūnu, cilvēka audu un šūnu izmantošanu Eiropas Savienībā un Latvijā.
                        </p>
                    </main>

                    {/* --- EU SECTION (SKY BLUE THEME) --- */}
                    <section className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-sm border border-sky-100">
                                <Icons.Globe className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Eiropas Savienības regulējums</h2>
                                <p className="text-sm text-slate-500">Kopējās direktīvas un standarti</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {euRegulas.map((r, i) => (
                                <div key={r.title} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-md">
                                    <div className="absolute top-6 right-6 text-xs font-bold text-slate-200 group-hover:text-sky-100 transition-colors text-right">
                                        EU-{i + 1 < 10 ? `0${i + 1}` : i + 1}
                                    </div>
                                    
                                    <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                        <Icons.FileText className="h-4 w-4" />
                                    </div>
                                    
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                                        {r.title}
                                    </h4>
                                    <p className="text-sm leading-relaxed text-slate-600">
                                        {r.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- LV SECTION (EMERALD GREEN THEME) --- */}
                    <section className="pb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm border border-emerald-100">
                                <Icons.ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Nacionālie likumi</h2>
                                <p className="text-sm text-slate-500">Latvijas Republikas likumdošana</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {lvLikumi.map((l, i) => (
                                <div key={l.title} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
                                    <div className="absolute top-6 right-6 text-xs font-bold text-slate-200 group-hover:text-emerald-100 transition-colors text-right">
                                        LV-{i + 1 < 10 ? `0${i + 1}` : i + 1}
                                    </div>
                                    
                                    <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                        <Icons.Scale className="h-4 w-4" />
                                    </div>
                                    
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                                        {l.title}
                                    </h4>
                                    <p className="text-sm leading-relaxed text-slate-600">
                                        {l.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}