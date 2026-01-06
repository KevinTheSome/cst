import { Head } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';

// --- ICONS ---
const Icons = {
    Scale: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
        </svg>
    ),
    FileText: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    ),
    Globe: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3s-4.5 3.97-4.5 9 2.015 9 4.5 9zM13.5 5.49L12.555 2.1a9.01 9.01 0 01-.865 0l-.945 3.39" />
        </svg>
    ),
    ShieldCheck: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
    ),
};

export default function Likumi() {
    const { __ } = useLang();

    const euRegulas = [
        { title: __('specialistiem.likumi.eu.1.title'), text: __('specialistiem.likumi.eu.1.text') },
        { title: __('specialistiem.likumi.eu.2.title'), text: __('specialistiem.likumi.eu.2.text') },
        { title: __('specialistiem.likumi.eu.3.title'), text: __('specialistiem.likumi.eu.3.text') },
        { title: __('specialistiem.likumi.eu.4.title'), text: __('specialistiem.likumi.eu.4.text') },
        { title: __('specialistiem.likumi.eu.5.title'), text: __('specialistiem.likumi.eu.5.text') },
    ];

    const lvLikumi = [
        { title: __('specialistiem.likumi.lv.1.title'), text: __('specialistiem.likumi.lv.1.text') },
        { title: __('specialistiem.likumi.lv.2.title'), text: __('specialistiem.likumi.lv.2.text') },
        { title: __('specialistiem.likumi.lv.3.title'), text: __('specialistiem.likumi.lv.3.text') },
        { title: __('specialistiem.likumi.lv.4.title'), text: __('specialistiem.likumi.lv.4.text') },
    ];

    return (
        <>
            <Head title={__('specialistiem.likumi.meta.title')} />

            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* HERO */}
                    <main className="py-20 text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1 text-xs font-semibold">
                            <Icons.Scale className="h-4 w-4 text-emerald-600" />
                            {__('specialistiem.likumi.badge')}
                        </div>

                        <h1 className="mx-auto max-w-4xl text-4xl font-bold sm:text-5xl mb-6">
                            {__('specialistiem.likumi.hero.title')}
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-slate-600">
                            {__('specialistiem.likumi.hero.text')}
                        </p>
                    </main>

                    {/* EU */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-8">{__('specialistiem.likumi.eu.title')}</h2>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {euRegulas.map((r, i) => (
                                <div key={i} className="rounded-2xl border bg-white p-6">
                                    <h4 className="text-lg font-bold mb-2">{r.title}</h4>
                                    <p className="text-sm text-slate-600">{r.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* LV */}
                    <section className="pb-20">
                        <h2 className="text-2xl font-bold mb-8">{__('specialistiem.likumi.lv.title')}</h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            {lvLikumi.map((l, i) => (
                                <div key={i} className="rounded-2xl border bg-white p-6">
                                    <h4 className="text-lg font-bold mb-2">{l.title}</h4>
                                    <p className="text-sm text-slate-600">{l.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}
