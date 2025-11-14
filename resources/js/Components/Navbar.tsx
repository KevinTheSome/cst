import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <nav className="z-50 flex w-full flex-col items-start justify-between bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:px-8 md:py-6">
            <div className="flex w-full items-center justify-between gap-6 md:w-auto">
                <Link href="/" className="flex items-center gap-4">
                    <img src="/bzl-site-icon-01.png" alt="Biočipu zinātniskā laboratorija" className="h-16 w-auto md:h-20" />
                    <span className="text-xl leading-tight font-semibold text-green-700 md:text-2xl">
                        Biočipu zinātniskā
                        <br />
                        laboratorija
                    </span>
                </Link>
                {/* Hamburger menu for mobile */}
                <button className="btn z-30 p-2 md:hidden" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
                    <svg className="h-7 w-7 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Desktop nav */}
            <ul className="m-0 hidden w-auto list-none flex-row items-center gap-4 p-0 md:flex">
                <li>
                    <div className="group dropdown btn dropdown-end dropdown-bottom btn-ghost md:w-auto">
                        <label
                            tabIndex={0}
                            className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-green-700 transition group-hover:text-orange-400 hover:text-orange-400 md:text-xl"
                        >
                            PAR MUMS{' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-green-700 transition group-hover:text-orange-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu w-96 rounded-box bg-base-100 p-2 shadow">
                            <li>
                                <Link
                                    href="/biocipu-zinatniska-laboratorija"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl"
                                >
                                    Biočipu zinātniskā laboratorija
                                </Link>
                            </li>
                            <li>
                                <Link href="/lablife" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Laboratorijas dzīve
                                </Link>
                            </li>
                            <li>
                                <Link href="/musu-grupa" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Mūsu grupa
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pievienojies-mums"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl"
                                >
                                    Pievienojies mums
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* PĒTĪJUMI (routes not defined yet in web.php, so keeping as # for now) */}
                <li>
                    <div className="group dropdown btn dropdown-end dropdown-bottom btn-ghost md:w-auto">
                        <label
                            tabIndex={0}
                            className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-green-700 transition group-hover:text-orange-400 hover:text-orange-400 md:text-xl"
                        >
                            PĒTĪJUMI{' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-green-700 transition group-hover:text-orange-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu w-96 rounded-box bg-base-100 p-2 shadow">
                            <li>
                                <Link
                                    href="/publikacijas"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl"
                                >
                                    Publikācijas
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Projekti
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* Questionnaire */}
                <li>
                    <div className="group dropdown btn dropdown-end dropdown-bottom btn-ghost md:w-auto">
                        <label
                            tabIndex={0}
                            className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-green-700 transition group-hover:text-orange-400 hover:text-orange-400 md:text-xl"
                        >
                            ANKETAS{' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-green-700 transition group-hover:text-orange-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu w-96 rounded-box bg-base-100 p-2 shadow">
                            <li>
                                <Link href="/anketa" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Publiskā anketa
                                </Link>
                            </li>
                            <li>
                                <Link href="/questions" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Koda anketa
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* Contacts */}
                <li>
                    <Link href="/contacts" className="btn text-lg font-semibold text-green-700 btn-ghost transition hover:text-orange-400 md:text-xl">
                        KONTAKTI
                    </Link>
                </li>
                {/* Language buttons styled like KONTAKTI, with selected using Tailwind utility classes */}
                <li className="flex items-center gap-1">
                    <button
                        className={`btn flex h-10 min-h-0 w-10 items-center justify-center border-none p-0 text-lg font-semibold btn-ghost transition md:text-xl ${
                            currentLocale === 'lv' ? 'btn btn-success' : 'text-green-700 hover:text-orange-400'
                        }`}
                        onClick={() => switchLanguage('lv')}
                        disabled={currentLocale === 'lv'}
                        aria-current={currentLocale === 'lv' ? 'page' : undefined}
                        title="Latviešu"
                    >
                        <span className="text-xl">🇱🇻</span>
                    </button>
                    <button
                        className={`btn flex h-10 min-h-0 w-10 items-center justify-center border-none p-0 text-lg font-semibold btn-ghost transition md:text-xl ${
                            currentLocale === 'en' ? 'btn btn-success' : 'text-green-700 hover:text-orange-400'
                        }`}
                        onClick={() => switchLanguage('en')}
                        disabled={currentLocale === 'en'}
                        aria-current={currentLocale === 'en' ? 'page' : undefined}
                        title="English"
                    >
                        <span className="text-xl">🇬🇧</span>
                    </button>
                </li>
            </ul>
            {/* DaisyUI sidebar for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    {/* Overlay */}
                    {/* <div className="bg-opacity-30 absolute inset-0 bg-black" onClick={() => setSidebarOpen(false)}></div> */}
                    {/* Sidebar with animation from left */}
                    <aside className="animate-slide-in-sidebar-left relative flex h-full w-80 max-w-full translate-x-0 flex-col bg-white text-green-700 shadow-lg transition-transform duration-300 ease-in-out">
                        <div className="flex items-center justify-between border-b border-green-700/10 px-6 py-4">
                            <img src="/bzl-site-icon-01.png" alt="Logo" className="h-8 w-auto" />
                            <button className="btn text-green-700 btn-sm" aria-label="Close menu" onClick={() => setSidebarOpen(false)}>
                                ✕
                            </button>
                        </div>
                        <nav className="flex-1 overflow-y-auto px-2 py-4">
                            <ul className="menu w-full gap-1 text-green-700">
                                <li>
                                    <details className="w-full">
                                        <summary className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-lg font-semibold">
                                            {/* People/Group icon: Heroicons style */}
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path d="M17 20v-2a4 4 0 00-3-3.87" />
                                                <path d="M9 20v-2a4 4 0 013-3.87" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            PAR MUMS
                                        </summary>
                                        <ul className="mt-1 ml-6 w-full">
                                            <li>
                                                <Link
                                                    href="/biocipu-zinatniska-laboratorija"
                                                    className="block w-full text-green-700 hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    Biočipu zinātniskā laboratorija
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/lablife"
                                                    className="block w-full text-green-700 hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    Laboratorijas dzīve
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/musu-grupa"
                                                    className="block w-full text-green-700 hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    Mūsu grupa
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/pievienojies-mums"
                                                    className="block w-full text-green-700 hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    Pievienojies mums
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <details className="w-full">
                                        <summary className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-lg font-semibold">
                                            {/* Microscope icon: Custom science style */}
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="4" />
                                                <rect x="9" y="2" width="6" height="2" rx="1" />
                                                <path d="M12 6v2m0 8v2m-4-4h8" />
                                            </svg>
                                            PĒTĪJUMI
                                        </summary>
                                        <ul className="mt-1 ml-6 w-full">
                                            <li>
                                                <Link
                                                    href="/publikacijas"
                                                    className="block w-full text-green-700 hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    Publikācijas
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/projects"
                                                    className="block w-full text-green-700 hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    Projekti
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <details className="w-full">
                                        <summary className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-lg font-semibold">
                                            {/* Questionnaire icon: Custom style */}
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <rect x="3" y="4" width="18" height="16" rx="2" />
                                                <path d="M16 2v4M8 2v4M3 10h18" />
                                            </svg>
                                            ANKETAS
                                        </summary>
                                        <ul className="mt-1 ml-6 w-full">
                                            <li>
                                                <Link
                                                    href="/anketa"
                                                    className="block w-full text-green-700 hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    Publiskā anketa
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/questions"
                                                    className="block w-full text-green-700 hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    Koda anketa
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => setSidebarOpen(false)}
                                        href="/contacts"
                                        className="flex w-full items-center gap-3 px-3 py-2 text-lg font-semibold"
                                    >
                                        {/* Mail/Contact icon: Lucide style */}
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <rect x="3" y="5" width="18" height="14" rx="2" />
                                            <polyline points="3 7 12 13 21 7" />
                                        </svg>
                                        KONTAKTI
                                    </Link>
                                </li>
                                <li className="mt-4 ml-4 flex w-full flex-row gap-2">
                                    <button
                                        className={`btn flex h-10 min-h-0 w-10 items-center justify-center border-none p-0 text-lg font-semibold btn-ghost transition md:text-xl ${
                                            currentLocale === 'lv' ? 'btn btn-success' : 'text-green-700 hover:text-orange-400'
                                        }`}
                                        onClick={() => switchLanguage('lv')}
                                        disabled={currentLocale === 'lv'}
                                        aria-current={currentLocale === 'lv' ? 'page' : undefined}
                                        title="Latviešu"
                                    >
                                        <span className="text-xl">🇱🇻</span>
                                    </button>
                                    <button
                                        className={`btn flex h-10 min-h-0 w-10 items-center justify-center border-none p-0 text-lg font-semibold btn-ghost transition md:text-xl ${
                                            currentLocale === 'en' ? 'btn btn-success' : 'text-green-700 hover:text-orange-400'
                                        }`}
                                        onClick={() => switchLanguage('en')}
                                        disabled={currentLocale === 'en'}
                                        aria-current={currentLocale === 'en' ? 'page' : undefined}
                                        title="English"
                                    >
                                        <span className="text-xl">🇬🇧</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                    <style>{`
                        @keyframes slide-in-sidebar-left {
                            from { transform: translateX(-100%); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                        .animate-slide-in-sidebar-left {
                            animation: slide-in-sidebar-left 0.3s cubic-bezier(0.4,0,0.2,1);
                        }
                    `}</style>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
