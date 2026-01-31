import { Head } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';

// --- ICONS ---
const Icons = {
    Scale: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
        </svg>
    ),
    ExternalLink: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
    ),
};

export default function Likumi() {
    const { __ } = useLang();

    const euRegulas = [
        { 
            title: __('specialistiem.likumi.eu.1.title'), 
            text: __('specialistiem.likumi.eu.1.text'),
            url: 'https://eur-lex.europa.eu/eli/reg/2017/745/oj/?locale=LV'
        },
        { 
            title: __('specialistiem.likumi.eu.2.title'), 
            text: __('specialistiem.likumi.eu.2.text'),
            url: 'https://eur-lex.europa.eu/eli/reg/2017/746/oj/?locale=LV'
        },
        { 
            title: __('specialistiem.likumi.eu.3.title'), 
            text: __('specialistiem.likumi.eu.3.text'),
            url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng'
        },
        { 
            title: __('specialistiem.likumi.eu.4.title'), 
            text: __('specialistiem.likumi.eu.4.text'),
            url: 'https://eur-lex.europa.eu/legal-content/LV/TXT/?uri=CELEX:32014R0536'
        },
        { 
            title: __('specialistiem.likumi.eu.5.title'), 
            text: __('specialistiem.likumi.eu.5.text'),
            url: 'https://likumi.lv/ta/id/254434-farmakovigilances-kartiba'
        },
    ];

    const lvLikumi = [
        { 
            title: __('specialistiem.likumi.lv.1.title'), 
            text: __('specialistiem.likumi.lv.1.text'),
            url: 'https://likumi.lv/ta/id/44108-arstniecibas-likums'
        },
        { 
            title: __('specialistiem.likumi.lv.2.title'), 
            text: __('specialistiem.likumi.lv.2.text'),
            url: 'https://likumi.lv/ta/id/203008-pacientu-tiesibu-likums'
        },
        { 
            title: __('specialistiem.likumi.lv.3.title'), 
            text: __('specialistiem.likumi.lv.3.text'),
            url: 'https://likumi.lv/ta/id/300099-fizisko-personu-datu-apstrades-likums'
        },
        { 
            title: __('specialistiem.likumi.lv.4.title'), 
            text: __('specialistiem.likumi.lv.4.text'),
            url: 'https://likumi.lv/ta/veids/ministru-kabinets/noteikumi'
        },
    ];

    return (
        <>
            <Head title={__('specialistiem.likumi.meta.title')} />

            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* HERO */}
                    <main className="py-20 text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1 text-xs font-semibold">
                            <Icons.Scale className="h-4 w-4 text-indigo-600" />
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
                                <a 
                                    key={i} 
                                    href={r.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block rounded-2xl border bg-white p-6 transition-all hover:border-indigo-500 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-indigo-700">{r.title}</h4>
                                        <Icons.ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 flex-shrink-0" />
                                    </div>
                                    <p className="text-sm text-slate-600">{r.text}</p>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* LV */}
                    <section className="pb-20">
                        <h2 className="text-2xl font-bold mb-8">{__('specialistiem.likumi.lv.title')}</h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            {lvLikumi.map((l, i) => (
                                <a 
                                    key={i} 
                                    href={l.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block rounded-2xl border bg-white p-6 transition-all hover:border-indigo-500 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <h4 className="text-lg font-bold mb-2 group-hover:text-indigo-700">{l.title}</h4>
                                        <Icons.ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 flex-shrink-0" />
                                    </div>
                                    <p className="text-sm text-slate-600">{l.text}</p>
                                </a>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}