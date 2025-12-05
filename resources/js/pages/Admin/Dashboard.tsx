import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { 
    Activity, 
    TrendingUp, 
    TrendingDown,
    Users, 
    FileText, 
    CheckCircle2, 
    Clock, 
    Zap, 
    UserPlus, 
    Send, 
    MoreHorizontal, 
    Server, 
    Wifi, 
    Layers, 
    X,
    ArrowRight,
    AlertCircle
} from 'lucide-react';

// --- Types & Data ---

type BadgeTone = 'emerald' | 'sky' | 'violet' | 'amber';

type StatHighlight = {
    id: string;
    label: string;
    value: string;
    trend: string;
    trendDescription: string;
    accent: BadgeTone;
    icon: any;
};

const statHighlights: StatHighlight[] = [
    {
        id: 'users',
        label: 'Active members',
        value: '12,480',
        trend: '+18%',
        trendDescription: 'vs last 7 days',
        accent: 'emerald',
        icon: Users
    },
    {
        id: 'requests',
        label: 'New requests',
        value: '43',
        trend: '-6%',
        trendDescription: 'response time',
        accent: 'sky',
        icon: FileText
    },
    {
        id: 'delivery',
        label: 'On-time delivery',
        value: '97.4%',
        trend: '+2.1%',
        trendDescription: 'quality index',
        accent: 'violet',
        icon: CheckCircle2
    },
    {
        id: 'budget',
        label: 'Budget runway',
        value: '84 days',
        trend: '+12',
        trendDescription: 'days saved',
        accent: 'amber',
        icon: Clock
    },
];

const quickActions = [
    { id: 'story', label: 'Launch story', description: 'Create a new highlight', accent: 'emerald' as BadgeTone, icon: Zap },
    { id: 'invite', label: 'Invite member', description: 'Bring someone onboard', accent: 'sky' as BadgeTone, icon: UserPlus },
    { id: 'update', label: 'Share update', description: 'Send a pulse note', accent: 'violet' as BadgeTone, icon: Send },
];

const activityFeed = [
    {
        id: 1,
        title: 'Adrians approved “Biochip spotlight”',
        detail: 'Moved to live queue • Marketing',
        time: '08:42',
        accent: 'emerald',
    },
    {
        id: 2,
        title: 'New partnership request',
        detail: 'Cēsis BioLabs • Needs response',
        time: '07:55',
        accent: 'amber',
    },
    {
        id: 3,
        title: 'Security report exported',
        detail: 'Sent to leadership',
        time: '06:12',
        accent: 'sky',
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
            { title: 'QA new landing prototype', owner: 'Design lab', eta: 'Tomorrow' },
            { title: 'Budget review draft', owner: 'Finance', eta: 'Friday' },
        ],
    },
];

const systemHealth = [
    { label: 'API latency', value: '268ms', status: 'Good', icon: Wifi },
    { label: 'Web uptime', value: '99.98%', status: 'Green', icon: Server },
    { label: 'Queue depth', value: '42 items', status: 'Stable', icon: Layers },
];

export default function Dashboard() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    // Helpers for styles
    const getAccentColors = (tone: BadgeTone) => {
        switch(tone) {
            case 'emerald': return 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20';
            case 'sky': return 'from-sky-500/20 to-sky-500/5 text-sky-400 border-sky-500/20';
            case 'violet': return 'from-violet-500/20 to-violet-500/5 text-violet-400 border-violet-500/20';
            case 'amber': return 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/20';
            default: return 'from-slate-500/20 to-slate-500/5 text-slate-400 border-slate-500/20';
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <Head title="Control room" />
            
            <div className="mx-auto max-w-7xl space-y-8">
                
                {/* --- Command Center Header --- */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-2">Welcome Back</p>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Command Dashboard</h1>
                            <p className="mt-2 text-slate-400 max-w-lg">
                                Live overview of missions, team requests, and system health status.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400 shadow-lg shadow-emerald-500/10">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Systems Stable
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
                                <Wifi className="h-4 w-4" />
                                268ms
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Stat Highlights --- */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {statHighlights.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.id}
                                className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-b p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${getAccentColors(stat.accent)}`}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className={`rounded-xl bg-white/5 p-2.5 backdrop-blur-sm group-hover:bg-white/10 transition-colors`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend.startsWith('-') ? 'text-amber-400' : 'text-emerald-400'}`}>
                                        {stat.trend}
                                        {stat.trend.startsWith('-') ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                                    </div>
                                </div>
                                
                                <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
                                <div className="mt-1 flex items-center gap-2">
                                    <span className="text-sm font-medium text-white/80">{stat.label}</span>
                                </div>
                                <p className="mt-4 text-xs font-medium uppercase tracking-wider opacity-60">{stat.trendDescription}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    
                    {/* --- Left Column (Activity & Tasks) --- */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Activity Feed */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-indigo-400" />
                                    Realtime Activity
                                </h3>
                                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">View Log</button>
                            </div>
                            
                            <div className="relative space-y-8 pl-2">
                                {/* Connector Line */}
                                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-indigo-500/50 to-transparent" />

                                {activityFeed.map((item, i) => (
                                    <div key={item.id} className="relative flex gap-4 items-start">
                                        <div className={`relative z-10 h-2.5 w-2.5 mt-2 rounded-full border-2 border-slate-900 ${
                                            item.accent === 'emerald' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' :
                                            item.accent === 'amber' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' :
                                            'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                                        }`} />
                                        
                                        <div className="flex-1 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-sm font-semibold text-white">{item.title}</p>
                                                <span className="text-xs font-mono text-slate-500">{item.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-400">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Task Lanes */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Layers className="h-5 w-5 text-indigo-400" />
                                    Execution Board
                                </h3>
                                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Open Board</button>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                {taskColumns.map((col) => (
                                    <div key={col.title} className="space-y-4">
                                        <div className="flex items-center justify-between px-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{col.title}</span>
                                            <span className="text-[10px] text-slate-600 bg-slate-900 px-2 py-0.5 rounded border border-white/5">{col.items.length} items</span>
                                        </div>
                                        <div className="space-y-3">
                                            {col.items.map((task, i) => (
                                                <div key={i} className="group p-4 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer">
                                                    <p className="text-sm font-medium text-white group-hover:text-indigo-200 transition-colors">{task.title}</p>
                                                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                                        <span>{task.owner}</span>
                                                        <span className="flex items-center gap-1 text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                                                            <Clock className="h-3 w-3" /> {task.eta}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column (Actions & Health) --- */}
                    <div className="space-y-8">
                        
                        {/* Quick Actions */}
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Quick Actions</p>
                            <div className="space-y-3">
                                {quickActions.map((action) => {
                                    const Icon = action.icon;
                                    return (
                                        <button
                                            key={action.id}
                                            onClick={() => setActiveModal(action.id)}
                                            className="group w-full flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-left transition-all hover:bg-white/5 hover:border-white/10 hover:shadow-lg"
                                        >
                                            <div className={`rounded-xl p-2.5 transition-colors ${
                                                action.accent === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20' :
                                                action.accent === 'sky' ? 'bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20' :
                                                'bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20'
                                            }`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{action.label}</p>
                                                <p className="text-xs text-slate-400 group-hover:text-slate-300">{action.description}</p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 ml-auto text-slate-600 group-hover:text-white transition-colors" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* System Health */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                            <div className="flex items-center gap-2 mb-6">
                                <Server className="h-5 w-5 text-indigo-400" />
                                <h3 className="font-bold text-white">System Status</h3>
                            </div>
                            
                            <div className="space-y-4">
                                {systemHealth.map((sys) => {
                                    const Icon = sys.icon;
                                    return (
                                        <div key={sys.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Icon className="h-4 w-4 text-slate-400" />
                                                <span className="text-sm font-medium text-slate-200">{sys.label}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-white">{sys.value}</p>
                                                <p className={`text-[10px] uppercase font-bold tracking-wider ${
                                                    sys.status === 'Good' || sys.status === 'Green' || sys.status === 'Stable'
                                                    ? 'text-emerald-400' : 'text-amber-400'
                                                }`}>{sys.status}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- ACTION MODAL --- */}
            {activeModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
                        onClick={() => setActiveModal(null)}
                    />
                    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-900">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                {activeModal === 'story' && <Zap className="h-5 w-5 text-emerald-400" />}
                                {activeModal === 'invite' && <UserPlus className="h-5 w-5 text-sky-400" />}
                                {activeModal === 'update' && <Send className="h-5 w-5 text-violet-400" />}
                                
                                {activeModal === 'story' && 'Launch Story'}
                                {activeModal === 'invite' && 'Invite Member'}
                                {activeModal === 'update' && 'Share Update'}
                            </h3>
                            <button 
                                onClick={() => setActiveModal(null)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <p className="text-sm text-slate-400 mb-6">
                                {activeModal === 'story' && 'Draft a new highlight story for the dashboard feed.'}
                                {activeModal === 'invite' && 'Send an invitation link to a new team member.'}
                                {activeModal === 'update' && 'Broadcast a quick status update to the entire team.'}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                        {activeModal === 'invite' ? 'Email Address' : 'Title'}
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none"
                                        placeholder={activeModal === 'invite' ? 'colleague@example.com' : 'Enter title...'}
                                    />
                                </div>
                                
                                {activeModal !== 'invite' && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Details</label>
                                        <textarea 
                                            rows={3}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
                                            placeholder="Add more context..."
                                        />
                                    </div>
                                )}

                                <div className="pt-2 flex gap-3">
                                    <button 
                                        onClick={() => setActiveModal(null)}
                                        className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="flex-1 rounded-xl bg-indigo-500 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition-colors"
                                    >
                                        {activeModal === 'invite' ? 'Send Invite' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AdminLayout title="Control room">{page}</AdminLayout>;