import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react'; // Added useEffect
import { useLang } from '@/hooks/useLang';

const Icons = {
    User: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
    ),
    Activity: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
    ),
    Code: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
    ),
    Stethoscope: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
            <path d="M3 20C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22V20ZM21 22C21.5523 22 22 21.5523 22 21C22 20.4477 21.5523 20 21 20V22ZM7 17C6.44772 17 6 17.4477 6 18C6 18.5523 6.44772 19 7 19V17ZM14 19C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17V19ZM9 14C8.44772 14 8 14.4477 8 15C8 15.5523 8.44772 16 9 16V14ZM12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14V16ZM8 5V4C7.44772 4 7 4.44772 7 5H8ZM13 5H14C14 4.44772 13.5523 4 13 4V5ZM13 12V13C13.5523 13 14 12.5523 14 12H13ZM8 12H7C7 12.5523 7.44772 13 8 13V12ZM9 5V6C9.45887 6 9.85885 5.6877 9.97014 5.24254L9 5ZM11.5 3L12.4701 2.75746C12.3589 2.3123 11.9589 2 11.5 2V3ZM9.5 3V2C9.04113 2 8.64115 2.3123 8.52986 2.75746L9.5 3ZM12 5L11.0299 5.24254C11.1411 5.6877 11.5411 6 12 6V5ZM13 7C12.4477 7 12 7.44772 12 8C12 8.55228 12.4477 9 13 9V7ZM16.0915 20.1435C15.6184 20.4285 15.466 21.0431 15.7511 21.5161C16.0361 21.9892 16.6506 22.1416 17.1237 21.8565L16.0915 20.1435ZM3 22H21V20H3V22ZM7 19H14V17H7V19ZM9 16H12V14H9V16ZM12 5V12H14V5H12ZM13 11H8V13H13V11ZM9 12V5H7V12H9ZM8 6H9V4H8V6ZM9.97014 5.24254L10.4701 3.24254L8.52986 2.75746L8.02986 4.75746L9.97014 5.24254ZM9.5 4H11.5V2H9.5V4ZM10.5299 3.24254L11.0299 5.24254L12.9701 4.75746L12.4701 2.75746L10.5299 3.24254ZM12 6H13V4H12V6ZM13 9C16.3137 9 19 11.6863 19 15H21C21 10.5817 17.4183 7 13 7V9ZM19 15C19 17.1814 17.8365 19.092 16.0915 20.1435L17.1237 21.8565C19.4443 20.4582 21 17.9113 21 15H19Z"/>        </svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
    ),
};

export default function PostDockanketa() {
    const page = usePage<any>();
    const { lang } = useLang();

    const postLang = (lang as any)?.post_dockanketa ?? {};
    const intro = postLang?.intro ?? {};
    const sections = postLang?.sections ?? {};
    const buttons = postLang?.buttons ?? {};
    const actions = postLang?.actions ?? {};
    const meta = postLang?.meta ?? {};

    const serverRole = page.props?.role ?? null;
    const currentHref = (typeof window !== 'undefined' && window.location.href) || page.url || '';
    const searchParams = new URLSearchParams((currentHref.split('?')[1]) ?? '');
    const urlRole = searchParams.get('role');
    const role = serverRole ?? urlRole;
    
    // Logic: determine visibility
    const isSpecialistOnly = role === 'specialists';
    const isPatientOnly = role === 'patients';
    // If no role is selected, we show both. If a role is selected, we filter.
    const showPatientSection = !isSpecialistOnly;
    const showSpecialistSection = !isPatientOnly;

    // Fix: If the role came from the Server (Session) but is missing in URL, put it back.
    // This ensures if the user copies the URL or refreshes again, the role persists cleanly.
    useEffect(() => {
        if (serverRole && !urlRole) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('role', serverRole);
            window.history.replaceState({}, '', newUrl);
        }
    }, [serverRole, urlRole]);

    const clientButtons = [
        { key: 'psoriasis', href: '/anketa-psoriāze', icon: Icons.User, colorClass: 'group-hover:border-emerald-400 group-hover:shadow-emerald-100', iconBg: 'bg-emerald-50 text-emerald-600' },
        { key: 'crohns', href: '/anketa-hroniskas', icon: Icons.Activity, colorClass: 'group-hover:border-emerald-400 group-hover:shadow-emerald-100', iconBg: 'bg-emerald-50 text-emerald-600' },
        { key: 'codes', href: '/anketa-kods', icon: Icons.Code, colorClass: 'group-hover:border-violet-400 group-hover:shadow-violet-100', iconBg: 'bg-violet-50 text-violet-600' },
    ];

    const specialistButtons = [
        { key: 'main', href: '/anketa-specialiste', icon: Icons.Stethoscope, colorClass: 'group-hover:border-sky-400 group-hover:shadow-sky-100', iconBg: 'bg-sky-50 text-sky-600' },
        { key: 'codes', href: '/anketa-kods', icon: Icons.Code, colorClass: 'group-hover:border-violet-400 group-hover:shadow-violet-100', iconBg: 'bg-violet-50 text-violet-600' },
    ];

    return (
        <>
            <Head title={meta?.page_title ?? 'PostDoc anketa'} />

            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
                <div className="pointer-events-none fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            {intro?.title_line_1 ?? 'Izvēlieties atbilstošo'} <br />
                            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                                {intro?.title_highlight ?? 'Anketu'}
                            </span>
                        </h1>
                        <p className="mx-auto max-w-4xl text-lg text-slate-600">{intro?.description ?? ''}</p>
                    </div>

                    <div className="grid gap-12">
                        {showPatientSection && (
                            <div>
                                <div className="mb-6 flex items-center gap-3">
                                    <h2 className="text-xl font-bold text-slate-900">{sections?.patients ?? 'Pacientiem'}</h2>
                                    <div className="h-px flex-1 bg-slate-200"></div>
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {clientButtons.map((btn) => (
                                        <Link key={btn.key} href={btn.href} className={`group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${btn.colorClass}`}>
                                            <div className="mb-4 flex items-start justify-between">
                                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${btn.iconBg}`}>
                                                    <btn.icon className="h-6 w-6" />
                                                </div>
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                                                    <Icons.ArrowRight className="h-4 w-4" />
                                                </div>
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold text-slate-900">{buttons?.patients?.[btn.key]?.label ?? (btn.key === 'psoriasis' ? 'Psoriāze' : btn.key === 'crohns' ? 'Krona slimības' : 'Koda formas')}</h3>
                                            {buttons?.patients?.[btn.key]?.subtitle && <p className="text-sm leading-relaxed text-slate-500">{buttons.patients[btn.key].subtitle}</p>}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {showSpecialistSection && (
                            <div>
                                <div className="mb-6 flex items-center gap-3">
                                    <h2 className="text-xl font-bold text-slate-900">{sections?.specialists ?? 'Speciālistiem'}</h2>
                                    <div className="h-px flex-1 bg-slate-200"></div>
                                </div>
                                <div className="grid gap-6">
                                    {specialistButtons.map((btn) => (
                                        <Link key={btn.key} href={btn.href} className={`group relative flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center ${btn.colorClass}`}>
                                            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${btn.iconBg}`}>
                                                <btn.icon className="h-7 w-7" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={`text-xl font-bold text-slate-900 ${buttons?.specialists?.[btn.key]?.subtitle ? 'mb-1' : 'mb-0'}`}>
                                                    {buttons?.specialists?.[btn.key]?.label ?? (btn.key === 'main' ? 'Speciālistiem' : 'Kodu forma')}
                                                </h3>
                                                {buttons?.specialists?.[btn.key]?.subtitle && <p className="text-sm text-slate-500">{buttons.specialists[btn.key].subtitle}</p>}
                                            </div>
                                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 group-hover:text-sky-700 sm:mt-0">
                                                {actions?.open_panel ?? 'Atvērt paneli'} <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}