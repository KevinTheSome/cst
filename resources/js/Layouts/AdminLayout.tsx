import { Link, router, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Hash,
    Settings2,
    Key,
    GraduationCap,
    PlusCircle,
    Menu,
    X,
    LogOut,
    Activity,
    Clock,
    ChevronRight,
} from 'lucide-react';

import BioChipLoader from '@/Components/BioChipLoader';
import { useLang } from '@/hooks/useLang';

interface AdminLayoutProps {
    title?: string;
}

type BadgeTone = 'emerald' | 'sky' | 'violet' | 'amber';

type NavItem = {
    id: string;
    label: string;
    description: string;
    href: string;
    badge?: string;
    badgeTone?: BadgeTone;
    icon: any;
};

type NavSection = {
    label: string;
    items: NavItem[];
};

const badgeToneClasses: Record<BadgeTone, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export default function AdminLayout({ children, title }: PropsWithChildren<AdminLayoutProps>) {
    const { __ } = useLang();

    const [loaderVisible, setLoaderVisible] = useState(true);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const initialDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Live clock
    const [focusTime, setFocusTime] = useState(() =>
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    );

    useEffect(() => {
        const id = setInterval(() => {
            setFocusTime(
                new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                })
            );
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const { url, props } = usePage<any>();
    const currentLocale = props?.locale || 'lv';

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;
        try {
            await axios.post('/locale', { locale });
            router.reload({ only: ['lang', 'locale'] });
        } catch (error) {
            console.error('Language switch failed:', error);
        }
    };

    // Build nav using translations (updates automatically when locale changes)
    const navSections: NavSection[] = useMemo(
        () => [
            {
                label: __('admin.sections.command'),
                items: [
                    {
                        id: 'dashboard',
                        label: __('admin.nav.dashboard.label'),
                        description: __('admin.nav.dashboard.description'),
                        href: '/admin',
                        badge: __('admin.badges.live'),
                        badgeTone: 'emerald',
                        icon: LayoutDashboard,
                    },
                ],
            },
            {
                label: __('admin.sections.content'),
                items: [
                    {
                        id: 'all-forms',
                        label: __('admin.nav.all_forms.label'),
                        description: __('admin.nav.all_forms.description'),
                        href: '/admin/anketa',
                        badgeTone: 'emerald',
                        icon: FileText,
                    },
                    {
                        id: 'anketa-results',
                        label: __('admin.nav.anketa_results.label'),
                        description: __('admin.nav.anketa_results.description'),
                        href: '/admin/anketa/results',
                        badge: __('admin.badges.new'),
                        badgeTone: 'amber',
                        icon: BarChart3,
                    },
                    {
                        id: 'form-codes',
                        label: __('admin.nav.form_codes.label'),
                        description: __('admin.nav.form_codes.description'),
                        href: '/admin/form-codes',
                        icon: Hash,
                    },
                    {
                        id: 'form-selector',
                        label: __('admin.nav.form_selector.label'),
                        description: __('admin.nav.form_selector.description'),
                        href: '/admin/selector',
                        icon: Settings2,
                    },
                ],
            },
            {
                label: __('admin.sections.education'),
                items: [
                    {
                        id: 'lecture-codes',
                        label: __('admin.nav.lecture_codes.label'),
                        description: __('admin.nav.lecture_codes.description'),
                        href: '/admin/lecture/codes',
                        icon: Key,
                    },
                    {
                        id: 'training-list',
                        label: __('admin.nav.trainings.label'),
                        description: __('admin.nav.trainings.description'),
                        href: '/admin/trainings',
                        icon: GraduationCap,
                    },
                    {
                        id: 'training-create',
                        label: __('admin.nav.training_create.label'),
                        description: __('admin.nav.training_create.description'),
                        href: '/admin/trainings/create',
                        badge: __('admin.badges.add'),
                        badgeTone: 'sky',
                        icon: PlusCircle,
                    },
                ],
            },
            {
                label: __('admin.sections.system'),
                items: [
                    {
                        id: 'security',
                        label: __('admin.nav.security.label'),
                        description: __('admin.nav.security.description'),
                        href: '/admin/security',
                        icon: Settings2,
                    },
                ],
            },
            {
                label: __('admin.sections.files'),
                items: [
                    {
                        id: 'files',
                        label: __('admin.nav.files.label'),
                        description: __('admin.nav.files.description'),
                        href: '/admin/files/show',
                        icon: Settings2,
                    },
                ],
            },
        ],
        // depends on translation function output / locale
        [__]
    );

    // Loader Logic
    useEffect(() => {
        initialDelayRef.current = setTimeout(() => {
            setLoaderVisible(false);
            initialDelayRef.current = null;
        }, 800);

        return () => {
            if (initialDelayRef.current) clearTimeout(initialDelayRef.current);
            if (hideDelayRef.current) clearTimeout(hideDelayRef.current);
        };
    }, []);

    useEffect(() => {
        const clearHideDelay = () => {
            if (hideDelayRef.current) {
                clearTimeout(hideDelayRef.current);
                hideDelayRef.current = null;
            }
        };

        const showLoader = () => {
            clearHideDelay();
            setLoaderVisible(true);
        };

        const hideLoader = () => {
            clearHideDelay();
            hideDelayRef.current = setTimeout(() => {
                setLoaderVisible(false);
                hideDelayRef.current = null;
            }, 350);
        };

        const unsubscribeStart = router.on('start', showLoader);
        const unsubscribeFinish = router.on('finish', hideLoader);
        const unsubscribeCancel = router.on('cancel', hideLoader);
        const unsubscribeError = router.on('error', hideLoader);

        return () => {
            unsubscribeStart();
            unsubscribeFinish();
            unsubscribeCancel();
            unsubscribeError();
        };
    }, []);

    useEffect(() => setMobileNavOpen(false), [url]);

    const renderNav = () => (
        <div className="space-y-8">
            {navSections.map((section) => (
                <div key={section.label}>
                    <p className="mb-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {section.label}
                    </p>
                    <div className="space-y-1">
                        {section.items.map((item) => {
                            const isActive = url === item.href || (item.href !== '/admin' && url.startsWith(item.href));
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`group relative flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-slate-800 to-slate-800/50 text-white shadow-md shadow-black/20'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            className={`h-5 w-5 transition-colors ${
                                                isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                                            }`}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold leading-none">{item.label}</span>
                                            {isActive && (
                                                <span className="mt-1 text-[10px] font-medium text-emerald-400/80">
                                                    {item.description}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {item.badge && (
                                        <span
                                            className={`rounded-lg border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                                                badgeToneClasses[item.badgeTone || 'sky']
                                            }`}
                                        >
                                            {item.badge}
                                        </span>
                                    )}

                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );

    const pageTitle = title ?? __('admin.title');

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
            <BioChipLoader visible={loaderVisible} />

            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-3xl" />
            </div>

            <div className={`relative flex flex-col transition-opacity duration-500 ${loaderVisible ? 'opacity-0' : 'opacity-100'}`}>
                {/* --- Mobile Header --- */}
                <div className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 px-4 py-4 backdrop-blur-md lg:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
                                A
                            </div>
                            <span className="font-semibold tracking-tight text-white">{pageTitle}</span>
                        </div>
                        <button
                            onClick={() => setMobileNavOpen(!mobileNavOpen)}
                            className="p-2 text-slate-400 hover:text-white"
                            aria-label={__('admin.a11y.toggle_menu')}
                        >
                            {mobileNavOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* --- Main Layout --- */}
                <div className="mx-auto flex w-full max-w-[1600px] items-start gap-8 p-4 sm:p-6 lg:p-8">
                    {/* --- Sidebar (Desktop) --- */}
                    <aside
                        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-950/95 p-4 transition-transform duration-300 lg:static lg:block lg:w-72 lg:translate-x-0 lg:bg-transparent lg:p-0 ${
                            mobileNavOpen ? 'translate-x-0 border-r border-white/10' : '-translate-x-full'
                        }`}
                    >
                        <div className="flex h-full flex-col gap-6 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
                            {/* Brand */}
                            <div className="flex items-center gap-3 px-4 lg:px-0">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-emerald-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div>
                                    <h1 className="leading-none text-lg font-bold text-white">{__('admin.brand')}</h1>
                                    <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                                        {__('admin.version')}
                                    </span>
                                </div>
                            </div>

                            {/* Nav */}
                            <nav className="custom-scrollbar flex-1 overflow-y-auto pr-2">{renderNav()}</nav>

                            {/* Footer Actions */}
                            <div className="space-y-4">
                                {/* Pulse Button */}
                                <button
                                    onClick={() => (window.location.href = '/pulse')}
                                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-left shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40"
                                >
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                    <div className="relative flex items-center justify-between">
                                        <div>
                                            <p className="flex items-center gap-2 text-sm font-bold text-white">
                                                <Activity className="h-4 w-4 animate-pulse text-indigo-200" />
                                                {__('admin.pulse.title')}
                                            </p>
                                            <p className="mt-0.5 text-[10px] text-indigo-200">{__('admin.pulse.subtitle')}</p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-indigo-200 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </button>

                                {/* Status Widget */}
                                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-slate-500" />
                                            <span className="text-xs font-mono text-slate-400">{focusTime}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="relative flex h-2 w-2">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                            </span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                                                {__('admin.status.online')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Language Switch */}
                                    <div className="mb-3 grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => switchLanguage('lv')}
                                            className={`rounded-lg py-1.5 text-xs font-semibold transition-colors ${
                                                currentLocale === 'lv' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
                                            }`}
                                        >
                                            {__('admin.lang.lv')}
                                        </button>
                                        <button
                                            onClick={() => switchLanguage('en')}
                                            className={`rounded-lg py-1.5 text-xs font-semibold transition-colors ${
                                                currentLocale === 'en' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
                                            }`}
                                        >
                                            {__('admin.lang.en')}
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => router.post('/admin/logout')}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-2 text-xs font-semibold text-slate-400 transition-colors hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-400"
                                    >
                                        <LogOut className="h-3.5 w-3.5" />
                                        {__('admin.actions.sign_out')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* --- Backdrop for mobile --- */}
                    {mobileNavOpen && (
                        <div
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                            onClick={() => setMobileNavOpen(false)}
                        />
                    )}

                    {/* --- Content Area --- */}
                    <main className="w-full min-w-0 flex-1">{children}</main>
                </div>
            </div>
        </div>
    );
}
