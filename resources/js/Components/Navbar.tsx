import { useLang } from '@/hooks/useLang';
import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { props } = usePage<any>();
    const currentLocale = props.locale; // always defined from middleware

    const { __ } = useLang(); // <--- translation helper

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;

        try {
            await axios.post('/locale', { locale });
            router.visit(window.location.pathname, { replace: true });
        } catch (error) {
            console.error('Language switch failed:', error);
            alert('Failed to switch language. Please try again.');
        }
    };

    return (
        <nav className="z-50 flex w-full flex-col items-start justify-between bg-white px-4 py-4 shadow-sm lg:flex-row lg:items-center lg:px-8 lg:py-6">
            <div className="flex w-full items-center justify-between gap-6 lg:w-auto">
                <Link href="/" className="flex items-center gap-4">
                    <img src="/bzl-site-icon-01.png" alt="Biočipu zinātniskā laboratorija" className="h-16 w-auto md:h-20" />
                    <span className="text-xl leading-tight font-semibold text-green-700 md:text-2xl">
                        SIA cilmes šunu
                        <br />
                        tehnoloģijas
                    </span>
                </Link>

                {/* Hamburger menu for mobile + tablet + small desktops */}
                <button className="btn z-30 p-2 lg:hidden" aria-label="Open menu" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}>
                    <svg className="h-7 w-7 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Desktop nav – only on large screens and up */}
            <ul className="m-0 hidden w-auto list-none flex-row items-center gap-4 p-0 lg:flex">
                {/* PACIENTIEM */}
                <li>
                    <div className="group dropdown btn dropdown-end dropdown-bottom btn-ghost lg:w-auto">
                        <label
                            tabIndex={0}
                            className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-green-700 transition group-hover:text-orange-400 hover:text-orange-400 lg:text-xl"
                        >
                            {__('head.nav_patients')}{' '}
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
                                    href="/pacientiem/atmp"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_patients_atmp')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pacientiem/psoriaze-terapija"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_patients_psoriasis')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pacientiem/krona-terapija"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_patients_crohn')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pacientiem/faq"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_patients_faq')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* Speciālistiem */}
                <li>
                    <div className="group dropdown btn dropdown-end dropdown-bottom btn-ghost lg:w-auto">
                        <label
                            tabIndex={0}
                            className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-green-700 transition group-hover:text-orange-400 hover:text-orange-400 lg:text-xl"
                        >
                            {__('head.nav_specialists')}{' '}
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
                                    href="/specialistiem/likumi"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_specialists_laws')}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl">
                                    {__('head.nav_specialists_plants')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/specialistiem/apmaciba"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_specialists_training')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* PĒTNIECĪBA */}
                <li>
                    <div className="group dropdown btn dropdown-end dropdown-bottom btn-ghost lg:w-auto">
                        <label
                            tabIndex={0}
                            className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-green-700 transition group-hover:text-orange-400 hover:text-orange-400 lg:text-xl"
                        >
                            {__('head.nav_research')}{' '}
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
                                    href="/clinical-trials"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    Klīniskie pētijumi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/postdock-anketa"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_research_postdoc')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/anketa-kods"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_research_code')}
                                </Link>
                            </li>
                            {/* NEW: document DB */}
                            <li>
                                <Link
                                    href="/datubaze"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_research_documents')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* PAR MUMS */}
                <li>
                    <div className="group dropdown btn dropdown-end dropdown-bottom btn-ghost lg:w-auto">
                        <label
                            tabIndex={0}
                            className="flex cursor-pointer items-center gap-2 text-lg font-semibold text-green-700 transition group-hover:text-orange-400 hover:text-orange-400 lg:text-xl"
                        >
                            {__('head.nav_about')}{' '}
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
                                    href="/ParMums/musu-grupa"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_about_team')}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/ParMums/contacts"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_about_contacts')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ParMums/pievienojies-mums"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_about_join')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ParMums/lablife"
                                    className="text-lg font-semibold text-green-700 transition hover:text-orange-400 lg:text-xl"
                                >
                                    {__('head.nav_about_lab')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* Language buttons */}
                <li className="flex items-center gap-1">
                    <button
                        className={`btn flex h-10 min-h-0 w-10 items-center justify-center border-none p-0 text-lg font-semibold btn-ghost transition lg:text-xl ${
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
                        className={`btn flex h-10 min-h-0 w-10 items-center justify-center border-none p-0 text-lg font-semibold btn-ghost transition lg:text-xl ${
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

            {/* Sidebar + overlay for mobile & tablet */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} aria-hidden="true" />

                    <aside className="animate-slide-in-sidebar-left relative z-50 flex h-full w-80 max-w-full translate-x-0 flex-col bg-white text-green-700 shadow-lg transition-transform duration-300 ease-in-out">
                        <div className="flex items-center justify-between border-b border-green-700/10 px-6 py-4">
                            <img src="/bzl-site-icon-01.png" alt="Logo" className="h-8 w-auto" />
                            <button className="btn text-green-700 btn-sm" aria-label="Close menu" onClick={() => setSidebarOpen(false)}>
                                ✕
                            </button>
                        </div>

                        <nav className="flex-1 overflow-y-auto px-2 py-4">
                            <ul className="menu w-full gap-1 text-green-700">
                                {/* PĒTNIECĪBA */}
                                <li>
                                    <details className="w-full">
                                        <summary className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-lg font-semibold">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path d="M9 3h6v6H9z" />
                                                <path d="M4 21h16M7 9h10l-1 12H8z" />
                                            </svg>
                                            {__('head.nav_research')}
                                        </summary>
                                        <ul className="mt-1 ml-6 w-full">
                                            <li>
                                                <Link
                                                    href="/clinical-trials"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    Klīniskie pētijumi
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/" className="block w-full hover:text-orange-400" onClick={() => setSidebarOpen(false)}>
                                                    PostDock anketa
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/postdock-anketa"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_research_postdoc')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/anketa-kods"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_research_code')}
                                                </Link>
                                            </li>
                                            {/* NEW: document DB */}
                                            <li>
                                                <Link
                                                    href="/datubaze"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_research_documents')}
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>

                                {/* SPECIĀLISTIEM */}
                                <li>
                                    <details className="w-full">
                                        <summary className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-lg font-semibold">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path d="M9 3h6v6H9z" />
                                                <path d="M4 21h16M7 9h10l-1 12H8z" />
                                            </svg>
                                            {__('head.nav_specialists')}
                                        </summary>
                                        <ul className="mt-1 ml-6 w-full">
                                            <li>
                                                <Link
                                                    href="/specialistiem/likumi"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_specialists_laws')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="block w-full hover:text-orange-400" onClick={() => setSidebarOpen(false)}>
                                                    {__('head.nav_specialists_plants')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="specialistiem/apmaciba"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_specialists_training')}
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>

                                {/* PACIENTIEM */}
                                <li>
                                    <details className="w-full">
                                        <summary className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-lg font-semibold">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path d="M12 6v12M6 12h12" />
                                                <circle cx="12" cy="12" r="9" />
                                            </svg>
                                            {__('head.nav_patients')}
                                        </summary>
                                        <ul className="mt-1 ml-6 w-full">
                                            <li>
                                                <Link
                                                    href="/pacientiem/atmp"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_patients_atmp')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/pacientiem/psoriaze-terapija"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_patients_psoriasis')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/pacientiem/krona-terapija"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_patients_crohn')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/pacientiem/faq"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_patients_faq')}
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>

                                {/* PAR MUMS */}
                                <li>
                                    <details className="w-full">
                                        <summary className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-lg font-semibold">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path d="M17 20v-2a4 4 0 00-3-3.87" />
                                                <path d="M9 20v-2a4 4 0 013-3.87" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            {__('head.nav_about')}
                                        </summary>
                                        <ul className="mt-1 ml-6 w-full">
                                            <li>
                                                <Link
                                                    href="/ParMums/lablife"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_about_lab')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/ParMums/musu-grupa"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_about_team')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/ParMums/pievienojies-mums"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_about_join')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/ParMums/contacts"
                                                    className="block w-full hover:text-orange-400"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {__('head.nav_about_contacts')}
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>

                                {/* Language buttons */}
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
