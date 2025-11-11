import { Head } from '@inertiajs/react';

import AdminLayout from '../../Layouts/AdminLayout';
import SectionTemplate from './components/SectionTemplate';

const highlights = [
    { label: 'Connected systems', value: '18', hint: 'APIs + internal tools', accent: 'sky' as const },
    { label: 'Jobs today', value: '142', hint: 'Automation runs', accent: 'emerald' as const },
    { label: 'Failed hooks', value: '1', hint: 'Auto-retry scheduled', accent: 'amber' as const },
    { label: 'Latency p95', value: '412ms', hint: 'Across regions', accent: 'violet' as const },
];

const checklist = [
    { title: 'Rotate webhook secrets', detail: 'Biochip CMS + CRM pair', status: 'Due 13:00' },
    { title: 'Validate sandbox payloads', detail: 'Ensure VTDT lab events up to date', status: 'Due 15:45' },
    { title: 'Archive legacy endpoint', detail: 'Old analytics collector', status: 'Due 18:00' },
];

const insights = [
    { title: 'Throughput', detail: 'Jobs / min', metric: '11.2', accent: 'sky' as const },
    { title: 'Retries', detail: 'Last hour', metric: '3', accent: 'amber' as const },
    { title: 'Sync freshness', detail: 'Avg. delay', metric: '2m', accent: 'emerald' as const },
];

export default function Integrations() {
    return (
        <>
            <Head title="Integrations" />
            <SectionTemplate
                eyebrow="Systems"
                title="Integrations"
                description="Monitor automations, ensure payload health, and keep every external system in lockstep with the admin surface."
                highlights={highlights}
                checklist={checklist}
                insights={insights}
            />
        </>
    );
}

Integrations.layout = (page: React.ReactNode) => <AdminLayout title="Integrations">{page}</AdminLayout>;
