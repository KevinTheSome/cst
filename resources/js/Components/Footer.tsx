import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';

// --- ICONS ---
const Icons = {
    Phone: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
        </svg>
    ),
    Mail: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
        </svg>
    ),
    MapPin: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
    ),
    Arrow: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
    ),
};

const NAV_GROUPS = [
    {
        title: 'Pacientiem',
        items: [
            { label: 'Kas ir ATMP?', href: '/pacientiem/atmp' },
            { label: 'Psoriāze un terapijas', href: '/pacientiem/psoriaze-terapija' },
            { label: 'Krona slimība', href: '/pacientiem/krona-terapija' },
            { label: 'Biežāk uzdotie jautājumi', href: '/pacientiem/faq' },
        ],
    },
    {
        title: 'Speciālistiem',
        items: [
            { label: 'ES regula un likumi', href: '/specialistiem/likumi' },
            { label: 'ATMP ražotnes Eiropā', href: '/speciālistiem/atmp' },
            { label: 'Apmācības', href: '/specialistiem/apmaciba' },
            { label: 'Aptauja', href: '/postdock-anketa?role=specialists' },
        ],
    },
    {
        title: 'Pētniecība',
        items: [
            { label: 'PostDock anketa', href: '/postdock-anketa?role=patients' },
            { label: 'Koda anketa', href: '/anketa-kods' },
            { label: 'Publikācijas', href: '#' }, // Placeholder to balance UI
        ],
    },
    {
        title: 'Par mums',
        items: [
            { label: 'Mūsu grupa', href: '/ParMums/musu-grupa' },
            { label: 'Komanda', href: '/ParMums/komanda' },
            { label: 'Karjera', href: '/ParMums/pievienojies-mums' },
        ],
    },
];

export default function Footer() {
    const { props } = usePage();
    const currentLocale = props.locale || 'lv';

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;
        try {
            await axios.post('/locale', { locale });
            router.reload({ only: ['lang', 'locale'] });
        } catch (error) {
            console.error('Language switch failed:', error);
        }
    };

    return (
        <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50 font-sans text-slate-600">
            {/* Background Grid Pattern */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
                {/* --- Top Section: Brand & Contact --- */}
                <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <p className="mb-6 text-sm leading-relaxed text-slate-500">
                            Cilmes Šūnu Tehnoloģijas SIA
                            <br />
                            Inovācijas reģeneratīvajā medicīnā un personalizētajā diagnostikā.
                        </p>
                    </div>

                    {/* Navigation Columns */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
                        {NAV_GROUPS.map((group) => (
                            <div key={group.title}>
                                <h3 className="mb-4 text-sm font-bold tracking-wide text-slate-900 uppercase">{group.title}</h3>
                                <ul className="space-y-3">
                                    {group.items.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                href={item.href}
                                                className="group inline-flex items-center gap-1 text-sm text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-emerald-600"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact Info Column */}
                    <div className="lg:col-span-1">
                        <h3 className="mb-4 text-sm font-bold tracking-wide text-slate-900 uppercase">Sazinies</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="tel:+37129252975" className="group flex items-start gap-3">
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all group-hover:border-emerald-500 group-hover:text-emerald-600">
                                        <Icons.Phone className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-400">Zvani mums</p>
                                        <p className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-emerald-700">
                                            +371 29252975
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:uldis.berzins_4@rtu.lv" className="group flex items-start gap-3">
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all group-hover:border-sky-500 group-hover:text-sky-600">
                                        <Icons.Mail className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-400">Raksti mums</p>
                                        <p className="text-sm font-semibold break-all text-slate-700 transition-colors group-hover:text-sky-700">
                                            uldis.berzins_4@rtu.lv
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="group flex items-start gap-3">
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400">
                                        <Icons.MapPin className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-400">Adrese</p>
                                        <p className="text-sm leading-snug text-slate-600">
                                            Ķīpsalas iela 6B–316,
                                            <br /> Rīga, LV-1064
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- Bottom Section: Language & Copyright --- */}
                <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 md:flex-row">
                    {/* Language Switcher */}
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                        <button
                            onClick={() => switchLanguage('lv')}
                            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                                currentLocale === 'lv' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            <span className="text-base">🇱🇻</span> Lat
                        </button>
                        <button
                            onClick={() => switchLanguage('en')}
                            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                                currentLocale === 'en' || currentLocale === 'en_GB'
                                    ? 'bg-sky-50 text-sky-700 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            <span className="text-base">🇬🇧</span> Eng
                        </button>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-xs text-slate-400">
                            &copy; {new Date().getFullYear()} SIA Cilmes Šūnu Tehnoloģijas. Visas tiesības aizsargātas.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
