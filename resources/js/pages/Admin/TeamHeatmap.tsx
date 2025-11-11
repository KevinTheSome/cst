import { Head } from '@inertiajs/react';

import AdminLayout from '../../Layouts/AdminLayout';
import SectionTemplate from './components/SectionTemplate';

const highlights = [
    { label: 'Active collaborators', value: '28', hint: 'Online this hour', accent: 'emerald' as const },
    { label: 'Deep work blocks', value: '73%', hint: 'Team in focus mode', accent: 'violet' as const },
    { label: 'People at capacity', value: '3', hint: 'Send relief nudge', accent: 'amber' as const },
    { label: 'Upcoming PTO', value: '5', hint: 'Next 7 days', accent: 'sky' as const },
];

const checklist = [
    { title: 'Rebalance QA reviewers', detail: 'Move Kristiāns to mission delta', status: 'Due 11:45' },
    { title: 'Confirm VTDT mentors', detail: 'Pairing for tomorrow’s sync', status: 'Due 14:00' },
    { title: 'Publish staffing note', detail: 'Share focus plan with leads', status: 'Due 17:30' },
];

const insights = [
    { title: 'Wellness index', detail: 'Pulse survey', metric: '8.6', accent: 'emerald' as const },
    { title: 'Meeting load', detail: 'Avg. hours / day', metric: '2.1h', accent: 'sky' as const },
    { title: 'After-hours pings', detail: 'Last night', metric: '4', accent: 'amber' as const },
];

export default function TeamHeatmap() {
    return (
        <>
            <Head title="Team Heatmap" />
            <SectionTemplate
                eyebrow="Operations"
                title="Team heatmap"
                description="See availability, focus time, and wellbeing signals so you can support the crew before bottlenecks flare up."
                highlights={highlights}
                checklist={checklist}
                insights={insights}
            />
        </>
    );
}

TeamHeatmap.layout = (page: React.ReactNode) => <AdminLayout title="Team heatmap">{page}</AdminLayout>;
