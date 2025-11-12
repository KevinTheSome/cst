import { router, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

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
        label: 'Operations',
        items: [
            { id: 'content', label: 'Content studio', description: 'Posts, blogs, media', href: '/admin/content-studio', badge: '12 drafts', badgeTone: 'sky' },
            { id: 'requests', label: 'Requests', description: 'Approvals & forms', href: '/admin/requests', badge: '3 pending', badgeTone: 'amber' },
            { id: 'team', label: 'Team heatmap', description: 'Availability & focus', href: '/admin/team-heatmap' },
        ],
    },
    {
        label: 'Systems',
        items: [
            { id: 'integrations', label: 'Integrations', description: 'APIs & automations', href: '/admin/integrations' },
            { id: 'security', label: 'Security', description: 'Roles, audit trail', href: '/admin/security', badge: 'Shielded', badgeTone: 'emerald' },
            { id: 'workspace', label: 'Workspace', description: 'Brand, preferences', href: '/admin/workspace' },
        ],
    },
];

export default function AdminLayout({ children, title = 'Admin Panel' }: PropsWithChildren<AdminLayoutProps>) {
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const initialDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { url } = usePage();

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
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">{section.label}</p>
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
                                                className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeToneClasses[item.badgeTone]}`}
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
                <main className="flex-1">
                    <div className="mx-auto w-full max-w-6xl sm:max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
