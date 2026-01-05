import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';

// --- ICONS ---
const Icons = {
    Phone: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
    ),
    Mail: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    ),
    MapPin: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
    ),
};

// Organized navigation links for cleaner mapping
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
            { label: 'ATMP ražotnes Eiropā', href: '/speciālistiem/atmp' }, // Typo fix in path: specialistiem vs speciālistiem handled by your router logic
            { label: 'Apmācības', href: '/specialistiem/apmaciba' },
            { label: 'Aptauja', href: '/postdock-anketa?role=specialists' },
        ],
    },
    {
        title: 'Pētniecība',
        items: [
            { label: 'PostDock anketa', href: '/postdock-anketa?role=patients' },
            { label: 'Koda anketa', href: '/anketa-kods' },
            { label: 'Publikācijas', href: '/datubaze' }, 
        ],
    },
    {
        title: 'Par mums',
        items: [
            { label: 'Mūsu grupa', href: '/ParMums/musu-grupa' },
            { label: 'Saziņa', href: '/ParMums/contacts' },
            { label: 'Karjera', href: '/ParMums/pievienojies-mums' },
        ],
    },
];

export default function Footer() {
    const { props } = usePage<any>();
    const currentLocale = props.locale || 'lv';

    const getCsrfToken = () =>
        (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;
        try {
            const csrf = getCsrfToken();
            await axios.post('/locale', { locale }, { headers: { 'X-CSRF-TOKEN': csrf } });
            router.reload({ only: ['lang', 'locale'] });
        } catch (error) {
            console.error('Language switch failed:', error);
        }
    };

    return (
        <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50 font-sans text-slate-600">
            {/* Background Texture */}
            <div className="pointer-events-none absolute inset-0 opacity-50">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
                {/* --- Top Section: Brand & Navigation Grid --- */}
                <div className="mb-16 grid grid-cols-1 gap-y-12 gap-x-8 lg:grid-cols-12">
                    
                    {/* Brand Column (Left) */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        <Link href="/" className="mb-6 block">
                           <span className="text-xl font-bold text-slate-900">
                               Cilmes Šūnu
                               <span className="block text-emerald-600">Tehnoloģijas SIA</span>
                           </span>
                        </Link>
                        <p className="mb-6 text-sm leading-relaxed text-slate-500">
                            Inovācijas reģeneratīvajā medicīnā un personalizētajā diagnostikā. Mēs strādājam, lai uzlabotu dzīves kvalitāti ar zinātnes palīdzību.
                        </p>
                        
                        {/* Contact Cards */}
                        <div className="space-y-4">
                            <a href="tel:+37129252975" className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-md">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-600">
                                    <Icons.Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400">Zvani mums</p>
                                    <p className="text-sm font-semibold text-slate-700">+371 29252975</p>
                                </div>
                            </a>
                            
                            <a href="mailto:uldis.berzins_4@rtu.lv" className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-sky-500/30 hover:shadow-md">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-sky-50 group-hover:text-sky-600">
                                    <Icons.Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400">Raksti mums</p>
                                    <p className="text-sm font-semibold text-slate-700">uldis.berzins_4@rtu.lv</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-3 rounded-xl border border-transparent p-3 pl-0">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                                    <Icons.MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400">Adrese</p>
                                    <p className="text-sm font-medium text-slate-600">Ķīpsalas iela 6B–316, Rīga</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns (Right Grid) */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 xl:col-span-9 lg:pl-12">
                        {NAV_GROUPS.map((group) => (
                            <div key={group.title}>
                                <h3 className="mb-4 text-xs font-bold tracking-wider text-slate-900 uppercase">{group.title}</h3>
                                <ul className="space-y-3">
                                    {group.items.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                href={item.href}
                                                className="inline-block text-sm text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-emerald-600"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Bottom Section: Copyright & Lang --- */}
                <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 md:flex-row">
                    
                    {/* Language Toggle Pill */}
                    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                        <button
                            onClick={() => switchLanguage('lv')}
                            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                                currentLocale === 'lv' 
                                ? 'bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-black/5' 
                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                            }`}
                        >
                            Latviešu
                        </button>
                        <button
                            onClick={() => switchLanguage('en')}
                            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                                currentLocale === 'en' 
                                ? 'bg-sky-50 text-sky-700 shadow-sm ring-1 ring-black/5' 
                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                            }`}
                        >
                            English
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
