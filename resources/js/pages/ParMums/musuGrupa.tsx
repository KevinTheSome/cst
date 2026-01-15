import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// --- ICONS ---
const Icons = {
    ChevronDown: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    ),
    Facebook: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    ),
    Users: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
        </svg>
    ),
    School: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.24 50.552 50.552 0 00-2.658.813m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
        </svg>
    ),
};

export default function MusuGrupa() {
    const { __ } = useLang();
    // Independent states for each dropdown
    const [showVtdtStudents, setShowVtdtStudents] = useState(false);
    const [showRvtStudents, setShowRvtStudents] = useState(false);
    const [showRtkStudents, setShowRtkStudents] = useState(false);
    const [rtkLogoOk, setRtkLogoOk] = useState(true);

    const vtdtStudents = [
        {
            name: 'Kevins Markuss Kanalis',
            title: 'SCRUM Master',
            description: 'Uzdevumu sadalīšanas, koda parskatīšanas un izstrādes vadītājs.',
            image: '/bzl-1.jpg',
        },
        {
            name: 'Elvis Pujāts',
            title: 'Chill guy, for the vibes',
            description: 'Veido prototipus un vizuālās vadlīnijas, kas saskaņo laboratorijas zīmolu ar digitālo pieredzi.',
            image: '/bzl-2.jpg',
        },
        {
            name: 'Kristians Miķelsons',
            title: 'Programmētājs',
            description: 'Iztrādā uzdevumus, ko vadītājs ir uzdevis izpildīt',
            image: '/bzl-3.jpg',
        },
        {
            name: 'Adrians Raitums',
            title: 'UI/UX Dizainers Front-end izstrādātājs',
            description: 'Izdomāt dizainu kā piesaistīt lietotājus uz Tīmekļa vietni.',
            image: '/Adrians_Raitums.jpeg',
        },
        {
            name: 'Jānis Mārtiņš Bramanis',
            title: 'Vietnes satura un privātuma politikas redaktors',
            description: 'Rediģē lapu saturu un sīkdatņu politiku, rūpējoties par skaidru, saprotamu un lietotājam draudzīgu informāciju.',
            image: '/janka.jpg',
        },
        {
            name: 'Kristers Skrastiņš',
            title: 'Programmētājs',
            description: 'Realizē uzdevumus, izstrādā nepieciešamo funkcionalitāti.',
            image: '/bzl-6.jpg',
        },
        {
            name: 'Kristaps Imants Liepiņs',
            title: 'Programmētājs',
            description: 'Izpilda uzdotos programmēšanas uzdevumus.',
            image: '/bzl-7.jpg',
        },
    ];

    // New Data for RVT
    const rvtStudents = [
        {
            name: 'RVT Students 1',
            title: 'Team Lead',
            description: 'Koordinē RVT komandas darbu un komunikāciju ar pasūtītāju.',
            image: '/rvt-student-1.jpg', // Replace with real images
        },
        {
            name: 'RVT Students 2',
            title: 'Backend Programmētājs',
            description: 'Atbild par servera puses loģiku un datu bāzes arhitektūru.',
            image: '/rvt-student-2.jpg',
        },
        {
            name: 'RVT Students 3',
            title: 'Frontend Programmētājs',
            description: 'Pārvērš dizaina maketus funkcionālā kodā.',
            image: '/rvt-student-3.jpg',
        },
        {
            name: 'RVT Students 4',
            title: 'UI Dizainers',
            description: 'Izstrādā lietotāja saskarnes vizuālo tēlu.',
            image: '/rvt-student-4.jpg',
        },
        {
            name: 'RVT Students 5',
            title: 'QA Speciālists',
            description: 'Veic sistēmas testēšanu un kļūdu meklēšanu.',
            image: '/rvt-student-5.jpg',
        },
        {
            name: 'RVT Students 6',
            title: 'Datu Analītiķis',
            description: 'Apstrādā un analizē laboratorijas iegūtos datus.',
            image: '/rvt-student-6.jpg',
        },
        {
            name: 'RVT Students 7',
            title: 'DevOps',
            description: 'Rūpējas par izstrādes vidi un automatizāciju.',
            image: '/rvt-student-7.jpg',
        },
    ];
    // New Data for RTK
    const rtkStudents = [
        {
            name: 'RVT Students 1',
            title: 'Team Lead',
            description: 'Koordinē RVT komandas darbu un komunikāciju ar pasūtītāju.',
            image: '/rvt-student-1.jpg', // Replace with real images
        },
        {
            name: 'RVT Students 2',
            title: 'Backend Programmētājs',
            description: 'Atbild par servera puses loģiku un datu bāzes arhitektūru.',
            image: '/rvt-student-2.jpg',
        },
        {
            name: 'RVT Students 3',
            title: 'Frontend Programmētājs',
            description: 'Pārvērš dizaina maketus funkcionālā kodā.',
            image: '/rvt-student-3.jpg',
        },
        {
            name: 'RVT Students 4',
            title: 'UI Dizainers',
            description: 'Izstrādā lietotāja saskarnes vizuālo tēlu.',
            image: '/rvt-student-4.jpg',
        },
        {
            name: 'RVT Students 5',
            title: 'QA Speciālists',
            description: 'Veic sistēmas testēšanu un kļūdu meklēšanu.',
            image: '/rvt-student-5.jpg',
        },
        {
            name: 'RVT Students 6',
            title: 'Datu Analītiķis',
            description: 'Apstrādā un analizē laboratorijas iegūtos datus.',
            image: '/rvt-student-6.jpg',
        },
        {
            name: 'RVT Students 7',
            title: 'DevOps',
            description: 'Rūpējas par izstrādes vidi un automatizāciju.',
            image: '/rvt-student-7.jpg',
        },
    ];

    const rtkLogoSrc = '/rtk.png';

    return (
        <>
            <Head title="Musu Grupa" />

            <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
                {/* BACKGROUND TECH GRID */}
                <div className="pointer-events-none fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-20 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-400 opacity-10 blur-[120px]"></div>
                    <div className="absolute right-0 bottom-40 -z-10 h-[500px] w-[500px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-16 text-center lg:mb-24">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur">
                            <Icons.Users className="h-4 w-4" />
                            {__('parmums.team_badge')}
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{__('parmums.team_title')}</h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{__('parmums.team_subtitle')}</p>
                    </div>

                    <div className="space-y-20">
                        {/* --- LEADER SECTION (Unchanged) --- */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-12">
                            <div className="flex flex-col items-center gap-10 md:flex-row">
                                <div className="group relative shrink-0">
                                    <div className="absolute inset-0 rotate-3 rounded-2xl bg-emerald-500 opacity-20 transition-transform group-hover:rotate-6"></div>
                                    <img
                                        src="\Uldis_2019-copy.jpg"
                                        alt="Uldis Bērziņš"
                                        className="relative h-auto w-64 rounded-2xl border-4 border-white object-cover shadow-md md:w-80"
                                    />
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="mb-4 inline-block rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                        {__('parmums.team_leader_badge')}
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold text-slate-900">{__('parmums.team_leader_name')}</h2>
                                    <p className="mb-6 font-medium text-emerald-700">{__('parmums.team_leader_title')}</p>
                                    <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">{__('parmums.team_leader_bio')}</p>

                                    <div className="flex justify-center md:justify-start">
                                        <a
                                            href="https://www.facebook.com/uldis.berzins.927"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                                        >
                                            <Icons.Facebook className="h-5 w-5" />
                                            {__('parmums.team_leader_contact')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- VTDT TEAM SECTION (With New Animation) --- */}
                        <div className="relative">
                            <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 backdrop-blur lg:p-10">
                                <div className="flex flex-col items-center gap-10 lg:flex-row">
                                    <div className="relative shrink-0">
                                        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 opacity-20 blur-lg"></div>
                                        <img
                                            src="\vtdt.png"
                                            alt="VTDT Logo"
                                            className="relative h-auto w-64 rounded-2xl bg-white object-contain p-4 shadow-sm"
                                        />
                                    </div>
                                    <div className="flex-1 text-center lg:text-left">
                                        <h2 className="mb-2 text-2xl font-bold text-slate-900">{__('parmums.team_vtdt_title')}</h2>
                                        <h3 className="mb-4 font-medium text-emerald-700">{__('parmums.team_vtdt_subtitle')}</h3>
                                        <p className="mb-8 leading-relaxed text-slate-600">{__('parmums.team_vtdt_bio')}</p>

                                        <button
                                            onClick={() => setShowVtdtStudents((prev) => !prev)}
                                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/30"
                                        >
                                            {showVtdtStudents ? __('parmums.team_vtdt_hide') : __('parmums.team_vtdt_show')}
                                            <Icons.ChevronDown
                                                className={`h-4 w-4 transition-transform duration-300 ${showVtdtStudents ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* DROPDOWN GRID - Using Grid Rows for "Cool" Slide Animation */}
                                <div
                                    className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out ${showVtdtStudents ? 'mt-12 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {vtdtStudents.map((student) => (
                                                <div
                                                    key={student.name}
                                                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                                                >
                                                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                                        <img
                                                            src={student.image}
                                                            alt={student.name}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="p-6">
                                                        <h4 className="text-lg font-bold text-slate-900">{student.name}</h4>
                                                        <p className="mt-1 mb-3 text-xs font-bold tracking-wider text-emerald-600 uppercase">
                                                            {student.title}
                                                        </p>
                                                        <p className="text-sm leading-relaxed text-slate-500">{student.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- RVT TEAM SECTION (NEW) --- */}
                        <div className="relative">
                            <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 backdrop-blur lg:p-10">
                                <div className="flex flex-col items-center gap-10 lg:flex-row">
                                    <div className="relative shrink-0">
                                        {/* RVT Themed Gradient (Red/Black inspired or just cool Blue/Indigo) */}
                                        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-red-400 to-slate-600 opacity-20 blur-lg"></div>
                                        <div className="relative flex h-auto w-64 items-center justify-center rounded-2xl bg-white p-4 shadow-sm">
                                            {/* IMAGE TAG: Using the image you uploaded  */}
                                            <img
                                                src="\lejupielāde.png" // Make sure to save your image as rvt-logo.png or update this path
                                                alt="Rīgas Valsts tehnikums"
                                                className="h-auto w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center lg:text-left">
                                        <h2 className="mb-2 text-2xl font-bold text-slate-900">{__('parmums.team_rvt_title')}</h2>
                                        <h3 className="mb-4 font-medium text-rose-700">{__('parmums.team_rvt_subtitle')}</h3>
                                        <p className="mb-8 leading-relaxed text-slate-600">{__('parmums.team_rvt_bio')}</p>

                                        <button
                                            onClick={() => setShowRvtStudents((prev) => !prev)}
                                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-rose-700 hover:shadow-rose-500/30"
                                        >
                                            {showRvtStudents ? __('parmums.team_rvt_hide') : __('parmums.team_rvt_show')}
                                            <Icons.ChevronDown
                                                className={`h-4 w-4 transition-transform duration-300 ${showRvtStudents ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* DROPDOWN GRID - RVT (Same Cool Animation) */}
                                <div
                                    className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out ${showRvtStudents ? 'mt-12 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {rvtStudents.map((student, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl"
                                                >
                                                    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100">
                                                        {/* If no real image yet, use a placeholder icon, else use student.image */}
                                                        {student.image.includes('placeholder') ? (
                                                            <Icons.School className="h-12 w-12 text-slate-300" />
                                                        ) : (
                                                            <img
                                                                src={student.image}
                                                                alt={student.name}
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="p-6">
                                                        <h4 className="text-lg font-bold text-slate-900">{student.name}</h4>
                                                        <p className="mt-1 mb-3 text-xs font-bold tracking-wider text-rose-600 uppercase">
                                                            {student.title}
                                                        </p>
                                                        <p className="text-sm leading-relaxed text-slate-500">{student.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- RTK TEAM SECTION (NEW) --- */}
                        <div className="relative">
                            <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 backdrop-blur lg:p-10">
                                <div className="flex flex-col items-center gap-10 lg:flex-row">
                                    <div className="relative shrink-0">
                                        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-indigo-400 to-sky-400 opacity-20 blur-lg"></div>
                                        <div className="relative flex h-auto w-64 items-center justify-center rounded-2xl bg-white p-4 shadow-sm">
                                            {rtkLogoOk ? (
                                                <img
                                                    src={rtkLogoSrc}
                                                    alt="RTK Logo"
                                                    onError={() => setRtkLogoOk(false)}
                                                    className="h-auto w-full object-contain"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 py-6 text-slate-500">
                                                    <Icons.School className="h-10 w-10" />
                                                    <span className="text-xs font-semibold tracking-wider">RTK</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center lg:text-left">
                                        <h2 className="mb-2 text-2xl font-bold text-slate-900">{__('parmums.team_rtk_title')}</h2>
                                        <h3 className="mb-4 font-medium text-sky-700">{__('parmums.team_rtk_subtitle')}</h3>
                                        <p className="mb-8 leading-relaxed text-slate-600">{__('parmums.team_rtk_bio')}</p>

                                        <button
                                            onClick={() => setShowRtkStudents((prev) => !prev)}
                                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-sky-700 hover:shadow-sky-500/30"
                                        >
                                            {showRtkStudents ? __('parmums.team_rtk_hide') : __('parmums.team_rtk_show')}
                                            <Icons.ChevronDown
                                                className={`h-4 w-4 transition-transform duration-300 ${showRtkStudents ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* DROPDOWN GRID - RTK */}
                                <div
                                    className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out ${showRtkStudents ? 'mt-12 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {rtkStudents.map((student, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"
                                                >
                                                    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100">
                                                        {student.image.includes('placeholder') ? (
                                                            <Icons.School className="h-12 w-12 text-slate-300" />
                                                        ) : (
                                                            <img
                                                                src={student.image}
                                                                alt={student.name}
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="p-6">
                                                        <h4 className="text-lg font-bold text-slate-900">{student.name}</h4>
                                                        <p className="mt-1 mb-3 text-xs font-bold tracking-wider text-sky-600 uppercase">
                                                            {student.title}
                                                        </p>
                                                        <p className="text-sm leading-relaxed text-slate-500">{student.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- OTHER GROUPS GRID (Unchanged) --- */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {/* Erasmus Plus */}
                            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src="\cst-rumanijas-studenti.jpeg"
                                        alt="Erasmus Plus"
                                        className="mb-6 h-48 w-full rounded-2xl object-cover shadow-sm"
                                    />
                                    <h3 className="mb-2 text-xl font-bold text-slate-900">{__('parmums.team_erasmus_title')}</h3>
                                    <p className="text-sm text-slate-600">{__('parmums.team_erasmus_bio')}</p>
                                </div>
                            </div>

                            {/* Ralfs */}
                            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src="\IMG_3160-scaled.jpg"
                                        alt="Ralfs Žagars"
                                        className="mb-6 h-48 w-full rounded-2xl object-cover shadow-sm"
                                    />
                                    <h3 className="mb-1 text-xl font-bold text-slate-900">{__('parmums.team_ralfs_name')}</h3>
                                    <p className="mb-3 text-xs font-bold text-emerald-600 uppercase">{__('parmums.team_ralfs_title')}</p>
                                    <p className="text-sm text-slate-600">{__('parmums.team_ralfs_bio')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
