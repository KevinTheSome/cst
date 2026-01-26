import { useLang } from '@/hooks/useLang';
import ProcessTimeline from '@/Components/ProcessTimeline';
import { Head, Link } from '@inertiajs/react';

// --- ICONS ---
const Icons = {
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    ),
    Check: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    Chip: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 2v20M17 2v20M2 7h20M2 17h20M12 7v10M7 12h10" /></svg>
    ),
    User: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
    ),
    Doctor: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
    ),
    Regen: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
    ),
    Shield: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
    )
};

const copy = {
    lv: {
        metaTitle: 'ATMP terapija',
        hero: {
            title: 'ATMP terapija &',
            highlight: 'Diagnostika vienā platformā',
            description:
                'RTU Biočipu laboratorija apvieno mikrofluidiku un šūnu inženieriju, lai atbalstītu ATMP (Advanced Therapy Medicinal Products) izstrādi ar precīzāku kvalitātes kontroli un augstāku drošuma līmeni.',
        },
        ctas: {
            patients: {
                title: 'Pacientiem',
                description: 'Pieteikšanās konsultācijai par personalizētām ATMP iespējām, piemērotību un turpmākajiem soļiem.',
                action: 'Atvērt anketu',
            },
            specialists: {
                title: 'Speciālistiem',
                description: 'ATMP protokoli, kvalitātes kontrole, validācija, pētniecība un sadarbība.',
                action: 'Sākt sadarbību',
            },
        },
        stats: [
            { value: '10k+', label: 'Šūnu profili' },
            { value: '1k+', label: 'Parametri' },
            { value: 'ISO', label: 'Kontrolēta vide' },
        ],
        technology: {
            title: 'Tehnoloģija un fokuss',
            subtitle: 'ATMP izstrādi atbalstoši risinājumi reģeneratīvajā medicīnā.',
            badge: 'Mikrofluidika',
            precisionTitle: 'Biočipu precizitāte',
            precisionText:
                'Mikrofluidika ļauj standartizēti analizēt un apstrādāt šūnu paraugus, vienlaikus fiksējot kritiskos kvalitātes rādītājus, kas ir būtiski ATMP izstrādē un validācijā.',
            precisionList: [
                'MSC un hematopoētisko šūnu analīze',
                'Kvalitātes rādītāji vienā mērījumu ciklā',
                'Darbs kontrolētā (ISO klases) vidē',
            ],
            processTitle: 'ATMP darba plūsma',
            steps: [
                { title: '1. Analīze', text: 'Biočips izveido šūnu profilu un kvalitātes rādītājus.' },
                { title: '2. Kondicionēšana', text: 'Šūnas tiek kondicionētas/kultivētas atbilstoši protokolam.' },
                { title: '3. Terapija', text: 'Sagatavots protokols un dokumentācija ārstniecības komandai.' },
            ],
            processFooter: 'Standartizēti procesa soļi',
            cards: [
                {
                    title: 'Regenerācija',
                    text: 'ATMP pieeja audu atjaunošanās atbalstam pēc traumas vai ilgstošas pārslodzes.',
                },
                {
                    title: 'Imūnmodulācija',
                    text: 'Šūnu terapiju pieejas, kas var palīdzēt modulēt imūnreakcijas autoimūnos un iekaisuma procesos.',
                },
            ],
        },
        finalCta: {
            title: 'Vēlaties uzzināt vairāk par ATMP risinājumiem?',
            action: 'Pieteikties konsultācijai',
        },
    },
    en: {
        metaTitle: 'ATMP therapy',
        hero: {
            title: 'ATMP therapies &',
            highlight: 'Diagnostics on one platform',
            description:
                'The RTU Biochip laboratory combines microfluidics and cell engineering to support ATMP (Advanced Therapy Medicinal Products) development with more precise quality control and improved safety.',
        },
        ctas: {
            patients: {
                title: 'For Patients',
                description: 'Apply for a consultation on personalized ATMP options, suitability, and next steps.',
                action: 'Open the form',
            },
            specialists: {
                title: 'For Specialists',
                description: 'ATMP protocols, quality control, validation, research, and collaboration.',
                action: 'Start collaboration',
            },
        },
        stats: [
            { value: '10k+', label: 'Cell profiles' },
            { value: '1k+', label: 'Parameters' },
            { value: 'ISO', label: 'Controlled environment' },
        ],
        technology: {
            title: 'Technology & Focus',
            subtitle: 'Solutions supporting ATMP development in regenerative medicine.',
            badge: 'Microfluidics',
            precisionTitle: 'Biochip precision',
            precisionText:
                'Microfluidics enables standardized analysis and processing of cell samples while capturing critical quality attributes that are important for ATMP development and validation.',
            precisionList: [
                'MSC and hematopoietic cell analysis',
                'Quality attributes in a single run',
                'Work in a controlled (ISO-class) environment',
            ],
            processTitle: 'ATMP workflow',
            steps: [
                { title: '1. Analysis', text: 'The biochip generates a cell profile and quality readouts.' },
                { title: '2. Conditioning', text: 'Cells are conditioned/expanded according to the protocol.' },
                { title: '3. Therapy', text: 'A protocol package and documentation are provided to the clinical team.' },
            ],
            processFooter: 'Standardized process steps',
            cards: [
                {
                    title: 'Regeneration',
                    text: 'ATMP approach to supporting tissue recovery after injury or chronic overload.',
                },
                {
                    title: 'Immunomodulation',
                    text: 'Cell-therapy approaches that may help modulate immune responses in autoimmune and inflammatory processes.',
                },
            ],
        },
        finalCta: {
            title: 'Want to learn more about ATMP solutions?',
            action: 'Book a consultation',
        },
    },
} as const;


export default function Welcome() {
    const { locale } = useLang();
    const t = copy[locale === 'en' ? 'en' : 'lv'];

    return (
        <>
            <Head title={t.metaTitle} />

            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
                
                {/* BACKGROUND TECH GRID */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* --- HERO SECTION --- */}
                    <main className="py-12 lg:py-20 text-center">
                        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
                            {t.hero.title} <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
                                {t.hero.highlight}
                            </span>
                        </h1>
                        
                        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed mb-10">
                            {t.hero.description}
                        </p>

                        {/* SPLIT CTA */}
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                            <Link href="/anketa?role=pacients" className="group relative flex flex-col items-start p-6 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300">
                                <div className="mb-4 rounded-full bg-emerald-50 p-3 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <Icons.User className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{t.ctas.patients.title}</h3>
                                <p className="mt-1 text-sm text-slate-500 text-left">{t.ctas.patients.description}</p>
                                <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600 group-hover:underline">
                                    {t.ctas.patients.action} <Icons.ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </Link>

                            <Link href="/specialistiem/apmaciba" className="group relative flex flex-col items-start p-6 rounded-2xl border border-slate-200 bg-white hover:border-sky-400 hover:shadow-lg hover:shadow-sky-100 transition-all duration-300">
                                <div className="mb-4 rounded-full bg-sky-50 p-3 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                    <Icons.Doctor className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{t.ctas.specialists.title}</h3>
                                <p className="mt-1 text-sm text-slate-500 text-left">{t.ctas.specialists.description}</p>
                                <div className="mt-4 flex items-center text-sm font-semibold text-sky-600 group-hover:underline">
                                    {t.ctas.specialists.action} <Icons.ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                             <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-slate-800">{t.stats[0].value}</span>
                                <span className="text-xs uppercase tracking-wider">{t.stats[0].label}</span>
                             </div>
                             <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
                             <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-slate-800">{t.stats[1].value}</span>
                                <span className="text-xs uppercase tracking-wider">{t.stats[1].label}</span>
                             </div>
                             <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
                             <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-slate-800">{t.stats[2].value}</span>
                                <span className="text-xs uppercase tracking-wider">{t.stats[2].label}</span>
                             </div>
                        </div>
                    </main>

                    {/* --- BENTO GRID FEATURES --- */}
                    <section className="py-16">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">{t.technology.title}</h2>
                                <p className="mt-2 text-slate-600">{t.technology.subtitle}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Big Card - Precision */}
                            <div className="md:col-span-2 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1 text-xs text-emerald-700 mb-4">
                                        {t.technology.badge}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.technology.precisionTitle}</h3>
                                    <p className="text-slate-600 max-w-md leading-relaxed">
                                        {t.technology.precisionText}
                                    </p>
                                    <ul className="mt-6 space-y-2">
                                        {t.technology.precisionList.map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                                <Icons.Check className="h-4 w-4 text-emerald-500" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Tall Card - Process Steps (UPDATED TO LIGHT THEME) */}
                            <div className="md:row-span-2 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                                {/* Subtle gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/50 pointer-events-none"></div>

                                <ProcessTimeline
                                    title={t.technology.processTitle}
                                    steps={t.technology.steps}
                                    currentStep={2}
                                    footer={(
                                        <p className="text-xs font-semibold text-emerald-700 flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                            {t.technology.processFooter}
                                        </p>
                                    )}
                                />
                            </div>

                            {/* Small Card 1 */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                                    <Icons.Regen className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900">{t.technology.cards[0].title}</h4>
                                <p className="text-sm text-slate-600 mt-2">{t.technology.cards[0].text}</p>
                            </div>

                            {/* Small Card 2 */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-sky-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                                    <Icons.Shield className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900">{t.technology.cards[1].title}</h4>
                                <p className="text-sm text-slate-600 mt-2">{t.technology.cards[1].text}</p>
                            </div>

                        </div>
                    </section>

                    {/* --- FINAL CTA --- */}
                    <div className="py-20 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">{t.finalCta.title}</h2>
                        <div className="mt-6 flex justify-center gap-4">
                             <Link href="/ParMums/pievienojies-mums" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">
                                {t.finalCta.action}
                             </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
