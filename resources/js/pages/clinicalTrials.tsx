import React from 'react';
import { Head } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';

const Icons = {
    Activity: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
    ),
    Beaker: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.519C4.195 15.324 4.195 16.635 5 17.44l.802.801c.805.805 2.116.805 2.921 0l4.088-4.09a2.25 2.25 0 011.591-.659h1.196a2.25 2.25 0 011.591.659l4.088 4.09c.805.805 2.116.805 2.921 0l.802-.801c.805-.805.805-2.116 0-2.92l-4.09-4.09a2.25 2.25 0 01-.659-1.59V3.104" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13.5" />
        </svg>
    ),
    TrendingUp: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
    ),
    Check: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    ),
    FileChart: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    )
};

export default function ClinicalTrials() {
    const { lang } = useLang(); // ✅ only lang, no locale

    const trials = [
        {
            icon: Icons.Activity,
            iconColor: 'text-rose-500 bg-rose-50',
            condition: lang.clinical_trials.conditions.psoriasis.name,
            summary: lang.clinical_trials.conditions.psoriasis.summary,
            dataPoints: lang.clinical_trials.conditions.psoriasis.points,
        },
        {
            icon: Icons.Beaker,
            iconColor: 'text-sky-600 bg-sky-50',
            condition: lang.clinical_trials.conditions.crohns.name,
            summary: lang.clinical_trials.conditions.crohns.summary,
            dataPoints: lang.clinical_trials.conditions.crohns.points,
        },
    ];

    const challenges = {
        condition: lang.clinical_trials.challenges.title,
        summary: lang.clinical_trials.challenges.summary,
        dataPoints: lang.clinical_trials.challenges.points,
    };

    return (
        <>
            <Head title={lang.clinical_trials.meta.page_title} />

            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
                {/* BACKGROUND */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* HERO */}
                    <main className="py-16 lg:py-24 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-600 mb-6">
                            <Icons.FileChart className="h-4 w-4 text-emerald-600" />
                            {lang.clinical_trials.hero.badge}
                        </div>

                        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                            {lang.clinical_trials.hero.title_line_1} <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
                                {lang.clinical_trials.hero.title_line_2}
                            </span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed mb-10">
                            {lang.clinical_trials.hero.description}
                        </p>
                    </main>

                    {/* TRIAL CARDS */}
                    <section className="pb-20 grid gap-6 md:grid-cols-2">
                        {trials.map((trial) => (
                            <div key={trial.condition} className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${trial.iconColor}`}>
                                        <trial.icon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">{trial.condition}</h2>
                                </div>

                                <p className="text-slate-600 leading-relaxed mb-6 border-b border-slate-100 pb-6">{trial.summary}</p>

                                <ul className="space-y-3">
                                    {trial.dataPoints.map((dp) => (
                                        <li key={dp} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                <Icons.Check className="h-3 w-3" />
                                            </span>
                                            {dp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Challenges */}
                        <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20">
                                        <Icons.TrendingUp className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900">{challenges.condition}</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-slate-600 leading-relaxed">{challenges.summary}</p>
                                    </div>
                                    <ul className="space-y-3">
                                        {challenges.dataPoints.map((dp) => (
                                            <li key={dp} className="flex items-start gap-3 text-sm text-slate-600">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                                {dp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
