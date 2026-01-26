import { useLang } from '@/hooks/useLang';
import ProcessTimeline from '@/Components/ProcessTimeline';
import TherapyHero from '@/Components/TherapyHero';
import { Head } from '@inertiajs/react';

// --- ICONS ---
const Icons = {
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

const copy = {
    lv: {
        metaTitle: 'Psoriāzes Terapija',
        badge: 'Dermatoloģijas Risinājumi',
        hero: {
            title: 'Personalizēta',
            highlight: 'Psoriāzes Terapija',
            description:
                'Mēs apvienojam klīnisko pieredzi un modernus medikamentus, lai samazinātu plāksterus, niezi un uzlabotu dzīves kvalitāti ilgtermiņā.',
            cta: 'Aizpildīt anketu',
            icon: 'drop',
            facts: [
                { title: 'Plāksteru kontrole', text: 'Mērķēts plāksteru un iekaisuma mazinājums.', icon: 'sun' },
                { title: 'Nieze un komforts', text: 'Ikdienas komforts ar mazāku kairinājumu.', icon: 'drop' },
                { title: 'Remisijas uzturēšana', text: 'Stabils rezultāts ar ilgtermiņa uzraudzību.', icon: 'shield' },
            ],
        },
        stats: [
            { value: '85%', label: 'Pacienti ar uzlabojumiem' },
            { value: '12', label: 'Nedēļas vidējais kurss' },
            { value: '15', label: 'Partneru klīnikas' },
        ],
        section: {
            title: 'Terapijas Pieeja',
            subtitle: 'Kā mēs sasniedzam remisiju un ādas komfortu.',
        },
        methods: {
            badge: 'Metodes',
            title: 'Trīs līmeņu risinājumi',
            items: [
                { t: 'Lokālā terapija', d: 'Krēmi un želejas iekaisuma mazināšanai.' },
                { t: 'Sistemiskā terapija', d: 'Perorāli medikamenti smagākos gadījumos.' },
                { t: 'Bioloģiskā terapija', d: 'Imūnmodulējoši preparāti injekcijās.' },
            ],
        },
        process: {
            title: 'Terapijas Gaita',
            steps: [
                { title: '1. Konsultācija', text: 'Ārsts novērtē ādas stāvokli.' },
                { title: '2. Plāns', text: 'Individuāla shēma atbilstoši smagumam.' },
                { title: '3. Uzraudzība', text: 'Regulāras pārbaudes optimālam rezultātam.' },
            ],
            footer: 'Klīniski pierādīta efektivitāte',
        },
        cards: [
            {
                title: 'Niezes mazināšana',
                text: 'Komforta uzlabošana un dzīves kvalitātes atjaunošana.',
            },
            {
                title: 'Imūnregulācija',
                text: 'Ilgtermiņa remisijas panākšana ar stabilu imūnmodulāciju.',
            },
        ],
    },
    en: {
        metaTitle: 'Psoriasis Therapy',
        badge: 'Dermatology Solutions',
        hero: {
            title: 'Personalized',
            highlight: 'Psoriasis Therapy',
            description:
                'We combine clinical experience and modern medications to reduce plaques, itching, and improve long-term quality of life.',
            cta: 'Fill out the form',
            icon: 'drop',
            facts: [
                { title: 'Plaque control', text: 'Targeted reduction of plaques and inflammation.', icon: 'sun' },
                { title: 'Itch relief', text: 'Daily comfort with less irritation.', icon: 'drop' },
                { title: 'Sustained remission', text: 'Stable results with ongoing monitoring.', icon: 'shield' },
            ],
        },
        stats: [
            { value: '85%', label: 'Patients with improvements' },
            { value: '12', label: 'Weeks average course' },
            { value: '15', label: 'Partner clinics' },
        ],
        section: {
            title: 'Therapy Approach',
            subtitle: 'How we achieve remission and skin comfort.',
        },
        methods: {
            badge: 'Methods',
            title: 'Three-tier solutions',
            items: [
                { t: 'Topical therapy', d: 'Creams and gels to reduce inflammation.' },
                { t: 'Systemic therapy', d: 'Oral medications for more severe cases.' },
                { t: 'Biologic therapy', d: 'Immunomodulating injections.' },
            ],
        },
        process: {
            title: 'Therapy Pathway',
            steps: [
                { title: '1. Consultation', text: 'The doctor assesses the skin condition.' },
                { title: '2. Plan', text: 'Individual regimen based on severity.' },
                { title: '3. Monitoring', text: 'Regular checkups for optimal results.' },
            ],
            footer: 'Clinically proven effectiveness',
        },
        cards: [
            {
                title: 'Itch relief',
                text: 'Improving comfort and restoring quality of life.',
            },
            {
                title: 'Immune regulation',
                text: 'Achieving long-term remission with stable immunomodulation.',
            },
        ],
    },
} as const;

export default function PsoriasisTherapy() {
    const { locale } = useLang();
    const t = copy[locale === 'en' ? 'en' : 'lv'];
    const heroTheme = {
        badge: 'border-rose-100 bg-rose-50/80 text-rose-700',
        badgeDot: 'bg-rose-500',
        highlight: 'from-rose-600 to-amber-500',
        cta: 'from-rose-600 to-rose-500 shadow-rose-500/20 hover:shadow-rose-500/30',
        iconFrame: 'border-rose-100',
        keyFactCard: 'border-rose-100/60 hover:border-rose-200/80 transition-colors',
        keyFactIcon: 'bg-rose-50 text-rose-600',
        statsDivider: 'bg-slate-200',
    };
    const heroIcons = {
        drop: <Icons.Drop className="h-6 w-6" />,
        shield: <Icons.Shield className="h-6 w-6" />,
        sun: <Icons.Sun className="h-6 w-6" />,
    } as const;
    const heroFacts = t.hero.facts.map((fact) => ({
        ...fact,
        icon: heroIcons[fact.icon as keyof typeof heroIcons],
    }));

    return (
        <>
            <Head title={t.metaTitle} />

            {/* MAIN WRAPPER */}
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900">
                
                {/* BACKGROUND TECH GRID */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-rose-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-amber-300 opacity-10 blur-[120px]"></div>
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
                                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50/50 px-3 py-1 text-xs text-rose-700 mb-4">
                                        {t.methods.badge}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.methods.title}</h3>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                                        {t.methods.items.map((item, i) => (
                                            <div key={i} className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 hover:border-rose-200 transition-colors">
                                                <div className="h-2 w-2 rounded-full bg-rose-500 mb-2"></div>
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
                                        <p className="text-xs font-semibold text-rose-700 flex items-center gap-2">
                                            <Icons.Check className="h-4 w-4" />
                                            {t.process.footer}
                                        </p>
                                    )}
                                />
                            </div>

                            {/* Small Card 1 - Comfort */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-rose-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                                    <Icons.Drop className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900">{t.cards[0].title}</h4>
                                <p className="text-sm text-slate-600 mt-2">{t.cards[0].text}</p>
                            </div>

                            {/* Small Card 2 - Immunity */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:border-amber-300 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                                    <Icons.Shield className="w-6 h-6" />
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
