function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-white px-8 py-6 shadow-sm">
            <div className="flex items-center gap-6">
                <a href="/" className="flex items-center gap-4">
                    <img src="/bzl-site-icon-01.png" alt="Biočipu zinātniskā laboratorija" className="h-20 w-auto" />
                    <span className="text-2xl leading-tight font-semibold text-green-700">
                        Biočipu zinātniskā
                        <br />
                        laboratorija
                    </span>
                </a>
            </div>
            <ul className="m-0 flex list-none items-center gap-4 p-0">
                <li>
                    <div className="dropdown-hover group dropdown btn dropdown-end dropdown-bottom btn-ghost">
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
                                <a href="#" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Biočipu zinātniskā laboratorija
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Laboratorijas dzīve
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Mūsu grupa
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Pievienojies mums
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="dropdown-hover group dropdown btn dropdown-end dropdown-bottom btn-ghost">
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
                                <a href="#" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Publikācijas
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-lg font-semibold text-green-700 transition hover:text-orange-400 md:text-xl">
                                    Projekti
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="#" className="btn text-lg font-semibold text-green-700 btn-ghost transition hover:text-orange-400 md:text-xl">
                        KONTAKTI
                    </a>
                </li>
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
        </nav>
    );
}

export default Navbar;
