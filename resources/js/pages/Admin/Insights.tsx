import { Head } from '@inertiajs/react';

import AdminLayout from '../../Layouts/AdminLayout';
import SectionTemplate from './components/SectionTemplate';

const highlights = [
    { label: 'Dashboards shipped', value: '8', hint: 'Updated this week', accent: 'sky' as const },
    { label: 'Signals monitored', value: '41', hint: 'Realtime data taps', accent: 'emerald' as const },
    { label: 'Alerts resolved', value: '15', hint: 'Last 24 hours', accent: 'amber' as const },
    { label: 'Experiments live', value: '4', hint: 'A/B & content trials', accent: 'violet' as const },
];

const checklist = [
    { title: 'Refresh engagement pulse', detail: 'Add VTDT student cohort breakdown', status: 'Due 12:15' },
    { title: 'Publish leadership digest', detail: 'Summaries for biochip roadmap', status: 'Due 16:00' },
    { title: 'Push anomaly report', detail: 'SLA spikes & queue depth', status: 'Due 18:30' },
];

const insights = [
    { title: 'Engagement delta', detail: 'Week over week', metric: '+8%', accent: 'emerald' as const },
    { title: 'Latency watch', detail: 'Largest region', metric: '312ms', accent: 'sky' as const },
    { title: 'Story reach', detail: 'Organic lift', metric: '1.9x', accent: 'violet' as const },
];

export default function Insights() {
    return (
        <>
            <Head title="Insights" />
            <SectionTemplate
                eyebrow="Command"
                title="Insights & intelligence"
                description="Curate live analytics, pulse briefs, and anomaly alerts so leadership can steer the lab’s communications with clarity."
                highlights={highlights}
                checklist={checklist}
                insights={insights}
            />
        </>
    );
}

Insights.layout = (page: React.ReactNode) => <AdminLayout title="Insights">{page}</AdminLayout>;
