import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { 
    Activity, 
    TrendingUp, 
    Users, 
    Clock, 
    ArrowUpRight, 
    ArrowDownRight, 
    Filter, 
    Calendar, 
    MoreHorizontal,
    Globe,
    Search,
    Share2,
    AlertCircle,
    CheckCircle2,
    X,
    RefreshCw
} from 'lucide-react';

// --- Types for Real Data ---
export type HighlightStat = {
    label: string;
    value: string;
    hint: string;
    change: string;
    trend: 'up' | 'down';
    type: 'users' | 'activity' | 'time' | 'retention';
};

export type PageStat = {
    path: string;
    label: string;
    visitors: number;
    change: string;
    avgTime: string;
    completion: number;
};

export type SourceStat = {
    label: string;
    value: number;
    change: string;
    detail: string;
};

export type RegionStat = {
    region: string;
    share: string;
    count: number;
    detail: string;
};

export type DashboardData = {
    highlights: HighlightStat[];
    topPages: PageStat[];
    trafficSources: SourceStat[];
    regions: RegionStat[];
    lastUpdated?: string;
};

// --- Mock Data (Fallback) ---
const demoData: DashboardData = {
    highlights: [
        { label: 'Aktīvie skatītāji', value: '1.4k', hint: 'Pēdējo 24h laikā', change: '+12%', trend: 'up', type: 'users' },
        { label: 'Top lapa', value: '/questions', hint: '38% vizīšu', change: '+5%', trend: 'up', type: 'activity' },
        { label: 'Vid. sesija', value: '03:28', hint: 'Pret iepriekšējo', change: '-2%', trend: 'down', type: 'time' },
        { label: 'Atgriezušies', value: '62%', hint: 'Lojalitāte', change: '+8%', trend: 'up', type: 'retention' },
    ],
    topPages: [
        { path: '/questions', label: 'Anketa — jautājumi', visitors: 482, change: '+18%', avgTime: '03:10', completion: 76 },
        { path: '/anketa', label: 'Anketa sākums', visitors: 369, change: '+9%', avgTime: '02:31', completion: 64 },
        { path: '/musu-grupa', label: 'Mūsu grupa', visitors: 241, change: '+4%', avgTime: '01:18', completion: 0 },
        { path: '/kontakti', label: 'Kontakti', visitors: 156, change: '-2%', avgTime: '00:45', completion: 0 },
    ],
    trafficSources: [
        { label: 'Organiskā meklēšana', value: 38, change: '+4%', detail: 'Google & Bing' },
        { label: 'Tiešais trafiks', value: 31, change: '+8%', detail: 'Saglabātas saites' },
        { label: 'Sociālie tīkli', value: 16, change: '+3%', detail: 'LinkedIn, FB' },
        { label: 'E-pasts', value: 15, change: '-1%', detail: 'Kampaņas' },
    ],
    regions: [
        { region: 'LV', share: '46%', count: 842, detail: 'Rīga, Jelgava' },
        { region: 'EE', share: '21%', count: 384, detail: 'Tallina' },
        { region: 'NO', share: '18%', count: 329, detail: 'Oslo' },
        { region: 'Citi', share: '15%', count: 275, detail: 'Vācija, Polija' },
    ]
};

// --- Helpers ---
const getHighlightConfig = (type: string) => {
    switch(type) {
        case 'users': return { icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
        case 'activity': return { icon: Activity, color: 'text-violet-400', bg: 'bg-violet-500/10' };
        case 'time': return { icon: Clock, color: 'text-sky-400', bg: 'bg-sky-500/10' };
        default: return { icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' };
    }
};

const getSourceColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500'];
    return colors[index % colors.length];
};

export default function Missions({ analytics }: { analytics?: DashboardData }) {
    // Use real data if provided, otherwise fallback to demo
    const data = analytics || demoData;
    const isDemo = !analytics;

    // State
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [dateRange, setDateRange] = useState('7d');
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Simulate refresh or handle real refresh
    const handleRefresh = () => {
        setIsRefreshing(true);
        if (isDemo) {
            setTimeout(() => setIsRefreshing(false), 800); // Fake delay for demo
        } else {
            router.reload({ onFinish: () => setIsRefreshing(false) });
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <Head title="Traffic insights" />
            
            <div className="mx-auto max-w-7xl space-y-8">
                
                {/* --- Header --- */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Activity className="h-5 w-5 text-indigo-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                                    Analytics
                                </span>
                                {isDemo && (
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400">
                                        DEMO MODE
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Lietotāju plūsma</h1>
                            <p className="mt-2 text-slate-400 max-w-lg">
                                Pārskats par apmeklētāju uzvedību, populārākajām lapām un satiksmes avotiem reāllaikā.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleRefresh}
                                className={`p-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                                title="Atjaunot datus"
                            >
                                <RefreshCw className="h-4 w-4" />
                            </button>
                            <button 
                                onClick={() => setIsFilterOpen(true)}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                <Filter className="h-4 w-4" />
                                Filtri
                            </button>
                            <div className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
                                <Calendar className="h-4 w-4" />
                                <span>{dateRange === '24h' ? 'Pēdējās 24h' : dateRange === '7d' ? 'Pēdējās 7 dienas' : 'Pēdējās 30 dienas'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Highlights Grid --- */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {data.highlights.map((item, idx) => {
                        const style = getHighlightConfig(item.type);
                        const Icon = style.icon;
                        return (
                            <div key={idx} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-5 transition-all hover:bg-slate-900/60 hover:border-white/20">
                                <div className="flex items-start justify-between">
                                    <div className={`rounded-xl p-2.5 ${style.bg} ${style.color}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs font-bold ${item.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {item.change}
                                        {item.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-2xl font-bold text-white">{item.value}</h3>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">{item.label}</p>
                                    <p className="text-[10px] text-slate-500 mt-2">{item.hint}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    
                    {/* --- Left Column (2/3) --- */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Top Pages Table */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 flex flex-col shadow-xl backdrop-blur-md overflow-hidden">
                            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-slate-400" />
                                    <h3 className="font-bold text-white">Populārākās Lapas</h3>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <div className="p-2">
                                {data.topPages.map((page, i) => (
                                    <div key={page.path} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-500 border border-white/5">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{page.label}</p>
                                                <p className="text-xs text-slate-500 font-mono mt-0.5">{page.path}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-6 sm:gap-8 ml-12 sm:ml-0">
                                            <div className="flex flex-col items-end min-w-[60px]">
                                                <span className="text-sm font-bold text-white">{page.visitors}</span>
                                                <span className={`text-[10px] ${page.change.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{page.change}</span>
                                            </div>
                                            <div className="flex flex-col items-end min-w-[60px]">
                                                <span className="text-sm font-bold text-white">{page.avgTime}</span>
                                                <span className="text-[10px] text-slate-500">Vid. laiks</span>
                                            </div>
                                            
                                            {/* Completion Bar */}
                                            <div className="w-24 hidden sm:block">
                                                <div className="flex justify-between text-[10px] mb-1.5">
                                                    <span className="text-slate-400">Pabeigts</span>
                                                    <span className="text-white font-bold">{page.completion}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" 
                                                        style={{ width: `${page.completion}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Region Map/List */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-white">Auditorija pēc reģiona</h3>
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">Live</span>
                            </div>
                            
                            <div className="grid gap-4 sm:grid-cols-2">
                                {data.regions.map((region) => (
                                    <div key={region.region} className="flex items-center p-4 rounded-2xl bg-slate-950/30 border border-white/5">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-300 font-bold text-sm">
                                            {region.region}
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-semibold text-white">{region.detail}</span>
                                                <span className="text-xs font-bold text-slate-400">{region.share}</span>
                                            </div>
                                            <div className="w-full bg-slate-800 rounded-full h-1.5">
                                                <div className="bg-slate-500 h-1.5 rounded-full" style={{ width: region.share }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column (1/3) --- */}
                    <div className="space-y-8">
                        
                        {/* Traffic Sources */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                            <h3 className="font-bold text-white mb-6">Satiksmes Avoti</h3>
                            <div className="space-y-5">
                                {data.trafficSources.map((source, idx) => (
                                    <div key={source.label}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-300">{source.label}</span>
                                            <div className="flex gap-2">
                                                <span className="text-white font-bold">{source.value}%</span>
                                                <span className={`text-xs ${source.change.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{source.change}</span>
                                            </div>
                                        </div>
                                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${getSourceColor(idx)} rounded-full`} 
                                                style={{ width: `${source.value}%` }}
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-1">{source.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Checklist / Alerts */}
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertCircle className="h-5 w-5 text-amber-400" />
                                <h3 className="font-bold text-white">Uzmanību</h3>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <div className="flex gap-3">
                                        <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-amber-200">Zema pabeigtība</p>
                                            <p className="text-xs text-amber-200/70 mt-0.5">Anketas 'Kontakti' pabeigšana ir zem 15%.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <div className="flex gap-3">
                                        <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-blue-200">Jauns avots</p>
                                            <p className="text-xs text-blue-200/70 mt-0.5">+150 vizītes no 'facebook.com' šodien.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-4 text-xs font-bold text-white hover:bg-white/10 transition-colors">
                                <Share2 className="h-4 w-4" />
                                Eksportēt
                            </button>
                            <button className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 p-4 text-xs font-bold text-white hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20">
                                <Search className="h-4 w-4" />
                                Detaļas
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- Filter Modal --- */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
                        onClick={() => setIsFilterOpen(false)}
                    />
                    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-900">
                            <h3 className="font-bold text-white">Datu Filtri</h3>
                            <button 
                                onClick={() => setIsFilterOpen(false)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Laika periods</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['24h', '7d', '30d'].map((period) => (
                                        <button
                                            key={period}
                                            onClick={() => setDateRange(period)}
                                            className={`rounded-xl py-2 text-sm font-semibold transition-all ${
                                                dateRange === period 
                                                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Skats</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                                        <div className="h-5 w-5 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                                        </div>
                                        <span className="text-sm font-medium text-white">Visas lapas</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-600" />
                                        <span className="text-sm font-medium text-slate-300">Tikai anketas</span>
                                    </label>
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full rounded-xl bg-indigo-500 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition-all"
                            >
                                Lietot filtrus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Missions.layout = (page: React.ReactNode) => <AdminLayout title="Missions">{page}</AdminLayout>;