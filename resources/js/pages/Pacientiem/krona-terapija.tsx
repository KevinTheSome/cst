import { useLang } from '@/hooks/useLang';
import ProcessTimeline from '@/Components/ProcessTimeline';
import TherapyHero from '@/Components/TherapyHero';
import { Head } from '@inertiajs/react';

// --- ICONS ---
const Icons = {
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

const copy = {
    lv: {
        metaTitle: 'Krona slimība',
        badge: 'Gastroenteroloģijas centrs',
        hero: {
            title: 'Krona slimība',
            highlight: 'Personalizēta terapija',
            description:
                'Mēs apvienojam gastroenteroloģijas pieredzi un modernu terapiju, lai kontrolētu iekaisumu, mazinātu uzliesmojumus un uzlabotu dzīves kvalitāti ilgtermiņā.',
            cta: 'Aizpildīt anketu',
            icon: 'activity',
            facts: [
                { title: 'Iekaisuma kontrole', text: 'Terapija, kas palīdz samazināt uzliesmojumus.', icon: 'shield' },
                { title: 'Uztura pielāgojumi', text: 'Atbalsts ikdienas uzturam un komfortam.', icon: 'heart' },
                { title: 'Ilgtermiņa uzraudzība', text: 'Regulāra kontrole stabilai remisijai.', icon: 'activity' },
            ],
        },
        stats: [
            { value: '70%', label: 'Pacienti ar stabilu remisiju' },
            { value: '6', label: 'Mēneši līdz rezultātam' },
            { value: '24/7', label: 'Atbalsta pieeja' },
        ],
        section: {
            title: 'Terapijas Pieeja',
            subtitle: 'Kā mēs palīdzam kontrolēt iekaisumu un uzlabot ikdienu.',
        },
        strategy: {
            badge: 'Risinājumi',
            title: 'Trīs pīlāru stratēģija',
            items: [
                { t: 'Medikamentozā terapija', d: 'Pretiekaisuma un imūnmodulējoša pieeja.' },
                { t: 'Uztura stratēģija', d: 'Individuāla diēta simptomu mazināšanai.' },
                { t: 'Bioloģiskā terapija', d: 'Mērķēti preparāti smagākos gadījumos.' },
            ],
        },
        process: {
            title: 'Terapijas Gaita',
            steps: [
                { title: '1. Diagnostika', text: 'Anamnēze, analīzes un iekaisuma rādītāji.' },
                { title: '2. Terapijas plāns', text: 'Individuāla shēma ar zālēm un uztura plānu.' },
                { title: '3. Uzraudzība', text: 'Regulāras kontroles un terapijas korekcijas.' },
            ],
            footer: 'Iekaisuma kontrole un remisija',
        },
        cards: [
            {
                title: 'Gremošanas komforts',
                text: 'Mazināti simptomi un stabilāka pašsajūta.',
            },
            {
                title: 'Enerģija ikdienā',
                text: 'Stabilāks ritms un mazāki uzliesmojumi.',
            },
        ],
    },
    en: {
        metaTitle: "Crohn's disease",
        badge: 'Gastroenterology center',
        hero: {
            title: "Crohn's disease",
            highlight: 'Personalized therapy',
            description:
                'We combine gastroenterology expertise and modern therapy to control inflammation, reduce flare-ups, and improve long-term quality of life.',
            cta: 'Fill out the form',
            icon: 'activity',
            facts: [
                { title: 'Inflammation control', text: 'Therapy focused on reducing flare-ups.', icon: 'shield' },
                { title: 'Diet support', text: 'Personalized nutrition for daily comfort.', icon: 'heart' },
                { title: 'Ongoing monitoring', text: 'Regular check-ins for stable remission.', icon: 'activity' },
            ],
        },
        stats: [
            { value: '70%', label: 'Patients with stable remission' },
            { value: '6', label: 'Months to progress' },
            { value: '24/7', label: 'Support access' },
        ],
        section: {
            title: 'Therapy Approach',
            subtitle: 'How we help control inflammation long-term.',
        },
        strategy: {
            badge: 'Solutions',
            title: 'Three-pillar strategy',
            items: [
                { t: 'Medication therapy', d: 'Anti-inflammatory and immunomodulatory therapy.' },
                { t: 'Nutrition strategy', d: 'Individual diet plan to reduce symptoms.' },
                { t: 'Biologic therapy', d: 'Targeted treatments for severe cases.' },
            ],
        },
        process: {
            title: 'Therapy Pathway',
            steps: [
                { title: '1. Diagnostics', text: 'History, lab tests, and inflammation markers.' },
                { title: '2. Therapy plan', text: 'Personalized regimen with meds and diet.' },
                { title: '3. Monitoring', text: 'Regular checkups and therapy adjustments.' },
            ],
            footer: 'Inflammation control and remission',
        },
        cards: [
            {
                title: 'Digestive comfort',
                text: 'Fewer symptoms and a steadier routine.',
            },
            {
                title: 'Everyday energy',
                text: 'Stable rhythm with fewer flare-ups.',
            },
        ],
    },
} as const;

export default function ChronTherapy() {
    const { locale } = useLang();
    const t = copy[locale === 'en' ? 'en' : 'lv'];
    const heroTheme = {
        badge: 'border-amber-100 bg-amber-50/80 text-amber-700',
        badgeDot: 'bg-amber-500',
        highlight: 'from-amber-600 to-teal-600',
        cta: 'from-amber-600 to-amber-500 shadow-amber-500/20 hover:shadow-amber-500/30',
        iconFrame: 'border-amber-100',
        keyFactCard: 'border-amber-100/60 hover:border-amber-200/80 transition-colors',
        keyFactIcon: 'bg-amber-50 text-amber-600',
        statsDivider: 'bg-slate-200',
    };
    const heroIcons = {
        activity: <Icons.Activity className="h-6 w-6" />,
        shield: <Icons.Shield className="h-6 w-6" />,
        heart: <Icons.Heart className="h-6 w-6" />,
    } as const;
    const heroFacts = t.hero.facts.map((fact) => ({
        ...fact,
        icon: heroIcons[fact.icon as keyof typeof heroIcons],
    }));

    return (
        <>
            <Head title={t.metaTitle} />

            {/* MAIN WRAPPER */}
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
                
                {/* BACKGROUND TECH GRID */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-amber-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-teal-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    <TherapyHero
                        badge={t.badge}
                        title={t.hero.title}
                        highlight={t.hero.highlight}
                        description={t.hero.description}
                        ctaLabel={t.hero.cta}
                        ctaHref="/anketa?role=pacients"
                        stats={t.stats}
                        keyFacts={heroFacts}
                        theme={heroTheme}
                        icon={heroIcons[t.hero.icon as keyof typeof heroIcons]}
                    />

                    {/* --- BENTO GRID FEATURES --- */}
                    <section className="py-16 border-t border-slate-200/60">
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-slate-900">{t.section.title}</h2>
                            <p className="mt-2 text-slate-600">{t.section.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Big Card - Therapy Types */}
                            <div className="md:col-span-2 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50/50 px-3 py-1 text-xs text-amber-700 mb-4">
                                        {t.strategy.badge}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.strategy.title}</h3>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                                        {t.strategy.items.map((item, i) => (
                                            <div key={i} className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 hover:border-amber-200 transition-colors">
                                                <div className="h-2 w-2 rounded-full bg-amber-500 mb-2"></div>
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

                                <ProcessTimeline
                                    title={t.process.title}
                                    steps={t.process.steps}
                                    currentStep={2}
                                    footer={(
                                        <p className="text-xs font-semibold text-amber-700 flex items-center gap-2">
                                            <Icons.Check className="h-4 w-4" />
                                            {t.process.footer}
                                        </p>
                                    )}
                                />
                            </div>

                            {/* Small Card 1 - Blood Pressure */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-amber-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                                    <Icons.Activity className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900">{t.cards[0].title}</h4>
                                <p className="text-sm text-slate-600 mt-2">{t.cards[0].text}</p>
                            </div>

                            {/* Small Card 2 - Quality of Life */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-sky-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                                    <Icons.Heart className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900">{t.cards[1].title}</h4>
                                <p className="text-sm text-slate-600 mt-2">{t.cards[1].text}</p>
                            </div>

                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}
