import { Link, router, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { 
    LayoutDashboard, 
    Radar, 
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
    Globe,
    Clock,
    ChevronRight,
    Search
} from 'lucide-react';

import BioChipLoader from '@/Components/BioChipLoader';

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

const navSections: NavSection[] = [
    {
        label: 'Command',
        items: [
            {
                id: 'dashboard',
                label: 'Control room',
                description: 'Live signals',
                href: '/admin',
                badge: 'Live',
                badgeTone: 'emerald',
                icon: LayoutDashboard,
            },
        ],
    },
    {
        label: 'Content',
        items: [
            {
                id: 'all-forms',
                label: 'Visas anketas',
                description: 'Forms management',
                href: '/admin/anketa',
                badgeTone: 'emerald',
                icon: FileText,
            },
            {
                id: 'anketa-results',
                label: 'Anketu atbildes',
                description: 'Submissions',
                href: '/admin/anketa/results',
                badge: 'New',
                badgeTone: 'amber',
                icon: BarChart3,
            },
            {
                id: 'form-codes',
                label: 'Form codes',
                description: 'Access generation',
                href: '/admin/form-codes',
                icon: Hash,
            },
            {
                id: 'form-selector',
                label: 'Form Selector',
                description: 'Type config',
                href: '/admin/selector',
                icon: Settings2,
            },
        ],
    },
    {
        label: 'Education',
        items: [
            {
                id: 'lecture-codes',
                label: 'Lecture codes',
                description: 'Access control',
                href: '/admin/lecture/codes',
                icon: Key,
            },
            {
                id: 'training-list',
                label: 'Trainings',
                description: 'Courses list',
                href: '/admin/trainings',
                icon: GraduationCap,
            },
            {
                id: 'training-create',
                label: 'New Training',
                description: 'Add course',
                href: '/admin/trainings/create',
                badge: 'Add',
                badgeTone: 'sky',
                icon: PlusCircle,
            },
        ],
    },
    {
        label: 'System',
        items: [
            {
                id: 'security',
                label: 'Admin users',
                description: 'Roles & Audit',
                href: '/admin/security',
                icon: Settings2,
            },
        ],
    },
    {
    label: 'Files',
    items: [
        {
            id: 'files',
            label: 'Manage Files',
            description: 'Upload and manage stored files',
            href: '/admin/files/upload',
            icon: Settings2,
        },
    ],
}

];

export default function AdminLayout({ children, title = 'Admin Panel' }: PropsWithChildren<AdminLayoutProps>) {
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
                new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
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
        const clearHideDelay = () => { if (hideDelayRef.current) { clearTimeout(hideDelayRef.current); hideDelayRef.current = null; } };
        const showLoader = () => { clearHideDelay(); setLoaderVisible(true); };
        const hideLoader = () => { clearHideDelay(); hideDelayRef.current = setTimeout(() => { setLoaderVisible(false); hideDelayRef.current = null; }, 350); };

        const unsubscribeStart = router.on('start', showLoader);
        const unsubscribeFinish = router.on('finish', hideLoader);
        const unsubscribeCancel = router.on('cancel', hideLoader);
        const unsubscribeError = router.on('error', hideLoader);

        return () => {
            unsubscribeStart(); unsubscribeFinish(); unsubscribeCancel(); unsubscribeError();
        };
    }, []);

    useEffect(() => setMobileNavOpen(false), [url]);

    const renderNav = () => (
        <div className="space-y-8">
            {navSections.map((section) => (
                <div key={section.label}>
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">{section.label}</p>
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
                                        <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold leading-none">{item.label}</span>
                                            {isActive && <span className="mt-1 text-[10px] font-medium text-emerald-400/80">{item.description}</span>}
                                        </div>
                                    </div>
                                    {item.badge && (
                                        <span className={`rounded-lg border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeToneClasses[item.badgeTone || 'sky']}`}>
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

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
            <BioChipLoader visible={loaderVisible} />
            
            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <div className={`relative flex flex-col transition-opacity duration-500 ${loaderVisible ? 'opacity-0' : 'opacity-100'}`}>
                
                {/* --- Mobile Header --- */}
                <div className="lg:hidden sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 px-4 py-4 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 shadow-lg text-white font-bold text-lg">
                                A
                            </div>
                            <span className="font-semibold text-white tracking-tight">{title}</span>
                        </div>
                        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-2 text-slate-400 hover:text-white">
                            {mobileNavOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* --- Main Layout --- */}
                <div className="mx-auto flex w-full max-w-[1600px] items-start gap-8 p-4 sm:p-6 lg:p-8">
                    
                    {/* --- Sidebar (Desktop) --- */}
                    <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-950/95 p-4 transition-transform duration-300 lg:static lg:block lg:w-72 lg:translate-x-0 lg:bg-transparent lg:p-0 ${mobileNavOpen ? 'translate-x-0 border-r border-white/10' : '-translate-x-full'}`}>
                        <div className="flex h-full flex-col gap-6 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
                            
                            {/* Brand */}
                            <div className="flex items-center gap-3 px-4 lg:px-0">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 shadow-lg shadow-emerald-500/20 text-white font-bold text-lg">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-white leading-none">Admin OS</h1>
                                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Version 2.0</span>
                                </div>
                            </div>

                            {/* Nav */}
                            <nav className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                {renderNav()}
                            </nav>

                            {/* Footer Actions */}
                            <div className="space-y-4">
                                {/* THE PULSE BUTTON */}
                                <button
                                    onClick={() => window.location.href = '/pulse'}
                                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-left shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40"
                                >
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                    <div className="relative flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-white flex items-center gap-2">
                                                <Activity className="h-4 w-4 animate-pulse text-indigo-200" />
                                                Pulse Dashboard
                                            </p>
                                            <p className="text-[10px] text-indigo-200 mt-0.5">Realtime analytics view</p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-indigo-200 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </button>

                                {/* System Status Widget */}
                                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-slate-500" />
                                            <span className="text-xs font-mono text-slate-400">{focusTime}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Online</span>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <button 
                                            onClick={() => switchLanguage('lv')}
                                            className={`rounded-lg py-1.5 text-xs font-semibold transition-colors ${currentLocale === 'lv' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}
                                        >
                                            LAT
                                        </button>
                                        <button 
                                            onClick={() => switchLanguage('en')}
                                            className={`rounded-lg py-1.5 text-xs font-semibold transition-colors ${currentLocale === 'en' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}
                                        >
                                            ENG
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => router.post('/admin/logout')}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-2 text-xs font-semibold text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20"
                                    >
                                        <LogOut className="h-3.5 w-3.5" />
                                        Sign Out
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
                    <main className="flex-1 w-full min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}