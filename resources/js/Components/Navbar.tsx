import { useState } from 'react';
import { Link } from '@inertiajs/react';

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <nav className="z-50 flex w-full flex-col items-start justify-between bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:px-8 md:py-6">
            <div className="flex w-full items-center justify-between gap-6 md:w-auto">
                <a href="/" className="flex items-center gap-4">
                    <img src="/bzl-site-icon-01.png" alt="Biočipu zinātniskā laboratorija" className="h-16 w-auto md:h-20" />
                    <span className="text-xl leading-tight font-semibold text-green-700 md:text-2xl">
                        Biočipu zinātniskā
                        <br />
                        laboratorija
                    </span>
                </a>
                {/* Hamburger menu for mobile */}
                <button className="z-30 p-2 md:hidden" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
                    <svg className="h-7 w-7 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Desktop nav */}
            <ul className="m-0 hidden w-auto list-none flex-row items-center gap-4 p-0 md:flex">
                <li>
                    <div className="dropdown-hover group dropdown btn dropdown-end dropdown-bottom btn-ghost md:w-auto">
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
                                <Link
                                    href="/lablife"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl"
                                >
                                    Laboratorijas dzīve
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/musu-grupa"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl"
                                >
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
                    <div className="dropdown-hover group dropdown btn dropdown-end dropdown-bottom btn-ghost md:w-auto">
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
                                <a
                                    href="#"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl"
                                >
                                    Publikācijas
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl"
                                >
                                    Projekti
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* Contacts */}
                <li>
                    <Link
                        href="/contacts"
                        className="btn btn-ghost text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl"
                    >
                        KONTAKTI
                    </Link>
                </li>

                {/* Language flags – still placeholders */}
                <li>
                    <a href="#" title="Latviski" className="ml-4">
                        <span className="text-xl">🇱🇻</span>
                    </a>
                </li>
                <li>
                    <a href="#" title="English" className="ml-2">
                        <span className="text-xl">🇬🇧</span>
                    </a>
                </li>
            </ul>
            {/* DaisyUI sidebar for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    {/* Overlay */}
                    <div className="bg-opacity-30 absolute inset-0 bg-black" onClick={() => setSidebarOpen(false)}></div>
                    {/* Sidebar with animation from left */}
                    <aside className="animate-slide-in-sidebar-left relative flex h-full w-80 max-w-full translate-x-0 flex-col bg-white text-green-700 shadow-lg transition-transform duration-300 ease-in-out">
                        <div className="flex items-center justify-between border-b border-green-700/10 px-6 py-4">
                            <img src="/bzl-site-icon-01.png" alt="Logo" className="h-8 w-auto" />
                            <button className="btn text-green-700 btn-ghost btn-sm" aria-label="Close menu" onClick={() => setSidebarOpen(false)}>
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
                                                <a href="#" className="block w-full text-green-700 hover:text-orange-400">
                                                    Biočipu zinātniskā laboratorija
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="block w-full text-green-700 hover:text-orange-400">
                                                    Laboratorijas dzīve
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="block w-full text-green-700 hover:text-orange-400">
                                                    Mūsu grupa
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="block w-full text-green-700 hover:text-orange-400">
                                                    Pievienojies mums
                                                </a>
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
                                                <a href="#" className="block w-full text-green-700 hover:text-orange-400">
                                                    Publikācijas
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="block w-full text-green-700 hover:text-orange-400">
                                                    Projekti
                                                </a>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <a href="#" className="flex w-full items-center gap-3 px-3 py-2 text-lg font-semibold">
                                        {/* Mail/Contact icon: Lucide style */}
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <rect x="3" y="5" width="18" height="14" rx="2" />
                                            <polyline points="3 7 12 13 21 7" />
                                        </svg>
                                        KONTAKTI
                                    </a>
                                </li>
                                <li className="mt-2 flex w-full gap-2 px-3">
                                    <a href="#" title="Latviski" className="w-full text-center text-xl">
                                        🇱🇻
                                    </a>
                                    <a href="#" title="English" className="w-full text-center text-xl">
                                        🇬🇧
                                    </a>
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
