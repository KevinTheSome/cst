import { Head } from '@inertiajs/react';

import AdminLayout from '../../Layouts/AdminLayout';
import SectionTemplate from './components/SectionTemplate';

const highlights = [
    { label: 'Aktīvie skatītāji', value: '1.4k', hint: 'Pēdējo 24 stundu laikā', accent: 'emerald' as const },
    { label: 'Top lapa', value: '/questions', hint: '38% no visām vizītēm', accent: 'violet' as const },
    { label: 'Vid. sesija', value: '03:28', hint: '+12% pret iepriekšējo nedēļu', accent: 'sky' as const },
    { label: 'Atgriezušies liet.', value: '62%', hint: 'Nedēļas laikā', accent: 'amber' as const },
];

const checklist = [
    { title: 'Sekot anketas pabeigšanai', detail: 'Brīdinājums, ja completion < 60%', status: 'Live' },
    { title: 'Monitorēt jautājumu lapu', detail: 'Izceliet jaunu trafika lēcienu', status: 'Hourly' },
    { title: 'Auditēt nosūtījuma avotus', detail: 'Noskaidrot pēkšņo «direct» pieaugumu', status: '12:30' },
];

const insights = [
    { title: 'Karstākā stunda', detail: '11:00–12:00 pēc LV laika', metric: '214 apmekl.', accent: 'emerald' as const },
    { title: 'Jauni vs. veci', detail: 'Pēdējo 7 dienu sadalījums', metric: '38 / 62', accent: 'sky' as const },
    { title: 'Aizplūšana', detail: 'Pamet pēc 1. soļa', metric: '21%', accent: 'amber' as const },
];

const topPages = [
    { path: '/questions', label: 'Anketa — jautājumi', visitors: 482, change: '+18%', avgTime: '03:10', completion: 76 },
    { path: '/anketa', label: 'Anketa sākums', visitors: 369, change: '+9%', avgTime: '02:31', completion: 64 },
    { path: '/musu-grupa', label: 'Mūsu grupa', visitors: 241, change: '+4%', avgTime: '01:18', completion: 0 },
];

const trafficSources = [
    { label: 'Organiskā meklēšana', value: '38%', change: '+4%', detail: 'Google & Bing' },
    { label: 'Tiešais trafiks', value: '31%', change: '+8%', detail: 'Saglabātas saites' },
    { label: 'Sociālie tīkli', value: '16%', change: '+3%', detail: 'LinkedIn, FB' },
];

const regionShare = [
    { region: 'LV', share: '46%', detail: 'Rīga, Jelgava' },
    { region: 'EE', share: '21%', detail: 'Tallina' },
    { region: 'NO', share: '18%', detail: 'Oslo' },
    { region: 'Citi', share: '15%', detail: 'Vācija, Polija' },
];

export default function Missions() {
    return (
        <>
            <Head title="Traffic insights" />
            <SectionTemplate
                eyebrow="Apmeklējumu kontrole"
                title="Lietotāju ceļi un karstākās lapas"
                description="Administratori var redzēt, kurās vietnes sadaļās apmeklētāji pavada visvairāk laika, kādi avoti dod trafiku un kuri soļi prasa uzmanību."
                highlights={highlights}
                checklist={checklist}
                insights={insights}
            >
                <div className="space-y-6">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/30">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Top lapas</p>
                                <p className="text-lg font-semibold text-white">Kur lietotāji pavada laiku</p>
                            </div>
                            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Atjaunots pirms 5 min</span>
                        </div>
                        <div className="mt-6 space-y-3">
                            {topPages.map((page) => (
                                <div key={page.path} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-white">{page.label}</p>
                                            <p className="text-xs text-white/60">{page.path}</p>
                                        </div>
                                        <div className="text-right text-sm text-white/80">
                                            <p className="font-semibold text-white">
                                                {page.visitors}
                                                <span className={`ml-2 text-xs ${page.change.startsWith('-') ? 'text-amber-300' : 'text-emerald-300'}`}>{page.change}</span>
                                            </p>
                                            <p>Vidēji {page.avgTime}</p>
                                        </div>
                                    </div>
                                    {page.completion ? (
                                        <div className="mt-3">
                                            <div className="flex items-center justify-between text-[11px] text-white/60">
                                                <span>Mērķis</span>
                                                <span>{page.completion}%</span>
                                            </div>
                                            <div className="mt-1 h-2 rounded-full bg-white/10">
                                                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${page.completion}%` }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="mt-3 text-xs text-white/60">Nav saistīta mērķa</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-lg shadow-black/25">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Satiksmes avoti</p>
                            <p className="mt-2 text-lg font-semibold text-white">No kurienes nāk lietotāji</p>
                            <div className="mt-5 space-y-4">
                                {trafficSources.map((source) => (
                                    <div key={source.label} className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-white">{source.label}</p>
                                                <p className="text-xs text-white/60">{source.detail}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-white">{source.value}</p>
                                                <p className={`text-xs ${source.change.startsWith('-') ? 'text-amber-300' : 'text-emerald-300'}`}>{source.change} vs iepr.</p>
                                            </div>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-white/10">
                                            <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500" style={{ width: source.value }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-lg shadow-black/25">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Reģioni</p>
                            <p className="mt-2 text-lg font-semibold text-white">Lielākās auditorijas</p>
                            <div className="mt-5 space-y-3">
                                {regionShare.map((region) => (
                                    <div key={region.region} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                        <div>
                                            <p className="text-sm font-semibold text-white">{region.region}</p>
                                            <p className="text-xs text-white/60">{region.detail}</p>
                                        </div>
                                        <span className="text-lg font-semibold text-white">{region.share}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionTemplate>
        </>
    );
}

Missions.layout = (page: React.ReactNode) => <AdminLayout title="Missions">{page}</AdminLayout>;
