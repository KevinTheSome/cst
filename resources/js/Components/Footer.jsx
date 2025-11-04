import { usePage } from '@inertiajs/react';

const CONTACT_PAGE_PATHS = ['/kontakti', '/kontekti', '/contact', '/contacts'];

const NAV_GROUPS = [
    {
        title: 'Par mums',
        items: [
            'Biočipu zinātniskā laboratorija',
            'Laboratorijas dzīve',
            'Mūsu grupa',
            'Pievienojies mums',
        ],
    },
    {
        title: 'Pētījumi',
        items: ['Publikācijas', 'Projekti'],
    },
    {
        title: 'Kontakti',
        items: ['Kontakti'],
    },
];

const LANGUAGES = [
    { code: 'lv', label: 'Latviski', flag: '🇱🇻' },
    { code: 'en_GB', label: 'English', flag: '🇬🇧' },
];

export default function Footer() {
    const { url } = usePage();
    const currentPath = (url ?? '').split('?')[0].toLowerCase();

    if (CONTACT_PAGE_PATHS.includes(currentPath)) {
        return null;
    }

    return (
        <footer className="border-t border-[#dfe9e3] bg-[#f7faf8] text-[#1f5e45]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-14 md:flex-row md:justify-between">
                <div className="max-w-xl space-y-8">
                    <dl className="space-y-6 text-lg leading-relaxed tracking-wide">
                        <div>
                            <dt className="font-semibold text-[#1b4a37]">Telefona numurs:</dt>
                            <dd className="mt-2 space-y-1">
                                <a className="block text-[#2c7c5a] hover:text-[#1b4a37]" href="tel:+37167089383">
                                    +371 67089383
                                </a>
                                <a className="block text-[#2c7c5a] hover:text-[#1b4a37]" href="tel:+37129252975">
                                    +371 29252975
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-[#1b4a37]">E-pasts:</dt>
                            <dd className="mt-2">
                                <a
                                    className="text-[#2c7c5a] hover:text-[#1b4a37]"
                                    href="mailto:uldis.berzins_4@rtu.lv"
                                >
                                    uldis.berzins_4@rtu.lv
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-[#1b4a37]">Adrese:</dt>
                            <dd className="mt-2 text-[#205741]">
                                Ķīpsalas iela 6B–316, Rīga, LV-1064, Latvija
                            </dd>
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
                                        <li key={item} className="text-[#2c7c5a] hover:text-[#1b4a37]">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                    <div className="space-y-3 text-lg leading-relaxed">
                        <h3 className="font-semibold text-[#1b4a37]">Valodas</h3>
                        <ul className="space-y-2">
                            {LANGUAGES.map((language) => (
                                <li key={language.code} className="flex items-center gap-3">
                                    <span aria-hidden="true" className="text-2xl">
                                        {language.flag}
                                    </span>
                                    <span className="text-[#2c7c5a]">{language.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
