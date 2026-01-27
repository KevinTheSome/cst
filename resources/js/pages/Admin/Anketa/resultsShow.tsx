import { useLang } from '@/hooks/useLang';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

type ResultPayload = {
    id: number;
    code: string;
    title: string;
    type: string | null;
    submitted_at: string | null;
    answers: Record<string, any> | any[];
    field_mappings: Record<string, string>;
};

interface PageProps {
    result: ResultPayload;
}

const ResultsShow: React.FC = () => {
    const { result } = usePage<PageProps>().props;
    const { __ } = useLang();

    const entries =
        Array.isArray(result.answers) && !Array.isArray(result.answers[0])
            ? result.answers.map((value, index) => [String(index), value])
            : Object.entries(result.answers ?? {});

    return (
        <>
            <Head title={__('anketa.results.view_title') ?? 'Submission detail'} />

            <div className="space-y-6 text-white">
                {/* Header */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/10 px-6 py-5 shadow-inner shadow-black/20">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs tracking-[0.3em] text-white/60 uppercase">{__('anketa.results.view_label') ?? 'Submission'}</p>
                            <h1 className="mt-1 text-2xl font-semibold text-white">{result.title}</h1>
                            <p className="mt-1 text-sm text-white/70">
                                {__('anketa.results.view_subheading') ?? 'Full answers from one questionnaire submission.'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-4 text-xs text-white/70 sm:grid-cols-3">
                        <div>
                            <span className="text-white/50">{__('anketa.results.field_id') ?? 'ID'}:</span> #{result.id}
                        </div>
                        <div>
                            <span className="text-white/50">{__('anketa.results.field_type') ?? 'Type'}:</span> {result.type ?? '–'}
                        </div>
                        <div>
                            <span className="text-white/50">{__('anketa.results.field_code') ?? 'Code'}:</span> {result.code}
                        </div>
                        <div>
                            <span className="text-white/50">{__('anketa.results.field_submitted') ?? 'Submitted'}:</span>{' '}
                            {result.submitted_at ? new Date(result.submitted_at).toLocaleString() : '–'}
                        </div>
                    </div>
                </div>

                {/* Answers */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                    <h2 className="text-lg font-semibold text-white">{__('anketa.results.answers_heading') ?? 'Answers'}</h2>
                    <p className="mt-1 text-xs text-white/60">
                        {__('anketa.results.answers_note') ?? 'Only administrators can view this information.'}
                    </p>

                    {entries.length === 0 && (
                        <p className="mt-6 text-xs text-white/60">{__('anketa.results.answers_empty') ?? 'No answers stored.'}</p>
                    )}

                    <div className="mt-4 space-y-3">
                        {entries.map(([key, value]) => (
                            <div key={key} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm">
                                <p className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">{result.field_mappings[key] || key}</p>
                                <p className="mt-1 break-words text-white/90">{typeof value === 'string' ? value : JSON.stringify(value, null, 2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

(ResultsShow as any).layout = (page: React.ReactNode) => <AdminLayout title="Submission">{page}</AdminLayout>;

export default ResultsShow;
