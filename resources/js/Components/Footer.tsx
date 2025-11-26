import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';

const NAV_GROUPS = [
    {
        title: 'Pacientiem',
        items: [
            { label: 'Kas ir ATMP?', href: '/' },
            { label: 'Psoriāze un jaunās terapjas', href: '/' },
            { label: 'Krona slimība un jaunās terapijas', href: '/' },
            { label: 'Biežāk uzdotie jautājumi (FAQ)', href: '/' },
        ],
    },
    {
        title: 'Pētniecība',
        items: [
            { label: 'PostDock anketa', href: '/postdock-anketa' },
            { label: 'Publiskā anketa', href: '/anketa' },
            { label: 'Koda anketa', href: '/questions' },
        ],
    },
    {
        title: 'Par mums',
        items: [
            { label: 'Mūsu grupa', href: '/musu-grupa' },
            { label: 'Komanda', href: '/musu-grupa' },
            { label: 'Kontakti', href: '/contacts' },
            { label: 'Pievienojies mums', href: '/pievienojies-mums' },
        ],
    },
];


const LANGUAGES: Array<{ code: string; label: string; flag: string }> = [
    { code: 'lv', label: 'Latviski', flag: '🇱🇻' },
    { code: 'en_GB', label: 'English', flag: '🇬🇧' },
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
            alert('Failed to switch language. Please try again.');
        }
    };
    return (
        <footer className="border-t border-[#dfe9e3] bg-[#f7faf8] text-[#1f5e45]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-14 md:flex-row md:justify-between">
                <div className="max-w-xl space-y-8">
                    <h2 className="text-base font-semibold tracking-[0.2em] text-[#1b4a37] uppercase">Biočipu zinātniskā laboratorija</h2>
                    <dl className="space-y-6 text-lg leading-relaxed tracking-wide">
                        <div>
                            <dt className="font-semibold text-[#1b4a37]">Telefona numurs:</dt>
                            <dd className="mt-2 space-y-1">
                                <a className="block text-[#2c7c5a] hover:text-[#1b4a37]" href="tel:+37129252975">
                                    +371 29252975
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-[#1b4a37]">E-pasts:</dt>
                            <dd className="mt-2">
                                <a className="text-[#2c7c5a] hover:text-[#1b4a37]" href="mailto:uldis.berzins_4@rtu.lv">
                                    uldis.berzins_4@rtu.lv
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-[#1b4a37]">Adrese:</dt>
                            <dd className="mt-2 text-[#205741]">Ķīpsalas iela 6B–316, Rīga, LV-1064, Latvija</dd>
                        </div>
                    </dl>
                </div>
                <div className="flex flex-1 flex-col gap-12 md:flex-row md:justify-end md:gap-16">
                    <nav className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                        {NAV_GROUPS.map((group) => (
                            <div key={group.title} className="space-y-3 text-lg leading-relaxed">
                                <h3 className="font-semibold text-[#1b4a37]">{group.title}</h3>
                                <ul className="space-y-2 border-l border-[#c6d9ce] pl-4">
                                    {group.items.map((item) => (
                                        <li key={item.label} className="text-[#2c7c5a] hover:text-[#1b4a37]">
                                            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                    <div className="space-y-3 text-lg leading-relaxed">
                        <h3 className="font-semibold text-[#1b4a37]">Valodas</h3>
                        <ul className="space-y-2">
                            <li className="btn gap-3 btn-ghost" onClick={() => switchLanguage('lv')}>
                                <span aria-hidden="true" className="text-2xl" role="img">
                                    🇱🇻
                                </span>
                                <span className="text-[#2c7c5a]">Latviešu</span>
                            </li>
                            <li className="btn gap-3 btn-ghost" onClick={() => switchLanguage('en')}>
                                <span aria-hidden="true" className="text-2xl" role="img">
                                    🇬🇧
                                </span>
                                <span className="text-[#2c7c5a]">English</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
