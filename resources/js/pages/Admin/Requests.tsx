import { Head } from '@inertiajs/react';

import AdminLayout from '../../Layouts/AdminLayout';
import SectionTemplate from './components/SectionTemplate';

const highlights = [
    { label: 'New requests', value: '14', hint: 'Past 24 hours', accent: 'amber' as const },
    { label: 'Avg. response', value: '58m', hint: 'Time to first reply', accent: 'sky' as const },
    { label: 'Approvals queued', value: '3', hint: 'Need director sign-off', accent: 'violet' as const },
    { label: 'Satisfied', value: '96%', hint: 'Requester feedback', accent: 'emerald' as const },
];

const checklist = [
    { title: 'Filter duplicate lab tour asks', detail: 'Merge Erasmus leads', status: 'Due 12:45' },
    { title: 'Escalate finance requests', detail: 'Budget adjustments for missions', status: 'Due 15:20' },
    { title: 'Send summary digest', detail: 'Auto-mail stakeholders at 18:00', status: 'Scheduled' },
];

const insights = [
    { title: 'SLA met', detail: 'Last 7 days', metric: '94%', accent: 'emerald' as const },
    { title: 'Peak hour', detail: 'Most inbound', metric: '09:00', accent: 'sky' as const },
    { title: 'Forms health', detail: 'Error rate', metric: '0.3%', accent: 'violet' as const },
];

export default function Requests() {
    return (
        <>
            <Head title="Requests" />
            <SectionTemplate
                eyebrow="Operations"
                title="Requests & approvals"
                description="Track every incoming ask—from press to procurement—and keep the approval lanes smooth with clear SLAs."
                highlights={highlights}
                checklist={checklist}
                insights={insights}
            />
        </>
    );
}

Requests.layout = (page: React.ReactNode) => <AdminLayout title="Requests">{page}</AdminLayout>;
