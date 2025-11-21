import { router, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';

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
};

type NavSection = {
    label: string;
    items: NavItem[];
};

const badgeToneClasses: Record<BadgeTone, string> = {
    emerald: 'bg-emerald-400/15 text-emerald-200 ring-emerald-400/40',
    sky: 'bg-sky-400/15 text-sky-200 ring-sky-400/40',
    violet: 'bg-violet-400/15 text-violet-200 ring-violet-400/40',
    amber: 'bg-amber-400/15 text-amber-100 ring-amber-400/40',
};

const navSections: NavSection[] = [
    {
        label: 'Command',
        items: [
            { id: 'dashboard', label: 'Control room', description: 'Live signals & status', href: '/admin', badge: 'Live', badgeTone: 'emerald' },
            { id: 'missions', label: 'Missions', description: 'Campaign orchestration', href: '/admin/missions', badge: '6', badgeTone: 'violet' },
            { id: 'insights', label: 'Insights', description: 'Intelligence briefings', href: '/admin/insights' },
        ],
    },
    {
        label: 'Anketas',
        items: [
            // 🔹 NEW – link to forms list / CRUD
            {
                id: 'all-forms',
                label: 'Visas anketas',
                description: 'Formu saraksts un CRUD',
                href: '/admin/anketa',
                badge: 'CRUD',
                badgeTone: 'emerald',
            },

            { id: 'content', label: 'Content studio', description: 'Posts, blogs, media', href: '/admin/content-studio', badge: '12 drafts', badgeTone: 'sky' },
            { id: 'requests', label: 'Requests', description: 'Approvals & forms', href: '/admin/requests', badge: '3 pending', badgeTone: 'amber' },
            { id: 'form-codes', label: 'Form codes', description: 'Survey code generator', href: '/admin/form-codes' },
            { id: 'team', label: 'Team heatmap', description: 'Availability & focus', href: '/admin/team-heatmap' },
            {
                id: 'surveys-public',
                label: 'Publiskās',
                description: 'Publiskās anketas',
                href: '/admin/Anketa/publiskas', // you can adjust this later to whatever route you add
                badge: 'Jaunas',
                badgeTone: 'sky',
            },
            {
                id: 'surveys-private',
                label: 'Privātās',
                description: 'Privātās anketas',
                href: '/admin/anketas/privatas', // same here – placeholder until you make those routes
                badge: 'Drošas',
                badgeTone: 'amber',
            },
        ],
    },
    {
        label: 'Systems',
        items: [
            { id: 'integrations', label: 'Integrations', description: 'APIs & automations', href: '/admin/integrations' },
            {
                id: 'security',
                label: 'Security',
                description: 'Roles, audit trail',
                href: '/admin/security',
                badge: 'Shielded',
                badgeTone: 'emerald',
            },
            { id: 'workspace', label: 'Workspace', description: 'Brand, preferences', href: '/admin/workspace' },
        ],
    },
];


export default function AdminLayout({ children, title = 'Admin Panel' }: PropsWithChildren<AdminLayoutProps>) {
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const initialDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // <-- Single usePage call INSIDE the component
    const { url, props } = usePage<any>();
    const currentLocale = props?.locale || 'lv';

    // <-- switchLanguage also INSIDE the component
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

    useEffect(() => {
        initialDelayRef.current = setTimeout(() => {
            setLoaderVisible(false);
            initialDelayRef.current = null;
        }, 800);

        return () => {
            if (initialDelayRef.current) {
                clearTimeout(initialDelayRef.current);
            }

            if (hideDelayRef.current) {
                clearTimeout(hideDelayRef.current);
            }
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

        const unsubscribeStart = router.on('start', () => {
            if (initialDelayRef.current) {
                clearTimeout(initialDelayRef.current);
                initialDelayRef.current = null;
            }

            showLoader();
        });

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

    useEffect(() => {
        setMobileNavOpen(false);
    }, [url]);

    const cardTitle = useMemo(() => {
        if (title === 'Admin Panel') {
            return 'Admin console';
        }

        return title;
    }, [title]);

    const renderNavSections = () => (
        <div className="space-y-8">
            {navSections.map((section) => (
                <div key={section.label} className="space-y-4">
                    <p className="text-xs tracking-[0.25em] text-white/50 uppercase">{section.label}</p>
                    <div className="space-y-3">
                        {section.items.map((item) => {
                            const isActive = url === item.href || (item.href !== '/admin' && url.startsWith(item.href));

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        if (isActive) {
                                            setMobileNavOpen(false);
                                            return;
                                        }

                                        router.visit(item.href);
                                    }}
                                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                                        isActive
                                            ? 'border-white/40 bg-white/10 text-white shadow-lg shadow-emerald-500/10'
                                            : 'border-white/5 bg-white/0 text-white/70 hover:border-white/20 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold">{item.label}</p>
                                            <p className="text-xs text-white/60">{item.description}</p>
                                        </div>
                                        {item.badge && item.badgeTone && (
                                            <span
                                                className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${badgeToneClasses[item.badgeTone]}`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="relative flex min-h-screen overflow-x-hidden overscroll-y-none bg-slate-950 text-white">
            <BioChipLoader visible={loaderVisible} />
            <div
                aria-busy={loaderVisible}
                className={`flex flex-1 transition-opacity duration-500 ${loaderVisible ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            >
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-10 pb-12 sm:px-6 lg:flex-row lg:px-12">
                    <div className="lg:hidden">
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 px-6 py-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs tracking-[0.3em] text-white/60 uppercase">Command center</p>
                                    <p className="text-xl font-semibold text-white">{cardTitle}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setMobileNavOpen((prev) => !prev)}
                                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                                >
                                    {mobileNavOpen ? 'Hide menu' : 'Open menu'}
                                </button>
                            </div>
                        </div>
                        {mobileNavOpen && (
                            <div className="mt-4 space-y-4 rounded-3xl border border-white/10 bg-slate-900/50 p-5">
                                {renderNavSections()}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMobileNavOpen(false);
                                        router.visit('/admin/logout');
                                    }}
                                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-rose-300/40 hover:bg-rose-500/10"
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>

                    <aside className="hidden w-72 flex-shrink-0 flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:flex">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/40 to-sky-500/40 text-lg font-semibold text-white">
                                CST
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Control Surface</p>
                                <p className="text-xs text-white/60">Realtime admin board</p>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-1">{renderNavSections()}</div>
                        <div className="mt-8 space-y-4">
                            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-4 text-sm text-white/80">
                                <p className="text-xs tracking-[0.4em] text-white/50 uppercase">Focus</p>
                                <p className="mt-2 text-sm font-semibold text-white">Next sync 15:30</p>
                                <p className="text-xs text-white/60">Labs leadership update</p>
                            </div>
                            {/* Language switcher */}
                            <div className="flex gap-3">
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
                            </div>
                            <button
                                type="button"
                                onClick={() => router.visit('/admin/logout')}
                                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-rose-300/40 hover:bg-rose-500/10"
                            >
                                Log out
                            </button>
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="mx-auto w-full max-w-6xl sm:max-w-7xl">{children}</div>
                    </main>
                </div>
            </div>
        </div>
    );
}
