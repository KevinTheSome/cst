import { ReactNode } from 'react';

type Accent = 'emerald' | 'sky' | 'violet' | 'amber';

type Highlight = {
    label: string;
    value: string;
    hint: string;
    accent?: Accent;
};

type ChecklistItem = {
    title: string;
    detail: string;
    status?: string;
};

type InsightCard = {
    title: string;
    detail: string;
    metric: string;
    accent?: Accent;
};

interface SectionTemplateProps {
    eyebrow: string;
    title: string;
    description: string;
    highlights: Highlight[];
    checklist: ChecklistItem[];
    insights: InsightCard[];
    children?: ReactNode;
}

const badgeToneClasses: Record<Accent, string> = {
    emerald: 'bg-emerald-400/15 text-emerald-200 ring-emerald-400/40',
    sky: 'bg-sky-400/15 text-sky-200 ring-sky-400/40',
    violet: 'bg-violet-400/15 text-violet-200 ring-violet-400/40',
    amber: 'bg-amber-400/15 text-amber-100 ring-amber-400/40',
};

const statAccentClasses: Record<Accent, string> = {
    emerald: 'from-emerald-400/20 to-emerald-500/0 ring-emerald-400/30',
    sky: 'from-sky-400/20 to-sky-500/0 ring-sky-400/30',
    violet: 'from-violet-400/20 to-fuchsia-500/0 ring-violet-400/30',
    amber: 'from-amber-400/25 to-orange-500/0 ring-amber-400/30',
};

export default function SectionTemplate({ eyebrow, title, description, highlights, checklist, insights, children }: SectionTemplateProps) {
    return (
        <div className="space-y-8 text-white">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-slate-900/10 px-6 py-8 shadow-inner shadow-black/20 lg:px-8">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">{eyebrow}</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm text-white/70">{description}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {highlights.map((highlight) => {
                    const accent = highlight.accent ?? 'sky';
                    return (
                        <div
                            key={highlight.label}
                            className={`rounded-3xl border border-white/10 bg-gradient-to-b ${statAccentClasses[accent]} p-6 text-white shadow-lg shadow-black/20 ring-1 ring-white/5`}
                        >
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{highlight.label}</p>
                            <p className="mt-4 text-3xl font-semibold">{highlight.value}</p>
                            <p className="mt-2 text-sm text-white/70">{highlight.hint}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Active checklist</p>
                                <p className="text-lg font-semibold text-white">{title} flow</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            {checklist.map((item) => (
                                <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-semibold text-white">{item.title}</p>
                                        {item.status && <span className="text-xs text-white/60">{item.status}</span>}
                                    </div>
                                    <p className="text-xs text-white/60">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {children}
                </div>

                <div className="space-y-6">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Signals</p>
                        <div className="mt-4 space-y-4">
                            {insights.map((insight) => {
                                const accent = insight.accent ?? 'emerald';
                                return (
                                    <div key={insight.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-semibold text-white">{insight.title}</p>
                                                <p className="text-xs text-white/60">{insight.detail}</p>
                                            </div>
                                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeToneClasses[accent]}`}>{insight.metric}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
