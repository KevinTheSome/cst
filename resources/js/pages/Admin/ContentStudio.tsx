import { Head } from '@inertiajs/react';

import AdminLayout from '../../Layouts/AdminLayout';
import SectionTemplate from './components/SectionTemplate';

const highlights = [
    { label: 'Drafts in review', value: '12', hint: 'Need creative approval', accent: 'sky' as const },
    { label: 'Assets synced', value: '86', hint: 'Latest drop from design lab', accent: 'violet' as const },
    { label: 'Stories live', value: '5', hint: 'Past 48 hours', accent: 'emerald' as const },
    { label: 'Backlog health', value: '92%', hint: 'Ready with specs', accent: 'amber' as const },
];

const checklist = [
    { title: 'Polish “Join the lab” hero copy', detail: 'Shorten CTA blocks for mobile', status: 'Due 13:30' },
    { title: 'Sync translations for LV / EN', detail: 'Push to Lokalise & verify', status: 'Due 16:45' },
    { title: 'QA Ankēta form styling', detail: 'Match updated typography', status: 'Due 18:00' },
];

const insights = [
    { title: 'Content velocity', detail: 'Stories / week', metric: '18', accent: 'sky' as const },
    { title: 'Media balance', detail: 'Video vs static', metric: '60 / 40', accent: 'violet' as const },
    { title: 'Approval SLA', detail: 'Median wait', metric: '52m', accent: 'emerald' as const },
];

export default function ContentStudio() {
    return (
        <>
            <Head title="Content Studio" />
            <SectionTemplate
                eyebrow="Operations"
                title="Content studio"
                description="Stage posts, long reads, and campaign assets with a calm queue that keeps writers, designers, and reviewers in lockstep."
                highlights={highlights}
                checklist={checklist}
                insights={insights}
            />
        </>
    );
}

ContentStudio.layout = (page: React.ReactNode) => <AdminLayout title="Content studio">{page}</AdminLayout>;
