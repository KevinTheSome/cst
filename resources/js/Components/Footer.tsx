import { Link } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';

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

const copy = {
    lv: {
        brand: {
            line1: 'Cilmes Šūnu',
            line2: 'Tehnoloģijas SIA',
            description:
                'Inovācijas reģeneratīvajā medicīnā un personalizētajā diagnostikā. Mēs strādājam, lai uzlabotu dzīves kvalitāti ar zinātnes palīdzību.',
        },
        contacts: {
            call: 'Zvani mums',
            write: 'Raksti mums',
            addressLabel: 'Adrese',
            addressText: 'Ķīpsalas iela 6B–316, Rīga',
        },
        navGroups: [
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
        ],
        copyright: 'SIA Cilmes Šūnu Tehnoloģijas. Visas tiesības aizsargātas.',
    },
    en: {
        brand: {
            line1: 'Stem Cell',
            line2: 'Technologies Ltd',
            description:
                'Innovation in regenerative medicine and personalized diagnostics. We work to improve quality of life through science.',
        },
        contacts: {
            call: 'Call us',
            write: 'Email us',
            addressLabel: 'Address',
            addressText: '6B–316 Kipsala St., Riga',
        },
        navGroups: [
            {
                title: 'For Patients',
                items: [
                    { label: 'What is ATMP?', href: '/pacientiem/atmp' },
                    { label: 'Psoriasis therapies', href: '/pacientiem/psoriaze-terapija' },
                    { label: "Crohn's disease", href: '/pacientiem/krona-terapija' },
                    { label: 'Frequently asked questions', href: '/pacientiem/faq' },
                ],
            },
            {
                title: 'For Specialists',
                items: [
                    { label: 'EU regulations and laws', href: '/specialistiem/likumi' },
                    { label: 'ATMP facilities in Europe', href: '/speciālistiem/atmp' },
                    { label: 'Training', href: '/specialistiem/apmaciba' },
                    { label: 'Survey', href: '/postdock-anketa?role=specialists' },
                ],
            },
            {
                title: 'Research',
                items: [
                    { label: 'PostDock survey', href: '/postdock-anketa?role=patients' },
                    { label: 'Code survey', href: '/anketa-kods' },
                    { label: 'Publications', href: '/datubaze' },
                ],
            },
            {
                title: 'About Us',
                items: [
                    { label: 'Our team', href: '/ParMums/musu-grupa' },
                    { label: 'Contact', href: '/ParMums/contacts' },
                    { label: 'Careers', href: '/ParMums/pievienojies-mums' },
                ],
            },
        ],
        copyright: 'Stem Cell Technologies Ltd. All rights reserved.',
    },
} as const;

export default function Footer() {
    const { locale } = useLang();
    const t = copy[locale === 'en' ? 'en' : 'lv'];

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
                               {t.brand.line1}
                               <span className="block text-emerald-600">{t.brand.line2}</span>
                           </span>
                        </Link>
                        <p className="mb-6 text-sm leading-relaxed text-slate-500">
                            {t.brand.description}
                        </p>
                        
                        {/* Contact Cards */}
                        <div className="space-y-4">
                            <a href="tel:+37129252975" className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-md">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-600">
                                    <Icons.Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400">{t.contacts.call}</p>
                                    <p className="text-sm font-semibold text-slate-700">+371 29252975</p>
                                </div>
                            </a>
                            
                            <a href="mailto:uldis.berzins_4@rtu.lv" className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-sky-500/30 hover:shadow-md">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-sky-50 group-hover:text-sky-600">
                                    <Icons.Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400">{t.contacts.write}</p>
                                    <p className="text-sm font-semibold text-slate-700">uldis.berzins_4@rtu.lv</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-3 rounded-xl border border-transparent p-3 pl-0">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                                    <Icons.MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400">{t.contacts.addressLabel}</p>
                                    <p className="text-sm font-medium text-slate-600">{t.contacts.addressText}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns (Right Grid) */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 xl:col-span-9 lg:pl-12">
                        {t.navGroups.map((group) => (
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

                {/* --- Bottom Section: Copyright --- */}
                <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 md:flex-row">
                    <div className="text-center md:text-right">
                        <p className="text-xs text-slate-400">
                            &copy; {new Date().getFullYear()} {t.copyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
