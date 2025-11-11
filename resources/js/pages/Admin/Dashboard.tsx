import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

type BadgeTone = 'emerald' | 'sky' | 'violet' | 'amber';

type StatHighlight = {
    id: string;
    label: string;
    value: string;
    trend: string;
    trendDescription: string;
    accent: BadgeTone;
};

const badgeToneClasses: Record<BadgeTone, string> = {
    emerald: 'bg-emerald-400/15 text-emerald-200 ring-emerald-400/40',
    sky: 'bg-sky-400/15 text-sky-200 ring-sky-400/40',
    violet: 'bg-violet-400/15 text-violet-200 ring-violet-400/40',
    amber: 'bg-amber-400/15 text-amber-100 ring-amber-400/40',
};

export const statAccentClasses: Record<BadgeTone, string> = {
    emerald: 'from-emerald-400/20 to-emerald-500/0 ring-emerald-400/30',
    sky: 'from-sky-400/20 to-sky-500/0 ring-sky-400/30',
    violet: 'from-violet-400/20 to-fuchsia-500/0 ring-violet-400/30',
    amber: 'from-amber-400/25 to-orange-500/0 ring-amber-400/30',
};

const statHighlights: StatHighlight[] = [
    {
        id: 'users',
        label: 'Active members',
        value: '12,480',
        trend: '+18%',
        trendDescription: 'vs last 7 days',
        accent: 'emerald',
    },
    {
        id: 'requests',
        label: 'New requests',
        value: '43',
        trend: '-6%',
        trendDescription: 'response time',
        accent: 'sky',
    },
    {
        id: 'delivery',
        label: 'On-time delivery',
        value: '97.4%',
        trend: '+2.1%',
        trendDescription: 'quality index',
        accent: 'violet',
    },
    {
        id: 'budget',
        label: 'Budget runway',
        value: '84 days',
        trend: '+12',
        trendDescription: 'days saved this week',
        accent: 'amber',
    },
];

const quickActions = [
    { label: 'Launch story', description: 'Create a new highlight', accent: 'emerald' as BadgeTone },
    { label: 'Invite member', description: 'Bring someone onboard', accent: 'sky' as BadgeTone },
    { label: 'Share update', description: 'Send a pulse note', accent: 'violet' as BadgeTone },
];

const activityFeed = [
    {
        title: 'Adrians approved “Biochip spotlight”',
        detail: 'Moved to live queue • Marketing',
        time: '08:42',
        accent: 'emerald',
    },
    {
        title: 'New partnership request',
        detail: 'Cēsis BioLabs • Needs response',
        time: '07:55',
        accent: 'amber',
    },
    {
        title: 'Security report exported',
        detail: 'Sent to leadership',
        time: '06:12',
        accent: 'sky',
    },
    {
        title: '3 teammates at capacity',
        detail: 'Sends nudge to redistribute',
        time: 'Yesterday',
        accent: 'violet',
    },
];

const taskColumns = [
    {
        title: 'Today',
        caption: 'High priority items',
        items: [
            { title: 'Approve 4 new research posts', owner: 'Content studio', eta: '14:00' },
            { title: 'Sync with VTDT squad', owner: 'Operations', eta: '16:30' },
        ],
    },
    {
        title: 'Next',
        caption: 'Up next in pipeline',
        items: [
            { title: 'QA new landing prototype', owner: 'Design lab', eta: 'Tomorrow 09:00' },
            { title: 'Budget review draft', owner: 'Finance', eta: 'Friday 11:30' },
        ],
    },
];

const insights = [
    { label: 'Engagement', value: '64%', sublabel: '↑ steady growth', accent: 'emerald' as BadgeTone },
    { label: 'Response SLA', value: '1h 12m', sublabel: 'avg turnaround', accent: 'sky' as BadgeTone },
    { label: 'Focus time', value: '73%', sublabel: 'team in deep work', accent: 'violet' as BadgeTone },
];

const systemHealth = [
    { label: 'API latency', value: '268ms', status: 'Good' },
    { label: 'Web uptime', value: '99.98%', status: 'Green' },
    { label: 'Queue depth', value: '42 items', status: 'Stable' },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Control room" />
            <div className="space-y-8 text-white">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-slate-900/10 px-6 py-8 shadow-inner shadow-black/20 lg:px-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Welcome back</p>
                            <h1 className="mt-2 text-3xl font-semibold text-white">Command dashboard</h1>
                            <p className="mt-1 text-sm text-white/70">Live overview of missions, requests, and system health.</p>
                        </div>
                        <div className="flex gap-3 text-sm">
                            <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-white/80">Latency 268ms</div>
                            <div className="rounded-2xl border border-emerald-200/25 bg-emerald-400/10 px-4 py-2 text-emerald-100">Systems Stable</div>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-4 text-sm text-white/70 sm:grid-cols-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Signals</p>
                            <p className="mt-1 text-lg font-semibold text-white">21 realtime watchers</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Approvals</p>
                            <p className="mt-1 text-lg font-semibold text-white">3 waiting • SLA 1h</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Focus mode</p>
                            <p className="mt-1 text-lg font-semibold text-white">Team 73% in deep work</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {statHighlights.map((stat) => (
                        <div
                            key={stat.id}
                            className={`rounded-3xl border border-white/10 bg-gradient-to-b ${statAccentClasses[stat.accent]} p-6 text-white shadow-lg shadow-black/30 ring-1 ring-white/5`}
                        >
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
                            <p className="mt-4 text-3xl font-semibold">{stat.value}</p>
                            <div className="mt-3 flex items-center gap-2 text-sm">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeToneClasses[stat.accent]}`}>{stat.trend}</span>
                                <span className="text-white/70">{stat.trendDescription}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Activity</p>
                                    <p className="text-lg font-semibold text-white">Realtime feed</p>
                                </div>
                                <button className="text-xs font-semibold text-white/70 underline underline-offset-4">View log</button>
                            </div>
                            <div className="mt-6 space-y-6">
                                {activityFeed.map((activity, index) => (
                                    <div key={activity.title} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <span
                                                className={`h-3 w-3 rounded-full ${
                                                    activity.accent === 'emerald'
                                                        ? 'bg-emerald-400 shadow shadow-emerald-400/40'
                                                        : activity.accent === 'amber'
                                                          ? 'bg-amber-400 shadow shadow-amber-400/40'
                                                          : activity.accent === 'sky'
                                                            ? 'bg-sky-400 shadow shadow-sky-400/40'
                                                            : 'bg-violet-400 shadow shadow-violet-400/40'
                                                }`}
                                            />
                                            {index !== activityFeed.length - 1 && <span className="mt-1 w-px flex-1 bg-white/10" />}
                                        </div>
                                        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-semibold text-white">{activity.title}</p>
                                                <p className="text-xs text-white/50">{activity.time}</p>
                                            </div>
                                            <p className="text-xs text-white/60">{activity.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Task lanes</p>
                                    <p className="text-lg font-semibold text-white">Execution board</p>
                                </div>
                                <button className="text-xs font-semibold text-white/70 underline underline-offset-4">Open board</button>
                            </div>
                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {taskColumns.map((column) => (
                                    <div key={column.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                        <p className="text-sm font-semibold text-white">{column.title}</p>
                                        <p className="text-xs text-white/60">{column.caption}</p>
                                        <div className="mt-4 space-y-3">
                                            {column.items.map((item) => (
                                                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                                    <p className="text-sm font-semibold text-white">{item.title}</p>
                                                    <p className="text-xs text-white/60">{item.owner}</p>
                                                    <p className="text-xs text-white/40">{item.eta}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Quick actions</p>
                            <div className="mt-4 space-y-3">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.label}
                                        type="button"
                                        className={`w-full rounded-2xl border border-white/10 bg-gradient-to-r ${statAccentClasses[action.accent]} px-4 py-3 text-left ring-1 ring-white/5`}
                                    >
                                        <p className="text-sm font-semibold text-white">{action.label}</p>
                                        <p className="text-xs text-white/70">{action.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Signals</p>
                            <div className="mt-4 space-y-4">
                                {insights.map((insight) => (
                                    <div key={insight.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-white">{insight.label}</p>
                                                <p className="text-xs text-white/60">{insight.sublabel}</p>
                                            </div>
                                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeToneClasses[insight.accent]}`}>{insight.value}</span>
                                        </div>
                                        <div className="mt-3 h-2 rounded-full bg-white/10">
                                            <div
                                                className={`h-full rounded-full bg-gradient-to-r ${statAccentClasses[insight.accent]}`}
                                                style={{ width: insight.accent === 'amber' ? '48%' : insight.accent === 'sky' ? '70%' : '82%' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Systems</p>
                            <div className="mt-4 space-y-3">
                                {systemHealth.map((system) => (
                                    <div key={system.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                        <div>
                                            <p className="text-sm font-semibold text-white">{system.label}</p>
                                            <p className="text-xs text-white/60">{system.status}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-white">{system.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AdminLayout title="Control room">{page}</AdminLayout>;
