import { Head } from '@inertiajs/react';

import AdminLayout from '../../Layouts/AdminLayout';
import SectionTemplate from './components/SectionTemplate';

const highlights = [
    { label: 'Active missions', value: '6', hint: '3 entering launch window', accent: 'violet' as const },
    { label: 'Stories shipped', value: '24', hint: 'Past 30 days cadence', accent: 'emerald' as const },
    { label: 'Blocked items', value: '2', hint: 'Awaiting stakeholder input', accent: 'amber' as const },
    { label: 'Avg. duration', value: '12.8d', hint: 'Concept → live', accent: 'sky' as const },
];

const checklist = [
    { title: 'Map VTDT collaboration timeline', detail: 'Align milestones with lab visits', status: 'ETA 14:30' },
    { title: 'Approve biochip spotlight assets', detail: 'Final copy review + hero renders', status: 'ETA 16:00' },
    { title: 'Confirm legal for Erasmus story', detail: 'Cross-check partner statements', status: 'ETA 18:15' },
];

const insights = [
    { title: 'Confidence', detail: 'Auto-forecast for week', metric: '92%', accent: 'emerald' as const },
    { title: 'Focus time', detail: 'Team in build mode', metric: '68%', accent: 'violet' as const },
    { title: 'Risk alerts', detail: 'Open compliance flags', metric: '1', accent: 'amber' as const },
];

export default function Missions() {
    return (
        <>
            <Head title="Missions" />
            <SectionTemplate
                eyebrow="Operations"
                title="Mission orchestration"
                description="Shape campaign timelines, unblock dependencies, and keep every launch window moving through review to production."
                highlights={highlights}
                checklist={checklist}
                insights={insights}
            >
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Launch pad</p>
                            <p className="text-lg font-semibold text-white">Next deployment</p>
                        </div>
                        <span className="text-xs text-white/60">Window 19:00</span>
                    </div>
                    <div className="mt-6 space-y-3 text-sm text-white/70">
                        <p>• Publish “Biochip 2.0” long-form</p>
                        <p>• Brief media partners on CTA tweaks</p>
                        <p>• Trigger automation for drip emails</p>
                    </div>
                </div>
            </SectionTemplate>
        </>
    );
}

Missions.layout = (page: React.ReactNode) => <AdminLayout title="Missions">{page}</AdminLayout>;
