import { Head } from '@inertiajs/react';

import AdminLayout from '../../Layouts/AdminLayout';
import SectionTemplate from './components/SectionTemplate';

const highlights = [
    { label: 'Active roles', value: '14', hint: 'Scoped permission sets', accent: 'violet' as const },
    { label: 'Pending reviews', value: '3', hint: 'Need owner approval', accent: 'amber' as const },
    { label: 'Last audit', value: '6h ago', hint: 'Automated logs pushed', accent: 'sky' as const },
    { label: 'Incidents', value: '0', hint: 'Past 30 days', accent: 'emerald' as const },
];

const checklist = [
    { title: 'Rotate admin access tokens', detail: 'Ops + integrations', status: 'Due 13:15' },
    { title: 'Review audit anomalies', detail: 'Two unusual login countries', status: 'Due 15:00' },
    { title: 'Ship security bulletin', detail: 'Share best practices with team', status: 'Due 18:45' },
];

const insights = [
    { title: 'MFA coverage', detail: 'Enabled teammates', metric: '100%', accent: 'emerald' as const },
    { title: 'Failed attempts', detail: '24h window', metric: '7', accent: 'amber' as const },
    { title: 'Policy drift', detail: 'Outdated rules', metric: '1', accent: 'violet' as const },
];

export default function Security() {
    return (
        <>
            <Head title="Security" />
            <SectionTemplate
                eyebrow="Systems"
                title="Security & compliance"
                description="Keep roles tight, surface anomalies fast, and ensure every audit trail reflects what happened in the admin plane."
                highlights={highlights}
                checklist={checklist}
                insights={insights}
            />
        </>
    );
}

Security.layout = (page: React.ReactNode) => <AdminLayout title="Security">{page}</AdminLayout>;
