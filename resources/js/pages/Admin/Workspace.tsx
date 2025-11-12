import { Head } from '@inertiajs/react';

import AdminLayout from '../../Layouts/AdminLayout';
import SectionTemplate from './components/SectionTemplate';

const highlights = [
    { label: 'Brands synced', value: '4', hint: 'Biochip, VTDT, LabLife, Grants', accent: 'violet' as const },
    { label: 'Theme variants', value: '9', hint: 'Light/dark + campaigns', accent: 'sky' as const },
    { label: 'Locales', value: '2', hint: 'LV / EN live', accent: 'emerald' as const },
    { label: 'Pending updates', value: '1', hint: 'Awaiting approval', accent: 'amber' as const },
];

const checklist = [
    { title: 'Refresh typography tokens', detail: 'Match marketing kit v3', status: 'Due 12:30' },
    { title: 'Review email signatures', detail: 'Align with new logo spacing', status: 'Due 15:10' },
    { title: 'Archive outdated imagery', detail: 'Move 2019 lab photos', status: 'Due 17:00' },
];

const insights = [
    { title: 'Brand consistency', detail: 'Audit score', metric: '98', accent: 'emerald' as const },
    { title: 'Dark-mode usage', detail: 'Share of visits', metric: '61%', accent: 'violet' as const },
    { title: 'Strings missing', detail: 'Localization backlog', metric: '3', accent: 'amber' as const },
];

export default function Workspace() {
    return (
        <>
            <Head title="Workspace" />
            <SectionTemplate
                eyebrow="Systems"
                title="Workspace settings"
                description="Keep visual systems, localization, and shared assets aligned with the latest brand pushes."
                highlights={highlights}
                checklist={checklist}
                insights={insights}
            />
        </>
    );
}

Workspace.layout = (page: React.ReactNode) => <AdminLayout title="Workspace">{page}</AdminLayout>;
